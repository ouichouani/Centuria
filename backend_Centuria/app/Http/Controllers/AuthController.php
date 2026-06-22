<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Image;
use App\Models\Oauth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public $allowedProviders = ['google', 'github'];

    public function redirectToProvider($provider)
    {
        if (!in_array($provider, $this->allowedProviders)) {
            abort(404);
        }
        return Socialite::driver($provider)
            ->stateless()
            ->with(['prompt' => 'select_account'])
            ->redirect();
    }

    public function callback($provider)
    {
        $user = Socialite::driver($provider)
            ->stateless()
            ->user();

        $email = $user->getEmail();
        if (!$email && $provider === 'github') return response()->json(['message' => 'GitHub email not available.'], 422);

        if ($response = $this->userAlreadyExists($user, $provider)) return $response;
        return $this->register($user, $provider);
    }

    protected function respondWithToken($token)
    {
        return redirect('http://localhost:3000/auth/callback')->withCookie(
            cookie(
                'token',   // cookie name
                $token,    // cookie value
                auth()->factory()->getTTL(),        // expires in 60 minutes
                '/',       // available on all routes
                null,      // domain
                false,     // secure // true means the cookie will only be sent over HTTPS, false means it can be sent over HTTP as well
                true,     // httpOnly means the cookie cannot be accessed via JavaScript, which helps prevent XSS attacks
                false,     // raw
                'Lax'   // sameSite means the cookie will only be sent in first-party contexts
            )
        );
    }

    public function userAlreadyExists($user, $social_type)
    {

        // CHECK IF THE USER ALREADY EXISTS IN THE DATABASE
        $alreadyExists = Oauth::where('social_id', $user->getId())
            ->where('social_type', $social_type)
            ->first();

        // $alreadyExists = User::where('social_id', $user->getId())
        //     ->where('social_type', $social_type)
        //     ->first();

        if ($alreadyExists) {
            $token = Auth::login($alreadyExists->user);
            return $this->respondWithToken($token);
        }
    }

    public function register($user, $social_type)
    {

        $createdUser = null;

        // CREATE THE NEW USER IN THE DATABASE
        if (!User::where('email', $user->getEmail())->exists()) {

            $createdUser = User::create(
                [
                    'name' => $user->getName() ?? $user->getNickname(),
                    'email' => $user->getEmail(),
                    'password' => Hash::make("ZOTE THE MIGHTY"),
                    'bio' =>  $user->user['bio'] ?? ''
                ]
            );

            // GET AVATAR FROM GOOGLE AND CREATE A NEW IMAGE RECORD IN THE DATABASE
            $content = file_get_contents($user->getAvatar());
            Image::store($createdUser, 'avatars', $content);
            
        } else {
            $createdUser = User::where('email', $user->getEmail())->first();
        }


        $createdUser->oauth()->create([
            'social_id' => $user->getId(),
            'social_type' => $social_type,
        ]);


        $token = Auth::login($createdUser);
        return $this->respondWithToken($token);
    }
}
