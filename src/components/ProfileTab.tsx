import { Settings, ChevronRight, Mail, SquarePen, Medal, Map as MapIcon, MonitorSmartphone, Wallet, HeadphonesIcon, FileText, BookOpen, ClipboardList } from 'lucide-react';
import { motion } from 'motion/react';

interface UserStats {
  completedCities: number;
  completedRoutes: number;
  totalDistance: number;
  totalTimeHours: number;
}

export default function ProfileTab({ userStats }: { userStats: UserStats }) {
  const stats = [
    { label: '完成城市', value: userStats.completedCities.toString() },
    { label: '完成路线', value: userStats.completedRoutes.toString() },
    { label: '运动里程', value: userStats.totalDistance.toFixed(1), unit: 'km' },
    { label: '运动时长', value: userStats.totalTimeHours.toFixed(1), unit: 'h' },
  ];

  const menuItems = [
    { icon: ClipboardList, label: '运动记录' },
    { icon: MonitorSmartphone, label: '我的设备' },
    { icon: Wallet, label: '我的钱包' },
    { icon: HeadphonesIcon, label: '在线客服' },
    { icon: FileText, label: '问题反馈' },
    { icon: BookOpen, label: '使用说明' },
    { icon: Settings, label: '设置' },
  ];

  return (
    <div className="w-full h-full bg-[#05070A] overflow-y-auto pb-24 text-slate-100 font-sans hide-scrollbar">
      {/* Header Profile Info */}
      <div className="relative pt-12 pb-16 px-6 bg-gradient-to-b from-cyan-900/20 via-cyan-900/5 to-transparent">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none blur-3xl" />
        
        {/* Top bar with icons */}
        <div className="flex justify-end gap-5 mb-2 relative z-10">
          <button className="text-slate-300 hover:text-cyan-400 transition-colors">
            <Mail size={22} />
          </button>
          <button className="text-slate-300 hover:text-cyan-400 transition-colors">
            <SquarePen size={22} />
          </button>
        </div>

        <div className="flex flex-col items-start gap-4 relative z-10 border-b border-white/5 pb-8">
          <div className="flex items-center gap-4 w-full">
            <div className="w-20 h-20 rounded-full border-2 border-cyan-400/50 p-1 relative shadow-[0_0_20px_rgba(34,211,238,0.2)] bg-[#05070A] shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200" 
                alt="Avatar" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-xl font-bold text-slate-100 tracking-wide mb-2">尘缘</h1>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-amber-950 text-xs font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                  LV.3
                </span>
                <span className="text-amber-400 text-sm font-semibold tracking-widest drop-shadow-[0_0_5px_rgba(251,191,36,0.4)]">
                  黄金
                </span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="w-full flex items-center justify-between mt-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-2xl font-bold text-slate-100 font-mono tracking-wider relative">
                  {stat.value}
                  {stat.unit && <span className="text-sm text-slate-400 ml-0.5 relative -top-1">{stat.unit}</span>}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 space-y-6 -mt-8 relative z-20">
        {/* Action Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-4 relative overflow-hidden backdrop-blur-xl shadow-lg cursor-pointer"
          >
            <div className="absolute right-[-10px] top-[-10px] opacity-20 pointer-events-none">
              <Medal size={80} className="text-amber-500" />
            </div>
            <div className="text-amber-400 mb-1">
              <Medal size={28} className="drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
            </div>
            <h3 className="text-slate-100 font-bold mb-1 mt-3">成就勋章</h3>
            <p className="text-[10px] text-amber-200/60 break-words whitespace-pre-wrap">满载而归的荣誉感</p>
          </motion.div>

          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-4 relative overflow-hidden backdrop-blur-xl shadow-lg cursor-pointer"
          >
            <div className="absolute right-[-10px] top-[-10px] opacity-20 pointer-events-none">
              <MapIcon size={80} className="text-cyan-500" />
            </div>
            <div className="text-cyan-400 mb-1">
              <MapIcon size={28} className="drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
            </div>
            <h3 className="text-slate-100 font-bold mb-1 mt-3">城市卡片</h3>
            <p className="text-[10px] text-cyan-200/60 break-words whitespace-pre-wrap">不期而遇的城中事</p>
          </motion.div>
        </div>

        {/* Menu Items */}
        <div className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={idx}
                whileTap={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                className={`w-full flex items-center justify-between p-5 transition-colors ${idx !== menuItems.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <Icon size={20} className="text-slate-400" />
                  <span className="text-slate-200 font-medium tracking-wide text-sm">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-slate-600" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
