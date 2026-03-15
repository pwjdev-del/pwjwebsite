"use client";

import { motion } from "framer-motion";
import {
  Home,
  Key,
  Cross,
  Building2,
  Lock,
  Check,
} from "lucide-react";

const nicheCards = [
  {
    id: "real-estate",
    icon: (
      <div className="relative">
        <Home className="w-8 h-8 text-magenta-400" />
        <Key className="w-4 h-4 text-magenta-300 absolute -bottom-1 -right-1" />
      </div>
    ),
    title: "AUTOMATE YOUR CRM PIPELINE",
    bullets: [
      "Syncs with Salesforce, Zillow",
      "Captures precise client needs",
      "Reclaims 10 hours selling time",
    ],
    accentColor: "magenta",
    glowFrom: "from-magenta-500/10",
    borderHover: "hover:border-magenta-400/30",
    checkColor: "text-magenta-400",
    badgeText: "Real Estate",
  },
  {
    id: "healthcare",
    icon: (
      <div className="relative">
        <Cross className="w-8 h-8 text-teal-400" />
      </div>
    ),
    title: "HIPAA-READY PATIENT CARE",
    bullets: [
      "Instant clinical summaries",
      "Focus on patient, not paperwork",
      "Data remains private & secure",
    ],
    accentColor: "teal",
    glowFrom: "from-teal-500/10",
    borderHover: "hover:border-teal-400/30",
    checkColor: "text-teal-400",
    badgeText: "Healthcare",
  },
  {
    id: "enterprise",
    icon: (
      <div className="relative">
        <Building2 className="w-8 h-8 text-electric-400" />
        <Lock className="w-4 h-4 text-electric-300 absolute -bottom-1 -right-1" />
      </div>
    ),
    title: "PRIVATE & SECURE ENTERPRISE INTELLIGENCE",
    bullets: [
      "Automated action items",
      "Private data (not used for model training)",
      "Syncs with Teams, Slack",
    ],
    accentColor: "electric",
    glowFrom: "from-electric-500/10",
    borderHover: "hover:border-electric-400/30",
    checkColor: "text-electric-400",
    badgeText: "Enterprise",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

export default function NicheShowcase() {
  return (
    <section className="relative py-20 md:py-32 bg-obsidian-900 overflow-hidden">
      {/* Ambient bg shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-magenta-500/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-teal-500/[0.03] rounded-full blur-[80px]" />
        <div className="absolute top-0 right-1/3 w-[300px] h-[300px] bg-electric-500/[0.02] rounded-full blur-[90px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] text-xs sm:text-sm font-semibold text-navy-300 tracking-widest uppercase mb-6">
            Industry Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight mb-5">
            Built for <span className="text-gradient">Your</span> Industry
          </h2>
          <p className="text-lg text-navy-400 leading-relaxed">
            Purpose-built intelligence for the conversations that matter most in
            your field.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {nicheCards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`group relative rounded-2xl border border-white/[0.06] bg-obsidian-800/60 backdrop-blur-sm overflow-hidden cursor-pointer ${card.borderHover} transition-colors duration-500`}
            >
              {/* Internal glow gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.glowFrom} via-transparent to-obsidian-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Glow accent line at top */}
              <div
                className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent ${
                  card.accentColor === "magenta"
                    ? "via-magenta-400/40"
                    : card.accentColor === "teal"
                    ? "via-teal-400/40"
                    : "via-electric-400/40"
                } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10 p-6 sm:p-8">
                {/* Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`text-xs font-bold tracking-widest uppercase ${
                      card.accentColor === "magenta"
                        ? "text-magenta-400/70"
                        : card.accentColor === "teal"
                        ? "text-teal-400/70"
                        : "text-electric-400/70"
                    }`}
                  >
                    {card.badgeText}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-6">{card.icon}</div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-6 tracking-tight leading-tight">
                  {card.title}
                </h3>

                {/* Bullets */}
                <ul className="space-y-4 mb-8">
                  {card.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-navy-200"
                    >
                      <Check
                        className={`w-4 h-4 ${card.checkColor} mt-0.5 shrink-0`}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Mini proof-of-concept visual: a small status bar */}
                <div className="rounded-lg bg-obsidian-900/60 border border-white/[0.04] p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        card.accentColor === "magenta"
                          ? "bg-magenta-400"
                          : card.accentColor === "teal"
                          ? "bg-teal-400"
                          : "bg-electric-400"
                      } animate-pulse`}
                    />
                    <span className="text-[11px] font-medium text-navy-400 tracking-wide uppercase">
                      Live sync active
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-obsidian-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        card.accentColor === "magenta"
                          ? "bg-gradient-to-r from-magenta-500 to-magenta-400"
                          : card.accentColor === "teal"
                          ? "bg-gradient-to-r from-teal-500 to-teal-400"
                          : "bg-gradient-to-r from-electric-500 to-electric-400"
                      }`}
                      style={{ width: "78%" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
