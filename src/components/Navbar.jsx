  import React, { useState, useEffect, useCallback, useMemo } from "react";
  import { Github, Linkedin, Mail } from "lucide-react";

  const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const navItems = useMemo(
      () => [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
      ],
      [],
    );

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;

        setScrolled(scrollY > 10);

        const sections = ["home", "about", "projects", "contact"];
        let current = "";

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              current = section;
              break;
            }
          }
        }

        if (scrollY < 100) {
          setActiveSection("home");
        } else if (current) {
          setActiveSection(current);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
      document.body.style.overflow = isOpen ? "hidden" : "";
      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    const handleNavClick = useCallback((e, href) => {
      e.preventDefault();
      setIsOpen(false);

      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (element) {
        const offset = 50;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }
    }, []);

    return (
      <>
        <nav className="fixed top-0 left-0 w-full z-50">
          <div
            className={`absolute inset-0 transition-colors duration-300 ${
              scrolled ? "bg-black shadow-lg" : "bg-transparent"
            }`}
            style={{
              boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.5)" : "none",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center h-16 md:h-20">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "#home")}
                className="text-2xl font-black bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent z-50"
              >
                DINESH
              </a>

              <div className="hidden md:flex items-center space-x-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative py-2 text-sm font-bold tracking-wide transition-colors ${
                      activeSection === item.href.slice(1)
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full transition-all duration-300 ${
                        activeSection === item.href.slice(1)
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-0"
                      }`}
                    />
                  </a>
                ))}
              </div>

              <div className="hidden md:flex items-center space-x-4 text-gray-400">
                <a
                  href="https://github.com/dinez96"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/dineshw96/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:dinesh4693@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  <Mail size={20} />
                </a>
              </div>

              <div className="md:hidden relative z-60">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-500/20 to-purple-500/20 hover:bg-linear-to-r hover:from-blue-500/30 hover:to-purple-500/30 border border-white/10 transition-all duration-300"
                  aria-label="Toggle menu"
                >
                  <div className="w-5 h-5 flex flex-col justify-center items-end space-y-1">
                    <span
                      className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                        isOpen ? "w-0" : "w-5"
                      }`}
                    />
                    <span
                      className={`block w-4 h-0.5 bg-white rounded-full transition-all duration-300 ${
                        isOpen ? "w-0" : "w-4"
                      }`}
                    />
                    <span
                      className={`block w-3 h-0.5 bg-white rounded-full transition-all duration-300 ${
                        isOpen ? "w-0" : "w-3"
                      }`}
                    />
                  </div>
                </button>

                <div
                  className={`absolute right-0 mt-2 w-64 rounded-2xl bg-black/95 border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "opacity-100 visible scale-100"
                      : "opacity-0 invisible scale-95"
                  }`}
                  style={{
                    transformOrigin: "top right",
                  }}
                >
                  <div className="p-2">
                    {navItems.map((item, index) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`block px-4 py-3 rounded-xl transition-all duration-200 ${
                          activeSection === item.href.slice(1)
                            ? "bg-linear-to-r from-blue-500/20 to-purple-500/20 text-white"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                        style={{
                          animationDelay: isOpen ? `${index * 50}ms` : "0ms",
                          animation: isOpen
                            ? "slideIn 0.3s ease-out forwards"
                            : "none",
                          opacity: 0,
                          transform: "translateX(-10px)",
                        }}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>

                  <div className="p-4 border-t border-white/10">
                    <p className="text-xs text-gray-400 mb-3">Connect</p>
                    <div className="flex space-x-4">
                      <a
                        href="https://github.com/dinez96"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Github size={18} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/dineshw96/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Linkedin size={18} />
                      </a>
                      <a
                        href="mailto:dinesh4693@gmail.com"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Mail size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="h-16 md:h-20" />

        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </>
    );
  };

  export default Navbar;
