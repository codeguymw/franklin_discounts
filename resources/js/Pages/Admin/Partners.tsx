import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';

interface Partner { id: number; name: string; address: string; partner_code: string; logo_path: string | null; phone_number?: string; }
interface Category { id: number; name: string; icon_emoji: string; }
interface Discount { id: number; title: string; applies_to: string; partner: { name: string }; category: { name: string }; }
interface User { id: number; name: string; email: string; employee_id: string; status: string; }

interface Redemption {
    id: number;
    user: { name: string };
    discount: { title: string; partner: { name: string } };
    total_spent: string;
    amount_saved: string;
    verification_method: string;
    receipt_image_path: string | null;
    status: 'pending' | 'approved' | 'declined';
}

interface CategorySavings {
    label: string;
    amount: number;
    percentage: number;
}

interface ReportingData {
    total_company_savings: number;
    pending_audit_count: number;
    total_transactions_count: number;
    category_savings: CategorySavings[];
    engagement_percentage: number;
}

export default function Partners({ partners = [], categories = [], discounts = [], reports, recent_redemptions = [], pending_users = [] }: { 
    partners: Partner[], categories: Category[], discounts: Discount[], reports: ReportingData, recent_redemptions: Redemption[], pending_users?: User[]
}) {
    // Multi-Page View Navigation Controller
    const [activeTab, setActiveTab] = useState<'analytics' | 'partners' | 'discounts' | 'employees' | 'audits'>('analytics');

    const partnerForm = useForm({ name: '', address: '', phone_number: '', partner_code: '', logo: null as File | null });
    const discountForm = useForm({ partner_id: '', category_id: '', title: '', applies_to: '', type: 'percentage', value: '', frequency: 'recurring', is_featured: false });
    const categoryForm = useForm({ name: '', icon_emoji: '🏷️' });
    const auditForm = useForm({ status: '', admin_notes: '' });
    const approvalForm = useForm({});

    const handleAuditSubmit = (id: number, status: 'approved' | 'declined') => {
        if(confirm(`Are you sure you want to mark this transaction as ${status}?`)) {
            auditForm.setData({ status, admin_notes: 'Verified by Corporate Audit' });
            auditForm.post(route('admin.redemptions.audit', id));
        }
    };

    const handleEmployeeApprove = (id: number) => {
        if (confirm('Approve this employee for corporate perks access?')) {
            approvalForm.post(route('admin.approve', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-black text-xl text-[#1e345e] leading-tight uppercase tracking-wider">Enterprise Management Hub</h2>}
        >
            <Head title="Enterprise Administration Hub" />

            <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 🗺️ ENTERPRISE SUB-BAR SYSTEM VIEW CONTROLLER */}
                <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4 mb-6">
                    <button onClick={() => setActiveTab('analytics')} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${activeTab === 'analytics' ? 'bg-[#1e345e] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                        📈 Core Analytics
                    </button>
                    <button onClick={() => setActiveTab('partners')} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${activeTab === 'partners' ? 'bg-[#1e345e] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                        🏢 Partner Directory ({partners.length})
                    </button>
                    <button onClick={() => setActiveTab('discounts')} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${activeTab === 'discounts' ? 'bg-[#1e345e] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                        Add Deal
                    </button>
                    <button onClick={() => setActiveTab('employees')} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition relative ${activeTab === 'employees' ? 'bg-[#1e345e] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                        👥 Caregiver Approvals
                        {pending_users.length > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] h-4 w-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                                {pending_users.length}
                            </span>
                        )}
                    </button>
                    <button onClick={() => setActiveTab('audits')} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition relative ${activeTab === 'audits' ? 'bg-[#1e345e] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                        📜 Discounts Pipeline
                        {reports.pending_audit_count > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[9px] px-1 rounded-full flex items-center justify-center font-bold">
                                {reports.pending_audit_count}
                            </span>
                        )}
                    </button>
                </div>

                {/* PAGE PAGE CONTENT DELIVERER LOOP */}
                
               {/* PAGE 1: CORE REAL-TIME ANALYTICS PAGE */}
                {activeTab === 'analytics' && (
                    <div className="space-y-6 animate-fadeIn">
                        
                        {/* TOP KPI CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="bg-gradient-to-br from-[#1e345e] to-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                                <span className="text-[10px] font-black uppercase tracking-wider text-blue-200">💰 Collective Savings Volume</span>
                                <h4 className="text-4xl font-black tracking-tight mt-3">${Number(reports.total_company_savings || 0).toFixed(2)}</h4>
                                <p className="text-[10px] text-blue-300/60 mt-2">Total money saved by Franklin caregivers</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
                                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">⏳ Pending Audit Queue</span>
                                <h4 className="text-4xl font-black tracking-tight text-amber-600 mt-3">{reports.pending_audit_count || 0} Files</h4>
                                <p className="text-[10px] text-slate-400 mt-2">Receipts awaiting corporate verification</p>
                            </div>

                            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between">
                                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">📈 Caregiver Benefit Utilization</span>
                                <h4 className="text-4xl font-black tracking-tight text-[#48733e] mt-3">{reports.total_transactions_count || 0} Claims</h4>
                                <p className="text-[10px] text-emerald-700/60 mt-2">Total approved deals redeemed by staff</p>
                            </div>
                        </div>

                        {/* VISUAL DATA DASHBOARDS */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            
                            {/* Visual Chart 1: Savings by Category (Fully Dynamic Matrix) */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="font-black text-xs uppercase text-[#1e345e] tracking-widest mb-1">Savings by Vendor Category</h3>
                                <p className="text-[10px] text-gray-400 font-medium mb-6">Real-time breakdown of financial distribution across active categories.</p>
                                
                                <div className="space-y-4">
                                    {!reports.category_savings || reports.category_savings.length === 0 ? (
                                        <div className="text-center py-8 text-xs font-bold text-slate-400 border border-dashed rounded-xl bg-slate-50/50">
                                            📊 No data logged yet. Metrics populate automatically upon claim approvals.
                                        </div>
                                    ) : (
                                        reports.category_savings.map((cat: any, idx: number) => (
                                            <div key={idx}>
                                                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                                                    <span>{cat.label}</span>
                                                    <span>${Number(cat.amount).toFixed(2)} ({cat.percentage}%)</span>
                                                </div>
                                                <div className="w-full bg-slate-100 rounded-full h-2.5">
                                                    <div 
                                                        className="bg-[#1e345e] h-2.5 rounded-full transition-all duration-500" 
                                                        style={{ width: `${cat.percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Visual Chart 2: Platform Engagement Matrix */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
                                <h3 className="font-black text-xs uppercase text-[#1e345e] tracking-widest mb-1">Platform Engagement Matrix</h3>
                                <p className="text-[10px] text-gray-400 font-medium mb-6">Current account adoption metrics and operational data flags.</p>
                                
                                <div className="flex-1 flex flex-wrap items-center justify-center gap-8 py-2">
                                    {/* Dynamic CSS-based Circular Percentage Chart representation */}
                                    <div className="relative h-28 w-28 flex items-center justify-center rounded-full border-8 border-slate-100 shadow-inner">
                                        <div 
                                            className="absolute inset-0 rounded-full border-8 border-[#48733e] border-t-transparent border-l-transparent transform"
                                            style={{ transform: `rotate(${((reports.engagement_percentage || 0) * 3.6) - 45}deg)` }}
                                        ></div>
                                        <div className="text-center z-10">
                                            <span className="block text-xl font-black text-slate-800">{reports.engagement_percentage || 0}%</span>
                                            <span className="block text-[7px] font-bold uppercase text-slate-400 tracking-tighter">Approved Staff</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 flex-1 min-w-[150px]">
                                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                                            <span className="block text-[10px] font-black uppercase text-slate-400">Caregiver Approvals</span>
                                            <span className="block text-base font-black text-slate-800">
                                                {pending_users && pending_users.length > 0 ? (
                                                    <span className="text-rose-500">{pending_users.length} Action Required</span>
                                                ) : (
                                                    <span className="text-[#48733e]">Fully Approved</span>
                                                )}
                                            </span>
                                        </div>
                                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                                            <span className="block text-[10px] font-black uppercase text-slate-400">Active Vendor Offers</span>
                                            <span className="block text-base font-black text-slate-800">{discounts.length} Active Deals</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* PAGE 2: PARTNER DIRECTORY & CREATION MANAGEMENT */}
                {activeTab === 'partners' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-fit">
                            <h3 className="text-xs font-black text-[#1e345e] uppercase tracking-wider mb-4">Register Corporate Partner</h3>
                            <form onSubmit={(e) => { e.preventDefault(); partnerForm.post(route('admin.partners.store'), { onSuccess: () => partnerForm.reset() }) }} className="space-y-3">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Vendor Name</label>
                                    <input type="text" placeholder="e.g., Burger Haven" value={partnerForm.data.name} onChange={e => partnerForm.setData('name', e.target.value)} className="block w-full rounded-lg border-gray-200 text-xs focus:ring-[#1e345e]" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Physical Address</label>
                                    <input type="text" placeholder="Street Address, City" value={partnerForm.data.address} onChange={e => partnerForm.setData('address', e.target.value)} className="block w-full rounded-lg border-gray-200 text-xs" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Phone Link</label>
                                    <input type="text" placeholder="(555) 000-0000" value={partnerForm.data.phone_number} onChange={e => partnerForm.setData('phone_number', e.target.value)} className="block w-full rounded-lg border-gray-200 text-xs" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">4-Digit Security Code PIN</label>
                                    <input type="text" placeholder="1234" maxLength={4} value={partnerForm.data.partner_code} onChange={e => partnerForm.setData('partner_code', e.target.value)} className="block w-full rounded-lg border-gray-200 text-xs font-mono tracking-widest text-center" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Brand Identity Logo File</label>
                                    <input type="file" onChange={e => partnerForm.setData('logo', e.target.files ? e.target.files[0] : null)} className="block w-full text-[11px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-[11px] file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
                                </div>
                                <button type="submit" className="w-full bg-[#1e345e] hover:bg-slate-800 text-white font-black py-2.5 px-4 rounded-lg text-xs transition uppercase tracking-wider mt-2">
                                    Publish Partner Profile
                                </button>
                            </form>
                        </div>

                        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="text-xs font-black text-[#1e345e] uppercase tracking-wider mb-4">Active System Brand Directory</h3>
                            {partners.length === 0 ? (
                                <p className="text-xs text-gray-400 font-bold py-6 text-center border border-dashed rounded-xl">No corporate partners saved in database.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {partners.map(p => (
                                        <div key={p.id} className="p-3 border border-gray-100 rounded-xl flex items-center gap-3 bg-gray-50/50">
                                            <div className="h-10 w-10 bg-white border rounded-lg overflow-hidden flex items-center justify-center p-1 shrink-0">
                                                {p.logo_path ? <img src={p.logo_path} className="h-full w-full object-contain" /> : <span className="text-lg">🏢</span>}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h5 className="font-black text-gray-800 text-xs truncate">{p.name}</h5>
                                                <p className="text-[10px] text-gray-400 font-medium truncate mt-0.5">📍 {p.address}</p>
                                                <span className="inline-block mt-1 text-[9px] bg-slate-200 text-slate-800 font-mono px-1.5 py-0.5 rounded">PIN: {p.partner_code}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* PAGE 3: DISCOUNTS MATRIX & CONFIGURATION LAYER */}
                {activeTab === 'discounts' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                        <div className="space-y-6">
                            {/* Category Creation Card */}
                            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="text-xs font-black text-[#1e345e] uppercase tracking-wider mb-4">Create Category Vertical</h3>
                                <form onSubmit={(e) => { e.preventDefault(); categoryForm.post(route('admin.categories.store'), { onSuccess: () => categoryForm.reset() }) }} className="space-y-3">
                                    <input type="text" placeholder="e.g., Food & Dining" value={categoryForm.data.name} onChange={e => categoryForm.setData('name', e.target.value)} className="block w-full rounded-lg border-gray-200 text-xs" required />
                                    <input type="text" placeholder="Icon Emoji (e.g., 🍔)" value={categoryForm.data.icon_emoji} onChange={e => categoryForm.setData('icon_emoji', e.target.value)} className="block w-full rounded-lg border-gray-200 text-xs" required />
                                    <button type="submit" className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg text-xs transition uppercase tracking-wider">Save Category</button>
                                </form>
                            </div>

                            {/* Discount Form Injection Block */}
                            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="text-xs font-black text-[#1e345e] uppercase tracking-wider mb-4">Inject Live Deal Offer</h3>
                                <form onSubmit={(e) => { e.preventDefault(); discountForm.post(route('admin.discounts.store'), { onSuccess: () => discountForm.reset() }) }} className="space-y-3">
                                    <select value={discountForm.data.partner_id} onChange={e => discountForm.setData('partner_id', e.target.value)} className="w-full text-xs rounded-lg border-gray-200" required>
                                        <option value="">Select Vendor...</option>
                                        {partners.map(p => <option key={p.id} value={p.id.toString()}>{p.name}</option>)}
                                    </select>
                                    <select value={discountForm.data.category_id} onChange={e => discountForm.setData('category_id', e.target.value)} className="w-full text-xs rounded-lg border-gray-200" required>
                                        <option value="">Select Category Vertical...</option>
                                        {categories.map(c => <option key={c.id} value={c.id.toString()}>{c.icon_emoji} {c.name}</option>)}
                                    </select>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input type="text" placeholder="Deal String (e.g., 20% OFF)" value={discountForm.data.title} onChange={e => discountForm.setData('title', e.target.value)} className="w-full text-xs rounded-lg border-gray-200" required />
                                        <input type="text" placeholder="Applies To (e.g., Entire Menu)" value={discountForm.data.applies_to} onChange={e => discountForm.setData('applies_to', e.target.value)} className="w-full text-xs rounded-lg border-gray-200" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <select value={discountForm.data.type} onChange={e => discountForm.setData('type', e.target.value)} className="text-xs rounded-lg border-gray-200">
                                            <option value="percentage">Percentage (%)</option>
                                            <option value="flat_rate">Flat Rate ($)</option>
                                        </select>
                                        <input type="number" placeholder="Value Matrix" value={discountForm.data.value} onChange={e => discountForm.setData('value', e.target.value)} className="text-xs rounded-lg border-gray-200" required />
                                    </div>
                                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg px-3">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-tight">Feature on Home Feed?</label>
                                        <input type="checkbox" checked={discountForm.data.is_featured} onChange={e => discountForm.setData('is_featured', e.target.checked)} className="rounded text-[#48733e] focus:ring-0" />
                                    </div>
                                    <button type="submit" className="w-full bg-[#48733e] hover:bg-[#3b5e32] text-white font-black py-2.5 px-4 rounded-lg text-xs transition uppercase tracking-wider">Bind & Save Deal</button>
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="text-xs font-black text-[#1e345e] uppercase tracking-wider mb-4">Active Network Program Deals</h3>
                            {discounts.length === 0 ? (
                                <p className="text-xs text-gray-400 font-bold py-8 text-center border-2 border-dashed border-gray-100 rounded-xl">No perks mapped to system vendors.</p>
                            ) : (
                                <div className="space-y-2">
                                    {discounts.map(d => (
                                        <div key={d.id} className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between text-xs">
                                            <div>
                                                <h5 className="font-black text-gray-800">{d.partner?.name}</h5>
                                                <p className="text-gray-400 font-medium text-[11px] mt-0.5">{d.applies_to} • <span className="text-gray-500 uppercase tracking-wide font-bold">{d.category?.name}</span></p>
                                            </div>
                                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] px-2.5 py-1 rounded-full font-black">
                                                {d.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* PAGE 4: CAREGIVER / EMPLOYEE APPROVAL LOGIC SCREEN */}
                {activeTab === 'employees' && (
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm animate-fadeIn">
                        <h3 className="text-xs font-black text-[#1e345e] uppercase tracking-wider mb-2">Pending Employee Requests</h3>
                        <p className="text-xs text-gray-400 font-medium mb-4">These caregivers have signed up and are waiting for corporate account verification access.</p>
                        
                        {pending_users.length === 0 ? (
                            <p className="text-gray-500 text-xs py-8 text-center border border-dashed rounded-xl bg-gray-50 font-bold">No pending employee approval requests at the moment.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 text-xs">
                                    <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-wider text-left">
                                        <tr>
                                            <th className="px-6 py-3">Caregiver Name</th>
                                            <th className="px-6 py-3">Employee ID Number</th>
                                            <th className="px-6 py-3">System Email</th>
                                            <th className="px-6 py-3 text-right">Action Gate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100 font-medium text-gray-700">
                                        {pending_users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50/60">
                                                <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-500">{user.employee_id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <button 
                                                        onClick={() => handleEmployeeApprove(user.id)}
                                                        className="bg-green-600 hover:bg-green-700 text-white font-black px-4 py-1.5 rounded-lg text-[11px] uppercase tracking-wide transition shadow-xs"
                                                    >
                                                        Approve Employee
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* PAGE 5: REDEMPTION TRACKER & TRANSACTION AUDIT STREAM */}
                {activeTab === 'audits' && (
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm animate-fadeIn">
                        <h3 className="font-black text-xs text-[#1e345e] uppercase tracking-wider mb-2">Proof of Redemption Audit Stream</h3>
                        <p className="text-xs text-gray-400 font-medium mb-4">Verify receipt image snapshots uploaded from caregiver smartphones or review merchant-verified PIN records.</p>
                        
                        {recent_redemptions.length === 0 ? (
                            <p className="text-xs text-gray-400 font-bold py-8 text-center border border-dashed rounded-xl bg-gray-50">No deal transactions logged in system database pipelines.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-100 text-xs">
                                    <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-wider text-left">
                                        <tr>
                                            <th className="p-3">Employee Caregiver</th>
                                            <th className="p-3">Vendor Deal Profile</th>
                                            <th className="p-3">Receipt Volume ($)</th>
                                            <th className="p-3">Calculated Savings</th>
                                            <th className="p-3">Proof Verification Method</th>
                                            <th className="p-3 text-right">Audit Status Gate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                                        {recent_redemptions.map(r => (
                                            <tr key={r.id} className="hover:bg-slate-50/60">
                                                <td className="p-3 font-bold text-[#1e345e]">{r.user?.name}</td>
                                                <td className="p-3">{r.discount?.partner?.name} — <span className="font-bold text-gray-500">{r.discount?.title}</span></td>
                                                <td className="p-3">${Number(r.total_spent).toFixed(2)}</td>
                                                <td className="p-3 text-[#48733e] font-black">${Number(r.amount_saved).toFixed(2)}</td>
                                                <td className="p-3">
                                                    {r.verification_method === 'receipt_upload' ? (
                                                        <a href={r.receipt_image_path || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold flex items-center gap-1">
                                                            📄 View Snapshot File ↗
                                                        </a>
                                                    ) : (
                                                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono text-[10px] border">🔑 Merchant PIN</span>
                                                    )}
                                                </td>
                                                <td className="p-3 text-right">
                                                    {r.status === 'pending' ? (
                                                        <div className="flex justify-end gap-1.5">
                                                            <button onClick={() => handleAuditSubmit(r.id, 'approved')} className="bg-green-600 text-white font-black px-2.5 py-1 rounded-md text-[10px] uppercase hover:bg-green-700 transition">Approve</button>
                                                            <button onClick={() => handleAuditSubmit(r.id, 'declined')} className="bg-red-600 text-white font-black px-2.5 py-1 rounded-md text-[10px] uppercase hover:bg-red-700 transition">Decline</button>
                                                        </div>
                                                    ) : (
                                                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${r.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                                                            {r.status}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}