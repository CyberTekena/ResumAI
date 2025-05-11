
import { useState } from 'react';
import { ExperienceItem, ExperienceSection, useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Loader, Sparkles, Plus, Trash2 } from 'lucide-react';
import { generateJobDescription, hasApiKey } from '@/services/openai';
import { useToast } from '@/hooks/use-toast';

export function ExperienceForm({ section }: { section: ExperienceSection }) {
  const { updateSection } = useResumeStore();
  const { toast } = useToast();
  const { content } = section;

  const [activeItem, setActiveItem] = useState<string | null>(
    content.items.length > 0 ? content.items[0].id : null
  );
  
  const [loading, setLoading] = useState(false);

  const addExperience = () => {
    const newId = `exp-${Date.now()}`;
    const newItem: ExperienceItem = {
      id: newId,
      company: '',
      position: '',
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

  const updateExperience = (id: string, updates: Partial<ExperienceItem>) => {
    const updatedItems = content.items.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );

    updateSection(section.id, {
      content: {
        items: updatedItems,
      },
    });
  };

  const removeExperience = (id: string) => {
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

  const generateDescription = async (id: string) => {
    const item = content.items.find((exp) => exp.id === id);
    
    if (!item) return;
    
    if (!hasApiKey()) {
      toast({
        title: 'API key not set',
        description: 'Please set your OpenAI API key in the settings page',
        variant: 'destructive',
      });
      return;
    }

    if (!item.position || !item.company) {
      toast({
        title: 'Missing information',
        description: 'Please provide a job title and company name',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      
      // Calculate years of experience based on dates
      let years = 1;
      if (item.startDate && (item.endDate || item.current)) {
        const start = new Date(item.startDate);
        const end = item.current ? new Date() : new Date(item.endDate);
        years = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365)));
      }
      
      const description = await generateJobDescription(item.position, item.company, years);
      
      updateExperience(id, { description });
      
      toast({
        title: 'Description generated',
        description: 'Your job description has been generated',
      });
    } catch (error: any) {
      toast({
        title: 'Error generating description',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const activeExperience = activeItem
    ? content.items.find((exp) => exp.id === activeItem)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{section.title}</h2>
        <Button onClick={addExperience} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Experience
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
                    {item.position || item.company || 'New Experience'}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          <div className="col-span-5 md:col-span-4">
            {activeExperience && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={activeExperience.company}
                      onChange={(e) =>
                        updateExperience(activeExperience.id, { company: e.target.value })
                      }
                      placeholder="Company Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={activeExperience.position}
                      onChange={(e) =>
                        updateExperience(activeExperience.id, { position: e.target.value })
                      }
                      placeholder="Job Title"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={activeExperience.startDate}
                      onChange={(e) =>
                        updateExperience(activeExperience.id, { startDate: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    {!activeExperience.current && (
                      <>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={activeExperience.endDate}
                          onChange={(e) =>
                            updateExperience(activeExperience.id, { endDate: e.target.value })
                          }
                        />
                      </>
                    )}
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="currentPosition"
                        checked={activeExperience.current}
                        onCheckedChange={(checked) =>
                          updateExperience(activeExperience.id, {
                            current: !!checked,
                            endDate: checked ? '' : activeExperience.endDate,
                          })
                        }
                      />
                      <label
                        htmlFor="currentPosition"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Current Position
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={activeExperience.description}
                    onChange={(e) =>
                      updateExperience(activeExperience.id, { description: e.target.value })
                    }
                    placeholder="Describe your responsibilities and achievements"
                    className="min-h-[150px]"
                  />
                </div>

                <Card className="p-4 bg-purple-100 dark:bg-purple-900/20">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-purple-500" /> AI Description Generator
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Generate a professional description for this position based on your job title and company.
                  </p>
                  <Button
                    onClick={() => generateDescription(activeExperience.id)}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    Generate Job Description
                  </Button>
                </Card>

                <Separator className="my-4" />

                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    onClick={() => removeExperience(activeExperience.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remove Experience
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center p-8 border rounded-md">
          <p className="text-gray-500 mb-4">No work experience added yet</p>
          <Button onClick={addExperience}>Add Experience</Button>
        </div>
      )}
    </div>
  );
}
