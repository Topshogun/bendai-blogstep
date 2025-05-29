export interface CaseStudyResult {
  label: string;
  value: string;
}

export interface CaseStudy {
  industry: string;
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  quote: string;
}