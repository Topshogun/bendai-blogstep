import { Service, ProcessStep } from '../types';
import { Bot, Brain, Cpu, Database } from 'lucide-react';

export const SERVICES_LIST: Service[] = [
  {
    title: 'AI Customer Support',
    description: '24/7 intelligent support solutions powered by advanced AI.',
    icon: Bot,
    features: [
      'Natural Language Processing',
      'Multi-language Support',
      'Sentiment Analysis',
      'Automated Response System'
    ]
  },
  {
    title: 'Data Analytics',
    description: 'Transform your data into actionable insights.',
    icon: Brain,
    features: [
      'Predictive Analytics',
      'Real-time Monitoring',
      'Custom Dashboards',
      'Performance Metrics'
    ]
  },
  {
    title: 'Process Automation',
    description: 'Streamline operations with intelligent automation.',
    icon: Cpu,
    features: [
      'Workflow Optimization',
      'Task Automation',
      'Integration Services',
      'Performance Tracking'
    ]
  },
  {
    title: 'Data Management',
    description: 'Secure and efficient data handling solutions.',
    icon: Database,
    features: [
      'Data Security',
      'Cloud Storage',
      'Backup Solutions',
      'Access Control'
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: 'Discovery',
    description: 'Understanding your business needs and objectives.',
    duration: '1-2 weeks'
  },
  {
    title: 'Planning',
    description: 'Developing a tailored implementation strategy.',
    duration: '2-3 weeks'
  },
  {
    title: 'Implementation',
    description: 'Executing the solution with continuous feedback.',
    duration: '4-8 weeks'
  },
  {
    title: 'Optimization',
    description: 'Fine-tuning and improving performance.',
    duration: '2-4 weeks'
  }
];