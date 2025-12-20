import React, { useState, useEffect } from 'react';
import { 
  Zap, Search, Download, Sparkles, ExternalLink, MessageCircle, 
  ArrowRight, ShieldCheck, Sun, Moon, Layout, Layers, 
  Settings, XCircle, Languages, Rocket
} from 'lucide-react';

/**
 * 故障诊断：
 * 1. 为什么不能切换？因为 Tailwind 默认不监听 .dark 类名。
 * 2. 解决方案：在 HTML 中注入 tailwind.config = { darkMode: 'class' }。
 * 3. 本脚本已增强了对 DOM 的直接控制。
 */

const content = {
  zh: {
    nav: ['玩法介绍', '立即下载'],
    heroTitle: (
      <>
        全网 AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">一键召唤</span>
      </>
    ),
    heroSubtitle: "你的超级搜索外挂",
    heroDesc: "还在一个一个打开网页搜 AI？太累啦！按一下手指，7大顶尖 AI 瞬间集体出动，为你出谋划策。",
    downloadBtn: "立即免费下载 (Windows)",
    communityBtn: "加入吹水群",
    safetyNote: "纯净脚本，无后台，无病毒，放心冲",
    sectionTitle: (
      <>
        懂你的 <span className="text-pink-500">五大招式</span>
      </>
    ),
    backTitle: "“一旦习惯，就再也回不去”",
    tags: ['提升效率', '优雅操作', '完全免费', '轻量纯净'],
    footerBtn: "获取安装包，开启新世界",
    demoTitle: "全网 AI 瞬间同步",
    demoStep1: "按住 CapsLock + F",
    demoStep2: "输入你想问的，敲回车！",
    demoBadge: "不用选！我全都要！",
    keys: [
      { id: 'F', name: '全网 AI 闪电搜', hotkey: 'CapsLock + F', desc: '一次输入，瞬间打开豆包、Kimi、秘塔等 7+ 顶尖 AI。拒绝选择困难，横向对比才是王道。', icon: <Search className="text-pink-500" />, color: 'bg-pink-50', darkColor: 'dark:bg-pink-900/20' },
      { id: 'S', name: '窗口一键分屏', hotkey: 'CapsLock + S', desc: '写代码时想看文档？一键让当前窗口左/右对齐。别再手动拖窗体了，姿势要优雅。', icon: <Layout className="text-blue-500" />, color: 'bg-blue-50', darkColor: 'dark:bg-blue-900/20' },
      { id: 'B', name: '批量指令执行', hotkey: 'CapsLock + B', desc: '重复的操作交给机器。一键启动预设的批量任务，让你的电脑像电影黑客一样自动运转。', icon: <Layers className="text-purple-500" />, color: 'bg-purple-50', darkColor: 'dark:bg-purple-900/20' },
      { id: 'C', name: '偏好快速设置', hotkey: 'CapsLock + C', desc: '随时唤起配置面板，微调你的专属快捷键，它会越来越懂你的习惯。', icon: <Settings className="text-orange-500" />, color: 'bg-orange-50', darkColor: 'dark:bg-orange-900/20' },
      { id: 'Esc', name: '面板闪电退出', hotkey: 'CapsLock + Esc', desc: '优雅地来，优雅地走。不管开了多少辅助窗口，按一下，世界立刻恢复清净。', icon: <XCircle className="text-rose-500" />, color: 'bg-rose-50', darkColor: 'dark:bg-rose-900/20' }
    ]
  },
  en: {
    nav: ['Features', 'Download'],
    heroTitle: (
      <>
        Summon All AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">In One Click</span>
      </>
    ),
    heroSubtitle: "Your Ultimate Search Power-up",
    heroDesc: "Tired of searching AI models one by one? Press a key, and 7+ top AI models will launch instantly to solve your problems.",
    downloadBtn: "Download for Free (Windows)",
    communityBtn: "Join Community",
    safetyNote: "Pure script, no background process, virus-free, safe to use",
    sectionTitle: (
      <>
        The <span className="text-pink-500">Big 5 Features</span>
      </>
    ),
    backTitle: "Once you use it, you'll never go back",
    tags: ['Fast', 'Elegant', 'Free', 'Clean'],
    footerBtn: "Get Installer & Start Now",
    demoTitle: "Instant AI Sync",
    demoStep1: "Hold CapsLock + F",
    demoStep2: "Type & Hit Enter!",
    demoBadge: "Compare all at once",
    keys: [
      { id: 'F', name: 'AI Multi-Search', hotkey: 'CapsLock + F', desc: 'One input, instantly open Doubao, Kimi, Metaso, and 7+ top AI search pages. No more hesitation.', icon: <Search className="text-pink-500" />, color: 'bg-pink-50', darkColor: 'dark:bg-pink-900/20' },
      { id: 'S', name: 'Smart Split Screen', hotkey: 'CapsLock + S', desc: 'Align windows left/right instantly. Stop dragging windows manually; keep it professional.', icon: <Layout className="text-blue-500" />, color: 'bg-blue-50', darkColor: 'dark:bg-blue-900/20' },
      { id: 'B', name: 'Batch Command', hotkey: 'CapsLock + B', desc: 'Leave repetitive tasks to the machine. Launch preset batch tasks with one single click.', icon: <Layers className="text-purple-500" />, color: 'bg-purple-50', darkColor: 'dark:bg-purple-900/20' },
      { id: 'C', name: 'Quick Config', hotkey: 'CapsLock + C', desc: 'Summon the config panel anytime to fine-tune your exclusive hotkeys and habits.', icon: <Settings className="text-orange-500" />, color: 'bg-orange-50', darkColor: 'dark:bg-orange-900/20' },
      { id: 'Esc', name: 'Lightning Exit', hotkey: 'CapsLock + Esc', desc: 'Close all helper panels instantly. One key to restore your clean desktop workspace.', icon: <XCircle className="text-rose-500" />, color: 'bg-rose-50', darkColor: 'dark:bg-rose-900/20' }
    ]
  }
};

const aiModels = [
    { name: '豆包', color: 'bg-blue-400' },
    { name: 'Kimi', color: 'bg-stone-700' },
    { name: '元宝', color: 'bg-orange-400' },
    { name: '文心', color: 'bg-blue-600' },
    { name: '通义', color: 'bg-purple-500' },
    { name: '秘塔', color: 'bg-teal-500' },
    { name: '智谱', color: 'bg-indigo-500' }
];

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 text-lg";
  const variants = {
    primary: "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600",
    secondary: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-800"
  };
  return <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('zh');
  const t = content[lang];

  useEffect(() => {
    if (window.tailwind) {
      window.tailwind.config = {
        darkMode: 'class',
      };
    }
    
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[#FFFDFE] dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-500">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-sm h-16' : 'bg-transparent h-20'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-200 dark:shadow-none">
              <Zap className="text-white w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-indigo-600">
              CursorHelper
            </span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors flex items-center gap-1">
              <Languages size={20} className="text-gray-500" />
              <span className="text-xs font-bold text-gray-400 uppercase">{lang === 'zh' ? 'EN' : '中文'}</span>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none">
              {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-indigo-600" />}
            </button>
            <Button variant="primary" className="hidden md:flex py-2 px-6 text-sm">
              {t.nav[1]}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-sm font-extrabold mb-8 animate-bounce">
            <Sparkles size={16} />
            <span>{t.demoBadge}</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-4 leading-[1.1]">
            {t.heroTitle} <br />
            {t.heroSubtitle}
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed font-medium">
            {t.heroDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary">
              <Download size={20} /> {t.downloadBtn}
            </Button>
            <Button variant="outline">
              <MessageCircle size={20} /> {t.communityBtn}
            </Button>
          </div>
        </div>
      </section>

      {/* SEARCH DEMO SECTION */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-left">
              <h2 className="text-4xl font-black leading-tight">
                {t.demoTitle} <br />
                <span className="text-pink-500 font-black tracking-widest uppercase">{lang === 'zh' ? '瞬间引爆' : 'INSTANT HIT'}</span>
              </h2>
              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black shrink-0">1</div>
                  <div>
                    <h4 className="text-lg font-bold">{t.demoStep1}</h4>
                    <p className="text-gray-500 dark:text-gray-400">{lang === 'zh' ? '长按 CapsLock，进入超级搜索模式' : 'Hold CapsLock for Super Search'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 flex items-center justify-center font-black shrink-0">2</div>
                  <div>
                    <h4 className="text-lg font-bold">{t.demoStep2}</h4>
                    <p className="text-gray-500 dark:text-gray-400">{lang === 'zh' ? '按 F 瞬间横跳多个 AI 搜索页' : 'Press F to jump across multiple AIs'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-10 bg-gradient-to-tr from-pink-500/20 to-indigo-500/20 blur-[100px] rounded-full"></div>
              <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-white dark:border-gray-800">
                <div className="h-[400px] w-full bg-[#0d1117] rounded-[2.5rem] relative overflow-hidden flex flex-col">
                  <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                      </div>
                      <div className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] text-gray-400 font-mono flex-1 text-center">AI_ENGINE.js</div>
                  </div>
                  <div className="p-6">
                      <div className="w-full bg-indigo-600/20 border-2 border-indigo-400 rounded-2xl p-4 flex items-center gap-4 animate-fade-in">
                        <Search className="text-indigo-400" />
                        <span className="text-white font-bold text-lg animate-typing overflow-hidden whitespace-nowrap border-r-2 border-white">
                          {lang === 'zh' ? '如何用 AI 提升 10 倍效率' : 'How to boost efficiency with AI'}
                        </span>
                      </div>
                  </div>
                  <div className="relative flex-1 px-8">
                      {aiModels.map((ai, i) => (
                        <div key={ai.name} style={{ left: `${20 + i * 20}px`, top: `${10 + i * 20}px`, animationDelay: `${i * 0.15}s` }}
                          className={`absolute w-36 h-24 ${ai.color} rounded-2xl border-2 border-white/20 shadow-2xl animate-cascade flex flex-col overflow-hidden`}>
                          <div className="px-3 py-1.5 bg-black/20 flex justify-between items-center">
                            <span className="text-[9px] text-white font-black">{ai.name}</span>
                            <ExternalLink size={8} className="text-white/50" />
                          </div>
                          <div className="p-3"><div className="h-1.5 w-full bg-white/30 rounded-full mb-1"></div><div className="h-1.5 w-2/3 bg-white/10 rounded-full"></div></div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16">{t.sectionTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.keys.map((key) => (
              <div key={key.id} className="group p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] border-2 border-transparent hover:border-pink-200 dark:hover:border-pink-900 transition-all duration-500 shadow-sm hover:shadow-2xl">
                <div className={`w-14 h-14 ${key.color} ${key.darkColor} rounded-2xl flex items-center justify-center mb-6`}>{key.icon}</div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black">{key.name}</h3>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-[10px] rounded font-bold text-gray-400">{key.hotkey}</kbd>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{key.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-24 text-center px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-4xl font-black italic">“{t.backTitle}”</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {t.tags.map(tag => (
              <div key={tag} className="py-3 px-6 bg-white dark:bg-gray-900 border-2 border-pink-50 dark:border-pink-900/30 rounded-2xl text-pink-500 dark:text-pink-400 font-bold">#{tag}</div>
            ))}
          </div>
          <Button variant="primary" className="mx-auto w-full max-w-md py-6 text-xl">
             {t.footerBtn} <ArrowRight />
          </Button>
          <p className="text-xs text-gray-400 flex items-center justify-center gap-2 pt-4">
            <ShieldCheck size={14} /> {t.safetyNote}
          </p>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
        CursorHelper © 2024 • AHK Power-up
      </footer>

      <style>{`
        @keyframes cascade { 0% { opacity: 0; transform: scale(0.5) translateY(40px) rotate(-10deg); } 100% { opacity: 1; transform: scale(1) translateY(0) rotate(0deg); } }
        @keyframes typing { from { width: 0 } to { width: 100% } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-cascade { animation: cascade 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-typing { animation: typing 1.5s steps(25, end) infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}
