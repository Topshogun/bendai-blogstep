import React from 'react';
import { ProcessStep } from '../../types';
import TimelineStep from './TimelineStep';
import SectionHeader from '../common/SectionHeader';

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

const ProcessTimeline = ({ steps }: ProcessTimelineProps) => {
  return (
    <section className="py-16">
      <SectionHeader
        title="Our Process"
        subtitle="How we implement AI solutions"
        centered
      />
      <div className="relative mt-12">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-white/10" />
        <div className="space-y-12">
          {steps.map((step, index) => (
            <TimelineStep
              key={step.title}
              {...step}
              index={index + 1}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;