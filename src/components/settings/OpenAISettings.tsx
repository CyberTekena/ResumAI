
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { initializeOpenAI, hasApiKey } from '@/services/openai';
import { useToast } from '@/hooks/use-toast';

export function OpenAISettings() {
  const [apiKey, setApiKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key is already set
    setIsKeySet(hasApiKey());
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: 'API Key Required',
        description: 'Please enter your OpenAI API key',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Initialize OpenAI with the provided key
      initializeOpenAI(apiKey.trim());
      setIsKeySet(true);
      
      // Store the API key in localStorage (in production, consider more secure methods)
      localStorage.setItem('openai-api-key', apiKey.trim());
      
      toast({
        title: 'API Key Saved',
        description: 'Your OpenAI API key has been saved',
      });
      
      setApiKey(''); // Clear the input for security
    } catch (error: any) {
      toast({
        title: 'Error Saving API Key',
        description: error.message || 'An error occurred while saving your API key',
        variant: 'destructive',
      });
    }
  };

  const handleReset = () => {
    localStorage.removeItem('openai-api-key');
    setIsKeySet(false);
    toast({
      title: 'API Key Removed',
      description: 'Your OpenAI API key has been removed',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Settings</CardTitle>
        <CardDescription>
          Configure your OpenAI API key for AI-powered resume features
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isKeySet ? (
          <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
            <AlertTitle className="text-green-800 dark:text-green-300">API Key Configured</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              Your OpenAI API key is set up and ready to use with AI features.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            <Alert>
              <AlertTitle>API Key Required</AlertTitle>
              <AlertDescription>
                To use AI features like generating descriptions and summaries, you need to provide your OpenAI API key.
                You can get one from{' '}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline"
                >
                  platform.openai.com
                </a>
                .
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="apiKey">OpenAI API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Your API key is stored locally in your browser and never sent to our servers.
              </p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {isKeySet ? (
          <Button variant="destructive" onClick={handleReset}>
            Remove API Key
          </Button>
        ) : (
          <Button onClick={handleSave} disabled={!apiKey.trim()}>
            Save API Key
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
