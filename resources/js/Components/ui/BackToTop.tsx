import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Sparkles, X, Send, Bot, User } from 'lucide-react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "¡Hola! Soy Neo, tu asistente virtual. ¿En qué puedo ayudarte hoy?", sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        // Add User Message
        const newUserMsg = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            const responses = [
                "Estoy procesando tu solicitud en nuestros servidores neurales...",
                "¡Interesante! Como modelo en fase de prueba, sugiero contactar a René o Héctor para detalles técnicos.",
                "Mis algoritmos indican que Neobranding es la mejor opción para tu proyecto.",
                "He registrado tu interés. Pronto estaré completamente operativo con GPT-4.",
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            setMessages(prev => [...prev, { id: Date.now() + 1, text: randomResponse, sender: 'ai' }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
                    
                    {/* CHAT WINDOW */}
                    <AnimatePresence>
                        {isChatOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                                className="mb-4 w-80 md:w-96 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                                style={{ maxHeight: '500px', height: '60vh' }}
                            >
                                {/* Header */}
                                <div className="p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-white/5 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                                            <Sparkles className="w-4 h-4 text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white text-sm font-bold">Neo Assistant</h3>
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                <span className="text-[10px] text-green-400 uppercase tracking-wider">Online</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setIsChatOpen(false)}
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Messages Area */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                    {messages.map((msg) => (
                                        <div 
                                            key={msg.id} 
                                            className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                        >
                                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'ai' ? 'bg-purple-900/50 text-purple-400' : 'bg-slate-700 text-slate-300'}`}>
                                                {msg.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                            </div>
                                            <div className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${
                                                msg.sender === 'ai' 
                                                    ? 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5' 
                                                    : 'bg-purple-600 text-white rounded-tr-none'
                                            }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-purple-900/50 text-purple-400 flex items-center justify-center">
                                                <Bot className="w-4 h-4" />
                                            </div>
                                            <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1 items-center h-10">
                                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <form onSubmit={handleSendMessage} className="p-3 border-t border-white/5 bg-black/20">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Escribe tu consulta..."
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                                        />
                                        <button 
                                            type="submit"
                                            disabled={!inputValue.trim()}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 transition-all"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* AI Assistant Animation Trigger */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 20 }}
                        onClick={() => setIsChatOpen(!isChatOpen)}
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
                        
                        {/* Rotating Orbit Ring */}
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

                        {/* Status Indicator Tooltip (Synced Floating) */}
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ 
                                opacity: 1, 
                                x: 0,
                                y: [0, -8, 0] // Synced with the orb's floating animation
                            }}
                            transition={{ 
                                opacity: { delay: 0.5 },
                                x: { delay: 0.5 },
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut" } // Matching duration
                            }}
                            className="absolute -left-24 bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-bold text-purple-300 uppercase tracking-widest shadow-xl"
                        >
                            AI ASSISTANT
                        </motion.div>
                    </motion.div>

                    {/* Back to Top Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        className="p-4 rounded-full bg-slate-900 border border-white/10 text-white shadow-xl hover:bg-purple-600 hover:border-purple-500 transition-colors focus:outline-none group"
                        aria-label="Volver arriba"
                    >
                        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                </div>
            )}
        </AnimatePresence>
    );
}
