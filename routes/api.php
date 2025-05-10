<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});



// Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/notifications', function (Request $request) {

        return response()->json([
            'notifications' =>auth()->user()->notifications,
            'unread_count' => auth()->user()->unreadNotifications->count(),
        ]);
    });
// });


use App\Models\User;

Route::middleware('auth:sanctum')->group(function () {
    // Add this new route
    Route::get('/users', function () {
        return response()->json([
            'users' => User::select('id', 'name', 'email', 'created_at')->get()
        ]);
    });
    
    // Your existing API routes...
});