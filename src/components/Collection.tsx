import { useState } from 'react';
import { X, Star, Bike, Mountain, Building2, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

type Category = 'Mountain' | 'City' | 'E-Bike';

interface Bike {
  id: string;
  name: string;
  category: 'Mountain' | 'City' | 'E-Bike';
  price: string;
  gears: string;
  tires: string;
  suspension: string;
  image: string;
  colorClass: string;
}

const BIKES: Bike[] = [
  {
    id: '1',
    name: 'Alpine Explorer',
    category: 'Mountain',
    price: '$1,299',
    gears: '12-Speed Shimano Deore',
    tires: '29" x 2.4" Knobby',
    suspension: 'Full Suspension (140mm travel)',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80',
    colorClass: 'bg-[#e8ece1]' // Sage tint
  },
  {
    id: '2',
    name: 'Metro Glide',
    category: 'City',
    price: '$699',
    gears: 'Single Speed',
    tires: '700c x 28c Slick',
    suspension: 'Rigid Fork',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    colorClass: 'bg-[#fff0e6]' // Peach tint
  },
  {
    id: '3',
    name: 'Volt Commuter',
    category: 'E-Bike',
    price: '$2,199',
    gears: '8-Speed Shimano Altus',
    tires: '27.5" x 2.0" Puncture Resistant',
    suspension: 'Front Suspension (63mm travel)',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80',
    colorClass: 'bg-[#e6f0f5]' // Sky blue tint
  },
  {
    id: '4',
    name: 'Trail Blazer',
    category: 'Mountain',
    price: '$1,899',
    gears: '1x12 SRAM NX Eagle',
    tires: '27.5" x 2.6" Plus',
    suspension: 'Hardtail (120mm travel)',
    image: 'https://images.unsplash.com/photo-1576435728678-68ce0ebbf1fc?auto=format&fit=crop&w=800&q=80',
    colorClass: 'bg-[#e8ece1]'
  },
  {
    id: '5',
    name: 'Urban Cruiser',
    category: 'City',
    price: '$849',
    gears: '7-Speed Internal Hub',
    tires: '700c x 35c Comfort',
    suspension: 'Rigid Fork',
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
    colorClass: 'bg-[#fff0e6]'
  },
  {
    id: '6',
    name: 'Eco Summit',
    category: 'E-Bike',
    price: '$3,499',
    gears: '11-Speed Shimano XT',
    tires: '29" x 2.6" E-MTB Specific',
    suspension: 'Full Suspension (150mm travel)',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    colorClass: 'bg-[#e6f0f5]'
  }
];

const REVIEWS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    bike: "Alpine Explorer",
    rating: 5,
    text: "Absolutely incredible on rough terrain. The suspension handles everything I throw at it with ease.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Marcus Chen",
    bike: "Metro Glide",
    rating: 5,
    text: "Perfect for my daily commute. Lightweight, stylish, and incredibly smooth on city streets.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    bike: "Eco Summit",
    rating: 4,
    text: "The electric assist is a game changer for steep hills. Battery life is fantastic too!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    name: "David Kim",
    bike: "Trail Blazer",
    rating: 5,
    text: "The 1x12 drivetrain is flawless. I've taken this on some gnarly trails and it never skips a beat.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 5,
    name: "Aisha Patel",
    bike: "Urban Cruiser",
    rating: 5,
    text: "Such a comfortable ride! The internal hub gears mean I don't have to worry about maintenance.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 6,
    name: "Tom Becker",
    bike: "Volt Commuter",
    rating: 4,
    text: "Makes my 10-mile commute a breeze. I arrive at work fresh and ready to go.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 7,
    name: "Mia Johnson",
    bike: "Alpine Explorer",
    rating: 5,
    text: "Best mountain bike I've ever owned. The geometry is spot on for aggressive descents.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 8,
    name: "Lucas Silva",
    bike: "Eco Summit",
    rating: 5,
    text: "Unbelievable power and range. I can explore twice as far as I used to on my regular bike.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80"
  }
];

const duplicatedReviews = [...REVIEWS, ...REVIEWS];

const CATEGORY_THEMES = {
  'Mountain': {
    overlay: 'bg-[#e8ece1]/85',
    solidBg: 'bg-[#e8ece1]',
    text: 'text-[#5a6b3b]',
    buttonImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    bgImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
  },
  'City': {
    overlay: 'bg-[#fff0e6]/85',
    solidBg: 'bg-[#fff0e6]',
    text: 'text-[#d98b54]',
    buttonImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
    bgImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80',
  },
  'E-Bike': {
    overlay: 'bg-[#e6f0f5]/85',
    solidBg: 'bg-[#e6f0f5]',
    text: 'text-[#6b9eb3]',
    buttonImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    bgImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1920&q=80',
  }
};

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState<Category>('Mountain');
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  const categories: Category[] = ['Mountain', 'City', 'E-Bike'];

  const filteredBikes = BIKES.filter(bike => bike.category === activeCategory);
  const currentTheme = CATEGORY_THEMES[activeCategory];
  const ActiveCategoryIcon = activeCategory === 'Mountain' ? Mountain : activeCategory === 'City' ? Building2 : Zap;

  return (
    <section className="relative z-20 w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background Images Layer */}
      <div className="absolute inset-0 z-0">
        {categories.map(category => {
          const theme = CATEGORY_THEMES[category];
          return (
            <div
              key={category}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                activeCategory === category ? "opacity-100" : "opacity-0"
              )}
            >
              <img 
                src={theme.bgImage} 
                alt={`${category} background`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className={cn("absolute inset-0 backdrop-blur-sm transition-colors duration-1000", theme.overlay)} />
            </div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={cn("text-5xl md:text-6xl font-bold mb-6 drop-shadow-sm transition-colors duration-1000", currentTheme.text)}>
            Our Collection
          </h2>
          <p className="text-xl text-slate-800 max-w-2xl mx-auto font-medium transition-colors duration-1000 drop-shadow-sm">
            Discover our meticulously crafted range of bicycles, designed for every terrain and lifestyle.
          </p>
        </div>

        {/* Creative Category Toggle Menu */}
        <div className="flex flex-row items-center justify-center gap-4 md:gap-8 mb-16 w-full px-2">
          <motion.div
            key={`left-${activeCategory}`}
            initial={{ opacity: 0, x: -20, rotate: -45 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex-shrink-0"
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ActiveCategoryIcon className={cn("w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 transition-colors duration-1000 drop-shadow-md", currentTheme.text)} />
            </motion.div>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-8">
            {categories.map(category => {
              const isActive = activeCategory === category;
              const theme = CATEGORY_THEMES[category];
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "group relative overflow-hidden rounded-full transition-all duration-500 flex items-center justify-center shadow-md flex-shrink-0",
                    isActive 
                      ? "w-48 sm:w-56 md:w-64 h-14 sm:h-16 md:h-20 ring-2 sm:ring-4 ring-white/60 scale-105 shadow-xl" 
                      : "w-40 sm:w-48 md:w-40 h-12 sm:h-14 md:h-20 hover:scale-105 opacity-70 hover:opacity-100"
                  )}
                >
                  <img 
                    src={theme.buttonImage} 
                    alt={category} 
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover transition-transform duration-700",
                      isActive ? "scale-110" : "group-hover:scale-110 grayscale"
                    )}
                    referrerPolicy="no-referrer"
                  />
                  <div className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    isActive ? "bg-black/20" : "bg-black/50 group-hover:bg-black/40"
                  )} />
                  <span className="relative z-10 text-white font-bold uppercase tracking-widest text-sm sm:text-base drop-shadow-md">
                    {category}
                  </span>
                </button>
              );
            })}
          </div>
          
          <motion.div
            key={`right-${activeCategory}`}
            initial={{ opacity: 0, x: 20, rotate: 45 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex-shrink-0"
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
            >
              <ActiveCategoryIcon className={cn("w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 transition-colors duration-1000 drop-shadow-md", currentTheme.text)} />
            </motion.div>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {filteredBikes.map(bike => (
            <div
              key={bike.id}
              onClick={() => setSelectedBike(bike)}
              className={cn(
                "cursor-pointer transition-all duration-500 hover:-translate-y-3 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl border border-white/50 bg-white/40 backdrop-blur-sm"
              )}
            >
              <div className="w-full h-64 mb-6 overflow-hidden rounded-2xl bg-white/60 shadow-inner">
                <img 
                  src={bike.image} 
                  alt={bike.name} 
                  className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className={cn("text-xs font-bold uppercase tracking-widest mb-2 transition-colors duration-1000", currentTheme.text)}>{bike.category}</span>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{bike.name}</h3>
              <p className="text-lg font-medium text-slate-600">{bike.price}</p>
            </div>
          ))}
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-24 w-full overflow-hidden">
          <div className="text-center mb-12">
            <h2 className={cn("text-4xl font-bold mb-4 drop-shadow-sm transition-colors duration-1000", currentTheme.text)}>
              Rider Stories
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto font-medium transition-colors duration-1000">
              Hear from our community of riders about their experiences with our featured bikes.
            </p>
          </div>
          
          <div className="relative w-full flex overflow-hidden -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F9F6F0] to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              className="flex gap-8 w-max"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 40,
              }}
            >
              {duplicatedReviews.map((review, index) => (
                <div 
                  key={`${review.id}-${index}`} 
                  className="relative w-[350px] shrink-0 bg-white/40 backdrop-blur-sm border border-white/50 rounded-3xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <motion.div
                    className="absolute top-6 right-6"
                    animate={{ 
                      x: [0, 4, 0],
                      y: [0, -2, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                      delay: index * 0.1
                    }}
                  >
                    <Bike className={cn("w-6 h-6 opacity-40 transition-colors duration-1000", currentTheme.text)} />
                  </motion.div>
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800">{review.name}</h4>
                      <p className={cn("text-xs font-bold uppercase tracking-wider transition-colors duration-1000", currentTheme.text)}>
                        {review.bike}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={cn(
                          i < review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
                        )} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-slate-700 italic leading-relaxed">
                    "{review.text}"
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F9F6F0] to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      {selectedBike && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedBike(null)}
          />
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedBike(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-800 hover:bg-slate-100 transition-colors shadow-sm"
            >
              <X size={24} />
            </button>
            
            <div className={cn("w-full md:w-1/2 h-56 sm:h-72 md:h-auto shrink-0 flex items-center justify-center p-8", currentTheme.solidBg)}>
              <img 
                src={selectedBike.image} 
                alt={selectedBike.name} 
                className="w-full h-full object-contain mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center text-center relative overflow-y-auto">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className={cn("inline-block px-4 py-1 rounded-full bg-slate-100 text-xs font-bold uppercase tracking-widest", currentTheme.text)}>
                  {selectedBike.category}
                </span>
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 8, -8, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                >
                  {selectedBike.category === 'Mountain' && <Mountain className={cn("w-8 h-8 opacity-70 drop-shadow-sm", currentTheme.text)} />}
                  {selectedBike.category === 'City' && <Building2 className={cn("w-8 h-8 opacity-70 drop-shadow-sm", currentTheme.text)} />}
                  {selectedBike.category === 'E-Bike' && <Zap className={cn("w-8 h-8 opacity-70 drop-shadow-sm", currentTheme.text)} />}
                </motion.div>
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">{selectedBike.name}</h3>
              <p className="text-2xl font-medium text-slate-600 mb-8">{selectedBike.price}</p>
              
              <div className="space-y-6 w-full">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Gears</h4>
                  <p className="text-lg text-slate-800 font-medium">{selectedBike.gears}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Tires</h4>
                  <p className="text-lg text-slate-800 font-medium">{selectedBike.tires}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Suspension</h4>
                  <p className="text-lg text-slate-800 font-medium">{selectedBike.suspension}</p>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedBike(null)}
                className={cn("mt-10 w-full py-4 text-white rounded-full font-bold text-lg transition-colors shadow-lg", 
                  activeCategory === 'Mountain' ? 'bg-[#5a6b3b] hover:bg-[#4a5831]' : 
                  activeCategory === 'City' ? 'bg-[#d98b54] hover:bg-[#c27a48]' : 
                  'bg-[#6b9eb3] hover:bg-[#5a879a]'
                )}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
