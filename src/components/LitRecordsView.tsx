import { ChevronRight, Globe2, MapPin, Zap } from 'lucide-react';
import { CITIES, getRouteData } from '../data/cities';

interface LitRecordsViewProps {
  onBack: () => void;
}

export default function LitRecordsView({ onBack }: LitRecordsViewProps) {
  const litRoutes = CITIES.flatMap(city => 
    (city.completedRouteIndices || []).map(routeId => {
      const timestamp = (city.completedRouteTimestamps && city.completedRouteTimestamps[routeId]) || Date.now();
      return {
        city,
        routeId,
        routeData: getRouteData(city.id, routeId),
        timestamp
      };
    })
  ).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="w-full h-full bg-[#05070A] overflow-y-auto pb-24 text-slate-100 font-sans hide-scrollbar relative">
      <div className="sticky top-0 z-20 bg-black/40 backdrop-blur-md pt-safeb flex items-center px-4 py-4 border-b border-white/10">
        <button 
          onClick={onBack} 
          className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="rotate-180" size={20} />
        </button>
        <h1 className="flex-1 text-center font-bold tracking-widest text-slate-100 pr-8">点亮记录</h1>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest flex items-center">
            <Zap size={16} className="mr-2" /> 探索光迹
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">Total {litRoutes.length} Routes</span>
        </div>

        <div className="relative">
          {litRoutes.length === 0 ? (
             <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
               <p className="text-xs text-slate-500">暂无点亮记录，快去探索路线吧</p>
             </div>
          ) : (
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[27px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-slate-700 before:to-transparent">
              {litRoutes.map(({ city, routeId, routeData, timestamp }, index) => {
                const isLit = city.status === 'lit';
                const dateObj = new Date(timestamp);
                return (
                  <div key={`${city.id}-${routeId}-${index}`} className="relative flex items-center group">
                    <div className={`flex flex-col items-center justify-center w-14 shrink-0 z-10 relative py-2 bg-[#05070A] rounded-lg border border-white/5 shadow-lg ${isLit ? 'shadow-[#2ecc71]/10' : 'shadow-cyan-500/10'}`}>
                      <span className={`text-[11px] font-bold font-mono ${isLit ? 'text-[#2ecc71]' : 'text-cyan-400'} leading-none mb-1`}>
                        {String(dateObj.getMonth() + 1).padStart(2, '0')}/{String(dateObj.getDate()).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 leading-none">
                        {String(dateObj.getHours()).padStart(2, '0')}:{String(dateObj.getMinutes()).padStart(2, '0')}
                      </span>
                    </div>
                    <div className={`ml-4 flex-1 bg-white/5 border ${isLit ? 'border-[#2ecc71]/30' : 'border-white/10'} rounded-2xl p-4 shadow-lg overflow-hidden relative`}>
                      {isLit && (
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#2ecc71]/20 -translate-y-1/2 translate-x-1/2 rounded-full blur-xl pointer-events-none" />
                      )}
                      <div className="flex gap-4 relative z-10">
                        <div className="w-20 h-20 bg-slate-800 rounded-xl overflow-hidden shrink-0 relative">
                          <img src={city.image} alt={city.name} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                          {isLit && (
                            <div className="absolute inset-0 bg-[#2ecc71]/20 flex items-center justify-center backdrop-blur-[1px]">
                              <Globe2 size={16} className="text-[#2ecc71] drop-shadow-md" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 mb-1 relative z-10">
                            <MapPin size={10} className="text-cyan-500" />
                            <span>{city.name} · {city.continent}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-100 mb-1 leading-snug">
                            {routeData.title}
                          </h4>
                          <div className="text-[10px] flex items-center gap-2 text-slate-400 font-mono">
                            <span>{routeData.distance} km</span>
                            <span className="w-1 h-1 bg-slate-600 rounded-full" />
                            <span>{routeData.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
