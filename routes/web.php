<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('mithusanth');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/projectshow/{id}', function ($id) {
    return Inertia::render('ProjectShow', [
        'projectId' => (int) $id,
    ]);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
