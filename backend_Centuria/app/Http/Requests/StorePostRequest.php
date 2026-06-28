<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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
            'type' => 'required|in:Question,History,Encouragement',
            'visibility' => 'required|in:public,private,friends',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'video' => 'nullable|file|mimes:mp4,mov,avi|max:102400', // max 100MB
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

            if (!$hasContent && !$hasImages && !$hasVideo) {
                $validator->errors()->add('content', 'You must provide either content, images, or a video.');
            }

            if( $hasImages && $hasVideo) {
                // $validator->errors()->add('images', 'You cannot upload both images and a video in the same post.');
                $validator->errors()->add('video', 'You cannot upload both images and a video in the same post.');
            }

        });
    }
}
