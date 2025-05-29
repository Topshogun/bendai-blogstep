import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        className="w-full py-6 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold">{question}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className="pb-6 text-gray-400">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          <FAQItem
            question="How can AI help my business?"
            answer="AI can automate repetitive tasks, provide 24/7 customer support, analyze data for insights, and streamline operations - all leading to increased efficiency and reduced costs."
          />
          <FAQItem
            question="What makes Bendai different from other agencies?"
            answer="We combine deep AI expertise with a results-driven approach, delivering customized solutions that directly impact your bottom line. Our focus is on practical, measurable outcomes."
          />
          <FAQItem
            question="Do you work with small businesses or enterprises?"
            answer="We work with businesses of all sizes, tailoring our solutions to match your specific needs and scale. Our flexible approach ensures value regardless of your company size."
          />
        </div>
      </div>
    </section>
  );
};

export default FAQ;