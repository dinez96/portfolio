import React, { useEffect, useRef, useState, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Code2, Star, Microscope, Building2, Users, Brain, Key, CalendarDays } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// MEMOIZED for performance
const FloatingOrb = memo(({ color, position }) => {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
});

const Project = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const featuredRef = useRef(null);
  const projectsRef = useRef([]);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.config({ limitCallbacks: true });

      // Title: Appears faster
      gsap.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 95%", // Starts as soon as it enters
            toggleActions: "play none none reverse",
          }
        }
      );

      // Live Projects Container
      gsap.fromTo(featuredRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // INDIVIDUAL CARDS: Fixed the "slow" feeling
      projectsRef.current.forEach((project, index) => {
        if (project) {
          gsap.fromTo(project,
            { y: 50, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.4, // Faster duration
              ease: "back.out(1.2)", // Adds a snappy "pop"
              scrollTrigger: {
                trigger: project,
                start: "top 95%", // Trigger earlier (lower on screen)
                toggleActions: "play none none reverse",
                fastScrollEnd: true,
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredProjects = [
    {
      title: 'Benny Events',
      category: 'Event Management Platform',
      description: 'Complete event management and booking platform with real-time availability, payment integration, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Socket.io'],
      liveUrl: 'https://benny-events.vercel.app/',
      color: 'from-blue-600 to-cyan-600',
      icon: CalendarDays,
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      title: 'Neo Diagnostic Lab',
      category: 'Healthcare Platform',
      description: 'Comprehensive diagnostic lab management system with online test booking, report viewing, and patient management.',
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1000',
      tags: ['React', 'Firebase', 'Tailwind CSS', 'Redux', 'PDF Generation'],
      liveUrl: 'https://neo-lab-1711.web.app/',
      color: 'from-purple-600 to-pink-600',
      icon: Microscope,
      gradient: 'from-purple-500/20 to-pink-500/20'
    }
  ];

  const additionalProjects = [
    {
      title: 'Hotel Booking Platform',
      category: 'Full Stack Application',
      description: 'Modern hotel booking platform with real-time availability, room management, secure payments, and review system.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind', 'Stripe'],
      liveUrl: '#',
      color: 'from-amber-600 to-orange-600',
      icon: Building2,
      gradient: 'from-amber-500/20 to-orange-500/20'
    },
    {
      title: 'Payroll Management System',
      category: 'Enterprise Solution',
      description: 'Comprehensive payroll system with automated calculations, tax management, payslip generation, and employee dashboard.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
      liveUrl: '#',
      color: 'from-emerald-600 to-teal-600',
      icon: Users,
      gradient: 'from-emerald-500/20 to-teal-500/20'
    },
    {
      title: 'AI-Powered Task Assistant',
      category: 'AI Application',
      description: 'Smart task management app with AI-powered suggestions, natural language processing, and predictive analytics.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'OpenAI', 'TensorFlow.js', 'Express', 'MongoDB'],
      liveUrl: '#',
      color: 'from-violet-600 to-purple-600',
      icon: Brain,
      gradient: 'from-violet-500/20 to-purple-500/20'
    },
    {
      title: 'Car Rental Marketplace',
      category: 'Full Stack Platform',
      description: 'Peer-to-peer car rental platform with vehicle tracking, booking system, payment processing, and user reviews.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind'],
      liveUrl: '#',
      color: 'from-blue-600 to-indigo-600',
      icon: Key,
      gradient: 'from-blue-500/20 to-indigo-500/20'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full pt-12 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0 opacity-20 sm:opacity-30 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10] }} gl={{ antialias: false, powerPreference: "high-performance" }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} />
          <FloatingOrb color="#3b82f6" position={[-4, 2, -5]} />
          <FloatingOrb color="#8b5cf6" position={[4, -1, -5]} />
          <FloatingOrb color="#ec4899" position={[0, 3, -8]} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-black via-black/95 to-black z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-2 sm:mb-3 md:mb-4 px-2">
            Featured{' '}
            <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold">
              Projects
            </span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto" />
          <p className="text-gray-400 mt-3 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-4">
            Showcasing my latest work in web development and design
          </p>
        </div>

        <div ref={featuredRef} className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center space-x-2 mb-4 sm:mb-6 md:mb-8 px-2">
            <div className="p-1.5 sm:p-2 bg-yellow-500/10 rounded-lg">
              <Star className="text-yellow-500 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white">Live Projects</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {featuredProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white/10 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-transparent hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] will-change-transform"
                >
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 will-change-transform"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-linear-to-t ${project.gradient} opacity-90`} />
                    
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-3 py-1 sm:py-1.5 bg-green-500/80 rounded-full text-[10px] sm:text-xs text-white font-medium flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      <span>Live</span>
                    </div>

                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-linear-to-r ${project.color} rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />
                        <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/50  rounded-full flex items-center justify-center border border-white/20">
                          <Icon className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-400 mb-2 font-medium">{project.category}</p>
                    <p className="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-6">
                      {project.tags.slice(0, 4).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] sm:text-xs text-gray-300 border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-center">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg text-white text-xs sm:text-sm font-medium hover:scale-105 transition-transform duration-300 group"
                      >
                        <span>View Live Project</span>
                        <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-4 sm:mb-6 md:mb-8 px-2">
            <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-lg">
              <Code2 className="text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white">More Projects</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {additionalProjects.map((project, index) => {
              const Icon = project.icon;
              const isHovered = hoveredIndex === index;
              
              return (
                <div
                  key={index}
                  ref={el => projectsRef.current[index] = el}
                  className="group relative bg-white/5 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 will-change-transform"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 will-change-transform"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-linear-to-t ${project.gradient} opacity-80`} />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/60  rounded-full text-[10px] text-white border border-white/10">
                      {project.category}
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-linear-to-r ${project.color} rounded-full  opacity-50 group-hover:opacity-100 transition-opacity`} />
                        <div className="relative w-8 h-8 bg-black/50  rounded-full flex items-center justify-center border border-white/20">
                          <Icon size={14} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-1.5 py-0.5 bg-white/5 rounded-full text-[10px] text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <a
                        href={project.liveUrl}
                        className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-[10px] sm:text-xs font-medium transition-all duration-300"
                      >
                        <span>View Project</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-blue-500/5 to-purple-500/5" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;