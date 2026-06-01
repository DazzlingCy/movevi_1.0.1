import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pause, Play, Square, MapPin, ChevronLeft, Zap } from 'lucide-react';

interface RunPlaybackViewProps {
  cityId: string;
  routeIndex: number;
  image: string;
  onExit: () => void;
  onComplete: (stats: { distance: number, duration: number, calories: number }) => void;
}

export default function RunPlaybackView({ cityId, routeIndex, image, onExit, onComplete }: RunPlaybackViewProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
        setDistance(prev => prev + 0.003); // Simulate running speed
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const calculatePace = () => {
    if (distance === 0) return '0.00';
    const paceInMinutes = (time / 60) / distance;
    const paceMinutes = Math.floor(paceInMinutes);
    const paceSeconds = Math.floor((paceInMinutes - paceMinutes) * 60);
    return `${paceMinutes}'${paceSeconds.toString().padStart(2, '0')}"`;
  };

  const handleStop = () => {
    setIsPlaying(false);
    setShowCompletion(true);
  };

  return (
    <div className="w-full h-full bg-black relative overflow-hidden font-sans text-white">
      {/* Background simulating video */}
      <motion.div 
        className="absolute inset-0 z-0 origin-center"
        animate={{
          scale: isPlaying ? [1, 1.1, 1] : 1,
          transition: { duration: 20, repeat: Infinity, ease: 'linear' }
        }}
      >
        <img src={image} alt="Route scenery" className="w-full h-full object-cover opacity-80" />
      </motion.div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 pt-safet px-4 py-6 z-10 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
        <button onClick={onExit} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-medium">
          <MapPin size={14} className="text-[#2ecc71]" />
          <span>路线 {routeIndex}</span>
        </div>
        <div className="w-10 h-10" /> {/* Spacer */}
      </div>

      {/* Center Running Stats */}
      <div className="absolute top-[35%] left-0 right-0 z-10 flex flex-col items-center">
        <div className="text-[90px] font-bold font-mono tracking-tighter leading-none drop-shadow-2xl">
          {distance.toFixed(2)}
        </div>
        <div className="text-sm font-bold tracking-widest text-slate-300 uppercase mt-2 drop-shadow-md bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm">
          公里 (KM)
        </div>
      </div>

      {/* Bottom Stats & Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-safeb bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-32">
        <div className="px-8 pb-10 flex justify-between items-end">
           <div className="flex flex-col items-center">
             <span className="text-3xl font-bold font-mono drop-shadow-md">{formatTime(time)}</span>
             <span className="text-xs text-slate-400 mt-1 font-medium">时间</span>
           </div>
           
           <div className="flex flex-col items-center">
             <span className="text-3xl font-bold font-mono drop-shadow-md">{calculatePace()}</span>
             <span className="text-xs text-slate-400 mt-1 font-medium">配速</span>
           </div>
           
           <div className="flex flex-col items-center">
             <span className="text-3xl font-bold font-mono drop-shadow-md">{Math.floor(distance * 65)}</span>
             <span className="text-xs text-slate-400 mt-1 font-medium">千卡</span>
           </div>
        </div>

        <div className="flex justify-center items-center gap-8 pb-10">
          <button 
            className="w-16 h-16 rounded-full bg-slate-800/80 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-lg active:scale-95 transition-transform"
            onClick={handleStop}
          >
            <Square size={20} className="fill-current text-rose-500" />
          </button>
          
          <button 
            className="w-24 h-24 rounded-full bg-[#2ecc71] shadow-[0_0_30px_rgba(46,204,113,0.5)] flex items-center justify-center text-white active:scale-95 transition-transform"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={36} className="fill-current" /> : <Play size={36} className="fill-current ml-2" />}
          </button>

          <button className="w-16 h-16 rounded-full bg-slate-800/80 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-lg active:scale-95 transition-transform">
            <MapPin size={24} />
          </button>
        </div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletion && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
           >
              <motion.div 
                 initial={{ scale: 0.9, y: 20 }}
                 animate={{ scale: 1, y: 0 }}
                 className="bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 w-full max-w-sm shadow-[0_0_40px_rgba(34,211,238,0.15)] flex flex-col items-center text-center relative overflow-hidden"
              >
                 <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-500/20 to-transparent pointer-events-none" />
                 
                 <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 ring-2 ring-cyan-400 shadow-[0_0_15px_cyan]">
                   <Zap size={32} className="text-cyan-400" />
                 </div>
                 
                 <h2 className="text-2xl font-bold text-slate-100 mb-1 tracking-widest">路线已唤醒</h2>
                 <p className="text-cyan-400 text-xs font-mono mb-6">ROUTE {routeIndex} AWAKENED</p>

                 {/* Stats */}
                 <div className="w-full grid grid-cols-3 gap-4 mb-6 bg-white/5 rounded-2xl p-4 border border-white/5">
                   <div>
                     <div className="text-xl font-bold font-mono text-slate-100">{distance.toFixed(2)}</div>
                     <div className="text-[10px] text-slate-500 mt-1">公里</div>
                   </div>
                   <div>
                     <div className="text-xl font-bold font-mono text-slate-100">{formatTime(time)}</div>
                     <div className="text-[10px] text-slate-500 mt-1">时长</div>
                   </div>
                   <div>
                     <div className="text-xl font-bold font-mono text-slate-100">{Math.floor(distance * 65)}</div>
                     <div className="text-[10px] text-slate-500 mt-1">千卡</div>
                   </div>
                 </div>

                 {/* Incentive Text */}
                 <p className="text-sm text-slate-300 leading-relaxed font-medium italic mb-8 relative px-4">
                   <span className="text-2xl text-cyan-500/30 absolute -top-4 left-0">"</span>
                   {routeIndex === 1 
                     ? "第一条光迹已被唤醒。这座沉睡的城市，正在重新感受你的心跳与脚步。" 
                     : `又一段被遗忘的记忆重见天日，你在地球留下的光纹愈发璀璨明亮。`}
                   <span className="text-2xl text-cyan-500/30 absolute -bottom-4 right-0">"</span>
                 </p>

                   <button 
                     onClick={() => onComplete({ distance, duration: time, calories: Math.floor(distance * 65) })}
                     className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-colors tracking-wide shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                   >
                     确认
                   </button>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
