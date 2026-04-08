import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Mail, MessageSquare, Trash2, Phone, Calendar, Clock, ExternalLink, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Lead {
    id: number;
    name: string;
    company?: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    status: string;
    created_at: string;
}

export default function Leads({ leads = [] }: { leads: Lead[] }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter">
                        Bandeja de <span className="text-purple-500">Leads</span>
                    </h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Gestión de contactos recientes</p>
                </div>
            }
        >
            <Head title="Bandeja de Leads" />

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Leads Summary Table */}
                <div className="overflow-hidden bg-slate-900 shadow-2xl border border-white/5 rounded-[2.5rem]">
                    <div className="p-8 border-b border-white/5 bg-slate-950/30 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                                <Mail className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-white uppercase tracking-tighter">Mensajes Recibidos</h3>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400 font-bold uppercase tracking-widest">
                            {leads.length} Total
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-950/50">
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Cliente / Empresa</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Contacto</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Interés / Mensaje</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Fecha</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-7">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center text-slate-500 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 font-bold shadow-inner">
                                                    {lead.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-white group-hover:text-purple-400 transition-colors tracking-tight">{lead.name}</div>
                                                    {lead.company && (
                                                        <div className="flex items-center gap-1.5 text-[9px] text-blue-400 mt-1 font-black uppercase tracking-widest">
                                                            <Building2 className="w-2.5 h-2.5" />
                                                            {lead.company}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-7">
                                            <div className="space-y-1">
                                                <div className="text-[11px] text-slate-300 font-medium">{lead.email}</div>
                                                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                                                    <Phone className="w-3 h-3 text-green-500/50" />
                                                    {lead.phone || 'N/A'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-7">
                                            <div className="space-y-2">
                                                <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-white/5 text-slate-500 text-[8px] font-black uppercase tracking-widest">
                                                    {lead.service}
                                                </span>
                                                <div className="text-xs text-slate-400 max-w-xs line-clamp-2 italic font-light leading-relaxed group-hover:text-slate-200 transition-colors">
                                                    "{lead.message}"
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-7">
                                            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold">
                                                <Calendar className="w-3 h-3 opacity-50" />
                                                {new Date(lead.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-8 py-7 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                {lead.phone && (
                                                    <a 
                                                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(lead.name)},%20hemos%20recibido%20tu%20solicitud%20en%20Neobranding.%20%C2%BFC%C3%B3mo%20podemos%20ayudarte?`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-3 rounded-2xl bg-green-500/10 text-green-500 hover:bg-green-600 hover:text-white transition-all shadow-sm border border-green-500/20"
                                                        title="Contactar por WhatsApp"
                                                    >
                                                        <MessageSquare className="w-4 h-4" />
                                                    </a>
                                                )}
                                                <button className="p-3 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-500/20" title="Eliminar">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {leads.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-24 text-center">
                                            <div className="flex flex-col items-center gap-4 text-slate-500">
                                                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center opacity-30">
                                                    <Mail className="w-8 h-8" />
                                                </div>
                                                <div className="text-sm italic font-light">Bandeja de entrada vacía. Esperando nuevas oportunidades...</div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
