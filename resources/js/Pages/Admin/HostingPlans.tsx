import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import HostingPlansManager from '@/Components/HostingPlansManager';

interface HostingPlan {
    id: number;
    name: string;
    space: string;
    price_usd: number;
    price_clp: number;
    is_active: boolean;
    sort_order: number;
}

export default function HostingPlans({ hostingPlans = [] }: { hostingPlans: HostingPlan[] }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter">
                        Gestión de <span className="text-blue-500">Hosting</span>
                    </h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Configuración de espacio y tarifas</p>
                </div>
            }
        >
            <Head title="Planes de Hosting" />

            <div className="max-w-5xl mx-auto">
                <HostingPlansManager plans={hostingPlans} />
            </div>
        </AuthenticatedLayout>
    );
}
