import { Button } from '@/components/ui/button';
import { useChatStore } from '@/store/chat-store';
import { HelpCircle } from 'lucide-react';
interface ChatHeaderProps {
  title: string;
}

export default function ChatHeader({ title }: ChatHeaderProps) {
  const { settings } = useChatStore();

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">{title}</h2>
      <Button 
        variant="ghost" 
        onClick={() => window.open(settings?.settings?.contactUrl || "", "_blank")}
        title="Help"
        className="hover:bg-transparent cursor-pointer"
      >
        <HelpCircle className="!w-[2rem] !h-[2rem]" />
      </Button>
    </div>
  );
} 