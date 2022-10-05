<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Session Less Routes
|--------------------------------------------------------------------------
|
| All routes that does not need session data and being used only by this
| project.
|
*/

Route::get('/error/notfound', 'ErrorPageController@notfound');
