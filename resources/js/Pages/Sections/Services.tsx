import { motion } from 'framer-motion';
import { Code, Palette, Megaphone, Video, ArrowRight } from 'lucide-react';

const services = [
    {
        icon: <Code className="w-8 h-8" />,
        title: "Desarrollo Web & Apps",
        description: "Construimos plataformas robustas y escalables utilizando tecnologías de vanguardia como Laravel, React y ecosistemas cloud.",
        color: "from-blue-500 to-cyan-400"
    },
    {
        icon: <Palette className="w-8 h-8" />,
        title: "Branding & Diseño",
        description: "Creamos identidades visuales memorables que conectan con tu audiencia. Desde el logotipo hasta el sistema de diseño completo.",
        color: "from-purple-500 to-pink-500"
    },
    {
        icon: <Megaphone className="w-8 h-8" />,
        title: "Marketing Digital",
        description: "Estrategias de crecimiento basadas en datos. SEO, campañas SEM y gestión de redes sociales para maximizar tu alcance.",
        color: "from-orange-500 to-red-500"
    },
    {
        icon: <Video className="w-8 h-8" />,
        title: "Producción Audiovisual",
        description: "Contenido multimedia de alto impacto. Edición de video, motion graphics y fotografía corporativa.",
        color: "from-green-500 to-emerald-400"
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Nuestras <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Especialidades</span></h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Fusionamos creatividad y tecnología para impulsar tu marca hacia el futuro digital.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors overflow-hidden"
                        >
                            {/* Hover Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                            
                            <div className={`mb-6 p-3 rounded-xl bg-slate-800/50 w-fit text-white group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/10`}>
                                {service.icon}
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                {service.title}
                            </h3>
                            
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                {service.description}
                            </p>

                            <a href="#" className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
                                Saber más <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
