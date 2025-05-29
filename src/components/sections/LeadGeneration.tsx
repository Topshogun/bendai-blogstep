import React from 'react';
import { Clock, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import RevealOnScroll from '../ui/RevealOnScroll';

const BenefitPoint = ({ text }: { text: string }) => (
  <div className="flex items-center space-x-2">
    <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" />
    <span className="text-gray-300">{text}</span>
  </div>
);

const LeadGeneration = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent to-purple-900/20">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Transform Your Business with AI
            </h2>
            <p className="text-xl text-gray-300">
              Book your free 30-minute AI Strategy Session ($500 value)
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-12">
          <RevealOnScroll>
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-yellow-400">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Limited Availability</span>
              </div>
              <p className="text-sm text-gray-400">
                Only 5 consultation slots available this week
              </p>

              <div className="space-y-4">
                <BenefitPoint text="Discover how AI can cut operational costs by 30%+" />
                <BenefitPoint text="Get a customized AI implementation roadmap" />
                <BenefitPoint text="Learn about quick-win automation opportunities" />
                <BenefitPoint text="Receive a free ROI calculation" />
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-sm text-gray-300">
                  "The strategy session helped us identify $1.2M in potential savings through AI automation."
                  <br />
                  <span className="text-gray-400 mt-2 block">
                    - Mark Thompson, COO
                  </span>
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Work Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Industry
                </label>
                <select className="w-full px-4 py-3 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select your industry</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="finance">Finance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Challenge
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Describe your current business challenge..."
                />
              </div>

              <Button variant="primary" className="w-full">
                Book Your Free Strategy Session
                <ArrowRight size={16} />
              </Button>

              <p className="text-xs text-gray-400 text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default LeadGeneration;