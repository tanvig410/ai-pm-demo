export function FeedToggle() {
  return (
    <div className="w-full mt-6">
      <div className="max-w-[1440px] mx-auto flex justify-center">
        <div className="flex items-center gap-10">
          <div className="relative">
            <button className="text-[#F5F6F7] font-medium text-[14px] hover:text-white transition-colors">
              For You
            </button>
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#F5F6F7]"></div>
          </div>
          <button className="text-[#F5F6F7] font-medium text-[14px] hover:text-white transition-colors">
            Following
          </button>
        </div>
      </div>
    </div>
  );
}