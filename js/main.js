(function( $, undefined ) {
    "use strict";
	
	var snooze = false;

	function setMarkup(){
    
    	var contentMarkup = '<section class="wrapper"><div class="clock-wrapper clearfix"><div class="clock"><span class="icon-sun" aria-hidden="true"></span><p></p></div></div><div class="set-alarm">Set Alarm <span class="icon-alarm" aria-hidden="true"></div></section>',
    		overlayMarkup = '<div class="overlay"><div class="info"><div class="main"><select class="alarm-hour" title="Alarm Hour"><option value="">OFF</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select><select class="alarm-minute" title="Alarm Minute"><option value="0">00</option><option value="1">01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select><select class="alarm-am-pm" title="AM/PM"><option value="AM">AM<span class="icon-sun-stroke" aria-hidden="true"></span></option><option value="PM">PM<span class="icon-moon-fill" aria-hidden="true"></span></option></select><div class="wake">Wake Me<span class=" icon-sun-fill" aria-hidden="true"></div></div><h2 class="alarm-on">Wakey, Wakey, Eggs and Bakey!</h2><div class="snooze">snooze<span class=" icon-moon-fill" aria-hidden="true"></div></div>',
			markup = contentMarkup + overlayMarkup;
		
		$('body').html(markup);
		
    }
    
	function getCurrentTime() {
		
    	var date = new Date(),
    		seconds = date.getSeconds(),
    		minutes = date.getMinutes(),
    		hours = date.getHours(),
    		currentSeconds = seconds < 10 ? '0' + seconds : seconds,
			currentMinutes = minutes < 10 ? '0' + minutes : minutes,
			morningHours = hours == 0 ? 12 : hours,
			currentHours = hours > 12 ? hours - 12 : morningHours,
			timeOfDay = ( hours < 12 ) ? "AM" : "PM",
			currentTime =  currentHours + ':' + currentMinutes + ':' + currentSeconds + timeOfDay;
		
		return currentTime;	
	}
	
	function setTime(){
    	$('.clock p').html(getCurrentTime());
    }
    
    function openOverlay() {    
        $('.overlay').show();
    }
    
    function closeOverlay() {
        $('.overlay').hide();
    }
   
   	function showAlarm() {
   		$('.main').hide();
   		$('.wake').hide();
   		$('.alarm-on').show();
    	$('.snooze').show();
    }
    
    function hideAlarm() {
   		$('.main').show();
   		$('.wake').show();
   		$('.alarm-on').hide();
    	$('.snooze').hide();
   	}
    
    function getAlarmTime() {
    	var alarmHour = $('.alarm-hour option:selected').val(),
    		alarmMinute =  $('.alarm-minute option:selected').val(),
    		alarmTime = alarmHour + ':' + alarmMinute;
    		
    	return alarmTime;				
    }
    
    function setAlarm(alarm) {
    	var currentTime = $('.clock p').html(),
    		adjustedCurrentTime = currentTime.substring(0, currentTime.length - 5);
    		
    	if (alarm == adjustedCurrentTime && snooze == false) {
    		openOverlay();	
    		showAlarm();	
    	}
    		
    }

    function bindEvents() {
    	
    	// open set alarm
		$('.set-alarm').on('click', function() {
			openOverlay();
		});	 
	    
	    // close snooze
	    $('.snooze').on('click', function(e) {
	    	snooze = true;
	    	hideAlarm();
	        closeOverlay();
	    });
	    
	    $('.wake').on('click', function() {
	    	snooze = false;
	        closeOverlay();
	    });
	    
    }
    
    function loadBody() {
    
		 $(window).on('load', function(){
		 	setMarkup();
		 	setInterval(function() { 
		 		setTime(); 
		 		setAlarm(getAlarmTime());
		 	}, 1000 );
    		bindEvents();
		 });
    }

    $(document).ready(function() {
        loadBody();
    });

})(jQuery);