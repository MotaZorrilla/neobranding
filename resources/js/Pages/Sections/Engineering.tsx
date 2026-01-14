import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Layers, Settings, Shield, HardHat, PlayCircle, X } from 'lucide-react';

const softwareProjects = [
    {
        icon: <Terminal className="w-6 h-6" />,
        title: "Desarrollo de Software a Medida",
        description: "Arquitecturas escalables utilizando Laravel y React. Soluciones robustas para problemas complejos de gestión de datos.",
        tags: ["PHP", "TypeScript", "SQL"]
    },
    {
        icon: <Cpu className="w-6 h-6" />,
        title: "Automatización de Procesos",
        description: "Optimización de flujos de trabajo mediante scripts inteligentes y automatización de tareas repetitivas.",
        tags: ["Python", "Node.js", "Scripts"]
    },
    {
        icon: <Layers className="w-6 h-6" />,
        title: "Infraestructura & Cloud",
        description: "Despliegue y mantenimiento de servidores Linux, configuración de entornos en DigitalOcean y AWS.",
        tags: ["Linux", "Docker", "DevOps"]
    },
    {
        icon: <Settings className="w-6 h-6" />,
        title: "Ingeniería de Sistemas",
        description: "Integración de hardware y software para soluciones industriales y de control.",
        tags: ["C++", "IoT", "Sistemas"]
    }
];

// Real Engineering Projects (Video/Images) from MzSite

const engineeringProjects = [

    {

        id: 1,

        title: "Diseño de Apartamento Moderno",

        category: "Render & Animación 3D",

        image: "images/engineering/apartamento.png",

        video: "images/engineering/Apartamento.mp4",

        description: "Visualización fotorrealista de interiores con recorrido virtual animado."

    },

    {

        id: 2,

        title: "Local Comercial",

        category: "Arquitectura Comercial",

        image: "images/engineering/comercial.jpeg",

        video: "images/engineering/comercial.mp4",

        description: "Diseño y optimización de espacios para retail y atención al público."

    },

    {

        id: 3,

        title: "Proyecto de Fachada",

        category: "Ingeniería Civil",

        image: "images/engineering/Fachada.png",

        video: "images/engineering/Fachada.mp4",

        description: "Modelado estructural y estético de exteriores para edificios residenciales."

    },

    {

        id: 4,

        title: "Complejo Turístico / Posada",

        category: "Desarrollo Turístico",

        image: "images/engineering/posada.png",

        video: "images/engineering/posada.mp4",

        description: "Planificación y diseño de infraestructuras para el sector hospitalidad."

    }

];

export default function Engineering() {
    const [selectedProject, setSelectedProject] = useState<typeof engineeringProjects[0] | null>(null);

    return (
        <section id="engineering" className="py-24 bg-slate-950 relative border-t border-white/5 overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            
            <div className="container mx-auto px-6 relative z-10 space-y-24">
                
                {/* SECTION 1: SOFTWARE ENGINEERING */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Header Text */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1 space-y-6 sticky top-24"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                            <Shield className="w-3 h-3" /> Software Lab
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Ingeniería <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                de Software
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Construimos los cimientos digitales que permiten a las empresas escalar. Arquitecturas robustas, código limpio y soluciones cloud.
                        </p>
                    </motion.div>

                    {/* Cards Grid */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {softwareProjects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-blue-500/30 hover:bg-slate-900/60 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                    {project.icon}
                                </div>
                                <h3 className="text-white text-xl font-bold mb-3 group-hover:text-blue-300 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                <div className="flex gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* SECTION 2: ENGINEERING PROJECTS (PHYSICAL) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    
                     {/* Header Text */}
                     <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1 lg:order-last space-y-6 sticky top-24"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                            <HardHat className="w-3 h-3" /> Industrial Projects
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Proyectos de <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                                Ingeniería
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Visualización y ejecución de proyectos de infraestructura. Renders fotorrealistas, recorridos 3D y supervisión técnica.
                        </p>
                    </motion.div>

                    {/* Visual Projects Grid */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                         {engineeringProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                onClick={() => setSelectedProject(project)}
                                className="group relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-white/5 cursor-pointer"
                            >
                                {/* Video Element (Preview on Hover) */}
                                {project.video ? (
                                    <video
                                        src={project.video}
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
                                ) : null}

                                {/* Fallback Image / Thumbnail */}
                                <img 
                                    src={project.image} 
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Video Indicator Icon */}
                                {project.video && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                                         <PlayCircle className="w-16 h-16 text-white/80 drop-shadow-lg" />
                                    </div>
                                )}

                                {/* Content Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 flex flex-col justify-end p-6 z-20 pointer-events-none">
                                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                                        {project.category}
                                    </span>
                                    <h3 className="text-white text-lg font-bold">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-300 text-sm mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                        {project.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Video Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4"
                            onClick={() => setSelectedProject(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                
                                {selectedProject.video ? (
                                    <video
                                        src={selectedProject.video}
                                        controls
                                        autoPlay
                                        className="w-full h-auto max-h-[80vh]"
                                    />
                                ) : (
                                    <img 
                                        src={selectedProject.image} 
                                        alt={selectedProject.title}
                                        className="w-full h-auto max-h-[80vh] object-contain" 
                                    />
                                )}
                                
                                <div className="p-6 bg-slate-900">
                                    <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
                                    <p className="text-slate-400">{selectedProject.description}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
