import { useForm } from '@inertiajs/react';
import { Server, Save, Plus, Trash2, LayoutGrid, DollarSign, Wallet } from 'lucide-react';
import { useState } from 'react';

interface HostingPlan {
    id: number;
    name: string;
    space: string;
    price_usd: number;
    price_clp: number;
    is_active: boolean;
    sort_order: number;
}

export default function HostingPlansManager({ plans = [] }: { plans: HostingPlan[] }) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const { data, setData, put, post, delete: destroy, processing, reset } = useForm({
        name: '',
        space: '',
        price_usd: 0,
        price_clp: 0,
        sort_order: 0,
        is_active: true
    });

    const startEditing = (plan: HostingPlan) => {
        setEditingId(plan.id);
        setData({
            name: plan.name,
            space: plan.space,
            price_usd: plan.price_usd,
            price_clp: plan.price_clp,
            sort_order: plan.sort_order,
            is_active: plan.is_active
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            put(route('hosting-plans.update', editingId), {
                onSuccess: () => setEditingId(null)
            });
        }
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('hosting-plans.store'), {
            onSuccess: () => {
                reset();
                setEditingId(null);
            }
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este plan?')) {
            destroy(route('hosting-plans.destroy', id));
        }
    };

    return (
        <div className="bg-slate-900 shadow-2xl border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Server className="w-5 h-5 text-blue-500" />
                    Gestión de Planes de Hosting
                </h3>
                <button 
                    onClick={() => {
                        setEditingId(0);
                        reset();
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase hover:bg-blue-500 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Nuevo Plan
                </button>
            </div>

            <div className="p-8">
                <div className="grid grid-cols-1 gap-6">
                    {plans.map((plan) => (
                        <div key={plan.id} className="p-6 rounded-3xl bg-slate-950/50 border border-white/5 hover:border-white/10 transition-all group">
                            {editingId === plan.id ? (
                                <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-slate-500 font-bold uppercase ml-2">Nombre Plan</label>
                                        <input 
                                            type="text" 
                                            value={data.name} 
                                            onChange={e => setData('name', e.target.value)}
                                            className="w-full bg-slate-900 border-white/10 rounded-xl text-white text-sm focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-slate-500 font-bold uppercase ml-2">Espacio</label>
                                        <input 
                                            type="text" 
                                            value={data.space} 
                                            onChange={e => setData('space', e.target.value)}
                                            className="w-full bg-slate-900 border-white/10 rounded-xl text-white text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-slate-500 font-bold uppercase ml-2">Precio USD</label>
                                        <input 
                                            type="number" 
                                            value={data.price_usd} 
                                            onChange={e => setData('price_usd', Number(e.target.value))}
                                            className="w-full bg-slate-900 border-white/10 rounded-xl text-white text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-slate-500 font-bold uppercase ml-2">Precio CLP</label>
                                        <input 
                                            type="number" 
                                            value={data.price_clp} 
                                            onChange={e => setData('price_clp', Number(e.target.value))}
                                            className="w-full bg-slate-900 border-white/10 rounded-xl text-white text-sm"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button type="submit" disabled={processing} className="flex-1 p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all flex items-center justify-center">
                                            <Save className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => setEditingId(null)} className="flex-1 p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all">
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                            <LayoutGrid className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-lg">{plan.name}</div>
                                            <div className="text-slate-500 text-xs font-mono">{plan.space} de almacenamiento</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <div className="text-xs text-slate-500 font-bold uppercase mb-1">Tarifa USD</div>
                                            <div className="text-white font-black flex items-center justify-end gap-1">
                                                <DollarSign className="w-4 h-4 text-blue-400" />
                                                {plan.price_usd}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-slate-500 font-bold uppercase mb-1">Tarifa CLP</div>
                                            <div className="text-blue-400 font-black flex items-center justify-end gap-1">
                                                <Wallet className="w-4 h-4 opacity-50" />
                                                ${new Intl.NumberFormat('es-CL').format(plan.price_clp)}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 border-l border-white/5 pl-8">
                                            <button 
                                                onClick={() => startEditing(plan)}
                                                className="p-3 rounded-xl bg-white/5 text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                                                title="Editar Plan"
                                            >
                                                <Save className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(plan.id)}
                                                className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                                title="Eliminar Plan"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {editingId === 0 && (
                        <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/20 shadow-xl">
                            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                                <div className="space-y-1 md:col-span-1">
                                    <label className="text-[10px] text-blue-400 font-bold uppercase ml-2">Nombre Plan</label>
                                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-slate-900 border-white/10 rounded-xl text-white text-sm focus:ring-blue-500" placeholder="Ej: Plan 5 GB" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-blue-400 font-bold uppercase ml-2">Espacio</label>
                                    <input type="text" value={data.space} onChange={e => setData('space', e.target.value)} className="w-full bg-slate-900 border-white/10 rounded-xl text-white text-sm" placeholder="5 GB" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-blue-400 font-bold uppercase ml-2">Precio USD</label>
                                    <input type="number" value={data.price_usd} onChange={e => setData('price_usd', Number(e.target.value))} className="w-full bg-slate-900 border-white/10 rounded-xl text-white text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-blue-400 font-bold uppercase ml-2">Precio CLP</label>
                                    <input type="number" value={data.price_clp} onChange={e => setData('price_clp', Number(e.target.value))} className="w-full bg-slate-900 border-white/10 rounded-xl text-white text-sm" />
                                </div>
                                <div className="flex gap-2">
                                    <button type="submit" disabled={processing} className="flex-1 p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all flex items-center justify-center font-bold text-xs uppercase">
                                        Crear
                                    </button>
                                    <button onClick={() => setEditingId(null)} className="flex-1 p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all text-xs font-bold uppercase">
                                        Cerrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {plans.length === 0 && editingId === null && (
                        <div className="text-center py-20 text-slate-500 italic">
                            No hay planes configurados. Haz clic en "Nuevo Plan" para comenzar.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
