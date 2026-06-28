<?php

namespace App\Http\Requests;

use App\Models\Post;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = Auth::id();
        $post = Post::where('id', $this->route('post')->id)->where('user_id', $user)->first();
        return isset($post);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'content' => 'nullable|string|max:500',
            'type' => 'nullable|in:Question,History,Encouragement',
            'visibility' => 'nullable|in:public,private,friends',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            "deletedImages" => 'nullable',
            "deletedImages.*" => 'integer|exists:images,id',
            'video' => 'nullable|file|mimes:mp4,mov,avi|max:102400'
        ];
    }

    public function messages(): array
    {
        return [
            'content.required_without' => 'Content is required if no images are provided.',
            'images.*.required_without' => 'At least one image is required if content is not provided.',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {

            if ($validator->errors()->isNotEmpty()) {
                return;
            }



            $hasContent = $this->filled('content');
            $hasImages = !empty($this->file('images'));
            $hasVideo = $this->hasFile('video');

            $post = $this->route('post');
            $posImagesCount = $post->images()->count();
            $postHasImages = $post->images()->exists();
            $postHasVideo = $post->video()->exists();
            $deletedImages = $this->input('deletedImages', []);
            $deletedCount = $post->images()
                ->whereIn('id', $deletedImages)
                ->count();

            // CHECK IF THERE IS ANY CONTENT (VIDEO . IMAGES . CONTENT ) UPLOADED
            // IF NOT CHECK IF THE POST HAS A VIDEO
            // IF NOT CHECK IF THE POST HAS IMAGES
            // IF YES CHECK IF THEY ARE DELETED OR NOT 
            // IF YES THROW A VALIDATION ERROR
            if (!$hasContent && !$hasImages && !$hasVideo) {
                if (!$postHasVideo) {
                    if (!$postHasImages) {
                        $validator->errors()->add('content', 'You must provide either content, images, or a video.');
                    } else if ($deletedCount >= $posImagesCount) {
                        $validator->errors()->add('content', 'You must provide either content, images, or a video.');
                    }
                }
            }


            if ($hasImages && $hasVideo) {
                $validator->errors()->add('video', 'You cannot upload both images and a video in the same post.');
            }
        });
    }
}
