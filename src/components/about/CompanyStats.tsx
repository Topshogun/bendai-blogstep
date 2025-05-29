import React from 'react';
import { StatItem } from '../../types';
import StatCounter from './StatCounter';
import SectionHeader from '../common/SectionHeader';

interface CompanyStatsProps {
  stats: StatItem[];
}

const CompanyStats = ({ stats }: CompanyStatsProps) => {
  return (
    <section className="py-16 bg-white/5 rounded-2xl">
      <SectionHeader
        title="Our Impact"
        subtitle="The numbers that drive our success"
        centered
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 px-8">
        {stats.map((stat) => (
          <StatCounter key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default CompanyStats;