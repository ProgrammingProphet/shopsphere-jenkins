import { useState, useEffect } from 'react';
import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { userApi, productApi, orderApi } from '../api';

export default function Dashboard() {
    const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const [usersRes, productsRes, ordersRes] = await Promise.all([
                    userApi.get(''),
                    productApi.get(''),
                    orderApi.get('')
                ]);
                setStats({
                    users: usersRes.length || 0,
                    products: productsRes.length || 0,
                    orders: ordersRes.length || 0,
                });
            } catch (error) {
                console.error('Failed to fetch dashboard stats', error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const statCards = [
        { name: 'Total Users', value: stats.users, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Active Products', value: stats.products, icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { name: 'Total Orders', value: stats.orders, icon: ShoppingCart, color: 'text-violet-600', bg: 'bg-violet-100' },
        { name: 'Revenue', value: '---', icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-100' },
    ];

    if (loading) {
        return <div className="flex h-64 items-center justify-center text-slate-400">Loading metrics...</div>;
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center hover:shadow-md transition-shadow">
                            <div className={`${stat.bg} ${stat.color} p-4 rounded-xl mr-5`}>
                                <Icon className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">{stat.name}</p>
                                <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Welcome to ShopSphere Admin</h2>
                <p className="text-slate-600 leading-relaxed">
                    This is the central command center for the ShopSphere microservices architecture.
                    Navigate through the sidebar to manage Users, Products, and Orders originating from the separate backend services.
                </p>
            </div>
        </div>
    );
}
