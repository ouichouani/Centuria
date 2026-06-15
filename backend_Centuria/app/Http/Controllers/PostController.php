<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Image;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        //h = hidden
        if ($request->query('h') === '1') return $this->showHiddenPosts();

        $posts = Post::query()
            ->where(function ($q) use ($user) {
                $q->whereRaw("EXISTS (
            SELECT 1 FROM friend_requests as fr 
            WHERE status = 'accepted' 
            AND visibility = 'friends'
            AND (
                (fr.sender_id = ? AND fr.receiver_id = posts.user_id) OR 
                (fr.sender_id = posts.user_id AND fr.receiver_id = ?)
            )
            )", [$user->id, $user->id])
                    ->orWhere("visibility", "public")
                    ->orWhere("user_id", $user->id);
            })
            ->with(['comments.user.image', 'comments.post', 'likes', 'user.image', 'images', 'reports' => function ($q) {
                $q->where('user_id', Auth::id());
            }])->whereHas('user', function ($q) {
                $q->where('is_banned', false)->where('is_banned_by_moderator', false);
            })
            ->where('is_hidden', false)
            ->where('visibility', '<>', 'private')
            ->latest()->get();

        return response()->json(['posts' => $posts]);
    }

    public function showHiddenPosts()
    {
        $this->authorize('manage_app', User::class);
        $posts = Post::where('is_hidden', true)->with(['user.image', 'comments.user.image', 'comments.post', 'likes', 'user.image', 'images', 'reports'])->latest()->get();
        return response()->json(['posts' => $posts]);
    }

    public function show(Post $post)
    {
        $post->load(['comments.user.image:id,path,id', 'likes', 'user.image:id,path,id', 'images:path']);
        $comments = $post->comments;
        $likes = $post->likes;

        return response()->json(['post' => $post, 'comments' => $comments, 'likes'  => $likes]);
    }

    public function store(StorePostRequest $request)
    {

        $user = Auth::user();
        $data = $request->validated();

        $post = Post::create([
            'content' => $data['content'],
            'type' => $data['type'],
            'visibility' => $data['visibility'],
            'user_id' => $user->id,
        ]);

        if (isset($data['images'])) Image::storeMultiple($post, 'posts', $data['images']);
        return response()->json(['message' => 'Post created successfully']);
    }

    public function edit($id)
    {
        $post = Post::find($id);
        if (!$post) return response()->json(['message' => 'Post not found'], 404);
        $this->authorize('update', $post);
        return response()->json(['post' => $post->load('images:path,imageable_id')]);
    }


    public function update(UpdatePostRequest $request, Post $post)
    {
        $this->authorize('update', $post);
        $data = $request->validated();
        $post->update($data);
        if (isset($data['images'])) Image::storeMultiple($post, 'posts', $data['images']);

        return response()->json(['message' => 'Post updated successfully']);
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        Image::deleteMultiple($post);

        $post->delete();
        return response()->json(['message' => 'Post deleted successfully']);
    }
}
