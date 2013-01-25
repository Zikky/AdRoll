// variables used
var popShots;
var everShots;
var debutShots;
var popNum = 1;
var everNum = 1;
var debutNum = 1;
var active = "Popular";

// popular shots
function popGet(pageNum){
	var url = "http://api.dribbble.com/shots/popular";
	$.get(
		url, {page:pageNum, per_page:"9"},
		function(data){
			popShots = data;
			popNum += 1;
			render(popShots);
		},
		"jsonp"
	);
};

// everyone shots
function everGet(pageNum){
	var url = "http://api.dribbble.com/shots/everyone";
	$.get(
		url, {page:pageNum, per_page:"9"},
		function(data){
			everShots = data;
			everNum += 1;
			render(everShots);
		},
		"jsonp"
	);
};

// deubts shots
function debutGet(pageNum){
	var url = "http://api.dribbble.com/shots/debuts";
	$.get(
		url, {page:pageNum, per_page:"9"},
		function(data){
			debutShots = data;
			debutNum += 1;
			render(debutShots);
		},
		"jsonp"
	);
};

//Popular: render
function getPop(){
	if (active != "Popular"){
		popGet("1");
		$('#'+active).removeClass("active");
		$('#Popular').addClass("active");
		active = "Popular";
		popNum = 1;
	};
};

//Debut: render
function getDebut(){
	if (active != "Debuts"){
		debutGet("1");
		$('#'+active).removeClass("active");
		$('#Debuts').addClass("active");
		active = "Debuts"
		debutNum = 1;
	};
};

// Everyone: render
function getEver(){
	if (active != "Everyone"){
		everGet("1");
		$('#'+active).removeClass("active");
		$('#Everyone').addClass("active");
		active = "Everyone";
		everNum = 1;
	};
};

//popular shots is default
popGet("1")

/*format I want:
	<li>
    	<div class="shot">
    		<div class="pic">
                <a href=URL>
                    <img src='image_teaser_url'>
                </a>
            </div>
            <div class=lc>
                likes_count Likes
			</div>
            <div class=lc>
                comments_count Comments
            </div>
	     </div>
    </li>

*/

var inner = "";
var innerP1 = '<li><div class="shot"><div class="pic"><a href="';
var innerP2 = '"><img src="';
var innerP3 = '"></a></div><div class="lc">'
var innerP4 = ' Likes</div><div class="lc">'
var innerP5 = ' Comments</div></div></li>'


function render(filter){
	for (var i = 0; i<filter.shots.length;i++){
		inner = inner + innerP1 + filter.shots[i].url + innerP2 + filter.shots[i].image_teaser_url + innerP3 + filter.shots[i].likes_count + innerP4 + filter.shots[i].comments_count + innerP5;
	};
	$('.gallery').html(inner);
	inner = "";
};

function loadMore(){
	switch(active){
		case "Popular":
			inner = $('.gallery').html();
			popGet(popNum.toString());
			break;
		case "Debuts":
			inner = $('.gallery').html();
			debutGet(debutNum.toString());
			break;
		case "Everyone":
			inner = $('.gallery').html();
			everGet(everNum.toString());
			break;
	};
};