<?php

use App\Http\Controllers\AvancementController;
use App\Http\Controllers\ExcelFileController;
use App\Http\Controllers\FiliereController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\GroupeController;
use App\Http\Controllers\ModuleController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
// 

Route::withoutMiddleware([VerifyCsrfToken::class])->group(function(){
    
    Route::get('/index', [AvancementController::class, 'index']);
    Route::post('/store', [AvancementController::class, 'store']);
    Route::get('/all', [AvancementController::class, 'calculerTauxAvancement']);
    Route::put('/changerhoraires', [AvancementController::class, 'changerNbHeuresParSemaine']);
    Route::get('/alerts', [AvancementController::class, 'makeAlert']);

    Route::resource('/modules',ModuleController::class);
    Route::resource('/groupes',GroupeController::class);
    Route::resource('/formateurs',FormateurController::class);
    Route::resource('/filieres',FiliereController::class);


    Route::post('/uploadstats',[ExcelFileController::class,'extractAllData']);

});






// Route::post('/index', [AvancementController::class, 'index'])
// ->withoutMiddleware([VerifyCsrfToken::class]);

// Route::post('/module', [ModuleController::class, 'store'])->withoutMiddleware([VerifyCsrfToken::class]);


require __DIR__.'/auth.php';
