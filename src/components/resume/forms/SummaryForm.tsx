
import { useState } from 'react';
import { SummarySection, useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader, Sparkles } from 'lucide-react';
import { generateSummary, hasApiKey } from '@/services/openai';
import { useToast } from '@/hooks/use-toast';

export function SummaryForm({ section }: { section: SummarySection }) {
  const { updateSection } = useResumeStore();
  const { toast } = useToast();
  const { content } = section;
  
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [years, setYears] = useState('');
  const [skills, setSkills] = useState('');

  const handleChange = (value: string) => {
    updateSection(section.id, {
      content: {
        summary: value,
      },
    });
  };

  const handleGenerateSummary = async () => {
    if (!hasApiKey()) {
      toast({
        title: 'API key not set',
        description: 'Please set your OpenAI API key in the settings page',
        variant: 'destructive',
      });
      return;
    }
    
    if (!jobTitle || !years) {
      toast({
        title: 'Missing information',
        description: 'Please provide a job title and years of experience',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const skillsArray = skills.split(',').map((s) => s.trim()).filter((s) => s);
      const summary = await generateSummary(jobTitle, parseInt(years), skillsArray);
      
      handleChange(summary);
      
      toast({
        title: 'Summary generated',
        description: 'Your professional summary has been generated',
      });
    } catch (error: any) {
      toast({
        title: 'Error generating summary',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{section.title}</h2>
      
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          className="min-h-[150px]"
          placeholder="Write a professional summary that highlights your expertise, experience, and key skills."
          value={content.summary}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

      <Card className="p-4 bg-purple-100 dark:bg-purple-900/20">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-purple-500" /> AI Summary Generator
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="Software Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years">Years of Experience</Label>
              <Input
                id="years"
                type="number"
                placeholder="5"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                min="0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills">Key Skills (comma separated)</Label>
            <Input
              id="skills"
              placeholder="React, JavaScript, UI/UX Design"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <Button 
            type="button" 
            onClick={handleGenerateSummary}
            disabled={loading}
            className="w-full"
          >
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Generate Summary
          </Button>
        </div>
      </Card>
    </div>
  );
}
