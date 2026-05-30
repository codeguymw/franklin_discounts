import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-50">
            <div className="w-full sm:max-w-md mt-6 px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-2xl border border-slate-100">
                
                {/* Brand Identity Header using the official PNG logo */}
                <div className="flex flex-col items-center mb-6">
                    <Link href="/">
                        <img 
                            src="/logo.png" 
                            alt="Franklin Logo" 
                            className="h-28 w-28 object-contain mb-2"
                        />
                    </Link>
                    
                    {/* Using exact matching Navy color from your logo */}
                    <h1 className="text-2xl font-black text-[#1e345e] tracking-tight uppercase">
                        Franklin's Discounts
                    </h1>
                    
                    {/* Using matching Green color from your logo */}
                    <p className="text-xs text-[#48733e] font-semibold tracking-wider uppercase mt-1">
                        Employee Portal
                    </p>
                </div>

                {children}
            </div>
        </div>
    );
}
