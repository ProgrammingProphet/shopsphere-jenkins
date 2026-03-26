import { useState, useEffect } from 'react';
import { productApi } from '../api';
import { Plus, Trash2, Tag, DollarSign } from 'lucide-react';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ name: '', description: '', price: '', stockQuantity: '' });

    const fetchProducts = async () => {
        try {
            const data = await productApi.get('');
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await productApi.post('', {
                ...form,
                price: parseFloat(form.price),
                stockQuantity: parseInt(form.stockQuantity, 10)
            });
            setForm({ name: '', description: '', price: '', stockQuantity: '' });
            fetchProducts();
        } catch (error) {
            alert('Failed to create product');
        }
    };

    const handleDelete = async (id) => {
        try {
            await productApi.delete(`/${id}`);
            fetchProducts();
        } catch (error) {
            alert('Failed to delete product');
        }
    };

    if (loading) return <div className="text-slate-400">Loading catalog...</div>;

    return (
        <div className="animate-in fade-in duration-500 relative">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Product Catalog</h1>
                    <p className="text-slate-500 mt-1">Manage items, descriptions, and pricing.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-sm font-semibold text-slate-600">
                                <th className="p-4 pl-6">ID</th>
                                <th className="p-4">Product</th>
                                <th className="p-4">Price / Stock</th>
                                <th className="p-4 text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                    <td className="p-4 pl-6 text-slate-500 text-sm">#{product.id}</td>
                                    <td className="p-4">
                                        <div className="font-semibold text-slate-800">{product.name}</div>
                                        <div className="text-xs text-slate-500 mt-0.5 truncate max-w-[200px]">
                                            {product.description}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col space-y-1">
                                            <span className="inline-flex items-center text-sm font-medium text-emerald-600">
                                                ${product.price?.toFixed(2)}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                {product.stockQuantity} in stock
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right pr-6">
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-slate-400 hover:text-rose-500 transition-colors p-2 rounded-lg hover:bg-rose-50 opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-slate-500">No products found. Create one to get started!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
                    <div className="flex items-center mb-6">
                        <div className="bg-emerald-100 p-2 rounded-lg mr-3 text-emerald-600">
                            <Tag className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">New Product</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                            <input
                                type="text"
                                required
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                placeholder="Product Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                            <textarea
                                required
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                placeholder="Short description..."
                                rows="2"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                                <div className="relative">
                                    <DollarSign className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={form.price}
                                        onChange={e => setForm({ ...form, price: e.target.value })}
                                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
                                <input
                                    type="number"
                                    required
                                    value={form.stockQuantity}
                                    onChange={e => setForm({ ...form, stockQuantity: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="100"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Add Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
