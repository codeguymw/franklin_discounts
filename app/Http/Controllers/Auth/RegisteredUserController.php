<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // 1. Validate ALL incoming fields from the React form
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'employee_id' => 'required|string|max:50',
            'company_name' => 'required|string|max:255', 
            'department' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'date_of_hire' => 'required|date',           
            'date_of_birth' => 'required|date',          
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // 2. Save EVERYTHING securely to the database
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'employee_id' => $request->employee_id,
            'company_name' => $request->company_name,   
            'department' => $request->department,
            'role' => $request->role,                   
            'date_of_hire' => $request->date_of_hire,   
            'date_of_birth' => $request->date_of_birth, 
            'status' => 'pending', // Forces them into the Admin approval queue
            'is_admin' => false,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}