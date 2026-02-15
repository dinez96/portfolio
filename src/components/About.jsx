import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Palette,
  Smartphone,
  Box,
  Zap,
  Server,
  Clock,
  Award,
  Users,
  Brain,
  Database,
  Rocket,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const RotatingCube = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#3b82f6" wireframe />
    </mesh>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const skillsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        contentRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        skillsRef.current?.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        statsRef.current?.children,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 50%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    { name: "React/Next.js", level: 90, icon: Code2 },
    { name: "Node.js / Express", level: 85, icon: Server },
    { name: "PostgreSQL / MongoDB", level: 82, icon: Database },
    { name: "Python / AI", level: 79, icon: Brain },
    { name: "GSAP/ Three.js", level: 80, icon: Box },
  ];

  const stats = [
    { value: "1.5+", label: "Years Experience", icon: Award },
    { value: "10+", label: "Projects Completed", icon: Rocket },
    { value: "4+", label: "Happy Clients", icon: Users },
    { value: "100%", label: "On-time Delivery", icon: Clock },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full pt-12 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0 opacity-20 md:opacity-30">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <RotatingCube />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-black via-black/95 to-black z-10 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-3 md:mb-4">
            About{" "}
            <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold">
              Me
            </span>
          </h2>
          <div className="w-20 md:w-24 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div ref={contentRef} className="space-y-5 md:space-y-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white">
              I'm Dinesh, <span className="text-blue-500">Web Developer</span> &{" "}
              <span className="text-purple-500">Designer</span>
            </h3>

            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              With over 1.5 years of experience building high-performance
              digital solutions, I unify complex architectural logic with
              creative execution. Having transitioned from a design background
              into full-stack development, I leverage a unique aesthetic
              sensitivity to build robust interfaces supported by efficient
              database systems like PostgreSQL and MongoDB.
            </p>

            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              I specialize in crafting scalable applications using React and
              Next.js, integrated with powerful backends in Node.js and Python.
              By combining intelligent AI-driven features with immersive 3D
              visuals through Three.js and GSAP, I focus on delivering
              data-rich, interactive experiences that stay clean, fast, and
              maintainable.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="flex items-center space-x-2 text-gray-300 bg-white/5 p-2 rounded-lg">
                <Code2 size={16} className="text-blue-500 shrink-0" />
                <span className="text-xs sm:text-sm">
                  Full Stack AI Developer
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 bg-white/5 p-2 rounded-lg">
                <Palette size={16} className="text-purple-500 shrink-0" />
                <span className="text-xs sm:text-sm">UI/UX Designer</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 bg-white/5 p-2 rounded-lg">
                <Smartphone size={16} className="text-green-500 shrink-0" />
                <span className="text-xs sm:text-sm">Responsive Design</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 bg-white/5 p-2 rounded-lg">
                <Zap size={16} className="text-yellow-500 shrink-0" />
                <span className="text-xs sm:text-sm">Performance</span>
              </div>
            </div>
          </div>

          <div ref={skillsRef} className="space-y-5 md:space-y-6 mt-6 lg:mt-0">
            <h3 className="text-xl md:text-2xl font-light text-white mb-4 md:mb-6">
              Technical Skills
            </h3>
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={index} className="space-y-1.5 md:space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon size={14} className="text-gray-400" />
                      <span className="text-gray-300 text-sm md:text-base">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-gray-400 text-xs md:text-sm">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-4 md:p-6 bg-linear-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 group hover:scale-105"
              >
                <Icon
                  className="mx-auto mb-2 md:mb-3 text-blue-500 group-hover:scale-110 transition-transform"
                  size={24}
                />
                <div className="text-xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -z-10" />
      </div>
    </section>
  );
};

export default About;
