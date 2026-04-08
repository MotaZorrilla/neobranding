import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState, useEffect } from 'react';
import { 
    LayoutDashboard, 
    Server, 
    Inbox, 
    Settings, 
    Download, 
    LogOut, 
    User,
    ChevronRight,
    Menu,
    X,
    Bell,
    Sparkles,
    Sun,
    Moon
} from 'lucide-react';

interface NavItemProps {
    href: string;
    active: boolean;
    icon: ReactNode;
    label: string;
    onClick?: () => void;
}

const NavItem = ({ href, active, icon, label, onClick }: NavItemProps) => (
    <Link
        href={href}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
            active 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
            : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
        }`}
    >
        <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
            {icon}
        </div>
        <span className="font-bold text-sm tracking-wide">{label}</span>
        {active && (
            <div className="ml-auto">
                <ChevronRight className="w-4 h-4 opacity-50" />
            </div>
        )}
    </Link>
);

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth, leads_count = 0 } = usePage().props as any;
    const user = auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>(
        typeof window !== 'undefined' && localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
    );
    const currentRoute = route().current() || '';

    // Lógica de Cambio de Tema
    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    const navigation = [
        { href: route('dashboard'), label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, active: currentRoute === 'dashboard' },
        { href: route('ai.index'), label: 'Neo Intelligence', icon: <Sparkles className="w-5 h-5" />, active: currentRoute.startsWith('ai.') },
        { href: route('hosting-plans.index'), label: 'Planes Hosting', icon: <Server className="w-5 h-5" />, active: currentRoute.startsWith('hosting-plans') },
        { href: route('leads.index'), label: 'Bandeja Leads', icon: <Inbox className="w-5 h-5" />, active: currentRoute.startsWith('leads') },
    ];

    const secondaryNav = [
        { href: '#', label: 'Exportar Datos', icon: <Download className="w-5 h-5" />, active: false },
        { href: route('profile.edit'), label: 'Configuración', icon: <Settings className="w-5 h-5" />, active: currentRoute === 'profile.edit' },
    ];

    return (
        <div className={`min-h-screen flex overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 transition-all duration-500 transform border-r
                lg:relative lg:translate-x-0
                ${theme === 'dark' ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 shadow-xl'}
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full p-6">
                    {/* Brand */}
                    <div className="flex items-center gap-4 mb-12 px-2">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform overflow-hidden p-1.5">
                                <img src="/images/icono.png" alt="N" className="w-full h-full object-contain invert brightness-0" />
                            </div>
                            <div>
                                <h1 className={`font-black text-lg leading-tight uppercase tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Neobranding</h1>
                                <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em]">Core System</p>
                            </div>
                        </Link>
                        <button className="lg:hidden ml-auto p-2 text-slate-500 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ml-4">Menú Principal</div>
                        {navigation.map((item) => (
                            <NavItem key={item.label} {...item} />
                        ))}

                        <div className="pt-8 pb-4">
                            <div className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ml-4">Herramientas</div>
                            <div className="space-y-2">
                                {secondaryNav.map((item) => (
                                    <NavItem key={item.label} {...item} />
                                ))}
                            </div>
                        </div>
                    </nav>

                    {/* User Profile Summary */}
                    <div className="mt-auto pt-6 border-t border-white/5">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all text-left">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white border border-white/5">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`font-bold text-sm truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user.name}</div>
                                        <div className="text-slate-500 text-[10px] truncate">{user.email}</div>
                                    </div>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="bottom">
                                <Dropdown.Link href={route('profile.edit')}>Mi Perfil</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">Cerrar Sesión</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Header / Topbar */}
                <header className={`h-20 border-b px-6 flex items-center justify-between relative z-30 transition-all ${theme === 'dark' ? 'bg-slate-900/50 backdrop-blur-xl border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="flex items-center gap-4">
                        <button className="p-2 -ml-2 lg:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        {header}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Theme Toggle */}
                        <button 
                            onClick={toggleTheme}
                            className={`p-2.5 rounded-xl transition-all border ${theme === 'dark' ? 'bg-white/5 text-yellow-400 border-white/10 hover:bg-white/10' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'}`}
                            title={theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <div className="h-8 w-px bg-slate-200 dark:bg-white/5 mx-2" />

                        <Link href={route('leads.index')} className={`p-2.5 rounded-xl transition-all relative group border ${theme === 'dark' ? 'bg-white/5 text-slate-400 border-white/10 hover:text-white' : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'}`}>
                            <Bell className="w-5 h-5" />
                            {leads_count > 0 && (
                                <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-[9px] font-black text-white rounded-full flex items-center justify-center border-2 border-slate-900 animate-bounce">
                                    {leads_count}
                                </span>
                            )}
                        </Link>
                        
                        <Link 
                            href={route('logout')} 
                            method="post" 
                            as="button" 
                            className="ml-2 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-wider shadow-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Salir</span>
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto relative custom-scrollbar">
                    {/* Grid Background Effect (Sólo en modo oscuro para el look premium) */}
                    {theme === 'dark' && (
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==')] opacity-[0.03] pointer-events-none" />
                    )}
                    <div className="p-6 md:p-8 lg:p-10 relative z-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
