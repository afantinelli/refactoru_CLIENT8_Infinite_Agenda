var calendarData = {}
$(document).ready(function (){
$.fn.editable.defaults.mode = 'inline';
//Week and Date Rendering
	var n = 0
	var cd = 0
	var ca = 0
var dateCounter = function() {
	var currentDate = (new Date)
	var newDate = new Date(currentDate);
	newDate.setDate(newDate.getDate() + n);
	var nd = new Date(newDate);
	n++
	calendarDay = nd.toString()

	return calendarDay.slice(3,15);
};


//Rendering Initial Week
var initialWeek = function (){
	weekLoop((new Date().getDay()))
};

//Rendering one week at a time
var renderWeek = function (){
	weekLoop(0)
};


var createDay = function(weekdays) {
		var dayOfWeek = $('<div id='+cd+' class="dayOfWeek container"><h3 class="dayHead text-muted">{0}</h3></div>'.supplant([weekdays]));
		var date = $('<div class="date row"><h4 class="text-info">'+ dateCounter() +'</h4></div><div class="addAppt"><button type="button" class="btn btn-success addApptButton">+</button><span class="apptAddText">Click to add another appointment</span></div><hr>');
		var appt = $('<div class="apptContainer"><a href="#" data-placement="right" data-num="'+ca+'" class="editable editable-click editable open appt small text-muted">Click to enter appointment</a><div class="delAppt"><button type="button" class="btn btn-xs btn-danger delApptButton">&times</button><span class="apptDelText">Click to delete this appointment</span></div></div>');
		$('.appt').editable({
		    type: 'text',
		    pk: 1,
		    url: '#',
		    title: 'Add Appointment'
		});

		dayOfWeek.append(date);
		dayOfWeek.append(appt);
		cd++
		ca++
		return dayOfWeek;
	};

var weekLoop = function(start) {
	var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var calList = $('<ul class="calendarWeek unstyled"></ul>')
	for(var i=start; i<weekDays.length; i++) {
		var week = createDay(weekDays[i]);
		var item = $('<li class="container"></li>');
		item.append(week);
		calList.append(item);
		$('.calendarList').append(calList);
	}
}


/// End week rendering

//
// Infinite Scroll begin
var scrollTop = 0;
var docHeight; 
var winHeight; 
var winViewPercent; 
var scrollPercent; 

$(window).scroll(function(){
	 scrollTop = $(window).scrollTop(); // distance scrolled from top
	 docHeight = $(document).height();
	 winHeight = $(window).height();
	 winViewPercent = (1-(docHeight-winHeight)/docHeight)
	 scrollPercent = ((scrollTop) / (docHeight - winHeight) * 100);

		if(scrollPercent>=85){
			renderWeek()
		}
	
});
//infinite scroll end

initialWeek();

renderWeek();
renderWeek();

$(document).on('click', '.addAppt', function (){
	$(this).parent().append($('<div class="apptContainer"><a href="#" data-placement="right" data-num="'+ca+'"  class="editable editable-click editable open appt small text-muted">Click to enter appointment</a><div class="delAppt"><button type="button" class="btn btn-xs btn-danger delApptButton">&times</button><span class="apptDelText">Click to delete this appointment</span></div></div>'));

			$('.appt').editable({
		    type: 'text',
		    pk: 1,
		    url: '#',
		    title: 'Add Appointment'
		});
	ca++
});


// add appointment button
$(document).on('mouseover', '.addAppt', function (){
	$(this).children('.apptAddText').fadeIn()
});

$(document).on('mouseleave', '.addAppt', function (){
	$(this).children('.apptAddText').fadeOut()
});

// delete button functionality
$(document).on('click', '.delApptButton', function (){
	$(this).parent().siblings('a').andSelf().fadeOut()

});

$(document).on('mouseover', '.delApptButton', function (){
	$(this).siblings('.apptDelText').fadeIn()
});

$(document).on('mouseleave', '.delApptButton', function (){
	$(this).siblings('.apptDelText').fadeOut()
});


 //make an object to store data
calendarData = localStorage

var apptObj = {}

var cs = 0
$(document).on('blur', '.input-medium', function() {


	var enteredAppt = $(this).val();

	var enteredId = ($(this).closest('.dayOfWeek').attr('id'))

	var enteredClass = ($(this).closest('.apptContainer').children('a').attr('data-num'))


	apptObj[enteredClass] = enteredAppt
	calendarData[enteredId] = enteredAppt



	localStorage.setItem(enteredId, JSON.stringify(enteredId [enteredClass]=enteredAppt))
});



$('.calendarView').on('click', function() {
	$('li').css('float','left')
	$('.dayOfWeek').css('width', '200px').css('float','left')
});



});