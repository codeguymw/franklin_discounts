import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';

export default function MobileLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-slate-50 flex justify-center sm:py-6">
            {/* Mobile Device Container Wrapper - optimized for web & PWA home-screen installs */}
            <div className="w-full max-w-md bg-white min-h-screen sm:min-h-[850px] sm:rounded-[40px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 flex flex-col relative overflow-hidden">
                
                {/* Main Dynamic Screen Content */}
                <main className="flex-1 overflow-y-auto pb-24">
                    {children}
                </main>

                {/* 🧭 Premium 5-Column Native Grid Navigation */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-2 py-3 grid grid-cols-5 items-center justify-items-center z-50">
                    
                    <button className="flex flex-col items-center gap-1 text-[#48733e] w-full">
                        <span className="text-xl">🏠</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider">Home</span>
                    </button>
                    
                    <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#48733e] transition w-full">
                        <span className="text-xl">🔍</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider">Search</span>
                    </button>
                    
                    <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#48733e] transition w-full">
                        <span className="text-xl">❤️</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider">Favorites</span>
                    </button>
                    
                    <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#48733e] transition w-full">
                        <span className="text-xl">👤</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider">Profile</span>
                    </button>
                    
                    {/* Fixed Log Out: Removed w-full, matches layout grid proportions flawlessly */}
                    <Link 
                        href={route('logout')} 
                        method="post" 
                        as="button" 
                        className="flex flex-col items-center gap-1 text-slate-400 hover:text-red-600 transition w-full"
                    >
                        <span className="text-xl">🚪</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider">Log Out</span>
                    </Link>
                    
                </div>

            </div>
        </div>
    );
}