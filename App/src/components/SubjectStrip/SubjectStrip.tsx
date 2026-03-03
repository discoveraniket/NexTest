interface SubjectStripProps {
  subjects: string[];
  currentActive: string;
  onSubjectChange: (subj: string) => void;
}

export const SubjectStrip = ({ subjects, currentActive, onSubjectChange }: SubjectStripProps) => {
  return (
    <nav className="h-[40px] bg-primary-blue flex gap-[2px] px-[10px] overflow-x-auto whitespace-nowrap scrollbar-hide">
      {subjects.map((subj) => (
        <button 
          key={subj} 
          className={`px-[15px] md:px-[20px] cursor-pointer text-[12px] md:text-[14px] flex items-center border-none transition-colors flex-shrink-0
            ${currentActive === subj 
              ? 'bg-white text-primary-blue font-bold' 
              : 'bg-[#3e5871] text-white hover:bg-[#4a6b8a]'}`}
          onClick={() => onSubjectChange(subj)}
        >
          {subj}
        </button>
      ))}
    </nav>
  );
};
