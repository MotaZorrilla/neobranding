import { motion } from 'framer-motion';
import { Check, Zap, Shield, Globe, MousePointerClick, ArrowRight as ArrowRightIcon } from 'lucide-react';

const plans = [
    {
        name: "Plan Básico",
        tagline: "Emprendedores y Profesionales",
        price: "25.000",
        features: [
            "Dominio .CL por 1 año",
            "Hosting 1 GB por 1 año",
            "Cpanel y SSL Incluido",
            "Cuentas de Correos Limitadas",
            "Diseño en WordPress + Elementor",
            "Sin Plantillas, 100% Personalizado",
            "Botón de Whatsapp"
        ],
        icon: <Shield className="w-6 h-6" />,
        color: "from-blue-500/20 to-indigo-500/20",
        borderColor: "border-blue-500/20",
        popular: false
    },
    {
        name: "Plan Crece",
        tagline: "Locales, Catálogos, PYMES",
        price: "35.000",
        features: [
            "Dominio .CL por 1 año",
            "Hosting 3 GB por 1 año",
            "Cpanel y SSL Incluido",
            "Cuentas de Correos Limitadas",
            "Garantía 99.98% Uptime",
            "Copia de Seguridad Mensuales",
            "Diseño en WordPress + Elementor",
            "Botón de Whatsapp Pro"
        ],
        icon: <Zap className="w-6 h-6 text-yellow-400" />,
        color: "from-purple-500/20 to-pink-500/20",
        borderColor: "border-purple-500/50",
        popular: true
    },
    {
        name: "Plan Pro",
        tagline: "Tiendas y Proyectos VIP",
        price: "65.000",
        features: [
            "Dominio .CL por 1 año",
            "Hosting 5 GB por 1 año",
            "Cpanel y SSL Incluido",
            "Cuentas de Correos Limitadas",
            "Transferencias Ilimitadas",
            "Diseño de Tienda Online (E-commerce)",
            "Integración de Pagos",
            "Soporte Prioritario"
        ],
        icon: <Globe className="w-6 h-6" />,
        color: "from-orange-500/20 to-red-500/20",
        borderColor: "border-orange-500/20",
        popular: false
    }
];

export default function Pricing() {
    return (
        <section id="productos" className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Planes <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Inicia tu Web</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Todo lo que necesitas para que tu marca no solo exista, sino que domine su mercado. Pagos mensuales con todo incluido.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative group p-1 rounded-[2.5rem] bg-gradient-to-b ${plan.borderColor} transition-all duration-500 hover:scale-[1.02] ${plan.popular ? 'md:-translate-y-4' : ''}`}
                        >
                            <div className="relative p-8 rounded-[2.4rem] bg-slate-900/90 backdrop-blur-xl h-full flex flex-col">
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[10px] font-bold uppercase tracking-widest text-white">
                                        Más Recomendado
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                                        <p className="text-slate-500 text-xs">{plan.tagline}</p>
                                    </div>
                                    <div className={`p-3 rounded-2xl bg-slate-800 ring-1 ring-white/10`}>
                                        {plan.icon}
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-sm font-medium text-slate-400">$</span>
                                        <span className="text-5xl font-bold text-white">{plan.price}</span>
                                        <span className="text-slate-500 text-sm">/mes</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-10 flex-grow">
                                    {plan.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-3 text-sm text-slate-400">
                                            <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                                <Check className="w-2.5 h-2.5 text-purple-400" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <a 
                                    href={`https://wa.me/+56932277455?text=Hola%20interesado%20en%20el%20${plan.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all duration-300 ${
                                        plan.popular 
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]' 
                                        : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                                    }`}
                                >
                                    <MousePointerClick className="w-5 h-5" />
                                    Me interesa el plan
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 p-8 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-sm text-center"
                >
                    <p className="text-slate-400 mb-6">¿Necesitas algo a la medida o un proyecto más complejo?</p>
                    <a 
                        href="https://wa.me/+56932277455?text=Hola%20necesito%20un%20proyecto%20a%20medida"
                        className="text-white font-bold inline-flex items-center gap-2 group hover:text-purple-400 transition-colors"
                    >
                        Habla con un Experto 
                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
