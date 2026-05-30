import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function AuthenticatedLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
            {/* Top Premium Branded Navbar */}
            <nav className="bg-[#1e345e] text-white border-b border-blue-950 shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        
                        <div className="flex items-center gap-8">
                            {/* Company Logo Group */}
                            <Link href="/admin/approvals" className="flex items-center gap-3 group">
                                <img 
                                    src="/logo.png" 
                                    alt="Franklin Care Logo" 
                                    className="h-10 w-10 object-contain bg-white rounded-xl p-1 transition transform group-hover:scale-105"
                                    onError={(e) => {
                                        // Fallback if logo.png isn't in public folder yet
                                        (e.target as HTMLElement).style.display = 'none';
                                    }}
                                />
                                <div className="leading-tight">
                                    <span className="font-black text-sm tracking-wider uppercase block text-white">Franklin Care</span>
                                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">Perks Admin</span>
                                </div>
                            </Link>

                            {/* 📂 Core Navigation Tabs */}
                            <div className="hidden sm:flex space-x-2">
                                <Link 
                                    href={route('admin.approvals')} 
                                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                                        url.startsWith('/admin/approvals') 
                                            ? 'bg-[#48733e] text-white shadow-sm' 
                                            : 'text-blue-100 hover:bg-white/10'
                                    }`}
                                >
                                    🔒 Registration Queue
                                </Link>
                                
                                <Link 
                                    href={route('admin.partners')} 
                                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                                        url.startsWith('/admin/partners') 
                                            ? 'bg-[#48733e] text-white shadow-sm' 
                                            : 'text-blue-100 hover:bg-white/10'
                                    }`}
                                >
                                    🏢 Enterprise Control Hub
                                </Link>
                            </div>
                        </div>

                        {/* Right Profile Actions Dropdown */}
                        <div className="hidden sm:flex sm:items-center">
                            <div className="relative flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-2xl border border-white/10">
                                <div className="text-right">
                                    <p className="text-xs font-black text-white">{user.name}</p>
                                    <p className="text-[9px] text-emerald-400 font-bold uppercase">System Admin</p>
                                </div>
                                <Link 
                                    href={route('logout')} 
                                    method="post" 
                                    as="button" 
                                    className="text-xs bg-red-600/80 hover:bg-red-600 px-2.5 py-1 rounded-lg font-bold transition uppercase tracking-wide text-white ml-2"
                                >
                                    Exit 🚪
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Navigation Toggle Button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center p-2 rounded-xl text-blue-200 hover:bg-white/10 focus:outline-none transition"
                            >
                                <span className="text-xl">{showingNavigationDropdown ? '✕' : '☰'}</span>
                            </button>
                        </div>

                    </div>
                </div>

                {/* Mobile Slide-down Drawer Matrix */}
                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden bg-[#1e345e] border-t border-blue-950 px-4 py-3 space-y-2`}>
                    <Link 
                        href={route('admin.approvals')}
                        className={`block w-full p-3 rounded-xl text-xs font-bold uppercase tracking-wider ${url.startsWith('/admin/approvals') ? 'bg-[#48733e]' : 'text-white'}`}
                    >
                        🔒 Registration Queue
                    </Link>
                    <Link 
                        href={route('admin.partners')}
                        className={`block w-full p-3 rounded-xl text-xs font-bold uppercase tracking-wider ${url.startsWith('/admin/partners') ? 'bg-[#48733e]' : 'text-white'}`}
                    >
                        🏢 Enterprise Control Hub
                    </Link>
                    <Link 
                        method="post" 
                        href={route('logout')} 
                        as="button" 
                        className="block w-full text-left p-3 rounded-xl text-xs font-bold uppercase text-red-400 bg-red-950/20"
                    >
                        Log Out System
                    </Link>
                </div>
            </nav>

            {/* Injected Screen Panel Body */}
            <main className="animate-fadeIn">{children}</main>
        </div>
    );
}
