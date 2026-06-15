<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Models\Post;
use App\Models\Report;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Request;

class ReportController extends Controller
{

    public function index()
    {

        $this->authorize('viewAny', Report::class);

        $posts = Post::with([
            'user.image',
            'reports.user.image' ,
            'images',
            'comments.user.image',
        ])->where('is_hidden' , false)
        ->latest();
        
        if(Auth::user()->role == 'Admin'){
            $posts = $posts->whereHas('reports' , function($q){ $q->where('is_confirmed' , true); })->with('reports' , function($q){ $q->where('is_confirmed' , true); }) ;
        }else{
            $posts = $posts->whereHas('reports' , function($q){ $q->where('is_confirmed' , false); })->with('reports' , function($q){ $q->where('is_confirmed' , false); }) ;
        }

        $posts = $posts->get() ;
        return response()->json(['posts' => $posts]) ;
        
    }


    public function store(StoreReportRequest $request)
    {
        $this->authorize('store' ,  Report::class) ;
        $report = $request->validated();
        $report['user_id'] = Auth::id() ;  
        $report = Report::create($report);
        return response()->json(['success' => 'Report created successfully.']) ;

    }


    public function show(Report $report)
    {
        $this->authorize('view', $report);

        $report->load([
            'user:id,name,email',
            'post.user:id,name,email',
            'post.user.image',

            'post.images',
            'user.image',

            'post.comments.user:id,name,email',
            'post.comments.user.image',

        ])->latest()->get();

        $post = $report?->post ;
        $comments = $post?->comments ;
        $user = $post?->user ;

        return response()->json(['report' => $report, 'post'=> $post, 'comments' => $comments, 'user' => $user]) ;

    }


    public function destroy(Report $report)
    {
        $this->authorize('delete', $report);
        $report->delete();
        return response()->json(['success'=> 'Report deleted successfully.']) ;

    }
}
