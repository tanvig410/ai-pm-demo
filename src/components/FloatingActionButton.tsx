import { Plus } from 'lucide-react';

export function FloatingActionButton() {
  return (
    <button className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#00C2FF] rounded-[8px] flex items-center justify-center hover:bg-[#00B8F0] transition-colors shadow-lg">
      <Plus className="h-6 w-6 text-white" />
    </button>
  );
}