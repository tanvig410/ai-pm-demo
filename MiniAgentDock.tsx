import { MessageCircle } from 'lucide-react';

export function MiniAgentDock() {
  return (
    <button className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 w-11 h-11 bg-[#1C1D20] border border-[#2A2B2E] rounded-[8px] flex items-center justify-center hover:bg-[#2A2B2E] transition-colors">
      <MessageCircle className="h-5 w-5 text-[#F5F6F7]" />
    </button>
  );
}