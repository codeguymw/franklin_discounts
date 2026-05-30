<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeApprovalController extends Controller
{
    // List all pending employees
    public function index()
    {
        $pendingUsers = User::where('status', 'pending')->get();
        
        return Inertia::render('Admin/Approvals', [
            'users' => $pendingUsers
        ]);
    }

    // Approve an employee
    public function approve(User $user)
    {
        $user->update(['status' => 'approved']);
        
        // This is where we will trigger the "Account Approved" notification later!
        return back()->with('message', 'Employee approved successfully.');
    }
}
