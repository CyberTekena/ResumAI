
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Home, FileText, Settings } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';

export function Header() {
  const { theme, toggleTheme } = useThemeStore();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-purple-400" />
            <span className="font-bold text-xl hidden sm:inline-block">ResumAI</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="w-9 px-0">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Button>
            </Link>
            <Link to="/builder">
              <Button variant="ghost" size="sm" className="w-9 px-0">
                <FileText className="h-5 w-5" />
                <span className="sr-only">Resume</span>
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="sm" className="w-9 px-0">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="w-9 px-0" onClick={toggleTheme}>
              {theme === 'light' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
