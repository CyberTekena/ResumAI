
import { useResumeStore } from '@/store/useResumeStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { exportToPDF } from '@/utils/pdfExport';
import { useToast } from '@/hooks/use-toast';
import { Download, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function ResumePreview() {
  const { sections, resumeName } = useResumeStore();
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(true);

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const handleExport = async () => {
    try {
      await exportToPDF('resume-preview', resumeName);
      toast({
        title: 'Resume exported',
        description: 'Your resume has been exported as a PDF',
      });
    } catch (error: any) {
      toast({
        title: 'Export failed',
        description: error.message || 'Failed to export the resume as PDF',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const renderContact = (section: any) => {
    const { content } = section;
    
    return (
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-2">{content.name}</h1>
        <div className="flex flex-wrap justify-center gap-x-4 text-sm">
          {content.email && <span>{content.email}</span>}
          {content.phone && <span>{content.phone}</span>}
          {content.location && <span>{content.location}</span>}
          {content.linkedin && <span>{content.linkedin}</span>}
          {content.website && <span>{content.website}</span>}
        </div>
      </div>
    );
  };

  const renderSummary = (section: any) => {
    const { content } = section;
    
    if (!content.summary) return null;
    
    return (
      <div className="mb-4">
        <h2 className="text-lg font-bold border-b border-gray-200 mb-2">{section.title}</h2>
        <p>{content.summary}</p>
      </div>
    );
  };

  const renderExperience = (section: any) => {
    const { content } = section;
    
    if (content.items.length === 0) return null;
    
    return (
      <div className="mb-4">
        <h2 className="text-lg font-bold border-b border-gray-200 mb-2">{section.title}</h2>
        
        {content.items.map((item: any, index: number) => (
          <div key={item.id} className={index > 0 ? 'mt-3' : ''}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{item.position}</h3>
                <p className="text-gray-700">{item.company}</p>
              </div>
              <div className="text-sm text-gray-600">
                {formatDate(item.startDate)} - {item.current ? 'Present' : formatDate(item.endDate)}
              </div>
            </div>
            
            <div className="mt-1 whitespace-pre-line">{item.description}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderEducation = (section: any) => {
    const { content } = section;
    
    if (content.items.length === 0) return null;
    
    return (
      <div className="mb-4">
        <h2 className="text-lg font-bold border-b border-gray-200 mb-2">{section.title}</h2>
        
        {content.items.map((item: any, index: number) => (
          <div key={item.id} className={index > 0 ? 'mt-3' : ''}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{item.institution}</h3>
                <p className="text-gray-700">{item.degree} in {item.field}</p>
              </div>
              <div className="text-sm text-gray-600">
                {formatDate(item.startDate)} - {item.current ? 'Present' : formatDate(item.endDate)}
              </div>
            </div>
            
            {item.description && <div className="mt-1">{item.description}</div>}
          </div>
        ))}
      </div>
    );
  };

  const renderSkills = (section: any) => {
    const { content } = section;
    
    if (content.categories.length === 0) return null;
    
    return (
      <div className="mb-4">
        <h2 className="text-lg font-bold border-b border-gray-200 mb-2">{section.title}</h2>
        
        {content.categories.map((category: any) => (
          <div key={category.id} className="mb-2">
            <h3 className="font-bold text-sm">{category.name}</h3>
            <p>{category.skills.join(', ')}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderSection = (section: any) => {
    switch (section.type) {
      case 'contact':
        return renderContact(section);
      case 'summary':
        return renderSummary(section);
      case 'experience':
        return renderExperience(section);
      case 'education':
        return renderEducation(section);
      case 'skills':
        return renderSkills(section);
      default:
        return null;
    }
  };

  return (
    <Card className="w-full h-full flex flex-col rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center bg-muted/30">
        <h2 className="font-semibold text-lg">Resume Preview</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowPreview(!showPreview)}
            className="rounded-xl"
          >
            {showPreview ? (
              <>
                <EyeOff className="h-4 w-4 mr-1" /> Hide
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-1" /> Show
              </>
            )}
          </Button>
          <Button 
            size="sm" 
            onClick={handleExport}
            className="rounded-xl bg-primary-blue hover:bg-primary-blue/90"
          >
            <Download className="h-4 w-4 mr-1" /> Export PDF
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900">
        {showPreview ? (
          <div className="resume-container shadow-lg bg-white a4-preview mx-auto animate-fade-in" id="resume-preview">
            <div className="resume-paper prose max-w-none">
              {sortedSections.map((section) => (
                <div key={section.id} className="animate-fade-in">{renderSection(section)}</div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-3">Preview is hidden</p>
              <Button 
                variant="outline"
                onClick={() => setShowPreview(true)}
                className="rounded-xl"
              >
                <Eye className="h-4 w-4 mr-1" /> Show Preview
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
