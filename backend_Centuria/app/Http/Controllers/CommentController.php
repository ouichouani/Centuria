<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request)
    {

        $post = Post::findOrFail($request->post_id) ;
        $this->authorize('create' , [Comment::class , $post]) ;
        $data = $request->validated() ;
        $data['user_id'] = Auth::id() ;
        $comment = Comment::create($data) ;
        return response()->json(['message' => 'comment is created with success' , "comment" => $comment->load(['user' , 'user.image'])] , 200) ;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);
        $comment->delete() ;
        return response()->json(['message' => 'comment is deleted with success'] , 200) ;
    }
}
