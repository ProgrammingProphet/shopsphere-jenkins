import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Package, ShoppingCart } from 'lucide-react';

export default function Sidebar() {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: Home },
        { name: 'Users', path: '/users', icon: Users },
        { name: 'Products', path: '/products', icon: Package },
        { name: 'Orders', path: '/orders', icon: ShoppingCart },
    ];

    return (
        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-slate-200">
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                    ShopSphere
                </span>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-slate-200 text-xs text-slate-500 text-center">
                v1.0.0 Microservices
            </div>
        </aside>
    );
}
