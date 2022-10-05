<?php

namespace App\Http\Services;

use Config;

class LanguageService
{
	public function getCurrent()
	{
		return isset($_COOKIE[Config::get('custom.language.key')])
			? $_COOKIE[Config::get('custom.language.key')]
			: Config::get('app.fallback_locale');
	}
}
