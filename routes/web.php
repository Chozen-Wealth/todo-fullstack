<?php

use App\Http\Controllers\TacheController;
use App\Models\Tache;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $taches = Tache::all();
    $lasttask = Tache::latest()->first();
    return Inertia::render("Index", compact("taches", "lasttask"));
});

Route::post("/store", [TacheController::class, "store"]);
Route::delete("/destroy/all", [TacheController::class, "destroyAll"]);
Route::delete("/destroy/{id}", [TacheController::class, "destroy"]);
Route::put("/update/{id}", [TacheController::class, "update"]);