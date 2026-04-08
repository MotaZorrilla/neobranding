import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';
import axios from 'axios';

export default function NeoAssistant() {
    // --- ESTADO (Variables inteligentes que React vigila) ---
    const [isOpen, setIsOpen] = useState(false); // ¿El chat está abierto o cerrado?
    const [messages, setMessages] = useState([   // La lista de mensajes de la charla
        { id: 1, text: "¡Hola! Soy Neo, tu Consultor de Estrategia Digital. ¿Buscas lanzar un proyecto o escalar una marca?", sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState(""); // Lo que el usuario escribe
    const [isTyping, setIsTyping] = useState(false);  // ¿Neo está pensando? (la animación de puntitos)
    
    // --- REFERENCIAS (Para apuntar a elementos del DOM sin recargar) ---
    const messagesEndRef = useRef<HTMLDivElement>(null); // El final de la lista (para el scroll automático)
    const inputRef = useRef<HTMLInputElement>(null);    // El cajón de texto (para poner el foco al abrir)

    // --- EFECTOS (Acciones que ocurren automáticamente) ---
    
    // 1. Cuando se abre el chat, ponemos el cursor en el input automáticamente
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 300);
        }
    }, [isOpen]);

    // 2. Cada vez que hay un mensaje nuevo, bajamos el scroll automáticamente
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    // --- LÓGICA DE ENVÍO (La comunicación con Laravel) ---
    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault(); // Evitamos que la página se recargue (esencial en React)
        if (!inputValue.trim()) return; // Si no hay texto, no hacemos nada

        const userText = inputValue;
        const newUserMsg = { id: Date.now(), text: userText, sender: 'user' };
        
        setMessages(prev => [...prev, newUserMsg]); // Añadimos el mensaje del usuario al chat
        setInputValue(""); // Limpiamos el cajón
        setIsTyping(true); // Mostramos los puntitos de "Neo escribiendo..."

        try {
            // Llamamos a tu ruta /chat de Laravel
            const response = await axios.post('/chat', { message: userText });
            const aiReply = response.data.reply;
            
            // Añadimos la respuesta de Neo
            setMessages(prev => [...prev, { id: Date.now() + 1, text: aiReply, sender: 'ai' }]);
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, { 
                id: Date.now() + 1, 
                text: "Lo siento, tuve un problema al conectar. ¿Podrías reintentar o contactarnos por WhatsApp?", 
                sender: 'ai' 
            }]);
        } finally {
            setIsTyping(false); // Quitamos los puntitos de espera
        }
    };

    return (
        <div className="fixed bottom-28 right-8 z-[60] flex flex-col items-end gap-4">
            
            {/* VENTANA DEL CHAT (Solo se ve si isOpen es true) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                        className="mb-4 w-80 md:w-96 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[60vh] max-h-[550px]"
                    >
                        {/* CABECERA (Degradado premium) */}
                        <div className="p-5 bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-b border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                                    <Sparkles className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-white text-sm font-bold tracking-tight">Neo Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        <span className="text-[9px] text-green-400 uppercase font-black tracking-widest">Consultor Senior</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* ÁREA DE MENSAJES (Aquí se hace el loop) */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 scroll-smooth custom-scrollbar">
                            {messages.map((msg) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id} 
                                    className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${msg.sender === 'ai' ? 'bg-purple-900/50 text-purple-400' : 'bg-slate-700 text-slate-300'}`}>
                                        {msg.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    </div>
                                    <div className={`max-w-[80%] p-3.5 rounded-2xl text-[13px] leading-relaxed ${
                                        msg.sender === 'ai' 
                                            ? 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5' 
                                            : 'bg-purple-600 text-white rounded-tr-none shadow-lg shadow-purple-500/20'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            
                            {/* Animación de "Escribiendo..." */}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-purple-900/50 text-purple-400 flex items-center justify-center">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1 items-center h-10">
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* CAJÓN DE TEXTO */}
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-slate-900/50">
                            <div className="relative flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Consultar por un plan o servicio..."
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                                />
                                <button 
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="absolute right-2 p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-30 transition-all shadow-lg"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* BOTÓN DISPARADOR (El orbe de Neo) */}
            <motion.div
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-16 h-16 flex items-center justify-center cursor-pointer group"
            >
                {/* Outer Pulse Glow */}
                <motion.div
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full group-hover:bg-purple-400/40 transition-colors"
                />
                
                {/* Rotating Orbit Ring (RESTAURADO) */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-purple-400/20 rounded-full"
                />

                {/* Floating Core */}
                <motion.div
                    animate={{ 
                        y: [0, -8, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-10 h-10 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 rounded-2xl shadow-lg shadow-purple-500/50 flex items-center justify-center border border-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform"
                >
                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                    
                    {/* Inner Energy Point */}
                    <motion.div 
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full blur-[1px]"
                    />
                </motion.div>

                {/* Status Indicator Tooltip (RESTAURADO - MÁS PEQUEÑO Y TRASLÚCIDO) */}
                {!isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                            opacity: 1, 
                            x: 0,
                            y: [0, -8, 0] 
                        }}
                        transition={{ 
                            opacity: { delay: 0.5 },
                            x: { delay: 0.5 },
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
                        }}
                        className="absolute -left-24 bg-slate-900/40 backdrop-blur-md border border-white/5 px-3 py-1.5 rounded-lg text-[9px] font-bold text-purple-300/70 uppercase tracking-[0.2em] shadow-xl"
                    >
                        AI ASSISTANT
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
