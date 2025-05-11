
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Download, Eye } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col lg:flex-row items-center py-12 lg:py-24 px-4">
        <div className="container flex flex-col lg:flex-row items-center lg:justify-between">
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left mb-10 lg:mb-0 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Create Professional Resumes with{' '}
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                AI
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Build stunning resumes effortlessly with our AI-powered resume builder. 
              Get expert suggestions, customizable templates, and instant PDF export.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/builder">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <FileText className="mr-2 h-5 w-5" /> Build Your Resume
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-sm">AI-Powered</span>
              </div>
              <div className="flex items-center">
                <Download className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-sm">PDF Export</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-sm">Live Preview</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center animate-slide-up">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg blur opacity-25"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-200 dark:border-gray-800">
                <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded mb-4">
                  <div className="p-4">
                    <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-md mb-6"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded-md mt-6 mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded-md mt-6 mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="h-10 w-32 bg-purple-100 dark:bg-purple-900/30 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Resume Building Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Section Builder</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Easily create and organize all the sections of your resume with our intuitive builder.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Content Generation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get AI assistance to craft professional job descriptions, summaries, and more.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">PDF Export</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Export your polished resume as a professional PDF ready for job applications.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Link to="/builder">
              <Button size="lg">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
