import { motion } from 'framer-motion';

const partners = [
    { name: "New Branding Ingeniería", logo: "/images/partners/nb-ingenieria.jpg" },
    { name: "New Branding Coworks", logo: "/images/partners/nb-coworks.jpg" },
    { name: "New Branding QR", logo: "/images/partners/nb-qr.jpg" },
    { name: "Guayanahost", logo: "/images/partners/guayanahost-alt.jpg" },
    { name: "Neomarketing", logo: "/images/partners/neomarketing.jpg" },
    { name: "Metros Cuadrados", logo: "/images/partners/metros-cuadrados.jpg" },
    { name: "Grupo Ambiado", logo: "/images/partners/grupo-ambiado.jpg" },
    { name: "Jd Creative", logo: "/images/partners/jd-creative.jpg" },
    { name: "New Branding Inmobiliaria", logo: "/images/partners/nb-inmobiliaria.jpg" },
    { name: "Mota Zorrilla", logo: "/images/partners/logo-mota-zorrilla.jpg" },
    { name: "MZ Personal", logo: "/images/partners/logo-mz-personal.jpg" },
    { name: "Guayanahost Chile", logo: "/images/partners/logo-guayanahost.jpg" },
];

export default function Partners() {
    return (
        <section className="bg-slate-950 relative overflow-hidden">
            {/* Full Section White Background with Diffusion */}
            <div className="relative bg-white py-24 md:py-32">
                
                {/* Upper Diffusion Gradient (Black to White) */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-950 to-white z-20" />

                <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] uppercase tracking-[0.3em] text-purple-600 font-bold"
                    >
                        Nuestros Aliados
                    </motion.span>
                    <motion.h3 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black text-slate-950 mt-2"
                    >
                        Empresas que Confían en <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Nosotros</span>
                    </motion.h3>
                </div>

                <div className="relative z-10">
                    <div className="flex overflow-hidden group">
                        <div className="flex gap-12 md:gap-16 animate-scroll whitespace-nowrap items-center">
                            {[...partners, ...partners].map((partner, index) => (
                                <div 
                                    key={index} 
                                    className="flex items-center justify-center transition-all duration-500 min-w-[180px] md:min-w-[280px] hover:scale-110 px-6"
                                >
                                    <img 
                                        src={partner.logo} 
                                        alt={partner.name} 
                                        className="h-24 md:h-40 w-auto object-contain max-w-full"
                                        title={partner.name}
                                    />
                                </div>
                            ))}
                        </div>
                        
                        {/* Side gradients for smooth horizontal fade */}
                        <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-20" />
                        <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-20" />
                    </div>
                </div>

                {/* Lower Diffusion Gradient (White to Black) */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-white z-20" />
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    display: flex;
                    width: max-content;
                    animation: scroll 40s linear infinite;
                }
                .group:hover .animate-scroll {
                    animation-play-state: paused;
                }
            `}} />
        </section>
    );
}
