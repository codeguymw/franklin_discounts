import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { PageProps } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    employee_id: string;
    status: string;
}

export default function Approvals({ auth, users }: PageProps<{ users: User[] }>) {
    const { post } = useForm();

    const handleApprove = (id: number) => {
        if (confirm('Approve this employee for access?')) {
            post(route('admin.approve', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Employee Approvals</h2>}
        >
            <Head title="Admin Approvals" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4 text-blue-600">Pending Requests</h3>
                        
                        {users.length === 0 ? (
                            <p className="text-gray-500">No pending approval requests at the moment.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Number</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.employee_id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <button 
                                                        onClick={() => handleApprove(user.id)}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition"
                                                    >
                                                        Approve
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}