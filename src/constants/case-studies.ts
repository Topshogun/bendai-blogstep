import { CaseStudy } from '../types/case-study';

export const CASE_STUDIES: CaseStudy[] = [
  {
    industry: 'E-commerce',
    challenge: 'Manual customer support causing 4+ hour response times and lost sales',
    solution: 'Implemented AI-powered chatbot with natural language processing and integration with inventory system',
    results: [
      { label: 'Response Time Reduction', value: '65%' },
      { label: 'Sales Conversion Increase', value: '28%' },
      { label: 'Additional Revenue', value: '$2.1M' }
    ],
    quote: 'The AI solution paid for itself within 3 months through increased sales alone.'
  },
  {
    industry: 'Healthcare',
    challenge: 'Inefficient patient scheduling leading to 40% no-show rate',
    solution: 'Deployed smart scheduling system with predictive analytics and automated reminders',
    results: [
      { label: 'No-show Rate Reduction', value: '15%' },
      { label: 'Patient Satisfaction', value: '89%' },
      { label: 'Annual Savings', value: '$800K' }
    ],
    quote: 'Patient satisfaction scores have never been higher. The system practically pays for itself.'
  },
  {
    industry: 'Manufacturing',
    challenge: 'Quality control issues resulting in 12% defect rate',
    solution: 'Implemented computer vision AI for real-time quality inspection',
    results: [
      { label: 'Defect Rate Reduction', value: '0.5%' },
      { label: 'Labor Cost Savings', value: '37%' },
      { label: 'Inspection Accuracy', value: '99.9%' }
    ],
    quote: 'The ROI exceeded our expectations. We\'re now expanding the system to other facilities.'
  }
];