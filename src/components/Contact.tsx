import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MapPin, Clock, Phone, Mail } from 'lucide-react';

export default function Contact() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const interests = ['Mountain', 'City', 'E-Bike', 'Bespoke Build'];

  return (
    <section className="w-full bg-[#F9F6F0] py-24 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-4">
            Begin Your Journey
          </h2>
          <p className="text-lg text-slate-500 font-medium tracking-wide">
            Connect with our experts to find your perfect ride.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
          
          {/* Left Side: Showroom & Concierge */}
          <div className="relative rounded-[2rem] overflow-hidden shadow-sm flex flex-col justify-center p-10 md:p-16 min-h-[400px]">
            {/* Animated Gradient Mesh Background */}
            <div className="absolute inset-0 bg-mesh opacity-60 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">The Velocity Showroom</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-slate-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Location</p>
                      <p className="text-lg text-slate-800 font-medium">100 Precision Way<br/>Design District, CA 90210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-slate-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Hours</p>
                      <p className="text-lg text-slate-800 font-medium">Mon - Sat: 10am - 7pm<br/>Sun: By Appointment Only</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-900/10">
                <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Direct Concierge</h3>
                <div className="space-y-4">
                  <a href="tel:+18005550199" className="flex items-center space-x-4 group">
                    <Phone className="w-5 h-5 text-slate-400 group-hover:text-[#6b9eb3] transition-colors" />
                    <span className="text-slate-800 font-medium group-hover:text-[#6b9eb3] transition-colors">+1 (800) 555-0199</span>
                  </a>
                  <a href="mailto:concierge@velocityrides.com" className="flex items-center space-x-4 group">
                    <Mail className="w-5 h-5 text-slate-400 group-hover:text-[#d98b54] transition-colors" />
                    <span className="text-slate-800 font-medium group-hover:text-[#d98b54] transition-colors">concierge@velocityrides.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="flex flex-col justify-center lg:py-8">
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              
              {/* Name Field */}
              <div className="relative">
                <input 
                  type="text" 
                  id="name"
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-slate-300 py-4 text-slate-800 placeholder-slate-400 text-lg focus:outline-none transition-colors duration-500"
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
                <div className={`absolute bottom-0 left-0 h-[2px] bg-[#5a6b3b] transition-all duration-500 ease-out ${focusedField === 'name' ? 'w-full' : 'w-0'}`} />
              </div>

              {/* Email Field */}
              <div className="relative">
                <input 
                  type="email" 
                  id="email"
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b border-slate-300 py-4 text-slate-800 placeholder-slate-400 text-lg focus:outline-none transition-colors duration-500"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
                <div className={`absolute bottom-0 left-0 h-[2px] bg-[#6b9eb3] transition-all duration-500 ease-out ${focusedField === 'email' ? 'w-full' : 'w-0'}`} />
              </div>

              {/* Custom Dropdown: Area of Interest */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onFocus={() => setFocusedField('interest')}
                  onBlur={() => {
                    // Slight delay to allow clicking options
                    setTimeout(() => {
                      setFocusedField(null);
                      setIsDropdownOpen(false);
                    }, 200);
                  }}
                  className="w-full bg-transparent border-b border-slate-300 py-4 text-left text-lg focus:outline-none flex justify-between items-center transition-colors duration-500"
                >
                  <span className={selectedInterest ? 'text-slate-800' : 'text-slate-400'}>
                    {selectedInterest || 'Area of Interest'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-500 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute bottom-0 left-0 h-[2px] bg-[#d98b54] transition-all duration-500 ease-out ${focusedField === 'interest' || isDropdownOpen ? 'w-full' : 'w-0'}`} />
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-full mt-2 bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20"
                    >
                      {interests.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => {
                            setSelectedInterest(interest);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left px-6 py-4 text-slate-700 hover:bg-slate-50 hover:text-[#d98b54] transition-colors font-medium"
                        >
                          {interest}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea 
                  id="message"
                  placeholder="How can we assist you?"
                  rows={4}
                  className="w-full bg-transparent border-b border-slate-300 py-4 text-slate-800 placeholder-slate-400 text-lg focus:outline-none resize-none transition-colors duration-500"
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                />
                <div className={`absolute bottom-0 left-0 h-[2px] bg-[#5a6b3b] transition-all duration-500 ease-out ${focusedField === 'message' ? 'w-full' : 'w-0'}`} />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full py-5 mt-4 bg-slate-900 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-[#5a6b3b] hover:tracking-[0.2em] transition-all duration-500 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
