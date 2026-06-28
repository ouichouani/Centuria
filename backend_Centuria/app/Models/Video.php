<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Video extends Model
{
    protected $fillable = [
        'path',
        'thumbnail_path',
        'user_id',
        'post_id',
        'size',
        'duration',
    ];

    static function store($video, $user, $post)
    {
        if (!$video instanceof \Illuminate\Http\UploadedFile) {
            throw new \InvalidArgumentException('store() expects an instance of UploadedFile.');
        }

        self::deleteAll($post); // Delete existing video if any
        
        $path = $video->store('videos', 'public');

        return self::create([
            'path' => $path,
            'user_id' => $user->id,
            'post_id' => $post->id,
            'size' => $video->getSize(),
            'duration' => null, // You might want to calculate the duration using a library like FFmpeg
        ]);

    }

    static function deleteAll($post)
    {
        if($post->video) {
            Storage::disk('public')->delete($post->video->path);
            $post->video()->delete();
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    protected $appends = ['url'];

    // This is the magic method that creates the value
    public function getUrlAttribute()
    {
        return asset('storage/' . $this->path);
    }

}
