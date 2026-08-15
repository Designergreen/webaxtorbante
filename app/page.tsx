'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import AiAssessment from '@/components/AiAssessment';
import Resources from '@/components/Resources';
import Testimonials from '@/components/Testimonials';
import FinalCta from '@/components/FinalCta';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';

export default function HomePage() {
  const [selectedService, setSelectedService] = useState('');
  const [prefilledMessage, setPrefilledMessage] = useState('');

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
  };

  const handleApplyDiagnosis = (msg: string, serviceTitle: string) => {
    setPrefilledMessage(msg);
    setSelectedService(serviceTitle);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <About />
        <Services onSelectService={handleSelectService} />
        <AiAssessment onApplyToForm={handleApplyDiagnosis} />
        <Resources />
        <Testimonials />
        <FinalCta />
        <ContactForm
          initialService={selectedService}
          initialMessage={prefilledMessage}
        />
      </main>

      <Footer />
      <AuthModal />
    </div>
  );
}
