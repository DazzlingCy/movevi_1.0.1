const fs = require('fs');
const content = fs.readFileSync('src/components/HomeTab.tsx', 'utf8');

const regex = /<button \n\s*onClick=\{\(\) => setShowStoryPanel\(false\)\}[\s\S]*?(?=<div className="p-4 bg-black\/80 backdrop-blur-md border-t border-white\/5 shrink-0">)/;

const newSection = `<button 
                onClick={() => setShowStoryPanel(false)}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center border border-white/10 transition-colors pointer-events-auto shadow-xl"
              >
                <X size={20} className="text-slate-300" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 hide-scrollbar">
              <div className="mb-8 p-4 bg-gradient-to-r from-cyan-950/40 to-transparent rounded-xl border-l-2 border-cyan-500 shadow-md">
                <p className="text-xs text-slate-300 leading-relaxed font-medium italic mb-3">
                  "600年以后，人类早已离开地球，生活在群星之间。我们建造了新的城市、新的轨道、新的家园。"
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-medium italic mb-3">
                  "可是走向宇宙深处，人们越开始想念那颗蓝色的母星。想念巴黎清晨的雾，想念东京街口的人潮，想念开罗金字塔前吹来的热风，也想念南京城墙下，梧桐叶落在路面的声音..."
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  你，不是普通运动者。你是一名<span className="text-cyan-400 font-bold mx-1">光迹探索者 (Glowtrail Explorer)</span>。<br/>
                  你的任务，是通过每一次出发，唤醒一段地球记忆；每完成一条路线，点亮一道母星光迹。
                </p>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-slate-700 before:to-slate-800">
                {CITIES.map((city, index) => {
                  const numStr = numMap[index] || (index + 1).toString();
                  const isLit = city.status === 'lit';
                  const isInProgress = city.status === 'in-progress';
                  const isLocked = city.status === 'unlit';

                  return (
                    <div key={city.id} className={\`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group \${!isLocked ? 'is-active' : ''}\`}>
                      <div className={\`flex items-center justify-center w-8 h-8 rounded-full border-4 border-[#05070A] \${isLit ? 'bg-[#2ecc71] text-slate-100 shadow-[0_0_15px_rgba(46,204,113,0.5)]' : isInProgress ? 'bg-cyan-500 text-slate-100 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-slate-800 text-slate-400'} shrink-0 z-10 font-bold text-xs relative\`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className={\`w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-white/5 border \${isLit ? 'border-[#2ecc71]/30' : isInProgress ? 'border-cyan-500/30' : 'border-white/5'} rounded-2xl p-4 shadow-lg backdrop-blur-sm \${isLocked ? 'opacity-60' : ''}\`}>
                         <div className="flex items-center justify-between mb-1">
                            <h3 className={\`\${isLit ? 'text-[#2ecc71]' : isInProgress ? 'text-cyan-400' : 'text-slate-300'} font-bold\`}>第{numStr}城：{city.name}</h3>
                            {isLocked && <Lock size={14} className="text-slate-500" />}
                         </div>
                         <p className="text-xs text-slate-400 mb-3 font-mono">{city.continent} · {city.englishName}</p>
                         <p className={\`text-[11px] leading-relaxed mb-3 \${isLocked ? 'text-slate-500' : 'text-slate-300'}\`}>
                           {city.description}
                         </p>
                         {isLit ? (
                            <div className="flex items-center text-[10px] text-[#2ecc71] bg-[#2ecc71]/10 rounded px-2 py-1 font-mono w-fit">
                               <CheckCircle2 size={12} className="mr-1" />
                               已完成: 城市卡片已解锁
                            </div>
                         ) : isInProgress ? (
                            <div className="flex items-center text-[10px] text-cyan-400 bg-cyan-950/40 rounded px-2 py-1 font-mono w-fit">
                               <Activity size={12} className="mr-1" />
                               进行中: 唤醒进度 {city.completed}/{city.routes}
                            </div>
                         ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            `;

const result = content.replace(regex, newSection);
fs.writeFileSync('src/components/HomeTab.tsx', result);
console.log('Fixed');
