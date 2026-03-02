export const StatusLegend = () => {
  return (
    <div className="p-[15px] border-t border-border-color text-[12px] grid grid-cols-2 gap-2">
      <div className="flex items-center gap-2">
        <div className="w-[15px] h-[15px] border border-[#999] bg-status-answered"></div> 
        Answered
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[15px] h-[15px] border border-[#999] bg-status-visited"></div> 
        Not Answered
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[15px] h-[15px] border border-[#999] bg-white"></div> 
        Not Visited
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[15px] h-[15px] border border-[#999] bg-status-marked rounded-full"></div> 
        Marked for Review
      </div>
      <div className="flex items-center gap-2 col-span-2">
        <div className="w-[15px] h-[15px] border border-[#999] bg-status-marked rounded-full relative after:content-['✓'] after:absolute after:bottom-[-2px] after:right-[-2px] after:bg-status-answered after:text-white after:text-[6px] after:w-2 after:h-2 after:rounded-full after:flex after:items-center after:justify-center"></div> 
        Answered & Marked for Review (will be considered for evaluation)
      </div>
    </div>
  );
};
