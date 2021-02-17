@extends('layouts.base')

@section('main-title','Admin > Update Text')

@section('breadcrumb')
<li><a href="{{ route('admin.main') }}">Admin</a></li>
<li>Update text</li>
@endsection

@section('content')
<div id="primary">
  <div class="row">
    <div class="col-md-12">
      <h1>Admin Action - Update texts ({{ $locale }})</h1>
    </div>
  </div>
  <div class="spacer25"></div>
  <form method="post" action="{{ route('admin.text-submit') }}">
  @csrf
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="col-md-1">Area</th>
        <th class="col-md-3">Label</th>
		<th class="col-md-8">Text</th>
      </tr>
    </thead>
    <tbody>
  @foreach ($text as $k=>$v)
    @if (is_array($v))
      @foreach ($v as $kk=>$vv)
      <tr>
        <td>{{ $k }}</td>
        <td>{{ $kk }}</td>
        <td><input name="{{$k}}[{{ $kk }}]" style="width:100%;" value="{{ $vv }}"></td>
      </tr>
      @endforeach
    @endif
  @endforeach
    </tbody>
  </table>
  <button type="submit">Submit</button>
  </form>
</div>
@endsection
