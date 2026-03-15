"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, Mail, Phone, UploadCloud, FileType, ChevronDown, X } from "lucide-react";
import { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import { features } from "@/data/features";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

function ContactParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: { enable: true, mode: ["grab", "bubble"] },
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.8 } },
        bubble: { distance: 200, size: 6, duration: 2, opacity: 0.8 },
      },
    },
    particles: {
      color: { value: ["#ffffff", "#60a5fa", "#3b82f6", "#93c5fd"] },
      links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.5, width: 1.5 },
      move: { enable: true, speed: 2, direction: "none", random: false, straight: false, outModes: "bounce" },
      number: { density: { enable: true }, value: 120 },
      opacity: { value: { min: 0.3, max: 0.8 }, animation: { enable: true, speed: 1.5, sync: false } },
      shape: { type: "circle" },
      size: { value: { min: 2, max: 6 } },
    },
    detectRetina: true,
  };

  if (!init) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden mix-blend-screen pointer-events-none">
      <Particles id="tsparticles-contact" options={options} className="w-full h-full" />
    </div>
  );
}

export default function LeadCapture() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      
      const fileInput = document.getElementById('documentUpload') as HTMLInputElement;
      if (fileInput) {
        // Create a DataTransfer to manipulate the FileList
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formData = new FormData(e.currentTarget);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send request');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-navy-900 mb-4 md:mb-6 tracking-tight">
            Ready to Automate Your <span className="text-electric-600">Workflow?</span>
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto leading-relaxed">
            Tell us a bit about your operations, and we’ll build a custom AI implementation brief for your team.
          </p>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="bg-white rounded-3xl border border-navy-900/10 shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Form Section */}
            <FadeInStagger className="p-5 sm:p-8 md:p-10 lg:p-12 md:col-span-3 custom-form">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FadeInItem className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium text-navy-900">Full Name</label>
                    <input id="fullName" name="fullName" required disabled={isSubmitting || isSubmitted} type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-lg bg-navy-50/50 text-navy-900 border border-navy-900/10 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent transition-all outline-none disabled:opacity-50" />
                  </FadeInItem>
                  <FadeInItem className="space-y-2">
                    <label htmlFor="workEmail" className="text-sm font-medium text-navy-900">Work Email</label>
                    <input id="workEmail" name="workEmail" required disabled={isSubmitting || isSubmitted} type="email" placeholder="john@company.com" className="w-full px-4 py-3 rounded-lg bg-navy-50/50 text-navy-900 border border-navy-900/10 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent transition-all outline-none disabled:opacity-50" />
                  </FadeInItem>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FadeInItem className="space-y-2">
                    <label htmlFor="companyName" className="text-sm font-medium text-navy-900">Company Name</label>
                    <input id="companyName" name="companyName" required disabled={isSubmitting || isSubmitted} type="text" placeholder="Acme Corp" className="w-full px-4 py-3 rounded-lg bg-navy-50/50 text-navy-900 border border-navy-900/10 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent transition-all outline-none disabled:opacity-50" />
                  </FadeInItem>
                  <FadeInItem className="space-y-2">
                    <label htmlFor="websiteUrl" className="text-sm font-medium text-navy-900">Website Link</label>
                    <input id="websiteUrl" name="websiteUrl" required disabled={isSubmitting || isSubmitted} type="text" placeholder="example.com" className="w-full px-4 py-3 rounded-lg bg-navy-50/50 text-navy-900 border border-navy-900/10 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent transition-all outline-none disabled:opacity-50" />
                  </FadeInItem>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FadeInItem className="space-y-3">
                    <label className="text-sm font-medium text-navy-900">Company Size</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['1-10', '11-50', '50+'].map((size) => (
                        <label key={size} className="relative cursor-pointer group">
                          <input type="radio" name="companySize" value={size} className="peer sr-only" required disabled={isSubmitting || isSubmitted} />
                          <div className="text-center px-2 py-3.5 rounded-xl bg-navy-50/50 border border-navy-900/10 text-sm font-medium text-navy-600 transition-all peer-checked:bg-electric-500 peer-checked:text-white peer-checked:border-electric-500 group-hover:border-electric-300 peer-disabled:opacity-50">
                            {size}
                          </div>
                        </label>
                      ))}
                    </div>
                  </FadeInItem>
                  <FadeInItem className="space-y-2">
                    <label htmlFor="timeline" className="text-sm font-medium text-navy-900">Timeline</label>
                    <select id="timeline" name="timeline" required disabled={isSubmitting || isSubmitted} defaultValue="" className="w-full px-4 py-3 rounded-lg bg-navy-50/50 border border-navy-900/10 focus:outline-none focus:ring-2 focus:ring-electric-500 text-navy-900 appearance-none bg-white transition-all outline-none cursor-pointer disabled:opacity-50">
                      <option value="" disabled>Select timeline...</option>
                      <option value="asap">ASAP (1-2 Weeks)</option>
                      <option value="1-month">1 Month</option>
                      <option value="3-months">3+ Months</option>
                    </select>
                  </FadeInItem>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FadeInItem className="space-y-2 relative">
                    <label htmlFor="serviceType" className="text-sm font-medium text-navy-900 block mb-1">Service Needed</label>
                    <div className="relative">
                      <select id="serviceType" name="serviceType" required disabled={isSubmitting || isSubmitted} defaultValue="" className="w-full px-4 py-3.5 rounded-xl bg-navy-50/70 border-2 border-transparent hover:border-navy-900/10 focus:outline-none focus:ring-4 focus:ring-electric-500/20 focus:border-electric-500 text-navy-900 font-medium appearance-none transition-all outline-none cursor-pointer disabled:opacity-50 shadow-sm relative z-10 bg-transparent">
                        <option value="" disabled>Select a service...</option>
                        {features.map((feature) => (
                          <option key={feature.id} value={feature.title}>{feature.title}</option>
                        ))}
                        <option value="General Consultation">General Consultation</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-navy-400 z-0">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                      {/* Custom background to put behind transparent select */}
                      <div className="absolute inset-0 bg-navy-50/70 rounded-xl -z-10"></div>
                    </div>
                  </FadeInItem>
                  <FadeInItem className="space-y-2">
                    <label htmlFor="crmSystem" className="text-sm font-medium text-navy-900 block mb-1">Current Systems/Tools</label>
                    <input id="crmSystem" name="crmSystem" disabled={isSubmitting || isSubmitted} type="text" placeholder="e.g. Salesforce, Excel" className="w-full px-4 py-3.5 text-navy-900 rounded-xl bg-navy-50/70 border-2 border-transparent hover:border-navy-900/10 focus:outline-none focus:ring-4 focus:ring-electric-500/20 focus:border-electric-500 font-medium transition-all outline-none disabled:opacity-50 shadow-sm placeholder:text-navy-400 placeholder:font-normal" />
                  </FadeInItem>
                </div>

                <FadeInItem className="space-y-2">
                  <label htmlFor="projectDescription" className="text-sm font-medium text-navy-900 block mb-1">Project Description / Message</label>
                  <textarea id="projectDescription" name="projectDescription" disabled={isSubmitting || isSubmitted} placeholder="Tell us more about your specific needs, challenges, or the service you're looking for..." rows={4} className="w-full px-4 py-3.5 text-navy-900 rounded-xl bg-navy-50/70 border-2 border-transparent hover:border-navy-900/10 focus:outline-none focus:ring-4 focus:ring-electric-500/20 focus:border-electric-500 font-medium transition-all outline-none disabled:opacity-50 shadow-sm placeholder:text-navy-400 placeholder:font-normal resize-y" />
                </FadeInItem>

                <FadeInItem className="space-y-4 pt-4 mt-4 border-t border-navy-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-navy-900">Project Files</h4>
                      <p className="text-xs text-navy-500 mt-1">Upload workflow diagrams, documents, or data samples (Optional)</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden group ${
                      isDragging 
                        ? "border-electric-500 bg-electric-50/80 scale-[1.02] shadow-inner" 
                        : "border-navy-200 bg-gradient-to-br from-navy-50/30 to-white hover:bg-navy-50/80 hover:border-electric-300 hover:shadow-md"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input 
                      id="documentUpload" 
                      name="document" 
                      type="file" 
                      disabled={isSubmitting || isSubmitted} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 disabled:cursor-not-allowed" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setFileName(e.target.files[0].name);
                        }
                      }}
                    />
                    
                    <div className="flex flex-col items-center justify-center p-5 sm:p-8 text-center z-10 relative pointer-events-none">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-electric-400/5 rounded-full blur-2xl group-hover:bg-electric-400/10 transition-colors"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-navy-400/5 rounded-full blur-xl group-hover:bg-navy-400/10 transition-colors"></div>
                      
                      {fileName ? (
                         <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-navy-100 animate-in fade-in slide-in-from-bottom-2 duration-300 w-full max-w-sm mx-auto relative z-30 pointer-events-auto">
                           <div className="w-12 h-12 rounded-full bg-electric-100/50 flex items-center justify-center text-electric-600 flex-shrink-0">
                             <FileType className="w-6 h-6" />
                           </div>
                           <div className="text-left flex-1 min-w-0">
                             <p className="text-sm font-bold text-navy-900 truncate">{fileName}</p>
                             <p className="text-xs text-green-500 font-medium mt-0.5">Ready to attach</p>
                           </div>
                           <button 
                             type="button"
                             className="p-2 text-navy-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors self-center"
                             onClick={(e) => {
                               e.preventDefault();
                               e.stopPropagation();
                               setFileName(null);
                               const fileInput = document.getElementById('documentUpload') as HTMLInputElement;
                               if (fileInput) fileInput.value = '';
                             }}
                           >
                             <X className="w-4 h-4" />
                           </button>
                         </div>
                      ) : (
                        <div className="relative z-20 flex flex-col items-center">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                            isDragging ? "bg-electric-500 text-white shadow-xl shadow-electric-500/30 scale-110 -rotate-3" : "bg-white text-electric-600 shadow-md border border-navy-100 group-hover:scale-105 group-hover:-translate-y-1"
                          }`}>
                            <UploadCloud className="w-8 h-8" />
                          </div>
                          <p className="text-base font-bold text-navy-900 mb-1">
                            Click or drag to upload
                          </p>
                          <p className="text-sm text-navy-500">
                            SVG, PNG, JPG, PDF or DOCX (max. 10MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </FadeInItem>

                {submitError && (
                  <FadeInItem>
                    <p className="text-sm text-red-500 font-medium">{submitError}</p>
                  </FadeInItem>
                )}

                <FadeInItem>
                  <button disabled={isSubmitting || isSubmitted} type="submit" className="w-full py-4 rounded-xl bg-electric-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-electric-500 transition-all shadow-lg hover:shadow-xl group mt-4 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-green-300" />
                        <span>Request Sent!</span>
                      </>
                    ) : (
                      <>
                        <span>Request Custom Implementation Plan</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </FadeInItem>
              </form>
            </FadeInStagger>

            {/* Contact & Newsletter Sidebar */}
            <FadeInStagger delay={0.4} className="bg-navy-900 md:col-span-2 flex flex-col justify-center text-white relative overflow-hidden group/sidebar rounded-b-2xl md:rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl">
               {/* Physics Particles Background */}
               <ContactParticles />
               
               <div className="absolute top-0 right-0 w-64 h-64 bg-electric-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0 transition-transform duration-700 group-hover/sidebar:scale-150"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-electric-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none z-0 transition-transform duration-700 group-hover/sidebar:scale-150"></div>

               <div className="relative z-10 w-full h-full p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 backdrop-blur-sm">
                 <FadeInItem>
                   <h3 className="text-2xl md:text-3xl font-heading font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Direct Contact</h3>
                   <p className="text-electric-400 font-medium mb-8 text-sm uppercase tracking-widest">We're here to help</p>
                 </FadeInItem>
               
               <FadeInItem className="space-y-4 mb-8">
                 <a href="mailto:pwjdev@gmail.com" className="flex items-center gap-3 text-navy-200 hover:text-white transition-colors group">
                   <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-electric-600 transition-colors">
                     <Mail size={18} />
                   </div>
                   <span className="text-sm font-medium">pwjdev@gmail.com</span>
                 </a>

               </FadeInItem>

               <div className="w-full h-px bg-white/10 mb-8 max-w-[80%]"></div>

               <FadeInItem>
                 <h4 className="font-bold text-lg mb-2">Join our Newsletter</h4>
                 <p className="text-navy-300 mb-6 leading-relaxed text-sm">
                   Get weekly insights on AI productivity, local tech news, and workflow automation directly to your inbox.
                 </p>
               </FadeInItem>

               <FadeInItem className="space-y-3 relative z-10 w-full">
                 <label htmlFor="newsletterEmail" className="sr-only">Email Address</label>
                 <div className="relative group">
                   <div className="absolute -inset-0.5 bg-gradient-to-r from-electric-500 to-electric-300 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                   <input id="newsletterEmail" type="email" placeholder="Enter your email" className="relative w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-electric-500 transition-all outline-none backdrop-blur-md" />
                 </div>
                 <button className="relative w-full py-4 rounded-xl bg-gradient-to-r from-white to-navy-50 text-navy-900 font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 transition-all outline-none overflow-hidden group">
                   <span className="relative z-10">Subscribe Now</span>
                   <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                 </button>
               </FadeInItem>
               </div>
            </FadeInStagger>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
