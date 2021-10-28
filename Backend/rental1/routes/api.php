<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\RentalController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GiftStoreController;
use App\Http\Controllers\AdminloginController;
use App\Http\Controllers\NotificationsController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('admin/logout', [AdminloginController::class, 'logout']);
});






Route::get('dashboard/overview', [DashboardController::class, 'getOverviewData']);
Route::get('dashboard/kolcsonzesek', [DashboardController::class, 'kolcsonzesek']);
Route::get('admin/edit-rental/{row_id}', [DashboardController::class, 'editRow']);
Route::post('admin/update-rental', [DashboardController::class, 'updateRow']);
Route::post('admin/add-new-employee', [DashboardController::class, 'addEmployee']);
Route::get('admin/generate-employee-id', [DashboardController::class, 'generateEmployeeId']);
Route::get('admin/get-employees', [DashboardController::class, 'getEmployeeDetails']);
Route::get('admin/delete-employee/{id}', [DashboardController::class, 'deleteEmployee']);
Route::post('admin/add-new-starbucks', [GiftStoreController::class, 'addStarbucksCode']);
Route::post('admin/add-new-wizzair', [GiftStoreController::class, 'addWizzairCode']);
Route::post('admin/add-new-burgerking', [GiftStoreController::class, 'addBurgerkingCode']);




Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::post('admin/login', [AdminloginController::class, 'login']);


Route::post('kolcsonzes/push', [NotificationsController::class, 'SendNotification']);
Route::post('kolcsonzes', [RentalController::class, 'RentSubmit']);
Route::post('giftstore/redeem-item', [GiftStoreController::class, 'RedeemPoints']);



Route::get('checkdates/{model_id}', [CarController::class, 'checkdates']);
Route::get('users/{user_id}', [NotificationsController::class, 'CheckNotification']);
Route::get('points/users/{user_id}', [GiftStoreController::class, 'CheckPoints']);
Route::get('clearNotifications/{user_id}', [NotificationsController::class, 'ClearNotifications']);
Route::get('modelljeink', [CarController::class, 'list']);
Route::get('modelljeink/{id}', [CarController::class, 'fetch_car_details']);
Route::get('getUserRentals/{user_id}', [RentalController::class, 'getUserRentals']);
Route::get('giftstore/get-remaining-items', [GiftStoreController::class, 'getItemDetails']);




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
