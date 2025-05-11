
import { useState } from 'react';
import { EducationItem, EducationSection, useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2 } from 'lucide-react';

export function EducationForm({ section }: { section: EducationSection }) {
  const { updateSection } = useResumeStore();
  const { content } = section;

  const [activeItem, setActiveItem] = useState<string | null>(
    content.items.length > 0 ? content.items[0].id : null
  );

  const addEducation = () => {
    const newId = `edu-${Date.now()}`;
    const newItem: EducationItem = {
      id: newId,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };

    updateSection(section.id, {
      content: {
        items: [...content.items, newItem],
      },
    });
    
    setActiveItem(newId);
  };

  const updateEducation = (id: string, updates: Partial<EducationItem>) => {
    const updatedItems = content.items.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );

    updateSection(section.id, {
      content: {
        items: updatedItems,
      },
    });
  };

  const removeEducation = (id: string) => {
    const updatedItems = content.items.filter((item) => item.id !== id);

    updateSection(section.id, {
      content: {
        items: updatedItems,
      },
    });

    if (activeItem === id) {
      setActiveItem(updatedItems.length > 0 ? updatedItems[0].id : null);
    }
  };

  const activeEducation = activeItem
    ? content.items.find((edu) => edu.id === activeItem)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{section.title}</h2>
        <Button onClick={addEducation} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Education
        </Button>
      </div>

      {content.items.length > 0 ? (
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-5 md:col-span-1">
            <div className="space-y-1">
              {content.items.map((item) => (
                <Button
                  key={item.id}
                  variant={activeItem === item.id ? 'default' : 'outline'}
                  className="w-full justify-start mb-1 overflow-hidden"
                  onClick={() => setActiveItem(item.id)}
                >
                  <span className="truncate">
                    {item.institution || item.degree || 'New Education'}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          <div className="col-span-5 md:col-span-4">
            {activeEducation && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution</Label>
                    <Input
                      id="institution"
                      value={activeEducation.institution}
                      onChange={(e) =>
                        updateEducation(activeEducation.id, { institution: e.target.value })
                      }
                      placeholder="University or School Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                      id="degree"
                      value={activeEducation.degree}
                      onChange={(e) =>
                        updateEducation(activeEducation.id, { degree: e.target.value })
                      }
                      placeholder="Bachelor's, Master's, PhD, etc."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <Input
                    id="field"
                    value={activeEducation.field}
                    onChange={(e) =>
                      updateEducation(activeEducation.id, { field: e.target.value })
                    }
                    placeholder="Computer Science, Business, etc."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={activeEducation.startDate}
                      onChange={(e) =>
                        updateEducation(activeEducation.id, { startDate: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    {!activeEducation.current && (
                      <>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={activeEducation.endDate}
                          onChange={(e) =>
                            updateEducation(activeEducation.id, { endDate: e.target.value })
                          }
                        />
                      </>
                    )}
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="current"
                        checked={activeEducation.current}
                        onCheckedChange={(checked) =>
                          updateEducation(activeEducation.id, {
                            current: !!checked,
                            endDate: checked ? '' : activeEducation.endDate,
                          })
                        }
                      />
                      <label
                        htmlFor="current"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Currently Studying
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Additional Information (Optional)</Label>
                  <Textarea
                    id="description"
                    value={activeEducation.description}
                    onChange={(e) =>
                      updateEducation(activeEducation.id, { description: e.target.value })
                    }
                    placeholder="Achievements, GPA, relevant coursework, etc."
                  />
                </div>

                <Separator className="my-4" />

                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    onClick={() => removeEducation(activeEducation.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remove Education
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center p-8 border rounded-md">
          <p className="text-gray-500 mb-4">No education added yet</p>
          <Button onClick={addEducation}>Add Education</Button>
        </div>
      )}
    </div>
  );
}
