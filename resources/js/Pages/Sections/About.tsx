import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cpu, Code2, Database, X, Download, Loader2, Building2, LayoutGrid, CheckCircle2, hardHat, Box } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const aiAchievements = [
    {
        icon: <Cpu className="w-5 h-5" />,
        title: "Neo AI Assistant",
        description: "Integración de Gemini 2.5 Flash para consultoría estratégica automatizada.",
        date: "ABR 2026"
    },
    {
        icon: <Code2 className="w-5 h-5" />,
        title: "Full-Stack Ecosystem",
        description: "Arquitectura robusta en Laravel 12 + React 18 con Inertia.js.",
        date: "MAR 2026"
    },
    {
        icon: <Database className="w-5 h-5" />,
        title: "Lead Intelligence",
        description: "Sistema de telemetría y persistencia de datos para perfiles de clientes.",
        date: "ABR 2026"
    }
];

const interestOptions = [
    { id: 'software', label: 'Software Lab (Web/App)', icon: <Code2 className="w-4 h-4" /> },
    { id: 'engineering', label: 'Ingeniería de Proyectos', icon: <Building2 className="w-4 h-4" /> },
    { id: 'renders', label: 'Renders 3D & Realismo', icon: <Box className="w-4 h-4" /> },
    { id: 'branding', label: 'Brand Intelligence', icon: <Cpu className="w-4 h-4" /> },
    { id: 'commercial', label: 'Hosting & Soluciones', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'all', label: 'Ecosistema Completo (Todo)', icon: <CheckCircle2 className="w-4 h-4" /> },
];

export default function About() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        phone: '',
        company: '',
        interests: [] as string[]
    });

    const toggleInterest = (id: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(id) 
                ? prev.interests.filter(i => i !== id)
                : [...prev.interests, id]
        }));
    };

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.interests.length === 0) {
            alert("Por favor selecciona al menos un área de interés.");
            return;
        }
        setIsLoading(true);

        try {
            const response = await axios.post('/download-brochure', formData);
            if (response.data.success) {
                setIsModalOpen(false);
                const link = document.createElement('a');
                link.href = response.data.download_url;
                link.setAttribute('download', response.data.filename);
                document.body.appendChild(link);
                link.click();
                link.remove();
                setFormData({ name: '', email: '', phone: '', company: '', interests: [] });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al generar el brochure.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="about" className="py-32 bg-slate-950 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    
                    {/* Visual Side */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative aspect-square max-w-md mx-auto">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-10 border border-white/5 rounded-full border-dashed" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-blue-600/10 to-transparent rounded-[3.5rem] rotate-6 blur-3xl" />
                            <div className="relative h-full bg-slate-900 border border-white/10 rounded-[3.5rem] p-4 overflow-hidden group shadow-2xl">
                                <img 
                                    src="images/why.png" 
                                    alt="Neobranding Vision" 
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2s]" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                                
                                <div className="absolute bottom-12 left-10 right-10 p-8 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
                                    <div className="text-white font-black text-3xl mb-2 uppercase tracking-tighter italic">Humanizing</div>
                                    <div className="text-blue-400 font-bold text-[10px] uppercase tracking-[0.4em]">The digital evolution 2026</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest"
                            >
                                <ShieldCheck className="w-3.5 h-3.5" /> Corporate Dossier
                            </motion.div>
                            <h2 className="text-5xl md:text-7xl font-bold text-white leading-[1.1]">
                                Innovación <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-600 font-black">
                                    Sin Límites.
                                </span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                                Descubre cómo la convergencia entre la <strong>Ingeniería</strong> y el <strong>Branding Estratégico</strong> puede catapultar tu marca hacia el futuro. Solicita tu dossier personalizado.
                            </p>
                        </div>

                        {/* Achievements Mini List */}
                        <div className="grid grid-cols-1 gap-4">
                            {aiAchievements.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/5 transition-all">
                                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-slate-500 text-[10px]">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* THE BUTTON */}
                        <div className="pt-6">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="relative group p-[2px] rounded-2xl overflow-hidden transition-all hover:scale-[1.03] active:scale-95 shadow-[0_0_50px_rgba(59,130,246,0.2)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 animate-[spin_4s_linear_infinite] opacity-100 group-hover:opacity-100" />
                                <div className="relative px-10 py-6 rounded-[14px] bg-slate-950 flex items-center gap-4 text-white">
                                    <span className="font-black uppercase tracking-[0.2em] text-sm text-center">Descarga tu brochure corporativo personalizado</span>
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0">
                                        <Download className="w-5 h-5 group-hover:animate-bounce" />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ENHANCED MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 40 }}
                            animate={{ scale: 1, y: 0 }}
                            className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto custom-scrollbar"
                        >
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-400">
                                <X className="w-6 h-6" />
                            </button>

                            <div className="space-y-8">
                                <div className="text-center">
                                    <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-500/20">
                                        <ShieldCheck className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Personaliza tu Dossier</h2>
                                    <p className="text-slate-500 text-sm mt-3">Selecciona tus áreas de interés para generar un documento a medida.</p>
                                </div>

                                <form onSubmit={handleDownload} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Nombre Completo</label>
                                            <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-blue-500/50 outline-none transition-all" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Empresa / Proyecto</label>
                                            <input required type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-blue-500/50 outline-none transition-all" placeholder="Neobranding Inc." />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Email de Contacto</label>
                                            <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-blue-500/50 outline-none transition-all" placeholder="contacto@empresa.com" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">WhatsApp / Teléfono</label>
                                            <input required type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-blue-500/50 outline-none transition-all" placeholder="+56 9..." />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">¿Qué áreas te interesan?</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {interestOptions.map(opt => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => toggleInterest(opt.id)}
                                                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${
                                                        formData.interests.includes(opt.id)
                                                        ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                                                        : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                                                    }`}
                                                >
                                                    {opt.icon}
                                                    <span className="text-[11px] font-bold uppercase tracking-tight">{opt.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button 
                                        disabled={isLoading}
                                        type="submit" 
                                        className="w-full py-6 rounded-3xl bg-white text-slate-950 font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-500 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            <>Generar Documento Inteligente <Download className="w-5 h-5" /></>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
