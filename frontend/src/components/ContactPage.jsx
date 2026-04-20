import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import {
  FaPhone,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaExternalLinkAlt,
} from "react-icons/fa";

const ContactPage = () => {
  const { profile } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile?.phone || "+8801884394630");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="
        relative min-h-screen
        bg-gradient-to-b from-background to-gray-900
        py-24 px-4 sm:px-6 lg:px-8
        overflow-hidden
      "
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-highlight/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {["⚛️", "🚀", "💻", "☁️", "🎨", "⚡"].map((icon, idx) => (
          <div
            key={idx}
            className="absolute text-4xl opacity-10 animate-float"
            style={{
              left: `${20 + idx * 15}%`,
              top: `${30 + Math.sin(idx) * 30}%`,
              animationDelay: `${idx * 0.5}s`,
              animationDuration: `${10 + idx * 2}s`,
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
          Let's Work Together
        </h2>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-14">
          Have a project in mind? Let's build something meaningful, scalable,
          and user-centric.
        </p>

        <div
          className="
            relative inline-flex flex-col sm:flex-row items-center gap-8
            p-10 rounded-3xl
            bg-gradient-to-br from-gray-900/60 to-background/40
            backdrop-blur-md border border-accent/30
            shadow-[0_0_60px_-15px_rgba(99,102,241,0.45)]
          "
        >
          <div className="absolute inset-0 rounded-3xl bg-accent/10 blur-2xl -z-10" />

          <div className="text-left max-w-md">
            <h3 className="text-3xl font-extrabold text-white mb-2">
              Contact Me
            </h3>

            <p className="text-gray-300 mb-3">
              Ready to collaborate or just want to say hi?
            </p>

            <p className="text-gray-400 mb-6">
              Email:{" "}
              <span className="text-highlight2 font-medium">
                {profile?.email || "ayshaaktersumi630@gmail.com"}
              </span>
            </p>

            <div className="flex items-center gap-5">
              <div className="relative group">
                <button onClick={handleCopy} aria-label="Copy phone number">
                  <FaPhone className="text-xl text-gray-300 hover:text-highlight transition" />
                </button>

                <div
                  className="
                    absolute left-1/2 -translate-x-1/2 top-full mt-3
                    opacity-0 group-hover:opacity-100
                    transition pointer-events-none
                  "
                >
                  <div className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-700 text-sm text-white shadow-xl">
                    {copied ? (
                      <span className="text-green-400">✓ Copied</span>
                    ) : (
                      profile?.phone || "+880 1884-394630"
                    )}
                  </div>
                </div>
              </div>

              <a
                href={profile?.instagram || "https://www.instagram.com/aysha__amin_"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-xl text-gray-300 hover:text-highlight transition" />
              </a>

              <a
                href={profile?.github || "https://github.com/ay-sha"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-xl text-gray-300 hover:text-highlight transition" />
              </a>

              <a
                href={profile?.linkedin || "https://www.linkedin.com/in/aysha-akter-sumi"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-xl text-gray-300 hover:text-highlight transition" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-4">
            <a
              href={`mailto:${profile?.email || "ayshaaktersumi630@gmail.com"}`}
              className="
                px-9 py-4 rounded-full bg-black text-highlight
                text-lg font-semibold
                hover:opacity-90 transition
                flex items-center gap-2 shadow-lg
              "
            >
              Send an Email
              <FaExternalLinkAlt className="text-sm" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactPage;