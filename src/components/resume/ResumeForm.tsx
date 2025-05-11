
import { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContactForm } from './forms/ContactForm';
import { SummaryForm } from './forms/SummaryForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { useToast } from '@/hooks/use-toast';
import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';

export function ResumeForm() {
  const { sections, activeSection, setActiveSection, moveSection, removeSection } = useResumeStore();
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState('edit');

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const handleMoveUp = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section && section.order > 0) {
      moveSection(sectionId, section.order - 1);
      toast({
        title: 'Section moved up',
        description: `${section.title} has been moved up.`,
      });
    }
  };

  const handleMoveDown = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section && section.order < sections.length - 1) {
      moveSection(sectionId, section.order + 1);
      toast({
        title: 'Section moved down',
        description: `${section.title} has been moved down.`,
      });
    }
  };

  const handleDelete = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section && section.id !== 'contact') {
      removeSection(sectionId);
      toast({
        title: 'Section removed',
        description: `${section.title} has been removed.`,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Cannot remove section',
        description: 'The contact section cannot be removed.',
        variant: 'destructive',
      });
    }
  };

  // Render the form based on section type
  const renderForm = () => {
    const section = sections.find((s) => s.id === activeSection);

    if (!section) {
      return (
        <div className="p-4 text-center">
          <p>Please select a section to edit</p>
        </div>
      );
    }

    switch (section.type) {
      case 'contact':
        return <ContactForm section={section} />;
      case 'summary':
        return <SummaryForm section={section} />;
      case 'experience':
        return <ExperienceForm section={section} />;
      case 'education':
        return <EducationForm section={section} />;
      case 'skills':
        return <SkillsForm section={section} />;
      default:
        return <div>Unsupported section type</div>;
    }
  };

  return (
    <Card className="flex-1 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      <Tabs defaultValue="edit" value={currentTab} onValueChange={setCurrentTab} className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-2 p-1 bg-muted rounded-none">
          <TabsTrigger className="rounded-xl data-[state=active]:bg-background" value="edit">Edit Sections</TabsTrigger>
          <TabsTrigger className="rounded-xl data-[state=active]:bg-background" value="organize">Organize</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="edit" className="m-0 h-full data-[state=active]:flex flex-col">
            <div className="grid grid-cols-5 h-full flex-1 overflow-hidden">
              <div className="col-span-1 border-r bg-muted/30 h-full overflow-y-auto">
                <div className="p-3 sticky top-0 z-10 bg-muted/30 border-b">
                  <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Sections</h3>
                </div>
                <ul className="p-3 space-y-1">
                  {sortedSections.map((section) => (
                    <li key={section.id} className="animate-fade-in">
                      <Button
                        variant={activeSection === section.id ? 'secondary' : 'ghost'}
                        className={`w-full justify-start text-left rounded-xl transition-all truncate ${
                          activeSection === section.id ? 'font-medium' : ''
                        }`}
                        onClick={() => setActiveSection(section.id)}
                      >
                        {section.title}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-4 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                  {renderForm()}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="organize" className="p-5 m-0 overflow-y-auto h-full">
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-medium">Organize Resume Sections</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Drag to reorder sections or use the arrows to move them.
                </p>
              </div>

              <ul className="space-y-3">
                {sortedSections.map((section) => (
                  <li
                    key={section.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border animate-fade-in"
                  >
                    <span className="font-medium truncate">{section.title}</span>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMoveUp(section.id)}
                        disabled={section.order === 0}
                        className="rounded-full w-8 h-8"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMoveDown(section.id)}
                        disabled={section.order === sections.length - 1}
                        className="rounded-full w-8 h-8"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(section.id)}
                        disabled={section.id === 'contact'}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full w-8 h-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}
