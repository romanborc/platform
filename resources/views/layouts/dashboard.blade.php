<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Platform') }}</title>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css">
    <link rel="stylesheet" href="/bower_components/alertifyjs/dist/css/alertify.css">
    <link rel="stylesheet" href="/bower_components/angular-ui-select/dist/select.css">
    <link rel="stylesheet" href="/bower_components/morris.js/morris.css"> 

</head>

<body ng-app="platform">
    @include('layouts.partials.dashboard-sidebar-nav')
    @yield('content')    
    @include('layouts.partials.scripts')
</body>

</html>