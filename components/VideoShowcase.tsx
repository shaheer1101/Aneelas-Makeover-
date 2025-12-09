import React, { useState, useEffect } from 'react';
import { Star, Sparkles, Filter, Repeat, Play, X } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  src: string;
  desc: string;
  category: string;
  rating?: number;
}

const VideoShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'process'>('process');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLooping, setIsLooping] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Reset category filter when tab changes
  useEffect(() => {
    setActiveCategory('All');
  }, [activeTab]);

  const videos: Record<'process' | 'reviews', Video[]> = {
    process: [
      {
        id: 1,
        title: "Signature Hair Transformation",
        src: "https://videos.pexels.com/video-files/3998418/3998418-sd_640_360_25fps.mp4",
        desc: "Watch Aneela create magic with her signature cuts.",
        category: "Hair"
      },
      {
        id: 2,
        title: "24K Gold Facial Process",
        src: "https://assets.mixkit.co/videos/preview/mixkit-woman-getting-a-face-massage-42358-large.mp4",
        desc: "The step-by-step journey to radiant skin.",
        category: "Skin"
      },
      {
        id: 3,
        title: "Luxury Spa Experience",
        src: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-getting-a-massage-42361-large.mp4",
        desc: "Relaxation defined in our private suites.",
        category: "Spa"
      },
      {
        id: 7,
        title: "Bridal Makeup Trial",
        src: "https://assets.mixkit.co/videos/preview/mixkit-woman-applying-makeup-to-her-eyelashes-39909-large.mp4",
        desc: "Perfecting the look for the big day with precision and care.",
        category: "Bridal"
      },
      {
        id: 9,
        title: "Hair Botox Treatment",
        src: "https://videos.pexels.com/video-files/3998414/3998414-sd_640_360_25fps.mp4",
        desc: "Restoring shine and health to damaged hair.",
        category: "Hair"
      },
      {
        id: 10,
        title: "Busy Salon Atmosphere",
        src: "https://videos.pexels.com/video-files/853866/853866-sd_640_360_25fps.mp4",
        desc: "A glimpse into our daily work life and dedication.",
        category: "Hair"
      }
    ],
    reviews: [
      {
        id: 4,
        title: "Your Name's Wedding Glow",
        src: "https://assets.mixkit.co/videos/preview/mixkit-happy-woman-looking-at-mirror-39906-large.mp4",
        desc: "I felt like a queen on my special day!",
        rating: 5,
        category: "Bridal"
      },
      {
        id: 5,
        title: "Michael's New Look",
        src: "https://assets.mixkit.co/videos/preview/mixkit-man-at-the-barber-shop-40156-large.mp4",
        desc: "Best haircut I've ever had. Highly recommend.",
        rating: 5,
        category: "Hair"
      },
      {
        id: 6,
        title: "Jessica's Color Correction",
        src: "https://assets.mixkit.co/videos/preview/mixkit-woman-touching-her-hair-in-slow-motion-39908-large.mp4",
        desc: "Aneela saved my hair! The color is perfect.",
        rating: 5,
        category: "Hair"
      },
      {
        id: 8,
        title: "Emily's Skin Journey",
        src: "https://assets.mixkit.co/videos/preview/mixkit-woman-putting-on-face-cream-39912-large.mp4",
        desc: "The facials here completely cleared my acne. Forever grateful!",
        rating: 5,
        category: "Skin"
      },
      {
        id: 11,
        title: "Professional Makeup Artistry",
        src: "https://videos.pexels.com/video-files/4125828/4125828-sd_640_360_25fps.mp4",
        desc: "Amazing attention to detail for my event makeup.",
        rating: 5,
        category: "Bridal"
      },
      {
        id: 12,
        title: "Relaxing Spa Day",
        src: "https://videos.pexels.com/video-files/3754687/3754687-sd_640_360_25fps.mp4",
        desc: "The most relaxing environment I've ever experienced.",
        rating: 5,
        category: "Spa"
      }
    ]
  };

  // Get unique categories for the current tab
  const categories = ['All', ...new Set(videos[activeTab].map(v => v.category))];

  // Filter videos based on active category
  const filteredVideos = videos[activeTab].filter(
    v => activeCategory === 'All' || v.category === activeCategory
  );

  return (
    <div className="py-20 bg-dark-900 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
             <Sparkles className="text-gold-500 w-5 h-5" />
             <span className="text-gold-500 font-semibold tracking-wider uppercase text-sm">Visual Experience</span>
             <Sparkles className="text-gold-500 w-5 h-5" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">See the Transformation</h2>
          
          {/* Main Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('process')}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                activeTab === 'process'
                  ? 'bg-gold-500 text-dark-900 shadow-lg shadow-gold-500/20'
                  : 'bg-dark-800 text-gray-400 hover:bg-dark-700 border border-white/10'
              }`}
            >
              OUR PROCESS
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                activeTab === 'reviews'
                  ? 'bg-gold-500 text-dark-900 shadow-lg shadow-gold-500/20'
                  : 'bg-dark-800 text-gray-400 hover:bg-dark-700 border border-white/10'
              }`}
            >
              CLIENT LOVE
            </button>
          </div>

          {/* Category Filters & Options */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 animate-fade-in-up">
            
            {/* Filters */}
            <div className="flex flex-wrap justify-center items-center gap-3">
              <span className="text-gray-500 text-sm mr-2 flex items-center gap-1">
                <Filter size={14} /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                    activeCategory === cat
                      ? 'bg-white text-dark-900'
                      : 'bg-dark-800 text-gray-400 hover:bg-dark-700 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Divider (Desktop) */}
            <div className="hidden md:block w-px h-8 bg-white/10"></div>

            {/* Loop Toggle */}
             <button
                onClick={() => setIsLooping(!isLooping)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors duration-200 border ${
                  isLooping
                    ? 'bg-gold-500 text-dark-900 border-gold-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]'
                    : 'bg-dark-800 text-gray-400 hover:text-white border-white/10'
                }`}
                title="Toggle continuous playback"
            >
                <Repeat size={14} /> Loop {isLooping ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <div key={video.id} className="group bg-dark-800 rounded-xl overflow-hidden border border-white/10 hover:border-gold-500/50 transition-all duration-300 flex flex-col shadow-lg hover:shadow-gold-500/10 animate-fade-in-up">
                {/* Interactive Video Thumbnail */}
                <div 
                  className="aspect-video bg-black relative cursor-pointer group/video overflow-hidden"
                  onClick={() => setSelectedVideo(video)}
                >
                  <video
                    src={video.src}
                    className="w-full h-full object-cover opacity-80 group-hover/video:opacity-100 transition-all duration-500 group-hover/video:scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs text-white uppercase tracking-wider font-bold border border-white/10 z-10">
                    {video.category}
                  </div>

                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover/video:bg-gold-500 group-hover/video:border-gold-500 group-hover/video:scale-110 transition-all duration-300 shadow-xl">
                        <Play className="w-6 h-6 text-white fill-white ml-1 group-hover/video:text-dark-900 group-hover/video:fill-dark-900 transition-colors" />
                    </div>
                  </div>
                </div>
                
                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col">
                  {activeTab === 'reviews' && video.rating && (
                     <div className="flex text-gold-500 mb-3">
                       {[...Array(video.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                     </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{video.desc}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-12">
              <Sparkles className="w-8 h-8 mb-2 opacity-50" />
              <p>No videos found for this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-fade-in backdrop-blur-sm">
           <button
             onClick={() => setSelectedVideo(null)}
             className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-[110] bg-white/10 p-2 rounded-full hover:bg-white/20"
           >
             <X size={24} />
           </button>

           <div className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10 relative">
               <video
                 src={selectedVideo.src}
                 className="w-full h-full"
                 controls
                 autoPlay
                 loop={isLooping}
                 playsInline
               />
           </div>
           
           <div className="absolute bottom-10 left-0 right-0 text-center px-4 pointer-events-none">
              <h3 className="text-2xl font-serif font-bold text-white mb-2 drop-shadow-lg">{selectedVideo.title}</h3>
              <p className="text-gray-300 max-w-2xl mx-auto drop-shadow-md text-lg">{selectedVideo.desc}</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default VideoShowcase;