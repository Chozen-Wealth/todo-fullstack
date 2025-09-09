<?php

use App\Http\Controllers\TacheController;
use App\Models\Tache;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $taches = Tache::all();
    return Inertia::render("Index", compact("taches"));
});

Route::post("/store", [TacheController::class, "store"]);
Route::delete("/destroy/all", [TacheController::class, "destroyAll"]);
Route::delete("/destroy/{id}", [TacheController::class, "destroy"]);
Route::put("/update/{id}", [TacheController::class, "update"]);