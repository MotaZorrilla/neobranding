import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Mail, 
    MessageSquare, 
    Users, 
    User,
    TrendingUp, 
    Server, 
    Zap, 
    Target, 
    Sparkles,
    ArrowUpRight,
    MousePointer2,
    Calendar,
    ArrowRight,
    Activity,
    Bell,
    CheckCircle2
} from 'lucide-react';
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

interface HostingPlan {
    id: number;
    name: string;
    space: string;
    price_usd: number;
    price_clp: number;
    is_active: boolean;
    sort_order: number;
}

interface AiMessage {
    id: number;
    role: 'user' | 'ai';
    content: string;
    created_at: string;
}

interface AiConversation {
    id: number;
    session_id: string;
    status: string;
    metadata: any;
    messages: AiMessage[];
    lead?: Lead;
    created_at: string;
}

export default function Dashboard({ 
    leads = [], 
    hostingPlans = [], 
    aiConversations = [],
    conversionStats = { views: '0', ctr: '0%', conversions_count: '0', uptime: '99.9%' }
}: { 
    leads: Lead[], 
    hostingPlans: HostingPlan[], 
    aiConversations: AiConversation[],
    conversionStats: { views: string, ctr: string, conversions_count: string, uptime: string }
}) {
    const stats = [
        { href: route('leads.index'), label: "Prospectos Totales", value: leads.length, icon: <Users className="w-6 h-6" />, color: "text-blue-400", bg: "bg-blue-500/10", trend: "+12%" },
        { href: route('ai.index'), label: "Conversaciones Neo", value: aiConversations.length, icon: <MessageSquare className="w-6 h-6" />, color: "text-purple-400", bg: "bg-purple-500/10", trend: "En Vivo" },
        { href: route('hosting-plans.index'), label: "Planes Activos", value: hostingPlans.length, icon: <Server className="w-6 h-6" />, color: "text-emerald-400", bg: "bg-emerald-500/10", trend: "Online" },
    ];

    const recentNotifications = leads.slice(0, 3).map(lead => ({
        title: `Nuevo Lead: ${lead.name}`,
        time: new Date(lead.created_at).toLocaleTimeString(),
        desc: lead.service,
        icon: <User className="w-4 h-4 text-blue-400" />
    }));

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-black dark:text-white text-slate-900 leading-tight uppercase tracking-tighter">
                        Control <span className="text-blue-500">Center</span>
                    </h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Monitoreo de Ecosistema Digital</p>
                </div>
            }
        >
            <Head title="Dashboard CRM" />

            <div className="space-y-8 max-w-7xl mx-auto pb-20">
                {/* Hero Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <Link 
                            key={i}
                            href={stat.href}
                            className="p-8 rounded-[2.5rem] dark:bg-slate-900 bg-white border dark:border-white/5 border-slate-200 shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500"
                        >
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity dark:text-white text-slate-900">
                                    {stat.icon}
                                </div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
                                            {stat.icon}
                                        </div>
                                        <div className="px-3 py-1 rounded-full dark:bg-white/5 bg-slate-100 border dark:border-white/5 border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            {stat.trend}
                                        </div>
                                    </div>
                                    <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.15em] mb-1">{stat.label}</div>
                                    <div className="text-4xl font-black dark:text-white text-slate-900 tracking-tighter">{stat.value}</div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Secondary KPIs & Notifications */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Activity Chart Placeholder */}
                    <div className="lg:col-span-2 p-10 rounded-[3rem] dark:bg-slate-900 bg-white border dark:border-white/5 border-slate-200 shadow-2xl relative overflow-hidden">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-xl font-black dark:text-white text-slate-900 uppercase tracking-tighter">Telemetría de Conversión</h3>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Rendimiento Real del Sitio</p>
                            </div>
                            <Activity className="w-6 h-6 text-blue-500 opacity-50" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="space-y-2">
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Visitas</div>
                                <div className="text-2xl font-black dark:text-white text-slate-900">{conversionStats.views}</div>
                                <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">Tráfico Total</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Tasa de Éxito</div>
                                <div className="text-2xl font-black dark:text-white text-slate-900">{conversionStats.ctr}</div>
                                <div className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">Conversión CTR</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Acciones Valor</div>
                                <div className="text-2xl font-black dark:text-white text-slate-900">{conversionStats.conversions_count}</div>
                                <div className="text-[10px] text-purple-500 font-bold uppercase tracking-tighter">Leads + Chats</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Disponibilidad</div>
                                <div className="text-2xl font-black dark:text-white text-slate-900">{conversionStats.uptime}</div>
                                <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">Server Online</div>
                            </div>
                        </div>
                        
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
                    </div>

                    {/* Real Notifications Section */}
                    <div className="p-8 rounded-[2.5rem] dark:bg-slate-900 bg-white border dark:border-white/5 border-slate-200 shadow-xl">
                        <h4 className="dark:text-white text-slate-900 font-black text-sm mb-6 uppercase tracking-widest flex items-center gap-2">
                            <Bell className="w-4 h-4 text-blue-500" />
                            Últimas Alertas
                        </h4>
                        <div className="space-y-4">
                            {leads.length > 0 ? leads.slice(0, 4).map((lead, idx) => (
                                <Link 
                                    key={idx}
                                    href={route('leads.index')}
                                    className="block p-4 rounded-2xl dark:bg-white/5 bg-slate-50 border dark:border-white/5 border-slate-200 group hover:border-blue-500/30 transition-all cursor-pointer"
                                >
                                    <div className="text-[9px] text-blue-500 font-bold uppercase tracking-widest mb-1">
                                        {new Date(lead.created_at).toLocaleDateString()} • {new Date(lead.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </div>
                                    <div className="dark:text-white text-slate-900 font-bold text-xs truncate">Nuevo Lead: {lead.name}</div>
                                    <div className="text-slate-500 text-[10px] mt-1 italic line-clamp-1">Interés: {lead.service}</div>
                                </Link>
                            )) : (
                                <div className="text-center py-10 opacity-30 italic text-xs">Sin notificaciones recientes</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Chat Intelligence */}
                <div className="p-10 rounded-[3rem] dark:bg-slate-900 bg-white border dark:border-white/5 border-slate-200 shadow-2xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-xl font-black dark:text-white text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-purple-500" />
                                Inteligencia de Chat (Neo)
                            </h3>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Interacciones capturadas en tiempo real</p>
                        </div>
                        <Link href={route('ai.index')} className="px-6 py-3 rounded-2xl dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-purple-600 hover:text-white transition-all flex items-center gap-2">
                            Ver Historial
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="space-y-6">
                        {aiConversations.length > 0 ? aiConversations.slice(0, 3).map((chat, idx) => (
                            <div key={idx} className="p-6 rounded-3xl dark:bg-white/5 bg-slate-50 border dark:border-white/5 border-slate-200 hover:border-purple-500/30 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-xs uppercase">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <div className="dark:text-white text-slate-900 font-bold text-sm">Sesión: {chat.session_id?.substring(0, 8)}...</div>
                                            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                                                {new Date(chat.created_at).toLocaleString()} • {chat.messages.length} mensajes
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${chat.status === 'converted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                                        {chat.status}
                                    </div>
                                </div>
                                
                                <div className="space-y-3 mt-4 border-t dark:border-white/5 border-slate-200 pt-4">
                                    {chat.messages.slice(-2).map((m, midx) => (
                                        <div key={midx} className="flex gap-3 text-xs">
                                            <span className={`font-black uppercase tracking-tighter ${m.role === 'user' ? 'text-blue-400' : 'text-purple-400'}`}>
                                                {m.role === 'user' ? 'User:' : 'Neo:'}
                                            </span>
                                            <p className="text-slate-500 line-clamp-1">{m.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-20 opacity-30">
                                <MessageSquare className="w-12 h-12 mx-auto mb-4 dark:text-white text-slate-900" />
                                <p className="text-sm font-bold uppercase tracking-widest dark:text-white text-slate-900">Aún no hay conversaciones registradas</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
