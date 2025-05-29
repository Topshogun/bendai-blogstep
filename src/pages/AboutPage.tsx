import React from 'react';
import PageLayout from '../layouts/PageLayout';
import TeamGrid from '../components/about/TeamGrid';
import MissionVision from '../components/about/MissionVision';
import CompanyStats from '../components/about/CompanyStats';
import { COMPANY_STATS, TEAM_MEMBERS } from '../constants/about';

const AboutPage = () => {
  return (
    <PageLayout 
      title="About Us" 
      description="Leading the future of AI automation with innovation and expertise"
      currentPath="/about"
    >
      <MissionVision />
      <CompanyStats stats={COMPANY_STATS} />
      <TeamGrid members={TEAM_MEMBERS} />
    </PageLayout>
  );
};

export default AboutPage;