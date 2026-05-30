import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        employee_id: '',
        password: '',
        password_confirmation: '',
        role: '',        // Add this
        department: '',  // Add this
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* its me putting here gemini wanted to put it o las div */}
                <div className="mt-4">
                    <InputLabel htmlFor="employee_id" value="Employee ID Number" />

                    <TextInput
                        id="employee_id"
                        name="employee_id"
                        value={data.employee_id}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('employee_id', e.target.value)}
                        required
                    />

                    <InputError message={errors.employee_id} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Job Title / Role" />
                    <TextInput
                        id="role"
                        name="role"
                        value={data.role}
                        className="mt-1 block w-full"
                        placeholder="e.g., Senior Care Specialist"
                        onChange={(e) => setData('role', e.target.value)}
                        required
                    />
                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="department" value="Department / Facility" />
                    <select
                        id="department"
                        name="department"
                        value={data.department}
                        className="mt-1 block w-full border-gray-300 focus:border-[#1e345e] focus:ring-[#1e345e] rounded-md shadow-sm"
                        onChange={(e) => setData('department', e.target.value)}
                        required
                    >
                        <option value="" disabled>Select your facility...</option>
                        <option value="Franklin Senior Services">Franklin Senior Services</option>
                        <option value="Franklin Home Care">Franklin Home Care</option>
                        <option value="Head Office">Head Office</option>
                    </select>
                    <InputError message={errors.department} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
