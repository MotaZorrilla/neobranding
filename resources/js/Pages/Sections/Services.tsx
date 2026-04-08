import { motion } from 'framer-motion';
import { Brain, Globe, GraduationCap, LayoutGrid, ArrowRight } from 'lucide-react';

const services = [
    {
        icon: <Brain className="w-8 h-8" />,
        title: "Marca Inteligente",
        description: "No solo diseñamos logotipos; creamos identidades que dominan mercados fusionando psicología del consumidor con diseño de vanguardia.",
        features: ["Brand Intelligence", "Arquitectura de Marca", "Identidad Visual", "Naming"],
        color: "from-purple-500 to-indigo-600"
    },
    {
        icon: <Globe className="w-8 h-8" />,
        title: "Presencia Digital",
        description: "Ecosistemas digitales donde el diseño UI/UX y el Marketing 360° trabajan para atraer, cautivar y convertir prospectos.",
        features: ["Desarrollo Web", "Estrategia 360", "SEO & Contenido", "Automatización"],
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: <GraduationCap className="w-8 h-8" />,
        title: "Neobranding Academy",
        description: "Formación práctica y especializada. Talleres y asesorías para que tú o tu equipo lideren la evolución de su mercado.",
        features: ["Cursos Online", "Talleres Intensivos", "Asesoría Personalizada", "Metodología Neo"],
        color: "from-orange-500 to-pink-500"
    },
    {
        icon: <LayoutGrid className="w-8 h-8" />,
        title: "Soluciones Pro",
        description: "Herramientas diseñadas para acelerar tu negocio: desde hosting de alta velocidad hasta mini-webs de contacto.",
        features: ["Hosting Premium", "Mini Web QR", "Soluciones de Impresión", "Soporte VIP"],
        color: "from-emerald-500 to-teal-500"
    }
];

export default function Services({ onOpenModal }: { onOpenModal: (type: string) => void }) {
    const services = [
        {
            id: 'marca',
            icon: <Brain className="w-8 h-8" />,
            title: "Marca Inteligente",
            description: "No solo diseñamos logotipos; creamos identidades que dominan mercados fusionando psicología del consumidor con diseño de vanguardia.",
            features: ["Brand Intelligence", "Arquitectura de Marca", "Identidad Visual", "Naming"],
            color: "from-purple-500 to-indigo-600"
        },
        {
            id: 'presencia',
            icon: <Globe className="w-8 h-8" />,
            title: "Presencia Digital",
            description: "Ecosistemas digitales donde el diseño UI/UX y el Marketing 360° trabajan para atraer, cautivar y convertir prospectos.",
            features: ["Desarrollo Web", "Estrategia 360", "SEO & Contenido", "Automatización"],
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: 'academy',
            icon: <GraduationCap className="w-8 h-8" />,
            title: "Neobranding Academy",
            description: "Formación práctica y especializada. Talleres y asesorías para que tú o tu equipo lideren la evolución de su mercado.",
            features: ["Cursos Online", "Talleres Intensivos", "Asesoría Personalizada", "Metodología Neo"],
            color: "from-orange-500 to-pink-500"
        },
        {
            id: 'soluciones',
            icon: <LayoutGrid className="w-8 h-8" />,
            title: "Soluciones Pro",
            description: "Herramientas diseñadas para acelerar tu negocio: desde hosting de alta velocidad hasta mini-webs de contacto.",
            features: ["Hosting Premium", "Mini Web QR", "Soluciones de Impresión", "Soporte VIP"],
            color: "from-emerald-500 to-teal-500"
        }
    ];

    return (
        <section id="services" className="py-32 bg-slate-950 relative overflow-hidden">
            {/* ... decoraciones ... */}
            <div className="container mx-auto px-6 relative z-10">
                {/* ... cabecera ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            onClick={() => service.id !== 'soluciones' ? onOpenModal(service.id) : window.location.href='#commercial'}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                        >
                            {/* Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-[2.5rem]`} />
                            
                            <div className={`mb-8 p-4 rounded-2xl bg-slate-800/50 w-fit text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ring-1 ring-white/10 shadow-xl`}>
                                {service.icon}
                            </div>
                            
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                                {service.title}
                            </h3>
                            
                            <p className="text-slate-400 text-sm leading-relaxed mb-8 h-20">
                                {service.description}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {service.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-center text-xs text-slate-500 gap-2">
                                        <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.color}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <a href="#" className="inline-flex items-center text-sm font-semibold text-white group/btn">
                                <span className="relative">
                                    Explorar más
                                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-purple-500 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left" />
                                </span>
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
