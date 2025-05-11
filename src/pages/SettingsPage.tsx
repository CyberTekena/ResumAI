
import { AppearanceSettings } from '@/components/settings/AppearanceSettings';
import { OpenAISettings } from '@/components/settings/OpenAISettings';

export default function SettingsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-8">
        <OpenAISettings />
        <AppearanceSettings />
      </div>
    </div>
  );
}
