import React from 'react';
import ContactForm from '../components/ContactForm';
import CallWidget from '../components/CallWidget';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <ContactForm />
      <CallWidget />
    </div>
  );
};

export default Contact;
