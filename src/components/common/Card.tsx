import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  icon: LucideIcon;
  title: string;
  content: string;
}

const Card = ({ icon: Icon, title, content }: CardProps) => {
  return (
    <div className="p-8 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
      <Icon className="w-12 h-12 text-blue-400 mb-6" />
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-400">{content}</p>
    </div>
  );
};

export default Card;