<?php

namespace App\Http\Services;

use App\Helpers\UrlHelper;
use UnexpectedValueException;
use URL;
use Config;

class AssetService
{
	private $urlHelper;
	private $manifestPath;

	function __construct(UrlHelper $urlHelper)
	{
		$this->urlHelper = $urlHelper;
		$this->manifestPath = '../' . Config::get('custom.asset.manifest');
	}

	public function getManifestContent(string $type, string $entryPoint): array
	{
		$data = file_get_contents($this->manifestPath);

		if ($data === false) {
			return ['result' => false, $data, 'message' => 'File Not Found'];
		} else {
			$decodeManifest = json_decode($data, true);
			$decodeManifest = empty($decodeManifest) ? [] : $decodeManifest;

			if (!isset($decodeManifest[$entryPoint])) {
				return ['result' => false, 'data' => $decodeManifest, 'message' => 'Entry Point Not Found'];
			}

			if (!isset($decodeManifest[$entryPoint][$type])) {
				return ['result' => false, 'data' => $decodeManifest, 'message' => 'Type Not Found'];
			}

			return ['result' => true, 'data' => $decodeManifest[$entryPoint][$type], 'message' => 'Success'];
		}
	}

	public function getAssetEntryPoints(string $type, string $entryPoint = 'main'): array
	{
		$manifestContent = $this->getManifestContent($type, $entryPoint);

		if (!$manifestContent['result']) {
			throw new UnexpectedValueException($manifestContent['message']);
		} else {
			return $manifestContent['data'];
		}
	}

	public function getAssetUrl()
	{
		if (empty(Config::get('custom.asset.dedicatedUrl'))) {
			return $this->getCdnUrl();
		} else {
			return $this->urlHelper->replaceDomain(Config::get('custom.asset.dedicatedUrl'), URL::to('/'));
		}
	}

	public function getCdnUrl()
	{
		# you may replace with CDN URL for optimization
		return URL::to('/');
	}
}
