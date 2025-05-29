import React from 'react';
import PageLayout from '../layouts/PageLayout';

const TermsPage = () => {
  return (
    <PageLayout
      title="Terms of Service"
      description="Terms and conditions for using our services"
      currentPath="/terms"
    >
      <div className="prose prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Service Agreement</h2>
          <p className="text-gray-300 mb-4">
            By accessing and using our services, you agree to be bound by these terms and conditions.
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Acceptable use of our AI automation services</li>
            <li>Account responsibilities and security</li>
            <li>Service limitations and availability</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Intellectual Property</h2>
          <p className="text-gray-300 mb-4">
            All content and technology provided through our services remain our exclusive property:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Copyright protection of all materials</li>
            <li>Trademark and brand usage guidelines</li>
            <li>License restrictions and limitations</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Liability and Warranties</h2>
          <p className="text-gray-300">
            Our services are provided "as is" without any warranties, express or implied.
            We shall not be liable for any damages arising from the use of our services.
          </p>
        </section>
      </div>
    </PageLayout>
  );
};

export default TermsPage;