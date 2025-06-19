import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../ui/Button';
import { supabase } from '../../lib/supabase';

const WEBHOOK_URL = 'https://hook.eu2.make.com/yqp7zraswa4467le1sjvgnseowhy69jh';

const ConsultationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service_area: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const triggerWebhook = async (data: typeof formData) => {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: 'website_consultation_form'
        })
      });

      if (!response.ok) {
        throw new Error('Webhook request failed');
      }
    } catch (error) {
      console.error('Error triggering webhook:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const { error: supabaseError } = await supabase
        .from('consultations')
        .insert([formData]);

      if (supabaseError) throw supabaseError;

      await triggerWebhook(formData);

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        service_area: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('There was an error submitting your request. Please try again.');
    }
  };

  const handleReturnHome = () => {
    console.log('Return Home button clicked'); // Debug log
    navigate('/');
  };

  return (
    <section id="consultation-form" className="py-24 px-4 bg-gradient-to-b from-transparent to-purple-900/20 scroll-mt-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Get Your Free AI Automation Consultation
        </h2>
        
        <p className="text-xl text-gray-300 mb-12">
          Book a 15-minute session to discover how AI can accelerate your business growth.
        </p>
        
        {status === 'success' ? (
          <div className="space-y-8">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-green-400">
              <h3 className="text-xl font-bold mb-2">Thank You!</h3>
              <p>Your consultation request has been submitted successfully. We'll contact you shortly.</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleReturnHome}
                className="group transform hover:scale-105 transition-all duration-300 inline-flex items-center bg-white text-black px-8 py-4 font-semibold rounded-lg hover:bg-gray-200 active:bg-gray-300 cursor-pointer z-50 relative"
                style={{ pointerEvents: 'auto' }}
              >
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="ml-2">Return Home</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-6 py-4 bg-gray-800 border-2 border-blue-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-6 py-4 bg-gray-800 border-2 border-blue-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300"
              required
            />
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full px-6 py-4 bg-gray-800 border-2 border-blue-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300"
            />
            <select
              name="service_area"
              value={formData.service_area}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-800 border-2 border-blue-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300"
              required
            >
              <option value="" className="text-gray-400">Service Details - Select Your Area of Interest</option>
              <option value="customer-support" className="text-white">AI Customer Support</option>
              <option value="crm" className="text-white">CRM Integration</option>
              <option value="website" className="text-white">Custom Website & AI Agents</option>
              <option value="scheduling" className="text-white">Appointment Scheduling</option>
              <option value="other" className="text-white">Other Services</option>
            </select>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help streamline your business operations?"
              rows={4}
              className="w-full px-6 py-4 bg-gray-800 border-2 border-blue-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 resize-vertical"
              required
            />
            
            {status === 'error' && (
              <div className="text-red-400 text-sm text-left">
                {errorMessage}
              </div>
            )}

            <Button 
              variant="primary"
              type="submit"
              className="w-full"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Consultation Request'}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ConsultationForm;