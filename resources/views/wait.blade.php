@extends('layouts.base')

@section('main-title','Please wait')

@section('head-extra')
	<style>
/* Overall background and centering */
.loader-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; /* Stack spinner and text vertically */
    z-index: 9999; /* Make sure it's on top of other content */
}

/* Spinner styles */
.spinner {
    border: 8px solid #f3f3f3; /* Light grey border */
    border-top: 8px solid #3498db; /* Blue border */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
}

/* Animation for spinner */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Style for the text under the spinner */
.loader-wrapper p {
    margin-top: 20px;
    color: white;
    font-size: 16px;
}

/* Optionally hide the loader initially */
.loader-wrapper {
    display: none;
}
	</style>
<script>
    function showSpinnerLoader() {
        document.getElementById('loader-wrapper').style.display = 'flex';
    }

    function hideSpinnerLoader() {
        document.getElementById('loader-wrapper').style.display = 'none';
    }

window.onload = function() {
	showSpinnerLoader();
}
</script>
<meta http-equiv="refresh" content="0; URL={{ $redirect }}"/>
@endsection

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
			<div class="loader-wrapper" id="loader-wrapper">
				<!-- Spinner -->
				<div class="spinner"></div>
				<!-- Text below the spinner -->
				<p>{{ $msg }}</p>
			</div>
		</div>
	</div>
</div>
@endsection
