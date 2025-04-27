<?php

namespace App\Http\Controllers;

use App\Models\Alert;
use Exception;
use Illuminate\Http\Request;

class AlertController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $alerts = Alert::all();

        return response()->json(['alerts' => $alerts],200);
    }


    public function alertsCount(Request $request){
        try{
            global $alerts_count;
            if($request->has('alert_type') && ($request->input('alert_type') === "enretard" || $request->input('alert_type') === "presquefinie")){
                if($request->input('alert_type') === "enretard"){
                    $alerts_count = count(Alert::where('etat','en retard')->get()->toArray());
                }else{
                    $alerts_count = count(Alert::where('etat','presque fini')->get()->toArray());
                }
                return response()->json(['alerts_count' => $alerts_count],200);
            }else{
                throw new Exception("alert type wasn't specified or invalid");
            }
        }catch(Exception $e){
            return response()->json(['error' => $e->getMessage()]);
        }
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Alert $alert)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Alert $alert)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Alert $alert)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alert $alert)
    {
        //
    }
}
