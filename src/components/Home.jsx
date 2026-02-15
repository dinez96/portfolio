import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import gsap from "gsap";
import {
  Code2,
  Palette,
  ArrowRight,
  Sparkles,
  Cpu,
  Globe,
  Zap,
  Figma,
  Github,
  Terminal,
  Braces,
  Hash,
  Database,
  Cloud,
  GitBranch,
  Coffee,
  Layers,
} from "lucide-react";
import heroImage from "../assets/hero.png";

const Home = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const ANIMATION_DURATION = 25;

  useEffect(() => {
    // Check for mobile to optimize performance
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "expo.out",
          force3D: true, // Hardware acceleration
        },
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const orbit1 = [
    { Icon: Code2, color: "#61DAFB" },
    { Icon: Terminal, color: "#FFFFFF" },
    { Icon: Cloud, color: "#FFCA28" },
    { Icon: Database, color: "#00758F" },
    { Icon: Database, color: "#47A248" },
    { Icon: Braces, color: "#3776AB" },
    { Icon: Coffee, color: "#ED8B00" },
    { Icon: Layers, color: "#A855F7" },
  ];

  const orbit2 = [
    { Icon: Globe, color: "#FFFFFF" },
    { Icon: Cpu, color: "#68A063" },
    { Icon: Hash, color: "#3178C6" },
    { Icon: Sparkles, color: "#06B6D4" },
    { Icon: Figma, color: "#F24E1E" },
    { Icon: GitBranch, color: "#F05032" },
    { Icon: Github, color: "#FFFFFF" },
    { Icon: Terminal, color: "#4D4D4D" },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      /* Changed pt-12 to pt-24 to prevent Navbar overlap on mobile */
      className="relative w-full pt-12 pb-12 bg-[#030303] overflow-hidden flex items-center justify-center"
    >
      {/* Optimized Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 1] }}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          dpr={[1, 1.5]} // Limits resolution on high-end mobile screens to save GPU
        >
          <Stars
            radius={100}
            depth={50}
            count={isMobile ? 600 : 1500} // Fewer stars on mobile
            factor={6}
            saturation={0}
            fade
            speed={0.5}
          />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-[#030303] z-5" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
        <div
          ref={contentRef}
          className="text-center lg:text-left order-2 lg:order-1 space-y-5 lg:space-y-7 max-w-lg mx-auto lg:mx-0"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mx-auto lg:mx-0">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-gray-400">
              Available for Freelance
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            <span className="inline-block bg-linear-to-br from-white via-white/80 to-blue-500 bg-clip-text text-transparent">
              DINESH
            </span>
          </h1>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <div className="flex items-center space-x-2.5 px-4 py-1.5 bg-blue-500/5 rounded-full border border-blue-500/10">
              <Code2 size={16} className="text-blue-400" />
              <span className="text-gray-300 text-sm font-medium">
                Developer
              </span>
            </div>
            <span className="text-gray-600 font-bold">+</span>
            <div className="flex items-center space-x-2.5 px-4 py-1.5 bg-purple-500/5 rounded-full border border-purple-500/10">
              <Palette size={16} className="text-purple-400" />
              <span className="text-gray-300 text-sm font-medium">
                Designer
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed max-w-sm mx-auto lg:mx-0">
            Crafting digital experiences through high-performance code and
            strategic design architecture.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
            <a
              href="#projects"
              className="px-8 py-3.5 bg-white text-black rounded-full text-xs font-bold flex items-center space-x-2 hover:scale-105 active:scale-95 transition-all"
            >
              <span>EXPLORE WORK</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Orbit Section */}
        <div className="relative flex items-center justify-center order-1 lg:order-2 h-80 sm:h-112.5 lg:h-full select-none">
          <div className="relative w-full h-full flex items-center justify-center stage-container">
            {/* Outer Ring */}
            <div className="absolute orbit-ring ring-outer">
              {orbit1.map((tool, i) => (
                <div
                  key={i}
                  className="tool-positioner"
                  style={{
                    animationDelay: `-${(ANIMATION_DURATION / orbit1.length) * i}s`,
                    "--dist": "var(--outer-dist)",
                  }}
                >
                  <div className="tool-card card-outer">
                    <tool.Icon className="tool-icon" color={tool.color} />
                  </div>
                </div>
              ))}
            </div>

            {/* Inner Ring */}
            <div className="absolute orbit-ring ring-inner">
              {orbit2.map((tool, i) => (
                <div
                  key={i}
                  className="tool-positioner"
                  style={{
                    animationDelay: `-${(ANIMATION_DURATION / orbit2.length) * i}s`,
                    "--dist": "var(--inner-dist)",
                    animationDirection: "reverse",
                  }}
                >
                  <div className="tool-card card-inner">
                    <tool.Icon className="tool-icon" color={tool.color} />
                  </div>
                </div>
              ))}
            </div>

            {/* Image Wrapper */}
            <div className="relative z-20 hero-wrapper flex items-center justify-center">
              <img
                src={heroImage}
                alt="Dinesh"
                className="w-auto h-64 sm:h-100 lg:h-[60vh] max-h-200 object-contain filter drop-shadow-[0_0_50px_rgba(59,130,246,0.2)]"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --outer-dist: 280px;
          --inner-dist: 180px;
        }

        .stage-container { 
          perspective: 1200px; 
          transform-style: preserve-3d;
          width: 100%;
          height: 100%;
        }
        
        .hero-wrapper { 
          transform: translate3d(0,0,50px); 
          pointer-events: none;
        }

        .orbit-ring { 
          position: absolute; 
          inset: 0;
          transform-style: preserve-3d; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          pointer-events: none;
        }

        .ring-outer { transform: rotateX(65deg) rotateY(-15deg); }
        .ring-inner { transform: rotateX(70deg) rotateY(20deg); }

        .tool-positioner {
          position: absolute;
          transform-style: preserve-3d;
          animation: orbit-rotation ${ANIMATION_DURATION}s linear infinite;
          will-change: transform;
        }

        @keyframes orbit-rotation {
          from { transform: rotateZ(0deg) translateX(var(--dist)) rotateZ(0deg); }
          to { transform: rotateZ(360deg) translateX(var(--dist)) rotateZ(-360deg); }
        }

        .tool-card {
          background: rgba(15, 15, 15, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          /* Optimization: Backdrop blur is only for desktop */
        }

        @media (min-width: 1024px) {
          .tool-card {
             backdrop-filter: blur(8px);
          }
        }

        .tool-icon {
          width: 20px;
          height: 20px;
        }

        .card-outer { transform: rotateX(-65deg) rotateY(15deg); }
        .card-inner { transform: rotateX(-70deg) rotateY(-20deg); }

        @media (max-width: 1024px) {
          :root {
            --outer-dist: 200px; 
            --inner-dist: 120px;
          }
        }

        @media (max-width: 767px) {
          :root {
            --outer-dist: 140px; 
            --inner-dist: 90px;
          }
          .tool-card {
            width: 36px; 
            height: 36px;
            background: rgba(10, 10, 10, 0.95); /* More solid for mobile performance */
          }
          .tool-icon {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default Home;
