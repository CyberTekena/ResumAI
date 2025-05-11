
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useThemeStore } from '@/store/useThemeStore';
import { Sun, Moon } from 'lucide-react';

export function AppearanceSettings() {
  const { theme, setTheme } = useThemeStore();

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how the application looks and feels
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Theme</Label>
          <RadioGroup
            value={theme}
            onValueChange={(value: 'light' | 'dark') => setTheme(value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2 p-2 rounded-xl border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="flex items-center cursor-pointer">
                <Sun className="h-4 w-4 mr-2 text-amber-500" /> Light Mode
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-xl border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="flex items-center cursor-pointer">
                <Moon className="h-4 w-4 mr-2 text-blue-500" /> Dark Mode
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
