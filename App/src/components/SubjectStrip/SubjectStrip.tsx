interface SubjectStripProps {
  subjects: string[];
  currentActive: string;
  onSubjectChange: (subj: string) => void;
}

export const SubjectStrip = ({ subjects, currentActive, onSubjectChange }: SubjectStripProps) => {
  return (
    <nav className="h-[40px] bg-primary-blue flex gap-[2px] px-[10px]">
      {subjects.map((subj) => (
        <button 
          key={subj} 
          className={`px-[20px] cursor-pointer text-[14px] flex items-center border-none transition-colors
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
