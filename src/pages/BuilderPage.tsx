
import { useState, useEffect } from 'react';
import { ResumeForm } from '@/components/resume/ResumeForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResumeStore } from '@/store/useResumeStore';
import { initializeOpenAI } from '@/services/openai';
import { useToast } from '@/hooks/use-toast';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

export default function BuilderPage() {
  const { resumeName, setResumeName } = useResumeStore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(resumeName);
  const { theme, toggleTheme } = useThemeStore();

  // Initialize OpenAI if API key exists in localStorage
  useEffect(() => {
    const apiKey = localStorage.getItem('openai-api-key');
    if (apiKey) {
      try {
        initializeOpenAI(apiKey);
      } catch (error) {
        console.error('Failed to initialize OpenAI:', error);
      }
    }
  }, []);

  const handleSaveName = () => {
    if (nameInput.trim()) {
      setResumeName(nameInput);
      setIsEditing(false);
      toast({
        title: 'Resume renamed',
        description: `Resume name changed to "${nameInput}"`,
      });
    }
  };

  return (
    <div className="container py-6 animate-fade-in h-[calc(100vh-4rem)]">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <Input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="max-w-xs border-gray-300 dark:border-gray-600 focus:ring-primary-blue"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveName();
                  }
                }}
                autoFocus
              />
              <Button 
                onClick={handleSaveName}
                className="rounded-xl"
              >
                Save
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <h1 className="text-3xl font-bold">
              {resumeName}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsEditing(true);
                  setNameInput(resumeName);
                }}
                className="ml-2 text-xs rounded-xl"
              >
                Rename
              </Button>
            </h1>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full w-10 h-10"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <ResizablePanelGroup 
        direction="horizontal"
        className="flex h-full gap-6 rounded-lg border"
      >
        <ResizablePanel defaultSize={50} minSize={30} className="min-h-[500px]">
          <ResumeForm />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={50} minSize={30} className="min-h-[500px]">
          <ResumePreview />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
