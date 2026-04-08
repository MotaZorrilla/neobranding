import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, QrCode, GraduationCap, Printer, ExternalLink, X, Check } from 'lucide-react';
import Modal from '@/Components/Modal';

const solutions = [
    {
        title: "Planes de Hosting",
        description: "Servidores de alta velocidad optimizados para WordPress y aplicaciones Laravel. Uptime garantizado del 99.9%.",
        icon: <Server className="w-8 h-8" />,
        link: "#hosting-modal",
        cta: "Ver Planes",
        color: "from-blue-600/20 to-cyan-600/20",
        hoverBorder: "group-hover:border-blue-500/50",
        isModal: true
    },
    {
        title: "Mini Web QR",
        description: "Tu tarjeta de presentación digital. Acceso instantáneo a tus redes, contacto y servicios mediante un código QR único.",
        icon: <QrCode className="w-8 h-8" />,
        link: "https://neobranding.cl/qr/",
        cta: "Crear mi QR",
        color: "from-purple-600/20 to-indigo-600/20",
        hoverBorder: "group-hover:border-purple-500/50"
    },
    {
        title: "Formación",
        description: "Capacitación técnica y estratégica en Branding e IA. Talleres diseñados para equipos que buscan liderar su mercado.",
        icon: <GraduationCap className="w-8 h-8" />,
        link: "https://neobranding.cl/cowork/",
        cta: "Saber más",
        color: "from-orange-600/20 to-red-600/20",
        hoverBorder: "group-hover:border-orange-500/50"
    },
    {
        title: "Impresión Pro",
        description: "Llevamos tu marca al mundo físico. Merchandising, papelería corporativa e impresión publicitaria de alta fidelidad.",
        icon: <Printer className="w-8 h-8" />,
        link: "https://neomarketing.cl/",
        cta: "Cotizar ahora",
        color: "from-emerald-600/20 to-teal-600/20",
        hoverBorder: "group-hover:border-emerald-500/50"
    }
];

interface HostingPlan {
    id: number;
    name: string;
    space: string;
    price_usd: number;
    price_clp: number;
    is_active: boolean;
    sort_order: number;
}

export default function Commercial({ plans = [] }: { plans?: HostingPlan[] }) {
    const [isHostingModalOpen, setIsHostingModalOpen] = useState(false);
    const [currency, setCurrency] = useState<'CLP' | 'USD'>('CLP');

    return (
        <section id="commercial" className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Soluciones <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Comerciales</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl text-lg">
                        Herramientas y servicios complementarios diseñados para potenciar la operatividad y presencia de tu marca.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {solutions.map((item, index) => {
                        const Tag = item.isModal ? 'button' : 'a';
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Tag
                                    href={!item.isModal ? item.link : undefined}
                                    onClick={item.isModal ? () => setIsHostingModalOpen(true) : undefined}
                                    target={!item.isModal && item.link.startsWith('http') ? '_blank' : undefined}
                                    rel={!item.isModal && item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className={`group relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 ${item.hoverBorder} transition-all duration-500 flex flex-col h-full overflow-hidden w-full text-left`}
                                >
                                    {/* Gradient Background Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                    
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ring-1 ring-white/10 shadow-2xl">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-8 group-hover:text-slate-200 transition-colors">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white opacity-60 group-hover:opacity-100 transition-opacity">
                                        {item.cta}
                                        <ExternalLink className="w-4 h-4" />
                                    </div>
                                </Tag>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <Modal show={isHostingModalOpen} onClose={() => setIsHostingModalOpen(false)} maxWidth="xl">
                <div className="bg-slate-950 p-1">
                    <div className="relative p-8 rounded-lg bg-slate-900 border border-white/10 overflow-hidden">
                        {/* Background Decorative */}
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div>
                                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Server className="w-6 h-6 text-blue-400" />
                                    Planes de Hosting
                                </h3>
                                <p className="text-slate-400 text-sm mt-1">Selecciona el espacio ideal para tu proyecto</p>
                            </div>
                            <button 
                                onClick={() => setIsHostingModalOpen(false)}
                                className="p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Currency Toggle UI */}
                        <div className="flex justify-center mb-8 relative z-10">
                            <div className="bg-slate-950/80 p-1 rounded-2xl border border-white/5 flex gap-1">
                                <button 
                                    onClick={() => setCurrency('CLP')}
                                    className={`px-6 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${currency === 'CLP' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    Pesos CLP
                                </button>
                                <button 
                                    onClick={() => setCurrency('USD')}
                                    className={`px-6 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${currency === 'USD' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    Dólares USD
                                </button>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-950/50 relative z-10">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/10">
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-300">Plan / Espacio</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-300 text-right">
                                            Valor {currency === 'CLP' ? 'CLP' : 'USD'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {plans.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors" />
                                                    <span className="font-bold text-white text-lg">{row.space}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <AnimatePresence mode="wait">
                                                    <motion.span 
                                                        key={currency}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        transition={{ duration: 0.15 }}
                                                        className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 font-black text-xl border border-blue-500/20 inline-block"
                                                    >
                                                        {currency === 'CLP' 
                                                            ? `$${new Intl.NumberFormat('es-CL').format(row.price_clp)}` 
                                                            : `$${row.price_usd}`}
                                                    </motion.span>
                                                </AnimatePresence>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-xl bg-green-500/10">
                                    <Check className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">Activación Instantánea</p>
                                    <p className="text-slate-500 text-xs">Soporte 24/7 incluido</p>
                                </div>
                            </div>
                            <a 
                                href="https://wa.me/+56932277455?text=Hola%2C%20estoy%20interesado%20en%20contratar%20un%20plan%20de%20hosting.%20%C2%BFPodr%C3%ADan%20informarme%20sobre%20la%20disponibilidad%20y%20los%20pasos%20para%20la%20activaci%C3%B3n%3F"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full md:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-center shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all active:scale-95"
                            >
                                Consultar Disponibilidad
                            </a>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
