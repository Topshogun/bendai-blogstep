import React from 'react';
import PageLayout from '../layouts/PageLayout';

const PrivacyPage = () => {
  return (
    <PageLayout
      title="Privacy Policy"
      description="Our commitment to protecting your privacy"
      currentPath="/privacy"
    >
      <div className="prose prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Information Collection and Use</h2>
          <p className="text-gray-300 mb-4">
            We collect information to provide better services to our users and improve our AI automation solutions.
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Personal information provided during account creation</li>
            <li>Usage data to improve our services</li>
            <li>Technical data for service optimization</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Data Protection</h2>
          <p className="text-gray-300 mb-4">
            We implement robust security measures to protect your information:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>End-to-end encryption for sensitive data</li>
            <li>Regular security audits and updates</li>
            <li>Strict access controls and monitoring</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Cookie Policy</h2>
          <p className="text-gray-300">
            We use cookies to enhance your experience and analyze our traffic. By using our website,
            you consent to our use of cookies in accordance with our privacy policy.
          </p>
        </section>
      </div>
    </PageLayout>
  );
};

export default PrivacyPage;