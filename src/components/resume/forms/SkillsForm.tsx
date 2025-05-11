
import { useState } from 'react';
import { SkillsSection, useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus, X, Trash2 } from 'lucide-react';

export function SkillsForm({ section }: { section: SkillsSection }) {
  const { updateSection } = useResumeStore();
  const { content } = section;

  const [activeCategory, setActiveCategory] = useState<string>(
    content.categories.length > 0 ? content.categories[0].id : ''
  );
  
  const [newSkill, setNewSkill] = useState('');

  const addCategory = () => {
    const newId = `cat-${Date.now()}`;
    const newCategory = {
      id: newId,
      name: 'New Category',
      skills: [],
    };

    updateSection(section.id, {
      content: {
        categories: [...content.categories, newCategory],
      },
    });

    setActiveCategory(newId);
  };

  const updateCategory = (id: string, name: string) => {
    const updatedCategories = content.categories.map((cat) =>
      cat.id === id ? { ...cat, name } : cat
    );

    updateSection(section.id, {
      content: {
        categories: updatedCategories,
      },
    });
  };

  const removeCategory = (id: string) => {
    const updatedCategories = content.categories.filter((cat) => cat.id !== id);

    updateSection(section.id, {
      content: {
        categories: updatedCategories,
      },
    });

    if (activeCategory === id && updatedCategories.length > 0) {
      setActiveCategory(updatedCategories[0].id);
    }
  };

  const addSkill = (categoryId: string) => {
    if (!newSkill.trim()) return;

    const updatedCategories = content.categories.map((cat) =>
      cat.id === categoryId
        ? {
            ...cat,
            skills: [...cat.skills, newSkill.trim()],
          }
        : cat
    );

    updateSection(section.id, {
      content: {
        categories: updatedCategories,
      },
    });

    setNewSkill('');
  };

  const removeSkill = (categoryId: string, skillIndex: number) => {
    const updatedCategories = content.categories.map((cat) =>
      cat.id === categoryId
        ? {
            ...cat,
            skills: cat.skills.filter((_, i) => i !== skillIndex),
          }
        : cat
    );

    updateSection(section.id, {
      content: {
        categories: updatedCategories,
      },
    });
  };

  const activeSkillsCategory = content.categories.find((cat) => cat.id === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{section.title}</h2>
        <Button onClick={addCategory} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Category
        </Button>
      </div>

      {content.categories.length > 0 ? (
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-5 md:col-span-1">
            <div className="space-y-1">
              {content.categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  className="w-full justify-start mb-1 overflow-hidden"
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="truncate">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="col-span-5 md:col-span-4">
            {activeSkillsCategory && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryName">Category Name</Label>
                  <Input
                    id="categoryName"
                    value={activeSkillsCategory.name}
                    onChange={(e) => updateCategory(activeSkillsCategory.id, e.target.value)}
                    placeholder="e.g., Technical Skills, Languages, etc."
                  />
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <Label>Skills</Label>

                  <div className="flex flex-wrap gap-2">
                    {activeSkillsCategory.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full flex items-center text-sm"
                      >
                        {skill}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 ml-1 p-0 text-purple-600 dark:text-purple-300 hover:text-red-500 dark:hover:text-red-400"
                          onClick={() => removeSkill(activeSkillsCategory.id, index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill(activeSkillsCategory.id);
                          }
                        }}
                      />
                    </div>
                    <Button onClick={() => addSkill(activeSkillsCategory.id)}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    onClick={() => removeCategory(activeSkillsCategory.id)}
                    disabled={content.categories.length <= 1}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remove Category
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center p-8 border rounded-md">
          <p className="text-gray-500 mb-4">No skill categories added yet</p>
          <Button onClick={addCategory}>Add Skill Category</Button>
        </div>
      )}
    </div>
  );
}
