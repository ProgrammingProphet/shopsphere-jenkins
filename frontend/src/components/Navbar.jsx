import { Bell, Search, UserCircle } from 'lucide-react';

export default function Navbar() {
    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 transition-shadow">
            <div className="flex w-full max-w-md relative items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                    type="text"
                    placeholder="Search across modules..."
                    className="w-full bg-slate-100/50 border-0 rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                />
            </div>
            <div className="flex items-center space-x-6">
                <button className="relative text-slate-500 hover:text-indigo-600 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
                </button>
                <div className="h-8 w-px bg-slate-200"></div>
                <button className="flex items-center space-x-2 text-slate-700 hover:text-indigo-600 transition-colors">
                    <UserCircle className="w-8 h-8 text-slate-300" />
                    <div className="text-right text-sm hidden sm:block">
                        <p className="font-semibold leading-none">Admin</p>
                    </div>
                </button>
            </div>
        </header>
    );
}
