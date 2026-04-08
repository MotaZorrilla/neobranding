import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Briefcase, X, Play, Grid, Monitor, Layers } from 'lucide-react';

// Imágenes que estaban inicialmente en el portafolio (ahora a color por defecto)
const featuredProjects = [
    {
        id: 1,
        image: 'images/portfolio/C1.jpg',
        title: 'Campaña Corporativa',
        category: 'Branding',
        colSpan: 'col-span-1',
        aspect: 'aspect-[3/4]',
        type: 'image'
    },
    {
        id: 2,
        image: 'images/portfolio/C2.jpg',
        title: 'Diseño Editorial',
        category: 'Print',
        colSpan: 'col-span-1',
        aspect: 'aspect-[3/4]',
        type: 'image'
    },
    {
        id: 3,
        image: 'images/portfolio/C4.jpg',
        title: 'Estrategia Digital',
        category: 'Marketing',
        colSpan: 'col-span-1',
        aspect: 'aspect-[3/4]',
        type: 'image'
    },
    {
        id: 4,
        image: 'images/portfolio/B1.jpg',
        title: 'Fotografía Producto',
        category: 'Photography',
        colSpan: 'col-span-2 md:col-span-3',
        aspect: 'aspect-[2.5/1]',
        type: 'image'
    },
];

// Todos los proyectos para el Modal "Reel"
const allProjects = [
    ...featuredProjects,
    {
        id: 5,
        image: 'images/portfolio/centrosaludloscaneloscl.jpg',
        title: 'Centro Salud Los Canelos',
        category: 'Web Design',
        type: 'image'
    },
    {
        id: 6,
        image: 'images/portfolio/chiloemosscom.jpg',
        title: 'Chiloé Moss',
        category: 'E-commerce',
        type: 'image'
    },
    {
        id: 7,
        image: 'images/portfolio/colegioiberoamericanoeduve.jpg',
        title: 'Colegio Iberoamericano',
        category: 'Institutional Web',
        type: 'image'
    },
    {
        id: 8,
        image: 'images/portfolio/videomenu.mp4',
        thumbnail: 'images/portfolio/lomosanpedro.jpg',
        title: 'Experiencia Gastronómica',
        category: 'Motion Graphics',
        type: 'video'
    },
    {
        id: 9,
        image: 'images/portfolio/C13.jpg',
        title: 'Identidad Corporativa',
        category: 'Branding',
        type: 'image'
    },
    {
        id: 10,
        image: 'images/portfolio/contenedor.mp4',
        thumbnail: 'images/portfolio/C3.jpg', // Thumbnail corregido para Logística Inteligente
        title: 'Logística Inteligente',
        category: '3D Animation',
        type: 'video'
    },
    {
        id: 11,
        image: 'images/portfolio/B5.jpg',
        title: 'Diseño de Carnet',
        category: 'Identity & Print',
        type: 'image'
    },
    {
        id: 12,
        image: 'images/portfolio/guayanahostcomve.jpg',
        title: 'Guayana Host',
        category: 'Web Services',
        type: 'image'
    }
];

export default function Portfolio() {
    const [selectedProject, setSelectedProject] = useState<typeof allProjects[0] | null>(null);
    const [showAllModal, setShowAllModal] = useState(false);

    return (
        <section id="portfolio" className="py-24 bg-slate-950 border-t border-white/5 relative overflow-hidden">
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==')] bg-repeat" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    
                    {/* Sidebar Text */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1 space-y-6 lg:sticky lg:top-24"
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
                            Diseño estratégico y desarrollo de alto impacto. Una visión curada de nuestros proyectos más destacados.
                        </p>

                        <div className="pt-4">
                             <button 
                                onClick={() => setShowAllModal(true)}
                                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 text-white hover:bg-white hover:text-slate-950 transition-all font-medium"
                             >
                                Ver Más Trabajos
                                <Grid className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Featured Projects Grid */}
                    <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {featuredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => setSelectedProject(project)}
                                className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-white/5 shadow-2xl ${project.colSpan} ${project.aspect}`}
                            >
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                
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

            {/* --- REEL / ALL PROJECTS MODAL --- */}
            <AnimatePresence>
                {showAllModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 p-0 md:p-10"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full h-full bg-slate-900 md:rounded-[3rem] border border-white/10 overflow-hidden flex flex-col"
                        >
                            <div className="p-6 md:p-10 border-b border-white/5 flex justify-between items-center bg-slate-900/50 backdrop-blur-xl">
                                <div>
                                    <h3 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tighter">Full Portfolio <span className="text-purple-500">Reel</span></h3>
                                    <p className="text-slate-500 text-sm mt-1">Explora cada detalle de nuestra producción digital</p>
                                </div>
                                <button 
                                    onClick={() => setShowAllModal(false)}
                                    className="p-3 rounded-full bg-white/5 text-white hover:bg-white hover:text-slate-950 transition-all shadow-xl"
                                >
                                    <X className="w-8 h-8" />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto p-6 md:p-12 custom-scrollbar">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {allProjects.map((project, idx) => (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            onClick={() => setSelectedProject(project)}
                                            className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-slate-950"
                                        >
                                            {project.type === 'video' ? (
                                                <div className="relative w-full h-full">
                                                    {/* Video Preview on Hover (Like Engineering) */}
                                                    <video
                                                        src={project.image}
                                                        muted
                                                        loop
                                                        playsInline
                                                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                                                        onMouseEnter={(e) => e.currentTarget.play()}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.pause();
                                                            e.currentTarget.currentTime = 0;
                                                        }}
                                                    />
                                                    <img src={project.thumbnail} className="w-full h-full object-cover transition-all duration-500" />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:opacity-0 transition-opacity">
                                                        <div className="w-14 h-14 rounded-full bg-purple-600/20 backdrop-blur-md flex items-center justify-center border border-purple-500/30 group-hover:scale-110 transition-transform">
                                                            <Play className="w-6 h-6 text-white fill-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <img src={project.image} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
                                            )}
                                            
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                                                <span className="text-purple-400 text-[10px] font-bold uppercase tracking-widest">{project.category}</span>
                                                <h4 className="text-white font-bold text-lg">{project.title}</h4>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- SINGLE PROJECT LIGHTBOX --- */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative w-full max-w-6xl rounded-[2rem] overflow-hidden shadow-2xl bg-slate-950 border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/10 text-white hover:bg-white hover:text-slate-950 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-3/4 bg-black flex items-center justify-center min-h-[50vh] max-h-[70vh]">
                                    {selectedProject.type === 'video' ? (
                                        <video 
                                            src={selectedProject.image} 
                                            className="w-full h-auto max-h-full"
                                            controls
                                            autoPlay
                                        />
                                    ) : (
                                        <img 
                                            src={selectedProject.image} 
                                            alt={selectedProject.title} 
                                            className="w-full h-full object-contain"
                                        />
                                    )}
                                </div>
                                <div className="lg:w-1/4 p-10 bg-slate-900 border-l border-white/5 flex flex-col justify-center">
                                    <div className="mb-6">
                                        <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
                                            {selectedProject.category}
                                        </span>
                                        <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{selectedProject.title}</h3>
                                        <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                        Producción estratégica de alto impacto para potenciar la identidad digital.
                                    </p>
                                    <a 
                                        href={`https://wa.me/+56932277455?text=Hola%2C%20estoy%20viendo%20el%20proyecto%20${encodeURIComponent(selectedProject.title)}%20en%20su%20web%20y%20me%20gustar%C3%ADa%20más%20información.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-4 rounded-2xl bg-white text-slate-950 font-bold text-center hover:bg-purple-500 hover:text-white transition-all shadow-lg"
                                    >
                                        Consultar por este trabajo
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
