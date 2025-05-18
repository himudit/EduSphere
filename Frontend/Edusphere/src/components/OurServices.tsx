import React from 'react';
import { Book, LayoutDashboard, FolderOpen, Shield } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-[#0D0A19] border border-[#1A1A2E]/20 rounded-3xl p-6 flex flex-col items-start">
      <div className="bg-[#FFDBD4] rounded-full p-3 mb-4">
        <div className="text-[#0D0A19]">{icon}</div>
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
};

const OurServices = () => {
  const services = [
    {
      icon: <Book size={24} />,
      title: "Curated Online Courses",
      description: "Gain access to high-quality, expert-led courses designed to help you master new skills at your own pace."
    },
    {
      icon: <LayoutDashboard size={24} />,
      title: "Personalized Student Dashboard",
      description: "Track your learning journey with a clean dashboard showing your progress, purchased courses, and achievements."
    },
    {
      icon: <FolderOpen size={24} />,
      title: "Teacher-Friendly Content Management",
      description: "Instructors can easily upload and manage lectures, materials, and assessments with an intuitive interface."
    },
    {
      icon: <Shield size={24} />,
      title: "Secure Login & Access Control",
      description: "Each student and teacher is provided with secure, role-based access—ensuring privacy and personalized learning."
    }
  ];

  return (
    <div className="w-full py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Service Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          {/* <div className="inline-flex items-center justify-center mb-4 px-6 py-2 rounded-full border border-[#433b6b] bg-[#0D0A19]/80">
            <span className="text-sm md:text-base text-[#9b87f5] font-medium flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                  fill="#9b87f5" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Our Services
            </span>
          </div> */}
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Your Success Story Begins <span className="text-[#9b87f5]">With Edusphere</span>
          </h2>
          
          <p className="text-sm md:text-base text-gray-300 max-w-3xl">
            We provide innovative learning solutions designed to empower educators and students alike with cutting-edge tools and resources for academic success.
          </p>
        </div>
        
        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
