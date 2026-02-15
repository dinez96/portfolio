import React from "react";
import {
  Heart,
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Code2,
  Palette,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/dinez96", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/dineshw96/",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:dinesh4693@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-500/5 to-purple-500/5" />

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                DINESH
              </span>
              <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Web Developer & Designer creating immersive digital experiences
              with a focus on animation and user-centered design.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Code2 size={14} className="text-blue-500" />
              <span>Clean Code</span>
              <span className="text-gray-700">•</span>
              <Palette size={14} className="text-purple-500" />
              <span>Creative Design</span>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-light mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-light mb-4 text-lg">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:dinesh4693@gmail.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center group"
                >
                  <Mail size={14} className="mr-2 group-hover:text-blue-400" />
                  dinesh4693@gmail.com
                </a>
              </li>
              <li className="text-gray-400 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Available for work
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-light mb-4 text-lg">Follow Me</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-linear-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 border border-white/10 hover:border-transparent group"
                    aria-label={social.label}
                  >
                    <Icon
                      size={18}
                      className="text-gray-400 group-hover:text-white transition-colors"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-8 mt-6 md:mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-500 text-xs sm:text-sm flex flex-wrap items-center justify-center md:justify-start">
            <span>© {currentYear} Dinesh. All rights reserved.</span>
            <span className="mx-2 hidden sm:inline">•</span>
            <span className="flex items-center w-full sm:w-auto justify-center sm:justify-start mt-1 sm:mt-0">
              Made with{" "}
              <Heart size={12} className="text-red-500 mx-1 fill-current" />
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 border border-white/10 hover:border-blue-500/50"
            aria-label="Back to top"
          >
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
              Back to Top
            </span>
            <ArrowUp
              size={16}
              className="text-gray-400 group-hover:text-white group-hover:-translate-y-1 transition-all"
            />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-blue-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
      </div>
    </footer>
  );
};

export default Footer;
