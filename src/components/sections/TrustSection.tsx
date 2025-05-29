import React from 'react';
import { Award, BarChart2, Cpu } from 'lucide-react';
import RevealOnScroll from '../ui/RevealOnScroll';

const Differentiator = ({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center text-center p-8 bg-white/5 rounded-2xl backdrop-blur-sm">
    <Icon className="w-12 h-12 text-blue-400 mb-6" />
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const Testimonial = ({ image, name, position, quote }: {
  image: string;
  name: string;
  position: string;
  quote: string;
}) => (
  <div className="flex flex-col items-center p-6 bg-white/5 rounded-xl">
    <img
      src={image}
      alt={name}
      className="w-20 h-20 rounded-full mb-4 object-cover"
    />
    <p className="text-gray-300 italic mb-4">"{quote}"</p>
    <strong className="font-semibold">{name}</strong>
    <span className="text-sm text-gray-400">{position}</span>
  </div>
);

const TrustSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Industry Leaders Trust Bendai
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <RevealOnScroll>
            <Differentiator
              icon={Award}
              title="Proven Enterprise Expertise"
              description="15+ years of combined experience delivering AI solutions to Fortune 500 companies"
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <Differentiator
              icon={BarChart2}
              title="Data-Driven Results"
              description="Average 40% efficiency gains across our client implementations"
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <Differentiator
              icon={Cpu}
              title="Custom AI Solutions"
              description="Tailored AI implementations specific to your industry and needs"
            />
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <RevealOnScroll>
            <Testimonial
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
              name="Michael Chen"
              position="CTO, TechCorp Global"
              quote="Bendai's AI solutions helped us reduce customer response time by 65% while improving satisfaction scores."
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <Testimonial
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
              name="Sarah Johnson"
              position="Head of Operations, InnovateCo"
              quote="The ROI we've seen from Bendai's automation solutions has exceeded our expectations by 3x."
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <Testimonial
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
              name="David Williams"
              position="CEO, FutureScale Inc"
              quote="Working with Bendai transformed our business processes. We're now 40% more efficient."
            />
          </RevealOnScroll>
        </div>

        <div className="relative overflow-hidden py-10">
          <div className="flex animate-scroll">
            {/* Client logos - duplicated for infinite scroll effect */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex space-x-16 whitespace-nowrap">
                <img src="https://via.placeholder.com/120x40" alt="Client 1" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
                <img src="https://via.placeholder.com/120x40" alt="Client 2" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
                <img src="https://via.placeholder.com/120x40" alt="Client 3" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
                <img src="https://via.placeholder.com/120x40" alt="Client 4" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
                <img src="https://via.placeholder.com/120x40" alt="Client 5" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;