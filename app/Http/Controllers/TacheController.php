<?php

namespace App\Http\Controllers;

use App\Models\Tache;
use Illuminate\Http\Request;

class TacheController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $tache = new Tache();
        $tache->nom = $request->nom;
        
        $tache->save();
        return;
    }

    /**
     * Display the specified resource.
     */
    public function show(Tache $tache)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tache $tache)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request, Tache $tache)
    {
        $validate = $request->validate([
            "statut" => "required |boolean",
        ]);

        $tache = Tache::findOrFail($id);
        $tache->update($validate);
        return;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id, Tache $tache)
    {
        Tache::findOrFail($id)->delete();
        return;
    }
}
