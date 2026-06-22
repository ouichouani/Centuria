<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Oauth extends Model
{
    public $fillable=["user_id" , "social_type" , "social_id"] ;
    protected $table = 'oauth_accounts';

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
