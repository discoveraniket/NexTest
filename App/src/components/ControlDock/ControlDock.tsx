interface ControlDockProps {
  onMark: () => void;
  onClear: () => void;
  onSave: () => void;
}

export const ControlDock = ({ onMark, onClear, onSave }: ControlDockProps) => {
  return (
    <div className="min-h-[60px] md:h-[60px] border-t border-border-color flex flex-wrap md:flex-nowrap items-center px-3 md:px-5 py-3 md:py-0 gap-2 md:gap-4 bg-[#f8f9fa] mt-auto">
      <button 
        className="flex-1 md:flex-none px-3 md:px-4 py-2 bg-btn-mark text-white rounded-[4px] cursor-pointer text-xs md:text-sm font-medium transition-opacity hover:opacity-90" 
        onClick={onMark}
      >
        Mark for Review & Next
      </button>
      <button 
        className="flex-1 md:flex-none px-3 md:px-4 py-2 bg-btn-clear text-white rounded-[4px] cursor-pointer text-xs md:text-sm font-medium transition-opacity hover:opacity-90 whitespace-nowrap" 
        onClick={onClear}
      >
        Clear Response
      </button>
      <div className="hidden md:block flex-1" />
      <button 
        className="w-full md:w-auto px-4 md:px-6 py-2 bg-btn-save text-white rounded-[4px] cursor-pointer text-xs md:text-sm font-bold transition-opacity hover:opacity-90 shadow-sm" 
        onClick={onSave}
      >
        Save & Next
      </button>
    </div>
  );
};
