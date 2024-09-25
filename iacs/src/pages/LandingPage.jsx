import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Mic, FileText, BarChart2, Brain, Hand, Users } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

const Header = () => (
  <header className="bg-white shadow-sm">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.svg" alt="EduAdapt Logo" className="h-8 w-auto" />
          <span className="ml-2 text-xl font-bold text-gray-900">EduAdapt</span>
        </div>
        <div className="hidden md:flex space-x-8">
          {['Features', 'How It Works', 'Testimonials', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-600 hover:text-gray-900">
              {item}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline">Log In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </nav>
  </header>
);

const HeroSection = () => (
  <section className="bg-gray-50 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl font-bold mb-6">Inclusive Education Reimagined</h1>
      <p className="text-xl mb-8 max-w-3xl mx-auto">
        Empowering deaf and mute students with AI-driven learning in Gujarati and Indian Sign Language
      </p>
      <Button size="lg" className="text-lg px-8 py-4">Start Your Journey</Button>
    </div>
  </section>
);

const FeaturesSection = () => {
  const features = [
    { icon: <Hand />, title: "Sign Language Converter", description: "Real-time gesture recognition using advanced AI" },
    { icon: <Mic />, title: "Speech to Gujarati", description: "Instant speech recognition and translation" },
    { icon: <FileText />, title: "Interactive PDF Viewer", description: "Voice-controlled document navigation with AI narration" },
    { icon: <BarChart2 />, title: "Progress Tracking", description: "Detailed analytics and personalized learning paths" },
    { icon: <Brain />, title: "AI-Powered Learning", description: "Adaptive lessons tailored to individual needs" },
    { icon: <CheckCircle2 />, title: "Comprehensive Modules", description: "Full curriculum support in multiple subjects" },
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Cutting-Edge Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <span className="text-gray-600">{icon}</span>
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const HowItWorks = () => {
  const steps = [
    { title: "Sign Up", description: "Create your personalized account" },
    { title: "Choose Your Path", description: "Select subjects and set learning goals" },
    { title: "Learn Interactively", description: "Engage with AI-powered lessons" },
    { title: "Track Progress", description: "Monitor your growth with detailed analytics" },
  ];

  return (
    <section id="how-it-works" className="bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How EduAdapt Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-900">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const CallToAction = () => (
  <section className="bg-gray-900 text-white py-20 px-4">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
      <p className="text-xl mb-8">Join thousands of students, teachers, and parents in making education truly inclusive.</p>
      <Button size="lg" className="text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100">
        Start Your Free Trial
      </Button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-100 py-12 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">EduAdapt</h3>
        <p className="text-gray-600">Empowering inclusive education through technology.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Features</h3>
        <ul className="space-y-2 text-gray-600">
          <li>Sign Language Converter</li>
          <li>Speech to Gujarati</li>
          <li>Interactive PDF Viewer</li>
          <li>Progress Tracking</li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Resources</h3>
        <ul className="space-y-2 text-gray-600">
          <li>Blog</li>
          <li>Tutorials</li>
          <li>FAQs</li>
          <li>Support</li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact</h3>
        <p className="text-gray-600">info@eduadapt.com</p>
        <p className="text-gray-600">+91 1234567890</p>
      </div>
    </div>
    <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
      <p>&copy; 2024 EduAdapt. All rights reserved.</p>
    </div>
  </footer>
);

export default LandingPage;