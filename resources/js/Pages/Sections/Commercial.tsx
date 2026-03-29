import { motion } from 'framer-motion';
import { Server, QrCode, GraduationCap, Printer, ExternalLink } from 'lucide-react';

const solutions = [
    {
        title: "Planes de Hosting",
        description: "Servidores de alta velocidad optimizados para WordPress y aplicaciones Laravel. Uptime garantizado del 99.9%.",
        icon: <Server className="w-8 h-8" />,
        link: "#productos",
        cta: "Ver Planes",
        color: "from-blue-600/20 to-cyan-600/20",
        hoverBorder: "group-hover:border-blue-500/50"
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
        link: "#about",
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

export default function Commercial() {
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
                    {solutions.map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.link}
                            target={item.link.startsWith('http') ? '_blank' : '_self'}
                            rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 ${item.hoverBorder} transition-all duration-500 flex flex-col h-full overflow-hidden`}
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
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
