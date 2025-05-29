import React from 'react';
import { TeamMember as TeamMemberType } from '../../types';
import Image from '../common/Image';

const TeamMember = ({ name, role, image, bio }: TeamMemberType) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/5 p-6 transition-all hover:bg-white/10">
      <div className="aspect-square overflow-hidden rounded-lg mb-4">
        <Image
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-blue-400 mb-4">{role}</p>
      <p className="text-gray-400 text-sm">{bio}</p>
    </div>
  );
};

export default TeamMember;