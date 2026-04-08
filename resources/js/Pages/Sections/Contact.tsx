import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { useForm } from '@inertiajs/react';

const contactInfo = [
    {
        country: "Chile",
        name: "René Enviado",
        role: "Director General",
        image: "images/team/rene.jpg",
        phone: "+56 9 3227 7455",
        whatsapp: "56932277455",
        email: "rene@neobranding.cl",
        location: "Santiago, Chile",
        imgStyle: { objectPosition: "95% 50%" },
        imgClass: "scale-100 group-hover:scale-110",
        whatsappMessage: "Hola René, te contacto desde el sitio web de Neobranding Chile. Me gustaría conversar sobre una oportunidad de proyecto."
    },
    {
        country: "Venezuela",
        name: "Héctor Mota",
        role: "Representante Venezuela",
        image: "images/team/hector.jpg",
        phone: "+58 414 8873615",
        whatsapp: "584148873615",
        email: "hector@neobranding.com.ve",
        location: "Ciudad Guayana, Venezuela",
        imgStyle: { objectPosition: "center 100%" },
        imgClass: "scale-100 group-hover:scale-110",
        whatsappMessage: "Hola Héctor, te contacto desde el sitio web de Neobranding Venezuela. Estoy interesado en solicitar sus servicios."
    }
];

export default function Contact({ onShowSuccess }: { onShowSuccess: () => void }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        service: 'Contacto Directo',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('leads.store'), {
            onSuccess: () => {
                reset();
                onShowSuccess();
            },
            preserveScroll: true,
        });
    };

    return (
        <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-900/10 blur-[120px] rounded-full" />
             <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-900/10 blur-[120px] rounded-full" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Hablemos de <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-black">
                            Tu Próximo Proyecto
                        </span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto"
                    >
                        Estamos listos para transformar tu visión en realidad. Contacta con nuestros representantes regionales o envíanos un mensaje directo.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto mb-20">
                    {contactInfo.map((contact, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/5 hover:border-purple-500/30 transition-all duration-500"
                        >
                            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                                <img 
                                    src={contact.image} 
                                    alt={contact.name} 
                                    style={contact.imgStyle}
                                    className={`w-full h-full object-cover transition-transform duration-700 ${contact.imgClass}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent group-hover:opacity-0 transition-opacity duration-500" />
                            </div>

                            <div className="relative p-8 h-full flex flex-col justify-end min-h-[400px]">
                                <div className="mb-auto">
                                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-white mb-4 shadow-lg">
                                        {contact.country}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div className="drop-shadow-lg">
                                        <h3 className="text-2xl font-bold text-white mb-1">{contact.name}</h3>
                                        <p className="text-purple-300 text-sm font-medium">{contact.role}</p>
                                    </div>

                                    <div className="space-y-3 pt-4 border-t border-white/10">
                                        <div className="flex items-center gap-3 text-slate-200">
                                            <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-purple-400 border border-white/5">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-medium">{contact.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-200">
                                            <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-purple-400 border border-white/5">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm truncate font-medium">{contact.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-200">
                                            <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-purple-400 border border-white/5">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-medium">{contact.location}</span>
                                        </div>
                                    </div>

                                    <a 
                                        href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full mt-4 py-3 rounded-xl bg-green-600/20 hover:bg-green-600 border border-green-600/30 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 group/btn backdrop-blur-sm"
                                    >
                                        WhatsApp <MessageCircle className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Direct Message Form */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto p-8 md:p-12 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-white mb-2">Envíanos un Mensaje Directo</h3>
                        <p className="text-slate-400 text-sm">Nuestro equipo técnico te responderá en menos de 24 horas.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nombre Completo</label>
                                <input 
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="Tu nombre..."
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Correo Electrónico</label>
                                <input 
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="tu@email.com"
                                    required
                                />
                                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Teléfono (Opcional)</label>
                            <input 
                                type="text"
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                                className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="+56 9 ..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Mensaje o Requerimiento</label>
                            <textarea 
                                rows={4}
                                value={data.message}
                                onChange={e => setData('message', e.target.value)}
                                className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                placeholder="Cuéntanos sobre tu proyecto..."
                                required
                            />
                            {errors.message && <div className="text-red-500 text-xs mt-1">{errors.message}</div>}
                        </div>

                        <button 
                            type="submit"
                            disabled={processing}
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:scale-[1.01] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(147,51,234,0.3)] disabled:opacity-50"
                        >
                            {processing ? 'Enviando...' : (
                                <>
                                    Enviar Mensaje <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
