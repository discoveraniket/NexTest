import { User } from 'lucide-react';

interface CandidateProfileProps {
  name: string;
  rollNo: string;
}

export const CandidateProfile = ({ name, rollNo }: CandidateProfileProps) => {
  return (
    <div className="p-[15px] border-b border-gray-100 flex items-center gap-3">
      <div className="w-[50px] h-[50px] bg-gray-100 rounded flex justify-center items-center">
        <User size={30} className="text-gray-400" />
      </div>
      <div>
        <div className="font-bold">{name}</div>
        <div className="text-[12px] text-gray-500">Roll No: {rollNo}</div>
      </div>
    </div>
  );
};
