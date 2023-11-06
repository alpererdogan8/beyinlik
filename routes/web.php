<?php

use App\Http\Controllers\ContentControl\Content;
use App\Http\Controllers\Homepage;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [Homepage::class, 'index'])->name("/");
Route::get('/uploads/{image}', [Homepage::class, 'showImage']);
Route::get('/kategori/{slug}', [Homepage::class, 'category'])->name("kategori");
Route::get('/kategori/{category}/{slug}', [Homepage::class, 'single'])->name("content");



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', [Content::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
    Route::get('/dashboard/content/create', [Content::class, 'create'])
        ->middleware(['auth', 'verified'])->name('create');
    Route::post('/dashboard/content/create', [Content::class, 'store'])->middleware(['auth', 'verified'])->name('create.post');
    Route::get('/dashboard/content/edit/{id}', [Content::class, 'edit'])->middleware(['auth', 'verified'])->name('edit');
    Route::post('/dashboard/content/edit/{id}', [Content::class, 'update'])->middleware(['auth', 'verified'])->name('update');
    Route::delete("/dashboard/content/delete/{id}", [Content::class, 'destroy'])->middleware(['auth', 'verified'])->name('delete');
});

require __DIR__ . '/auth.php';
