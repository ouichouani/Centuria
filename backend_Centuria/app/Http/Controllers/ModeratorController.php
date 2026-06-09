<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ModeratorController extends UserController
{
    public function ban(User $user)
    {

        if ($user->role == 'Admin') {
            
            $this->authorize('ban', $user);

            if ($user->is_banned || $user->is_banned_by_moderator) {
                $user->is_banned_by_moderator = false;
                $user->is_banned = false;
            } else {
                $user->is_banned = true;
            }
            
            $user->save();
            return response()->json(["message" => 'User ' . ($user->is_banned ? 'banned' : 'unbanned') . ' successfully'], 200);
            
        } else if ($user->role == 'Moderator') {

            $this->authorize('temp_ban', User::class);
            $user->is_banned_by_moderator ? $user->is_banned_by_moderator = false : $user->is_banned_by_moderator = true;
            $user->save();
            return response()->json(['message' => 'User ' . ($user->is_banned_by_moderator ? 'banned' : 'unbanned') . ' successfully']);

        }else {
            return response()->json(['message' => 'You cannot ban this user.'] , 403);
        }
    }

    public function confirmReport(Report $report)
    {
        $this->authorize('confirm', $report);

        if ($report->is_confirmed) {
            $report->is_confirmed = false;
        } else {
            $report->is_confirmed = true;
        }

        $report->save();
        return response()->json(['message' => 'Report ' . ($report->is_confirmed ? 'confirmed' : 'unconfirmed') . ' successfully']);
    }

    public function hidePost(Post $post)
    {
        if (Auth::user()->role === 'Client') return response()->json(['message' => 'You cannot hide a post. Please contact an admin to hide this post.']);

        if ($post->is_hidden) {
            $post->is_hidden = false;
        } else {
            $post->is_hidden = true;
        }

        $post->save();
        return response()->json(['message' => 'Post ' . ($post->is_hidden ? 'hidden' : 'unhidden') . ' successfully']);
    }

    public function blackList()
    {
        $this->authorize('manage_app', User::class);
        $users = null;

        if (Auth::user()->role != 'Admin') {
            $users = User::where('is_banned_by_moderator', true)->where('is_banned', false);
        } else {
            $users = User::where('is_banned_by_moderator', true)->orWhere('is_banned', true);
        }

        $like = request()->query('like');
        if ($like) $users = $this->search($users, $like);
        $users = $users->get();
        return response()->json(['data' => $users]);
    }

    public function showHiddenPosts()
    {
        $this->authorize('manage_app', User::class);
        $posts = Post::where('is_hidden', true)->with(['user.image', 'comments.user.image', 'comments.post', 'likes', 'user.image', 'images', 'reports'])->latest()->get();
        return response()->json(['data' => $posts]);
    }
}
