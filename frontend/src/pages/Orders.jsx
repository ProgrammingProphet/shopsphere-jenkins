import { useState, useEffect } from 'react';
import { orderApi, userApi, productApi } from '../api';
import { Plus, Trash2, ShoppingBag, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ userId: '', productId: '', quantity: '1' });

    const fetchData = async () => {
        try {
            const [ordersData, usersData, productsData] = await Promise.all([
                orderApi.get(''),
                userApi.get(''),
                productApi.get('')
            ]);
            setOrders(ordersData);
            setUsers(usersData);
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                userId: parseInt(form.userId),
                productId: parseInt(form.productId),
                quantity: parseInt(form.quantity)
            };
            await orderApi.post('', payload);
            setForm({ userId: '', productId: '', quantity: '1' });
            fetchData();
        } catch (error) {
            alert('Failed to place order. Ensure the user and product exist.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await orderApi.delete(`/${id}`);
            fetchData();
        } catch (error) {
            alert('Failed to drop order');
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'CREATED': return <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded-md text-xs font-semibold"><Clock className="w-3 h-3 mr-1" /> Created</span>;
            case 'COMPLETED': return <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-xs font-semibold"><CheckCircle className="w-3 h-3 mr-1" /> Completed</span>;
            case 'FAILED': return <span className="flex items-center text-rose-600 bg-rose-50 px-2 py-1 rounded-md text-xs font-semibold"><XCircle className="w-3 h-3 mr-1" /> Failed</span>;
            default: return <span className="text-slate-500 bg-slate-100 px-2 py-1 rounded-md text-xs font-semibold">{status}</span>;
        }
    };

    if (loading) return <div className="text-slate-400">Loading orders...</div>;

    return (
        <div className="animate-in fade-in duration-500 relative">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Order Management</h1>
                    <p className="text-slate-500 mt-1">Place cross-service orders and track fulfillment.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-sm font-semibold text-slate-600">
                                <th className="p-4 pl-6">Order ID</th>
                                <th className="p-4">Reference</th>
                                <th className="p-4">Status & Total</th>
                                <th className="p-4 text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                    <td className="p-4 pl-6 font-medium text-slate-700 text-sm">#{order.id}</td>
                                    <td className="p-4">
                                        <div className="text-sm font-medium text-slate-800">User UID: {order.userId}</div>
                                        <div className="text-xs text-slate-500 mt-0.5">Product UID: {order.productId} (x{order.quantity})</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col space-y-1.5 items-start">
                                            {getStatusBadge(order.status)}
                                            <span className="text-sm font-bold text-slate-700">
                                                ${order.totalPrice?.toFixed(2)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right pr-6">
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            className="text-slate-400 hover:text-rose-500 transition-colors p-2 rounded-lg hover:bg-rose-50 opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-slate-500">No orders placed yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
                    <div className="flex items-center mb-6">
                        <div className="bg-violet-100 p-2 rounded-lg mr-3 text-violet-600">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Place Order</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Customer (User)</label>
                            <select
                                required
                                value={form.userId}
                                onChange={e => setForm({ ...form, userId: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-slate-700"
                            >
                                <option value="">Select a user...</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>#{u.id} - {u.username}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Product</label>
                            <select
                                required
                                value={form.productId}
                                onChange={e => setForm({ ...form, productId: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-slate-700"
                            >
                                <option value="">Select a product...</option>
                                {products.map(p => (
                                    <option key={p.id} value={p.id}>#{p.id} - {p.name} (${p.price})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                required
                                value={form.quantity}
                                onChange={e => setForm({ ...form, quantity: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-slate-700"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-2 bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Checkout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
