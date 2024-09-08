import React from 'react';
import CallWidget from '../components/CallWidget';

const Home: React.FC = () => {
  return (
    <div>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Gadget Service</h2>
          <p className="text-lg mb-6">We provide top-notch service for gadgets and household appliances.</p>
          <button className="bg-primary text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
            Learn More
          </button>
        </div>
      </section>
      <CallWidget />
    </div>
  );
};

export default Home;
