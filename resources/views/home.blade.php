@extends('layouts.base')

@section('main-title','Home')

@section('content')
<div id="primary">
	<div class="row">
    <div class="col-md-12">
    @if (cas()->isAuthenticated())
      @canany(['request','approve','admin'])
      <p>{!! __('text.home.postlogin-header-msg') !!}</p>
      @elsecanany([null])
		  <p>{!! __('text.home.postlogin-not-authorized') !!}</p>
      @endcanany
    @else
      <p>Please <a href="{{ route('main.login') }}">log in</a> to access.</p>
<p style="color:red; font-weight: bold;">{!! __('text.home.prelogin-note') !!}</p>
    @endif
    </div>
  </div>
  <div class="spacer25"></div>
  <div class="row">
  @can('request')
    <div class="col-md-1"></div>
    <div class="col-md-3">
    <a href="{{ route('request.main') }}" class="btn btn-default" role="button">
      <h3 class="cherry">Requests</h3><div class="spacer15"></div>
    </a> 
    </div> 
  @endcan
  @can('approve')
    <div class="col-md-1"></div>
    <div class="col-md-3">
    <a href="{{ route('approve.index') }}" class="btn btn-default" role="button">
      <h3 class="cherry">Approvals</h3><div class="spacer15"></div>
    </a> 
    </div> 
  @endcan
  @can('admin')
    <div class="col-md-1"></div>
		<div class="col-md-3">
    <a href="{{ route('admin.main') }}" class="btn btn-default" role="button">
      <h3 class="cherry">Admin Actions</h3><div class="spacer15"></div>
    </a> 
    </div> 
  @endcan
  </div>
    <hr>
@if (!cas()->isAuthenticated())
	@lang('text.home.prelogin-compatibility-msg')
@else
	@lang('text.home.postlogin-contact-msg')
@endif
</div>
@endsection
