<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\FriendRequestController;
use App\Http\Controllers\HabitController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\ModeratorController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::get('/auth/{provider}', [AuthController::class, 'redirectToProvider']);
Route::get('/auth/{provider}/callback', [AuthController::class, 'callback']);

Route::middleware('auth:api')->group(function () {

    Route::post('/logout', [UserController::class, 'logout'])->name('logout');

    Route::get('/', [UserController::class, 'dashboard']);
    Route::get('/dashboard', [UserController::class, 'dashboard'])->name('dashboard');

    Route::resource('/habits', HabitController::class);
    Route::resource('/tasks', TaskController::class);
    Route::resource('/categories', CategoryController::class);
    Route::resource('/users', UserController::class);
    Route::resource('/posts', PostController::class);
    Route::resource('/requests', FriendRequestController::class);
    Route::resource('/reports', ReportController::class);
    Route::resource('/notifications', NotificationController::class);

    Route::get('/profile', [UserController::class, 'profile'])->name('users.profile');
    Route::get('/logs', [LogController::class, 'index'])->name('logs.index');
    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::post('/likes', [LikeController::class, 'save'])->name('likes.save');
    Route::post('/habits/done', [LogController::class, 'store'])->name('logs.store');

    Route::post('/reports/{report}/confirm', [ModeratorController::class, 'confirmReport']);

    Route::post('/requests/{friendRequest}/accept', [FriendRequestController::class, 'accept'])->name('requests.accept');
    Route::post('/requests/{friendRequest}/reject', [FriendRequestController::class, 'reject'])->name('requests.reject');
    Route::get('/requests/{user}/following', [FriendRequestController::class, 'following'])->missing(function () {
        return redirect()->route('requests.index')->with('message', 'resource not found');
    })->name('requests.following');
    Route::get('/requests/{user}/followers', [FriendRequestController::class, 'followers'])->missing(function () {
        return redirect()->route('requests.index')->with('message', 'resource not found');
    })->name('requests.followers');

    Route::delete('/logs/{log}/destroy', [LogController::class, 'destroy'])->name('logs.destroy');
    Route::get('/logs/{habit}/history', [LogController::class, 'showHistory'])->name('logs.history');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
    Route::post('/tasks/{task}/done', [TaskController::class, 'done'])->name('tasks.done');

    Route::post('posts/{post}/hide', [ModeratorController::class, 'hidePost']);
    Route::post('users/{user}/ban', [ModeratorController::class, 'ban'])->name('users.ban');
    // Route::get('posts/hidden', [ModeratorController::class, 'showHiddenPosts'])->name('posts.hidden');

    route::group(['prefix' => 'moderator'], function () {
        Route::get('users', [ModeratorController::class, 'index'])->name('moderator.users.index');
        // Route::post('post/{post}/hide', [ModeratorController::class, 'hidePost'])->name('posts.hide');
    });

    Route::get('/blackList', [ModeratorController::class, 'blackList'])->name('blackList');
    route::group(['prefix' => 'admin'], function () {
        Route::get('users', [AdminController::class, 'index'])->name('admin.users.index');
        // Route::post('users/{user}/ban', [AdminController::class, 'ban'])->name('admin.users.ban') ;
        // Route::post('post/{post}/hide', [AdminController::class, 'hidePost'])->name('admin.posts.hide');
    });

    route::group(['prefix' => 'controll-panel'], function () {
        // Route::get('black-list', [ModeratorController::class, 'blackList'])->name('blackList');
        route::get('global-categories', [CategoryController::class, 'indexGlobalCategories'])->name('categories.global');
    });
});


Route::fallback(function () {
    return response()->json(['message' => 'page not found hh'], 404);
})->name('fallback');
