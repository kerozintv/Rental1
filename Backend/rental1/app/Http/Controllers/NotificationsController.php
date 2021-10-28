<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class NotificationsController extends Controller
{









    public function SendNotification(Request $request)
    {


        $user_id_number = $request->user_id;
        $selectedUser = User::where('id', $user_id_number)->first()->increment('notifications');
    }


    public function CheckNotification($user_id)
    {

        $url_userid = $user_id;
        $notifications = User::where('id', $url_userid)->first();

        return response()->json([

            'notifications' => $notifications->notifications,



        ]);
    }



    public function ClearNotifications($user_id)
    {

        $url_userid = $user_id;
        User::where('id', $url_userid)->first()
            ->update(['notifications' => 0]);
    }
}
