<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{

    public function index()
    {

        $categories = Category::where(function($q){
            $q->where('user_id', Auth::id())->Where('is_global' , false) ;  
        })
        ->orWhere('is_global' , true)
        ->whereHas('tasks' , function($q){
            $q->where('user_id' , Auth::id())->where('is_global' , true) ;
        })
        ->orWhereHas('habits' , function($q){
            $q->where('user_id' , Auth::id())->where('is_global' , true) ;
        })
        ->get();

        return response()->json(["data" => $categories] , 200) ;
        // return view('tasks.categories.index', compact('categories'));
    }

    // public function create()
    // {
    //     return view('tasks.categories.create');
    // }

    public function store(StoreCategoryRequest $request)
    {

        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $category = Category::create($data);
        
        return response()->json(['category' => $category ] , 200) ;
        // return redirect()->route('categories.show', $category);
    }


    public function show(Category $category)
    {
        $category->is_global ? $this->authorize('accessGlobalCategories', Category::class) : $this->authorize('view', $category);
        $category->load([
            'habits' => function ($query) {
                $query->where('user_id', Auth::id());
            },
            'tasks' => function ($query) {
                $query->where('user_id', Auth::id())->orderBy('done');
            }
        ]);

        $habits = $category->habits;
        $tasks = $category->tasks;

        return response()->json(['category' => $category , 'habits' => $habits , 'tasks' => $tasks] , 200) ;
        // return view('tasks.categories.show', compact('category', 'habits', 'tasks'));
    }


    // public function edit(Category $category)
    // {
    //     if ($category->is_global) {
    //         $this->authorize('accessGlobalCategories', Category::class);
    //     } else {
    //         $this->authorize('update', $category);
    //     }
    //     return view('tasks.categories.edit', compact('category'));
    // }


    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->is_global ? $this->authorize('accessGlobalCategories', Category::class) : $this->authorize('update', $category);
        $data = $request->validated();
        $category->update($data);
        $category->save();

        return response()->json(['category' => $category ] , 200) ;
        // return redirect()->route('categories.show', $category);
    }

    public function destroy(Category $category)
    {
        // $destination = 'categories.index' ;
        if ($category->is_global) {
            $this->authorize('accessGlobalCategories', Category::class);
            // $destination = 'categories.global' ;
        } else {
            $this->authorize('delete', $category);
        }
        $category->delete();
        
        return response()->json(['success' => 'catehory is deleted with success' ] , 200) ;
        // return redirect()->route($destination);
    }

    public function indexGlobalCategories()
    {
        $this->authorize('accessGlobalCategories', Category::class);
        $categories = Category::where('is_global', true)->orderBy('created_at')->get();
        
        return response()->json(['category' => $categories ] , 200) ;
        // return view('tasks.categories.index', compact('categories'));
    }
}
