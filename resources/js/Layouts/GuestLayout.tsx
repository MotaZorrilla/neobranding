import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 pt-6 sm:pt-0 relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 mb-8">
                <Link href="/">
                    <img src="/images/logopositivo.png" alt="Neobranding" className="h-16 w-auto" />
                </Link>
            </div>

            <div className="relative z-10 w-full overflow-hidden bg-slate-900/80 backdrop-blur-xl px-6 py-8 shadow-2xl ring-1 ring-white/10 sm:max-w-md sm:rounded-2xl">
                {children}
            </div>
        </div>
    );
}