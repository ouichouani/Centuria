<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHabitRequest;
use App\Http\Requests\UpdateHabitRequest;

use App\Models\Category;
use App\Models\Task;
use App\Policies\TaskPolicy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HabitController extends Controller
{


    public function index()
    {
        $user = Auth::user();

        $categories = Category::where(
            function ($q) use ($user) {
                $q->where('user_id', $user->id)->orWhere('is_global', true);
            }
        )->whereHas('habits', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        })
            ->with(['habits' => function ($q) use ($user) {
                $q->where('user_id', $user->id);
        }])
        ->get();

        $abandoned_habits = Task::where('user_id' , $user->id)->where('category_id' , null)->where('is_task' , false)->get() ;
        return response()->json(['abandoned_habits' => $abandoned_habits , "categories" => $categories ]) ;
    }


    public function store(StoreHabitRequest $request)
    {
        $data  = $request->validated();
        $data['user_id'] = Auth::id();
        $habit = Task::create($data);
        return response()->json(['success' => 'Habit created successfully', 'habit' => $habit]);
    }


    public function show(Task $habit)
    {
        if ($habit->is_task) return response()->json(['message' => 'resource not found'], 404);
        return response()->json(['habit' => $habit->load('category')]);
    }


    public function update(UpdateHabitRequest $request, Task $habit)
    {
        $this->authorize('update', $habit);
        $newHabit = $request->validated();
        $habit->update($newHabit);
        $habit->save();
        return response()->json(['success' => 'Habit updated successfully', 'habit' => $habit]);
    }


    public function destroy(Task $habit)
    {
        $this->authorize('delete', $habit);
        $habit->delete();
        return response()->json(['success' => 'Habit deleted successfully']);
    }
}
