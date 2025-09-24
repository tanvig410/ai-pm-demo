export function Ribbon() {
  return (
    <div className="w-full mt-6">
      <div className="max-w-[1440px] mx-auto flex justify-end px-6">
        <div className="flex items-center gap-4">
          <div className="w-[80px] h-[28px] bg-[#1C64F2] text-[#F5F6F7] rounded-full flex items-center justify-center text-sm font-medium cursor-pointer">
            Brand
          </div>
          <div className="w-[80px] h-[28px] bg-transparent border border-[#64666C] text-[#F5F6F7] rounded-full flex items-center justify-center text-sm font-medium cursor-pointer hover:border-[#F5F6F7] transition-colors">
            Trend
          </div>
          <div className="w-[80px] h-[28px] bg-transparent border border-[#64666C] text-[#F5F6F7] rounded-full flex items-center justify-center text-sm font-medium cursor-pointer hover:border-[#F5F6F7] transition-colors">
            Internal
          </div>
        </div>
      </div>
    </div>
  );
}