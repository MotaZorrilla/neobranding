import { motion } from 'framer-motion';
import { Award, BookOpen, Presentation, BrainCircuit, CheckCircle2 } from 'lucide-react';

const aiAchievements = [
    {
        icon: <Presentation className="w-5 h-5" />,
        title: "Ponencia: IA en el Desarrollo Moderno",
        description: "Presentación sobre la integración de modelos LLM en flujos de trabajo de ingeniería.",
        date: "2025"
    },
    {
        icon: <Award className="w-5 h-5" />,
        title: "Certificación Advanced AI",
        description: "Especialización en arquitecturas de agentes y optimización de prompts.",
        date: "2025"
    },
    {
        icon: <BrainCircuit className="w-5 h-5" />,
        title: "Workshop: Automatización con GenAI",
        description: "Capacitación técnica sobre herramientas de generación de código y activos digitales.",
        date: "2024"
    }
];

export default function About() {
    return (
        <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Visual Side */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 bg-slate-900 relative group">
                            <img 
                                src="images/why.png" 
                                alt="Mota Zorrilla - Profile" 
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            {/* Decorative Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                            
                            {/* Floating Badge */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                                        <BrainCircuit className="text-white w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-white text-xs font-bold uppercase tracking-wider">AI Specialist</div>
                                        <div className="text-slate-300 text-[10px]">Engineering & Code</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                Trayectoria e <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                                    Innovación con IA
                                </span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Como Ingeniero Eléctrico y Desarrollador Full-Stack, mi enfoque se centra en la convergencia entre la ingeniería tradicional y las tecnologías emergentes. Actualmente, lidero la integración de Inteligencia Artificial en procesos creativos y técnicos en Neobranding.
                            </p>
                        </div>

                        {/* Achievements List */}
                        <div className="space-y-4">
                            <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                <Award className="text-purple-400 w-5 h-5" /> Logros Recientes
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {aiAchievements.map((item, idx) => (
                                    <motion.div 
                                        key={idx}
                                        whileHover={{ x: 10 }}
                                        className="p-4 rounded-xl bg-slate-900/50 border border-white/5 flex gap-4 items-start group hover:border-purple-500/30 transition-all"
                                    >
                                        <div className="mt-1 p-2 rounded-lg bg-slate-800 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                                            <p className="text-slate-500 text-xs mt-1">{item.description}</p>
                                        </div>
                                        <div className="ml-auto text-[10px] font-mono text-slate-600">
                                            {item.date}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6">
                            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                                Descargar CV Completo
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
