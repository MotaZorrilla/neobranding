import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Briefcase, X } from 'lucide-react';

const projects = [
    {
        id: 1,
        image: 'images/portfolio/C1.jpg',
        title: 'Campaña Corporativa',
        category: 'Branding',
        colSpan: 'col-span-1',
        aspect: 'aspect-[3/4]'
    },
    {
        id: 2,
        image: 'images/portfolio/C2.jpg',
        title: 'Diseño Editorial',
        category: 'Print',
        colSpan: 'col-span-1',
        aspect: 'aspect-[3/4]'
    },
    {
        id: 4,
        image: 'images/portfolio/C4.jpg',
        title: 'Estrategia Digital',
        category: 'Marketing',
        colSpan: 'col-span-1',
        aspect: 'aspect-[3/4]'
    },
    {
        id: 6,
        image: 'images/portfolio/B1.jpg',
        title: 'Fotografía Producto',
        category: 'Photography',
        colSpan: 'col-span-3',
        aspect: 'aspect-[2.5/1]'
    },
];

export default function Portfolio() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section id="portfolio" className="py-24 bg-slate-950 border-t border-white/5 relative overflow-hidden">
             {/* Background Grid Pattern */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    
                    {/* Sidebar Text */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1 space-y-6 sticky top-24"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest">
                            <Briefcase className="w-3 h-3" /> Selected Works
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Portafolio <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                Reciente
                            </span>
                        </h2>
                        
                        <p className="text-slate-400 text-lg">
                            Una muestra curada de nuestra pasión por el detalle. Transformamos conceptos abstractos en piezas visuales de alto impacto.
                        </p>

                        <div className="pt-4">
                             <button className="group flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 text-white hover:bg-white hover:text-slate-950 transition-all font-medium">
                                Ver Todos los Trabajos
                                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Projects Grid */}
                    <div className="lg:col-span-2 grid grid-cols-3 gap-4">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => setSelectedImage(project.image)}
                                className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-white/5 shadow-2xl ${project.colSpan} ${project.aspect}`}
                            >
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {project.category}
                                    </span>
                                    <h3 className="text-white text-sm md:text-lg font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 leading-tight">
                                        {project.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Image Modal / Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative max-w-5xl max-h-[90vh] rounded-lg overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-slate-950 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <img 
                                src={selectedImage} 
                                alt="Project Preview" 
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
