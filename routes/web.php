<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('mithusanth');
})->name('home');




Route::get('/', fn () => Inertia::render('mithusanth'));

Route::get('/projects/{id}', fn($id) => inertia('ProjectShow', ['projectId' => $id]));

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
