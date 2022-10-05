@inject('assetService', 'App\Http\Services\AssetService')
@inject('language', 'App\Http\Services\LanguageService')
@section('metaViewport')
    <meta name='viewport' content='width=350, initial-scale=1'>
@endsection

<!DOCTYPE html>
<html lang="{{$language->getCurrent()}}">
    <head>
        {{-- Metas --}}
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        @yield('metaViewport')
        <meta name="theme-color" content="#b0b0b0" />
        <meta name="msapplication-navbutton-color" content="#b0b0b0">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name='mobile-web-app-capable' content='yes'>
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>@yield('title', 'Welcome to SBOBET Casino')</title>
    
        <script>
            window.assetURL = "{{$assetService->getAssetUrl()}}";
        </script>
        
        @yield('script')
        
        @foreach ($assetService->getAssetEntryPoints('css') as $css)
            <link rel="stylesheet" type="text/css" href="{{$assetService->getAssetUrl().$css}}">
        @endforeach
    </head>
    <body>
        @yield('bodyBefore')
        <div id='root'></div>
        @yield('bodyAfter')
        @foreach ($assetService->getAssetEntryPoints('js') as $js)
	        <script crossorigin src="{{$assetService->getAssetUrl().$js}}" type="text/javascript"></script>
        @endforeach
    </body>
</html>