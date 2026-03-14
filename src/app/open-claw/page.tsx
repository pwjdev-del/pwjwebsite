import { Cpu, ShieldAlert, Zap, Server } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import OpenClawMascot from "@/components/animations/OpenClawMascot";

export default function OpenClawPage() {
  return (
    <div className="bg-navy-900 text-white pt-16 pb-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-electric-400/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none z-0"></div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-7xl">
          
          <FadeIn className="mb-6">
            <Link href="/" className="text-electric-400 hover:text-electric-300 transition-colors inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase">
              &larr; Back to Home
            </Link>
          </FadeIn>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 mb-12 md:mb-16 relative">
            <FadeIn delay={0.1} className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-sm">
                <Cpu className="w-4 h-4 text-electric-400" />
                <span className="text-sm font-medium text-electric-100 tracking-wide uppercase">Local Hardware AI</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-6 md:mb-8 leading-tight tracking-tight">
                Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-electric-600">Open Claw</span>.
              </h1>
              
              <p className="text-lg md:text-xl text-navy-200 leading-relaxed md:leading-relaxed">
                Open Claw is your personal AI agent that runs entirely on your local computer. It’s an intelligent workflow assistant designed to process sensitive data, automate clicks, and manage files without ever sending a single byte of information to the cloud.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="w-full max-w-lg justify-center items-center relative hidden lg:flex">
              {/* Optional glowing box behind mascot matching user's diagram */}
              <div className="absolute inset-0 border border-white/5 bg-white/[0.02] rounded-3xl -z-10 blur-sm pointer-events-none" />
              <OpenClawMascot />
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            
            {/* Left Content Column */}
            <FadeIn delay={0.2} className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-3xl font-heading font-bold mb-6">Why Local AI?</h2>
                <div className="prose prose-invert prose-lg max-w-none text-navy-200">
                  <p>
                    When you use tools like ChatGPT or Copilot, you are handing over your private data, meeting notes, and sensitive client information to third-party servers. 
                  </p>
                  <p>
                    <strong>Open Claw</strong> flips the script. It uses your computer's built-in processing power (CPU/GPU) to run advanced AI models 100% offline. Because it lives directly on your operating system, it can natively interact with your local applications, folders, and screens in secure real-time.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-heading font-bold mb-6">What It Can Do For You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Screen Analysis & OCR Tracking",
                    "Native Local File Summarization",
                    "Automated Form Filling & Data Entry",
                    "100% Offline Workflow Scripting",
                    "Zero Cloud Subscriptions Needed",
                    "Absolute Privacy & Compliance"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="mt-1 min-w-[24px] w-6 h-6 rounded-full bg-electric-600/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-electric-400" />
                      </div>
                      <p className="text-navy-100 font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Right Pricing Column */}
            <FadeIn delay={0.4} className="relative">
              <div className="sticky top-32 p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] bg-navy-800 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-navy-900 border border-white/10 flex items-center justify-center mb-6 shadow-inner relative">
                  <Server className="w-8 h-8 text-electric-400 absolute" />
                  <ShieldAlert className="w-6 h-6 text-white absolute bottom-3 right-3 drop-shadow-lg" />
                </div>

                <h3 className="text-2xl font-heading font-bold mb-4">Complete Installation</h3>
                <p className="text-navy-300 mb-8 text-sm">
                  We configure your workstation, install the Open Claw AI runtime, and set up your initial custom workflow automations.
                </p>

                <div className="mb-8 w-full p-6 rounded-2xl bg-navy-900/50 border border-white/5">
                  <span className="block text-navy-400 text-sm font-medium mb-2 uppercase tracking-wider">Starting at</span>
                  <div className="text-5xl font-heading font-black text-white">$4,500</div>
                  <span className="block text-electric-400 text-sm mt-3">+ custom workflow additions</span>
                </div>

                <Link
                  href="/contact"
                  className="w-full py-4 rounded-xl bg-electric-600 text-white font-semibold text-lg hover:bg-electric-500 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 block text-center"
                >
                  Request Workstation Setup
                </Link>
                
                <p className="text-navy-400 text-xs mt-6 px-4">
                  Requires compatible PC/Mac hardware architectures. Audit included during consultation.
                </p>
              </div>
            </FadeIn>

          </div>
        </div>
    </div>
  );
}
