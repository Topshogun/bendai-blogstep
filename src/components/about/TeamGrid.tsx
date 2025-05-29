import React from 'react';
import TeamMember from './TeamMember';
import SectionHeader from '../common/SectionHeader';
import { TeamMember as TeamMemberType } from '../../types';

interface TeamGridProps {
  members: TeamMemberType[];
}

const TeamGrid = ({ members }: TeamGridProps) => {
  return (
    <section className="py-16">
      <SectionHeader
        title="Our Team"
        subtitle="Meet the experts behind our AI innovations"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {members.map((member) => (
          <TeamMember key={member.name} {...member} />
        ))}
      </div>
    </section>
  );
};

export default TeamGrid;