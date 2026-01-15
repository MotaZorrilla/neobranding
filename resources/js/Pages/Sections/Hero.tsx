import { motion } from 'framer-motion';
import { BackgroundBeams } from '@/Components/ui/BackgroundBeams';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white">
            {/* Dynamic Background Beams */}
            <BackgroundBeams />

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                
                {/* Text Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 text-center md:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <img src="images/logopositivo.png" alt="Neobranding Logo" className="h-12 md:h-16 mb-6 mx-auto md:mx-0" />
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                        Transformamos <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            Ideas Digitales
                        </span>
                    </h1>
                    
                    <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
                        Innovación técnica y diseño de vanguardia para experiencias web sublimes. 
                        Renovamos tu presencia digital.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                        <button className="px-8 py-3 rounded-full bg-white text-slate-950 font-semibold hover:bg-slate-200 transition-colors">
                            Comenzar Proyecto
                        </button>
                        <button className="px-8 py-3 rounded-full border border-slate-700 hover:bg-slate-800 transition-colors">
                            Ver Portafolio
                        </button>
                    </div>
                </motion.div>

                {/* Hero Image / Visual */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative lg:scale-110"
                >
                    <motion.img 
                        src="images/hero.png" 
                        alt="Hero Digital Art" 
                        className="w-full max-w-2xl mx-auto object-contain drop-shadow-[0_0_50px_rgba(147,51,234,0.3)]"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 6, 
                            ease: "easeInOut" 
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
