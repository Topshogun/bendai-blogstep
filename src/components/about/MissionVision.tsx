import React from 'react';
import { Target, Lightbulb } from 'lucide-react';
import Card from '../common/Card';
import SectionHeader from '../common/SectionHeader';

const MissionVision = () => {
  return (
    <section className="py-16">
      <SectionHeader
        title="Our Mission & Vision"
        subtitle="Driving innovation through AI automation"
      />
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <Card
          icon={Target}
          title="Our Mission"
          content="To empower businesses with intelligent automation solutions that drive growth and efficiency in the digital age."
        />
        <Card
          icon={Lightbulb}
          title="Our Vision"
          content="To be the global leader in AI-driven business transformation, setting new standards for innovation and excellence."
        />
      </div>
    </section>
  );
};

export default MissionVision;