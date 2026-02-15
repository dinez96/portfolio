import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  Send,
  Github,
  Linkedin,
  MessageCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactSphere = () => {
  const sphereRef = useRef();

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]} scale={2}>
      <MeshDistortMaterial
        color="#3b82f6"
        emissive="#1e3a8a"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
        formRef.current,
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
        infoRef.current,
        { x: 50, opacity: 0 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Optimized payload for Web3Forms
    const formDataObj = {
      access_key: "d3c61c0b-8ae8-445a-a644-2b3ecd240e9f",
      name: formData.name,
      email: formData.email,
      message: formData.message,
      subject: `New Portfolio Message from ${formData.name}`,
      from_name: "My Portfolio Bot"
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formDataObj),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 4000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "dinesh4693@gmail.com",
      href: "mailto:dinesh4693@gmail.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 70943 14348",
      href: "tel:+917094314348",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/dinez96",
      label: "GitHub",
      color: "hover:bg-gray-700",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/dineshw96/",
      label: "LinkedIn",
      color: "hover:bg-blue-600",
    },
    {
      icon: Mail,
      href: "https://twitter.com/dinesh4693",
      label: "Twitter",
      color: "hover:bg-blue-400",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-12 overflow-hidden bg-black scroll-mt-20"
    >
      <div className="absolute inset-0 z-0 opacity-30 md:opacity-50">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <ContactSphere />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-black via-black/90 to-black z-10 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-3 md:mb-4">
            Let's{" "}
            <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold">
              Connect
            </span>
          </h2>
          <div className="w-20 md:w-24 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Available for freelance work and collaboration worldwide
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          <div ref={formRef} className="w-full">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 h-full">
              <h3 className="text-xl md:text-2xl font-light text-white mb-6 flex items-center">
                <MessageCircle className="mr-2 text-blue-500" size={24} />
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-light text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500/50 transition-colors text-white"
                    placeholder=""
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-light text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500/50 transition-colors text-white"
                    placeholder=""
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-light text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500/50 transition-colors text-white resize-none"
                    placeholder="I'd love to hear your ideas! Drop a message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg font-light tracking-wide transition-all duration-300 overflow-hidden hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-white/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                </button>

                {submitStatus === "success" && (
                  <div className="text-center text-green-500 text-sm animate-fade-in bg-green-500/10 py-3 rounded-lg">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
          </div>

          <div ref={infoRef} className="w-full">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 h-full">
              <h3 className="text-xl md:text-2xl font-light text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 bg-black/30 rounded-xl border border-white/5 hover:border-blue-500/50 transition-all duration-300 group"
                    >
                      <div
                        className={`w-12 h-12 bg-linear-to-r ${item.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-lg`}
                      >
                        <Icon size={20} className="text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm text-gray-400">
                          {item.label}
                        </div>
                        <div className="text-white group-hover:text-blue-400 transition-colors text-sm md:text-base truncate">
                          {item.value}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-8">
                <h4 className="text-white/70 text-sm mb-4">
                  Connect on social media
                </h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-black/50 rounded-xl flex items-center justify-center border border-white/10 transition-all duration-300 hover:scale-110 ${social.color}`}
                        aria-label={social.label}
                      >
                        <Icon size={20} className="text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
                  </div>
                  <div>
                    <span className="text-green-400 font-light">
                      Available for work
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
