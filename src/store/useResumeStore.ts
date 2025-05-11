
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define resume section types
export type ResumeSection = {
  id: string;
  type: 'contact' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'custom';
  title: string;
  content: any;
  order: number;
};

export type ContactSection = ResumeSection & {
  content: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
};

export type SummarySection = ResumeSection & {
  content: {
    summary: string;
  };
};

export type ExperienceItem = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type ExperienceSection = ResumeSection & {
  content: {
    items: ExperienceItem[];
  };
};

export type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type EducationSection = ResumeSection & {
  content: {
    items: EducationItem[];
  };
};

export type SkillsSection = ResumeSection & {
  content: {
    categories: {
      id: string;
      name: string;
      skills: string[];
    }[];
  };
};

export type ProjectItem = {
  id: string;
  title: string;
  link?: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type ProjectsSection = ResumeSection & {
  content: {
    items: ProjectItem[];
  };
};

export type CustomSection = ResumeSection & {
  content: {
    text: string;
  };
};

export type ResumeTemplate = 'modern' | 'professional' | 'creative' | 'simple';

export type ResumeState = {
  sections: ResumeSection[];
  activeSection: string | null;
  template: ResumeTemplate;
  resumeName: string;
};

type ResumeActions = {
  addSection: (section: ResumeSection) => void;
  updateSection: (sectionId: string, updates: Partial<ResumeSection>) => void;
  removeSection: (sectionId: string) => void;
  setActiveSection: (sectionId: string | null) => void;
  moveSection: (sectionId: string, newOrder: number) => void;
  setTemplate: (template: ResumeTemplate) => void;
  setResumeName: (name: string) => void;
  resetStore: () => void;
};

const initialState: ResumeState = {
  sections: [
    {
      id: 'contact',
      type: 'contact',
      title: 'Contact Information',
      content: {
        name: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        website: '',
      },
      order: 0,
    },
    {
      id: 'summary',
      type: 'summary',
      title: 'Professional Summary',
      content: {
        summary: '',
      },
      order: 1,
    },
    {
      id: 'experience',
      type: 'experience',
      title: 'Work Experience',
      content: {
        items: [],
      },
      order: 2,
    },
    {
      id: 'education',
      type: 'education',
      title: 'Education',
      content: {
        items: [],
      },
      order: 3,
    },
    {
      id: 'skills',
      type: 'skills',
      title: 'Skills',
      content: {
        categories: [
          {
            id: 'technical',
            name: 'Technical Skills',
            skills: [],
          },
        ],
      },
      order: 4,
    },
  ],
  activeSection: 'contact',
  template: 'modern',
  resumeName: 'My Resume',
};

export const useResumeStore = create<ResumeState & ResumeActions>()(
  persist(
    (set) => ({
      ...initialState,

      addSection: (section) =>
        set((state) => ({
          sections: [...state.sections, section].sort((a, b) => a.order - b.order),
        })),

      updateSection: (sectionId, updates) =>
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === sectionId ? { ...section, ...updates } : section
          ),
        })),

      removeSection: (sectionId) =>
        set((state) => ({
          sections: state.sections.filter((section) => section.id !== sectionId),
          activeSection: state.activeSection === sectionId ? null : state.activeSection,
        })),

      setActiveSection: (sectionId) =>
        set(() => ({
          activeSection: sectionId,
        })),

      moveSection: (sectionId, newOrder) =>
        set((state) => {
          const updatedSections = [...state.sections];
          const sectionIndex = updatedSections.findIndex((s) => s.id === sectionId);
          
          if (sectionIndex !== -1) {
            const movedSection = { ...updatedSections[sectionIndex], order: newOrder };
            
            // Remove the moved section
            updatedSections.splice(sectionIndex, 1);
            
            // Update orders of other sections
            for (let i = 0; i < updatedSections.length; i++) {
              if (updatedSections[i].order >= newOrder) {
                updatedSections[i] = { ...updatedSections[i], order: updatedSections[i].order + 1 };
              }
            }
            
            // Add the moved section back
            updatedSections.push(movedSection);
            
            // Sort by order
            updatedSections.sort((a, b) => a.order - b.order);
          }

          return { sections: updatedSections };
        }),

      setTemplate: (template) =>
        set(() => ({
          template,
        })),

      setResumeName: (resumeName) =>
        set(() => ({
          resumeName,
        })),

      resetStore: () =>
        set(() => ({
          ...initialState,
        })),
    }),
    {
      name: 'resume-storage',
    }
  )
);
