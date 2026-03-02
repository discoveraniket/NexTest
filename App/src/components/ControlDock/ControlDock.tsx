interface ControlDockProps {
  onMark: () => void;
  onClear: () => void;
  onSave: () => void;
}

export const ControlDock = ({ onMark, onClear, onSave }: ControlDockProps) => {
  return (
    <div className="h-[60px] border-t border-border-color flex items-center px-5 gap-4 bg-[#f8f9fa] mt-auto">
      <button 
        className="px-4 py-2 bg-btn-mark text-white rounded-[4px] cursor-pointer font-medium transition-opacity hover:opacity-90" 
        onClick={onMark}
      >
        Mark for Review & Next
      </button>
      <button 
        className="px-4 py-2 bg-btn-clear text-white rounded-[4px] cursor-pointer font-medium transition-opacity hover:opacity-90" 
        onClick={onClear}
      >
        Clear Response
      </button>
      <div className="flex-1" />
      <button 
        className="px-4 py-2 bg-btn-save text-white rounded-[4px] cursor-pointer font-medium transition-opacity hover:opacity-90" 
        onClick={onSave}
      >
        Save & Next
      </button>
    </div>
  );
};
