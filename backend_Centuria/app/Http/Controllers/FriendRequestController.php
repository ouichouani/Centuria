<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFriendRequestRequest;
use App\Models\FriendRequest;
use Illuminate\Support\Facades\Auth;

class FriendRequestController extends Controller
{
    
    public function index()
    {
        $friendRequests = FriendRequest::Where('receiver_id', Auth::id())->with(['sender' , 'sender.image'])->get();
        return response()->json(['friendRequests' => $friendRequests]) ;
    
    }


    public function store(StoreFriendRequestRequest $request)
    {
        $data = $request->validated();
        $data['sender_id'] = Auth::id();
        FriendRequest::create($data);
        return response()->json(['data' => $data]) ;
    }


    public function accept(FriendRequest $friendRequest)
    {
        $this->authorize('accept', $friendRequest);
        $friendRequest->update(['status' => 'accepted']);
        return response()->json(['message' => 'request accepted']) ;
    }


    public function reject(FriendRequest $friendRequest)
    {
        $this->authorize('reject', $friendRequest);
        $friendRequest->update(['status' => 'rejected']);
        return response()->json(['message' => 'request rejected']) ;
    }


    public function destroy(FriendRequest $request)
    {
        $this->authorize('delete', $request);
        $request->delete();
        return response()->json(['message' => 'success', 'Friend request deleted successfully']);
    }
}
