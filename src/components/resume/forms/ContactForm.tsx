
import { ContactSection, useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ContactForm({ section }: { section: ContactSection }) {
  const { updateSection } = useResumeStore();
  const { content } = section;

  const handleChange = (field: string, value: string) => {
    updateSection(section.id, {
      content: {
        ...content,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{section.title}</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={content.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={content.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="john.doe@example.com"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={content.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="(123) 456-7890"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={content.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="City, State"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn (optional)</Label>
            <Input
              id="linkedin"
              value={content.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website">Website (optional)</Label>
            <Input
              id="website"
              value={content.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="johndoe.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
