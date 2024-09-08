import React from 'react';
import CallWidget from '../components/CallWidget';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">About Us</h2>
      <p className="mb-4">
        Gadget Service is committed to providing high-quality repair and maintenance services for your gadgets and household appliances. Our team of experienced professionals is dedicated to ensuring that your devices are in top working condition.
      </p>
      <p>
        Our mission is to deliver exceptional service with a focus on customer satisfaction. We use the latest technology and techniques to ensure the best results.
      </p>
      <CallWidget />
    </div>
  );
};

export default AboutUs;
