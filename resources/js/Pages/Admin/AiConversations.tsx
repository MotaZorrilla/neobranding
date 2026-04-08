import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
    MessageSquare, 
    Sparkles, 
    User, 
    Bot, 
    Calendar, 
    Clock, 
    Globe, 
    Search,
    ChevronRight,
    ArrowLeft
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    lead?: any;
    created_at: string;
}

export default function AiConversations({ conversations }: { conversations: { data: AiConversation[] } }) {
    const [selectedChat, setSelectedChat] = useState<AiConversation | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredConversations = conversations.data.filter(chat => 
        chat.session_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.messages.some(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => window.history.back()}
                        className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-colors lg:hidden"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter flex items-center gap-3">
                            <Sparkles className="w-6 h-6 text-purple-500" />
                            Neo <span className="text-purple-500 text-sm">Intelligence</span>
                        </h2>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Visor de interacciones de IA</p>
                    </div>
                </div>
            }
        >
            <Head title="Neo AI Conversations" />

            <div className="h-[calc(100vh-160px)] flex gap-6 max-w-[1600px] mx-auto overflow-hidden">
                
                {/* LISTA DE CHATS (Sidebar Izquierdo) */}
                <aside className={`
                    flex-col w-full lg:w-96 bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden flex
                    ${selectedChat ? 'hidden lg:flex' : 'flex'}
                `}>
                    <div className="p-6 border-b border-white/5 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input 
                                type="text" 
                                placeholder="Buscar en charlas..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                        {filteredConversations.map((chat) => (
                            <button
                                key={chat.id}
                                onClick={() => setSelectedChat(chat)}
                                className={`w-full p-5 rounded-3xl transition-all text-left group border ${
                                    selectedChat?.id === chat.id 
                                    ? 'bg-purple-600 border-purple-500 shadow-lg shadow-purple-600/20' 
                                    : 'bg-transparent border-transparent hover:bg-white/5'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                            selectedChat?.id === chat.id ? 'bg-white/20 text-white' : 'bg-purple-500/10 text-purple-400'
                                        }`}>
                                            <MessageSquare className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className={`font-bold text-sm ${selectedChat?.id === chat.id ? 'text-white' : 'text-slate-200'}`}>
                                                Sesión {chat.session_id.substring(0, 6)}
                                            </div>
                                            <div className={`text-[10px] font-medium ${selectedChat?.id === chat.id ? 'text-white/60' : 'text-slate-500'}`}>
                                                {chat.messages.length} mensajes
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`text-[9px] font-bold ${selectedChat?.id === chat.id ? 'text-white/40' : 'text-slate-600'}`}>
                                        {new Date(chat.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <p className={`text-xs line-clamp-1 italic ${selectedChat?.id === chat.id ? 'text-white/70' : 'text-slate-400'}`}>
                                    "{chat.messages[chat.messages.length - 1]?.content}"
                                </p>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* VISOR DE CONVERSACIÓN (Derecha) */}
                <main className={`
                    flex-1 bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col relative
                    ${!selectedChat ? 'hidden lg:flex' : 'flex'}
                `}>
                    <AnimatePresence mode="wait">
                        {selectedChat ? (
                            <motion.div 
                                key={selectedChat.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col h-full"
                            >
                                {/* Header del Chat */}
                                <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => setSelectedChat(null)}
                                            className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white lg:hidden"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </button>
                                        <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/20">
                                            <Bot className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-black text-lg uppercase tracking-tight">Charla con Neo</h3>
                                            <div className="flex items-center gap-4 mt-1">
                                                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase">
                                                    <Calendar className="w-3 h-3" /> {new Date(selectedChat.created_at).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase">
                                                    <Clock className="w-3 h-3" /> {new Date(selectedChat.created_at).toLocaleTimeString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="hidden md:flex flex-col items-end">
                                        <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">
                                            Status: {selectedChat.status}
                                        </div>
                                        <div className="text-[9px] text-slate-600 font-bold tracking-tighter">
                                            IP: {selectedChat.metadata?.ip || 'N/A'}
                                        </div>
                                    </div>
                                </div>

                                {/* Mensajes */}
                                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-slate-950/20">
                                    {selectedChat.messages.map((msg, i) => (
                                        <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                            <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border ${
                                                msg.role === 'ai' ? 'bg-purple-900/30 text-purple-400 border-purple-500/20' : 'bg-slate-800 text-slate-400 border-white/5'
                                            }`}>
                                                {msg.role === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                                            </div>
                                            <div className={`max-w-2xl space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
                                                <div className={`p-5 rounded-3xl text-sm leading-relaxed shadow-sm ${
                                                    msg.role === 'ai' 
                                                        ? 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-white/5' 
                                                        : 'bg-blue-600 text-white rounded-tr-none'
                                                }`}>
                                                    {msg.content}
                                                </div>
                                                <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest px-1">
                                                    {new Date(msg.created_at).toLocaleTimeString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-30">
                                <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center mb-8 border border-white/5">
                                    <Sparkles className="w-12 h-12 text-slate-500" />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Selecciona una interacción</h3>
                                <p className="max-w-xs text-slate-400 text-sm leading-relaxed">
                                    Elige un chat de la lista izquierda para analizar la conversación y calificar al prospecto.
                                </p>
                            </div>
                        )}
                    </AnimatePresence>
                </main>

            </div>
        </AuthenticatedLayout>
    );
}
