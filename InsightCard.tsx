import { Button } from './ui/button';
import { Progress } from './ui/progress';

export function InsightCard() {
  return (
    <div 
      className="fixed left-8 top-32 w-[200px] h-[260px] bg-[#161616] border border-[#333] rounded-lg p-6 flex flex-col"
      style={{
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
        position: 'sticky',
        marginTop: '32px',
        marginLeft: '32px'
      }}
    >
      <h3 className="text-[#E6E6E6] font-medium mb-4">
        Connect assets to train your feed
      </h3>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-4">
          <div className="flex justify-between text-sm text-[#9A9A9A] mb-2">
            <span>Progress</span>
            <span>0/10</span>
          </div>
          <div className="w-[156px] h-1 bg-[#233] rounded-full overflow-hidden">
            <div className="h-full bg-[#00D1FF] rounded-full" style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>

      <Button 
        className="w-[156px] h-9 bg-[#00D1FF] text-black hover:bg-[#00D1FF]/90 font-medium"
      >
        Start
      </Button>
    </div>
  );
}