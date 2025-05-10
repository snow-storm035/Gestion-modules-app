<?php

use App\Http\Controllers\AlertController;
use App\Http\Controllers\AvancementController;
use App\Http\Controllers\ExcelFileController;
use App\Http\Controllers\FiliereController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\GeneralAppController;
use App\Http\Controllers\GroupeController;
use App\Http\Controllers\ModuleController;
// use App\Models\Avancement;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::withoutMiddleware([VerifyCsrfToken::class])->group(function () {

    // Route::withoutMiddleware([VerifyCsrfToken::class])->group(function(){
    Route::get('/index', [AvancementController::class, 'index']);
    Route::post('/store', [AvancementController::class, 'store']);
    Route::get('/all', [AvancementController::class, 'calculerTauxAvancement']);
    Route::put('/changerhoraires', [AvancementController::class, 'changerNbHeuresParSemaine']);
    // Route::get('/alerts', [AvancementController::class, 'makeAlert']);

    // Route::resource('/modules',ModuleController::class);
    // Route::resource('/groupes',GroupeController::class);
    // Route::resource('/formateurs',FormateurController::class);
    // Route::resource('/filieres',FiliereController::class);



    // send "topthree" parameter inside the request's body with "ok" as it's value
    Route::get('/filieres', [FiliereController::class, 'index']);



    Route::resource('/alerts', AlertController::class);

    Route::get('/avancements/{groupe}/{module}', [AvancementController::class, 'show']);

    Route::get('/trailswitch', function () {
        return redirect()->route('groupes.show', 'GE101');
    });

    Route::get('/testing', function (Request $request) {
        dd($request->input('test'));
        return $request->input('test');
    });

    // routes for dashboard's home page:
    Route::get('/totalNbrFilieres', [FiliereController::class, 'totalNbrFilieres']);

    Route::get('/nbrgroupes', [GroupeController::class, 'nbrgroupes']);

    Route::get('/nbralerts', [AlertController::class, 'alertsCount']); // send 'type' via the request's body
    //#########################################################

    Route::get('/calendrierefms/{regional?}', [GeneralAppController::class, 'calendrierEfms']);

    Route::get('/etatsmodules', [GeneralAppController::class, 'etatsModules']);

    Route::put('/avancements/{avancement}', [AvancementController::class, 'update']);

    Route::post('/uploadstats',[ExcelFileController::class,'extractAllData']);

    Route::get('/notifications', function (Request $request) {
      
        return response()->json([
            'notifications' =>auth()->user()->notifications,
            'unread_count' => auth()->user()->unreadNotifications->count(),
        ]);
    }); 
 });



// Route::post('/index', [AvancementController::class, 'index'])
// ->withoutMiddleware([VerifyCsrfToken::class]);

// Route::post('/module', [ModuleController::class, 'store'])->withoutMiddleware([VerifyCsrfToken::class]);



require __DIR__.'/auth.php';
