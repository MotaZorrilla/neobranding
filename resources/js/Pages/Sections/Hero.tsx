import { motion } from 'framer-motion';
import { BackgroundBeams } from '@/Components/ui/BackgroundBeams';
import { MessageSquare, ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white">
            {/* Dynamic Background Beams */}
            <BackgroundBeams />

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
                
                {/* Text Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8 text-center lg:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-purple-400"
                    >
                        #1 Branding Estratégico & Web de Alto Impacto
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                        Impulsamos tu <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
                            Transformación Digital
                        </span>
                    </h1>
                    
                    <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        Ayudamos a emprendedores y PYMES a convertir <span className="text-white font-medium">visitantes en clientes</span> con branding estratégico y diseño web que vende.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <a 
                            href="#services"
                            className="group px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:bg-slate-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            Nuestros Servicios
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a 
                            href="https://wa.me/+56932277455?text=Hola%20quiero%20m%C3%A1s%20informaci%C3%B3n"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
                        >
                            <MessageSquare className="w-5 h-5 text-green-400" />
                            Agenda Visita Virtual
                        </a>
                    </div>
                </motion.div>

                {/* Hero Image / Visual */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    className="relative lg:scale-125 lg:ml-20"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-orange-500/20 rounded-full blur-[120px] animate-pulse" />
                    <motion.img 
                        src="images/hero.png" 
                        alt="Neobranding Experience" 
                        className="w-full max-w-2xl mx-auto object-contain drop-shadow-[0_0_80px_rgba(147,51,234,0.4)] relative z-10"
                        animate={{ y: [0, -30, 0] }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 8, 
                            ease: "easeInOut" 
                        }}
                    />
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
            >
                <span className="text-[10px] uppercase tracking-[0.3em]">Explora</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent" />
            </motion.div>
        </section>
    );
}
