import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Hero from './Sections/Hero';
import Services from './Sections/Services';
import Pricing from './Sections/Pricing';
import Commercial from './Sections/Commercial';
import Portfolio from './Sections/Portfolio';
import Engineering from './Sections/Engineering';
import About from './Sections/About';
import Contact from './Sections/Contact';
import Partners from './Sections/Partners';
import BackToTop from '@/Components/ui/BackToTop';
import NeoAssistant from '@/Components/ui/NeoAssistant';
import { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Target, Layout, Smartphone, GraduationCap, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Shared Modal Component ---
const GenericModal = ({ isOpen, onClose, title, icon, children }: { isOpen: boolean, onClose: () => void, title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
                onClick={onClose}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-3xl rounded-full" />
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-slate-400">
                        <X className="w-6 h-6" />
                    </button>
                    <div className="relative z-10">
                        <div className="mb-6">{icon}</div>
                        <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
                        {children}
                        <button onClick={onClose} className="mt-12 w-full py-4 rounded-2xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors">
                            Cerrar
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

export default function Welcome({ auth, hostingPlans = [] }: PageProps & { hostingPlans: any[] }) {
    const [legalModal, setLegalModal] = useState({ open: false, type: 'mision' });
    const [serviceModal, setServiceModal] = useState<{ open: boolean, type: string | null }>({ open: false, type: null });
    const [successModal, setSuccessModal] = useState(false);

    const legalContent = {
        mision: {
            title: "Misión & Visión",
            icon: <Target className="w-12 h-12 text-purple-500" />,
            content: (
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h4 className="text-purple-400 font-bold text-sm uppercase tracking-widest">Nuestra Misión</h4>
                        <p className="text-slate-300 leading-relaxed">Empoderar a emprendedores y empresas mediante soluciones digitales disruptivas que fusionan ingeniería de software de alto nivel con estrategias de branding emocional.</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-purple-400 font-bold text-sm uppercase tracking-widest">Nuestra Visión</h4>
                        <p className="text-slate-300 leading-relaxed">Ser el referente líder en transformación digital en Latinoamérica para 2030, reconocidos por humanizar la tecnología.</p>
                    </div>
                </div>
            )
        },
        valores: {
            title: "Nuestros Valores",
            icon: <CheckCircle2 className="w-12 h-12 text-emerald-500" />,
            content: (
                <div className="space-y-6 text-slate-300">
                    <p>• <strong className="text-white">Innovación Constante:</strong> No seguimos tendencias, las creamos.</p>
                    <p>• <strong className="text-white">Excelencia Sublime:</strong> Cada píxel y cada línea de código deben rozar la perfección.</p>
                    <p>• <strong className="text-white">Integridad Humana:</strong> Anteponemos la ética en cada relación comercial.</p>
                </div>
            )
        },
        politicas: {
            title: "Términos & Políticas",
            icon: <ShieldCheck className="w-12 h-12 text-blue-500" />,
            content: (
                <div className="space-y-6 text-slate-300">
                    <p>Cumplimos con estándares internacionales de protección de datos y propiedad intelectual. Todos nuestros desarrollos incluyen garantía técnica y soporte especializado.</p>
                </div>
            )
        }
    };

    const serviceContent = {
        marca: {
            title: "Marca Inteligente",
            icon: <Layout className="w-12 h-12 text-purple-500" />,
            content: (
                <div className="space-y-6 text-slate-300">
                    <p>Fusión de psicología del consumidor y diseño de alto nivel. Creamos identidades que no solo se ven bien, sino que dominan mercados.</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Brand Intelligence & Estrategia</li>
                        <li>Arquitectura de Marca</li>
                        <li>Identidad Visual 360°</li>
                        <li>Naming Estratégico</li>
                    </ul>
                </div>
            )
        },
        presencia: {
            title: "Presencia Digital",
            icon: <Globe className="w-12 h-12 text-blue-500" />,
            content: (
                <div className="space-y-6 text-slate-300">
                    <p>Diseñamos ecosistemas donde el UI/UX y el Marketing trabajan juntos para atraer y convertir prospectos en clientes leales.</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Desarrollo Web & Apps Pro</li>
                        <li>Estrategia de Contenido & SEO</li>
                        <li>Automatización de Ventas (Funnels)</li>
                        <li>Publicidad Digital Inteligente</li>
                    </ul>
                </div>
            )
        },
        academy: {
            title: "Neobranding Academy",
            icon: <GraduationCap className="w-12 h-12 text-orange-500" />,
            content: (
                <div className="space-y-6 text-slate-300">
                    <p>Formación práctica para los líderes del futuro. Talleres y mentorías personalizadas sobre IA, Diseño y Estrategia.</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Cursos de IA aplicada</li>
                        <li>Talleres de Branding para Equipos</li>
                        <li>Asesoría Senior Directa</li>
                        <li>Certificaciones Neobranding</li>
                    </ul>
                </div>
            )
        }
    };

    const activeLegal = legalContent[legalModal.type as keyof typeof legalContent] || legalContent.mision;
    const activeService = serviceModal.type ? serviceContent[serviceModal.type as keyof typeof serviceContent] : null;

    return (
        <>
            <Head title="Neobranding - Renovación Digital" />
            
            <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500 selection:text-white overflow-x-hidden">
                <Navbar />

                <main>
                    <Hero />
                    <Services onOpenModal={(type: string) => setServiceModal({ open: true, type })} />
                    <Pricing />
                    <Commercial plans={hostingPlans} />
                    <Engineering />
                    <About />
                    <Portfolio />
                    <Contact onShowSuccess={() => setSuccessModal(true)} />
                    <Partners />
                </main>

                <footer className="relative bg-slate-950 pt-24 pb-12 overflow-hidden border-t border-white/5">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/5 blur-[120px] pointer-events-none" />
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                            <div className="space-y-6">
                                <img src="images/logotipo.png" alt="Neobranding" className="h-12 opacity-90" />
                                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                                    Impulsando la transformación digital con ingeniería de vanguardia y branding estratégico. Creamos el futuro hoy.
                                </p>
                                <div className="flex gap-4">
                                    <a href="https://www.facebook.com/neobrandingchile" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600/20 transition-colors">
                                        <span className="sr-only">Facebook</span>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    </a>
                                    <a href="https://www.instagram.com/neobranding.cl" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-600/20 transition-colors">
                                        <span className="sr-only">Instagram</span>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-white font-bold mb-6">Explorar</h4>
                                <ul className="space-y-4">
                                    <li><a href="#hero" className="text-slate-400 text-sm hover:text-purple-400 transition-colors">Inicio</a></li>
                                    <li><a href="#services" className="text-slate-400 text-sm hover:text-purple-400 transition-colors">Servicios</a></li>
                                    <li><a href="#productos" className="text-slate-400 text-sm hover:text-purple-400 transition-colors">Planes Web</a></li>
                                    <li><a href="#engineering" className="text-slate-400 text-sm hover:text-purple-400 transition-colors">Software Lab</a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white font-bold mb-6">Soluciones</h4>
                                <ul className="space-y-4">
                                    <li><a href="#productos" className="text-slate-400 text-sm hover:text-purple-400 transition-colors">Hosting Pro</a></li>
                                    <li><a href="https://neobranding.cl/qr/" target="_blank" className="text-slate-400 text-sm hover:text-purple-400 transition-colors">Mini Web QR</a></li>
                                    <li><button onClick={() => setServiceModal({ open: true, type: 'academy' })} className="text-slate-400 text-sm hover:text-purple-400 transition-colors cursor-pointer text-left">Academy</button></li>
                                    <li><a href="https://neomarketing.cl/" target="_blank" className="text-slate-400 text-sm hover:text-purple-400 transition-colors">Impresión</a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white font-bold mb-6">Institucional</h4>
                                <div className="flex flex-col gap-4">
                                    <button onClick={() => setLegalModal({ open: true, type: 'mision' })} className="text-slate-400 text-sm text-left hover:text-purple-400 transition-colors cursor-pointer">Misión y Visión</button>
                                    <button onClick={() => setLegalModal({ open: true, type: 'valores' })} className="text-slate-400 text-sm text-left hover:text-purple-400 transition-colors cursor-pointer">Nuestros Valores</button>
                                    <button onClick={() => setLegalModal({ open: true, type: 'politicas' })} className="text-slate-400 text-sm text-left hover:text-purple-400 transition-colors cursor-pointer">Términos y Políticas</button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-slate-500 text-xs">
                                &copy; {new Date().getFullYear()} <span className="text-white font-medium">Neobranding Chile</span>. Todos los derechos reservados.
                            </div>
                            
                            <a href="https://motazorrilla.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group cursor-pointer">
                                <span className="text-slate-600 text-[10px] uppercase tracking-[0.2em]">Desarrollado con ❤️ por</span>
                                <span className="text-slate-400 text-xs font-semibold group-hover:text-purple-400 transition-colors">@motaZorrilla</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                            </a>
                        </div>
                    </div>
                </footer>

                <GenericModal 
                    isOpen={legalModal.open} 
                    onClose={() => setLegalModal({ ...legalModal, open: false })}
                    title={activeLegal.title}
                    icon={activeLegal.icon}
                >
                    {activeLegal.content}
                </GenericModal>

                <GenericModal 
                    isOpen={serviceModal.open} 
                    onClose={() => setServiceModal({ ...serviceModal, open: false })}
                    title={activeService?.title || ""}
                    icon={activeService?.icon}
                >
                    {activeService?.content}
                </GenericModal>

                <GenericModal 
                    isOpen={successModal} 
                    onClose={() => setSuccessModal(false)}
                    title="¡Mensaje Enviado!"
                    icon={<CheckCircle2 className="w-16 h-16 text-emerald-500" />}
                >
                    <div className="text-center space-y-4">
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Gracias por contactar con <span className="text-white font-bold">Neobranding</span>. Nuestro equipo técnico ha recibido tu solicitud y te responderá en menos de 24 horas.
                        </p>
                        <div className="pt-4 flex justify-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                        </div>
                    </div>
                </GenericModal>

                <BackToTop />
                <NeoAssistant />
            </div>
        </>
    );
}
