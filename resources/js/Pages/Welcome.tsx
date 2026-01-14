import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Hero from './Sections/Hero';
import Services from './Sections/Services';
import Portfolio from './Sections/Portfolio';
import Engineering from './Sections/Engineering';
import About from './Sections/About';
import BackToTop from '@/Components/ui/BackToTop';

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="Neobranding - Renovación Digital" />
            
            <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500 selection:text-white overflow-x-hidden">
                <Navbar />

                <main>
                    <Hero />
                    <Services />
                    <Engineering />
                    <About />
                    <Portfolio />
                </main>

                <footer className="py-12 bg-slate-950 border-t border-white/5 text-center relative z-10">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                            <div className="flex items-center gap-2">
                                <img src="images/logopositivo.png" alt="Neobranding" className="h-8 opacity-80" />
                            </div>
                            <div className="text-slate-500 text-sm">
                                &copy; {new Date().getFullYear()} Neobranding. Todos los derechos reservados.
                            </div>
                        </div>
                    </div>
                </footer>

                {/* Floating Elements */}
                <BackToTop />
            </div>
        </>
    );
}
