/*
* -----------------------------------------------
*	Purpose: Main JS file - MONSOON
*	Version: 0.1
*	Author: Dror Afargan & Ran Nahmijas
*	Date: 1/6/2013
* --------------------------------------------
*/

/*---------------------------
	 Parallax navigation settings
	----------------------------*/
$(document).ready(function () {
	//set the height and width of the pages acording to the window size
	updatePagesHeihgt();
	$(window).resize(function(){updatePagesHeihgt();});
	
	var rightKey, leftKey, topKey, bottomKey; //key veriables
	//Set up the triggers for the arrow keys
	$(document).keydown(function(e){
		if (e.keyCode == 37 && typeof leftKey === 'function') {
			leftKey();
		} else if(e.keyCode == 38 && typeof topKey === 'function') {
			topKey();
		} else if(e.keyCode == 39 && typeof rightKey === 'function') {
			rightKey();
		} else if(e.keyCode == 40 && typeof bottomKey === 'function') {
			bottomKey();
		}
	});

	//set the pages for the parallax.js
	parallax.add($("#page_4"))
			.add($("#homePage"))			
			.add($("#page_2"))
			.add($("#page_3"));

	parallax.background = $("body");

	//Clears each page navigation on load
	parallax.preload = function(){
		rightKey = leftKey = topKey = bottomKey = "";
	};

	//Setting up page navigation 
	parallax.homePage.onload=function(){		
		setTop("page_2", "TheProject");	//for exemple set page 2 above the home page	
	};
	parallax.page_2.onload=function(){
		setRight("page_3", "Collection"); 
	};
	parallax.page_4.onload=function(){		
		setLeft("homePage","Home");
	};
	parallax.page_3.onload=function(){
		setBottom("page_4", "Features");			
	};

	//Sets the correct triggers for the arrows Icons, and the arrows keys	
	//right key - navigate for collection page 
	function setRight(page, text){
		rightKey = function(){
			parallax[page].right(); 
			setAsideBarDesign("collection");
		};
	}
	//left key - navigate for home page 
	function setLeft(page, text){
		leftKey = function(){
			parallax[page].left();
			setAsideBarDesign("home");
		};
	}
	//up key - navigate for project page 
	function setTop(page, text){
		topKey = function(){
			parallax[page].top();
			setAsideBarDesign("project");
		};
	}
	//down key - navigate for your umbrela  page 
	function setBottom(page, text){
		bottomKey = function(){
			parallax[page].bottom();
			setAsideBarDesign("umbrela");
		};
	}

	//show the home page
	parallax.homePage.show();
	
	//sets the aside bar navigation links - how to navigate from each page to another (the circular movement)	
	//"projectPage" link 
	$("#projectPage").click(function(){ // when click on it , checks which page is presented and navigate accordingly
		if(parallax.current.key == "homePage"){ 
			parallax.speed = 500; //sets the parallax speed
			parallax.page_2.top();
		}
		else if(parallax.current.key == "page_3"){
			toUmbrella().done(toHome);
			setTimeout(function(){parallax.page_2.top();},890);
		}
		else if(parallax.current.key == "page_4"){
			toHome().done(toProject);
		}
		setAsideBarDesign("project");//sets the aside bar design for the "project page"
	});
	//"ourCollection" link
	$("#ourCollection").click(function(){ 
		if(parallax.current.key == "homePage"){
			toProject().done(toCollection);
		}
		else if(parallax.current.key == "page_2"){
			parallax.speed = 500;
			parallax.page_3.right();
		}
		else if(parallax.current.key == "page_4"){
			toHome().done(toProject);
			setTimeout(function(){parallax.page_3.right();},890);
		}
		setAsideBarDesign("collection");
	});
	//"yourUmbrella" link
	$("#yourUmbrella").click(function(){
		if(parallax.current.key == "homePage"){
			toProject().done(toCollection);
			setTimeout(function(){parallax.page_4.bottom();},890);
		}
		else if(parallax.current.key == "page_2"){
			toCollection().done(toUmbrella);
		}
		else if(parallax.current.key == "page_3"){
			parallax.speed = 500;
			parallax.page_4.bottom();
		}
		setAsideBarDesign("umbrela");
	});
	//"homeIcon" link
	$("#homeIcon").click(function(){
		if(parallax.current.key == "page_2"){
			toCollection().done(toUmbrella);
			setTimeout(function(){parallax.homePage.left();},890);
		}
		else if(parallax.current.key == "page_3"){
			toUmbrella().done(toHome);
		}
		else if(parallax.current.key == "page_4"){
			parallax.speed = 500;
			parallax.homePage.left();
		}
		setAsideBarDesign("home");
	});
	
	//helpers functions for the aside bar navigation links
	var toProject = function () {
		var r = $.Deferred();
		parallax.speed = 400;
		parallax.page_2.top();
		setTimeout(function () {r.resolve();}, 450);
		return r;
	};
	
	var toCollection = function () {
		var r = $.Deferred();
		parallax.speed = 400;
		parallax.page_3.right();
		setTimeout(function () {r.resolve();}, 450);
		return r;		
	};
	
	var toUmbrella = function () {
		var r = $.Deferred();
		parallax.speed = 400;
		parallax.page_4.bottom();
		setTimeout(function () {r.resolve();}, 450);
		return r;		
	};	
	
	var toHome = function () {
		var r = $.Deferred();
		parallax.speed = 400;
		parallax.homePage.left();
		setTimeout(function () {r.resolve();}, 450);
		return r;		
	};	

	//sets the arrows icon links functions	
	$("#navigate-up").click(function (){  //when presing on the up arrow pics - "go" up to the project page
		parallax.speed = 500;
		parallax.page_2.top();
		setAsideBarDesign("project");
	 });
	 
	 $('#navigate-right').click(function () {
        parallax.speed = 500;
		parallax.page_3.right();
		setAsideBarDesign("collection");
    });
	
	$('#navigate-left').click(function () {
         parallax.speed = 500;
		 parallax.homePage.left();
		 setAsideBarDesign("home");
    });
 
    $('#navigate-down').click(function () {
        parallax.speed = 500;
		parallax.page_4.bottom();
		setAsideBarDesign("umbrela");
    });	
});

/*---------------------------
	 the collections Videos settings (in the "umbrela page")
	----------------------------*/
$(document).ready(function() 
{	
	 //Listener for data-video-num attributes in the umbrela page
	$('a[data-video-num]').live('click', function(e) {
		var chosenColorNum = $(this).attr('data-video-num'); //gets the attribute data
		var video = document.getElementById('umbrelaVideo');
		videoChangeTime = video.currentTime; //gets the video current time 
		
		video.addEventListener('click',stopVideoAtItem , false); //add event listener for stoping only in the wanted time
		
		video.addEventListener('loadedmetadata', function() { //add event listener for changing the loading video time after its metadata loaded
			this.currentTime = videoChangeTime; 
		}, false);
		
		switch(chosenColorNum) //checks which color was chosen (by the data attribute) and accordingly load the correct source 
		{
			case "1":				
				if (video.canPlayType("video/mp4")) { //checks if the broeser can play mp4 or ogg
				   video.setAttribute("src", 'movies/light-blue.mp4');
			   }
			   else if (video.canPlayType("video/ogg")) {
					video.setAttribute("src", 'movies/light-blue.ogv');
			   }
				break;
			case "2":
				if (video.canPlayType("video/mp4")) {
				   video.setAttribute("src", 'movies/pink.mp4');
			   }
			   else if (video.canPlayType("video/ogg")) {
					video.setAttribute("src", 'movies/pink.ogv');
			   }
				break;
			case "3":
				if (video.canPlayType("video/mp4")) {
				   video.setAttribute("src", 'movies/purple.mp4');
			   }
			   else if (video.canPlayType("video/ogg")) {
					video.setAttribute("src", 'movies/purple.ogv');
			   }
				break;
			case "4":
				if (video.canPlayType("video/mp4")) {
				   video.setAttribute("src", 'movies/torquise.mp4');
			   }
			   else if (video.canPlayType("video/ogg")) {
					video.setAttribute("src", 'movies/torquise.ogv');
			   }
				break;
			case "5":								
				if (video.canPlayType("video/mp4")) {
				   video.setAttribute("src", 'movies/yellow.mp4');
			   }
			   else if (video.canPlayType("video/ogg")) {
					video.setAttribute("src", 'movies/yellow.ogv');
			   }
				break;					
		}
	});
	
	//add event listener for the videos for playing its in a loop
	document.getElementById('umbrelaVideo').addEventListener("ended", function() {
        this.currentTime = 0;
		this.play();
	}, false);
	

	var timeToStop;//save the time to stop according to the time the user press on the video
	
	//checks when the user press on the video and sets the TimeToStop variable accordinly
	//for stopping on a complete umbrella
	function stopVideoAtItem()
	{
		var bool = true;
		var videoObj = document.getElementById("umbrelaVideo");
		
		if(!videoObj.paused) 
		{	
			if (this.currentTime < 5) { //if the current video time is less than 5 sec then it will stop only when its get to 5
				timeToStop = 5;
			}
			else if (this.currentTime < 9) {
				timeToStop = 9;
			}
			else if (this.currentTime < 13) {
				timeToStop = 13;
			}	
			else if (this.currentTime < 17) {
				timeToStop = 17;
			}
				else if (this.currentTime < 21) {
				timeToStop = 21;
			}
			else if (this.currentTime < 24) {
				timeToStop = 1;
			}		
			else timeToStop = 24;
			//add event listener for video time update for stopping in the right time
			videoObj.addEventListener("timeupdate", checkTimeForPause, false);
		}
		else {// if the user press on the video and it was paused so its plays it
			videoObj.removeEventListener("timeupdate", checkTimeForPause, false);
			this.play();
		}
	}
	//helper function for the "timeupdate" listener that checks when to stop the video
	function checkTimeForPause()
	{
		if (this.currentTime >= timeToStop && this.currentTime - timeToStop < 10) {
			this.pause();
		}
	}
});

/*---------------------------
	 Weather presenter settings
	----------------------------*/
var airpor;
var locationDotTop;
var locationDotLeft;

$(document).ready(function() {
	// dictionary for cities,airports and dot location
	var cityMappings = [
		["tel-aviv", "TLV","10px","15px"], 
		["bangladesh", "BTL","68px","28px"],
		["bangkok", "BKK","82px","52px"],
		["beijing","PEK","98px","12px"]
	];
	//Randomly picks a city and sets the currect details to the variables
	var rand =Math.floor(Math.random()*4)
	var city = cityMappings[rand][0];
	airport = cityMappings[rand][1];
	locationDotLeft = cityMappings[rand][2];
	locationDotTop = cityMappings[rand][3];

	// create script element
	var script = document.createElement('script');
	//set the url with the city
	var url = "http://openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=d747751577192daeaa3613b05da53ea3&callback=insertReply"
	// assing src with callback name
	script.src = url;
	// insert script to document and load content
	document.body.appendChild(script);		
});

//the callback function from the Json with the weather parameters
//sets the html elements according to it
function insertReply(content) {
		var temp = content.main.temp;
		var decimalTemp = Math.floor(temp); 
		document.getElementById('tempratureNumber').innerHTML =decimalTemp;
		document.getElementById('airportCode').innerHTML = airport;
		document.getElementById('locationDot').style.left = locationDotLeft;
		document.getElementById('locationDot').style.top = locationDotTop;
		document.getElementById('locationDot').style.visibility = "visible";
		document.getElementById('temprature').style.visibility = "visible";
		if (content.name != "")
			document.getElementById('city').innerHTML =content.name;
		else document.getElementById('city').innerHTML =content.sys.country;
}	

/*---------------------------
	Alert Video Settings
----------------------------*/
$(document).ready(function(){
	//hide the shadow and the video when loading
    $("#shadow").css("height", $(document).height()).hide();
	$("#alertMovie").css("height", $(document).height()).hide();
	document.getElementById('alertMovie').addEventListener("ended", toggleAlertVideo, false); //listener when the video ended to hide it
    $(".alertSwitcher").click(toggleAlertVideo); //sets the moonsoonLink button
	
	//toggle the video (show or hide the shadow and the video)
	function toggleAlertVideo(){
		var video = document.getElementById('alertMovie');
		$("#shadow").toggle(); 
		setTimeout(function(){ //set a timeout between the shadow and playing the video
			$("#alertMovie").toggle();
			if ($("#shadow").is(":hidden"))	{
				video.pause();
			}			
			else{
				video.style.visibility = "visible";
				video.currentTime = 0;
				video.play();
			}},350);				 
	}
});


/*---------------------------
	 page 2 ("the project" page) functions
	----------------------------*/
//sets the logo animation (changing the umbrela color)
function animateLogo(subject){	
	var delay = 200;
	var image = document.getElementById('page2Innerlogo');
	
	//sets the logo color according to the menu item the mouse on it
	image.setAttribute("src", "img/page2images/logoColor/" + subject +"1.png");
	for(var i=2;i<5;i++){
		setTimeout(
			(function(s) {
				return function() {
					image.setAttribute("src", s);
				}
			})("img/page2images/logoColor/" + subject + i +".png"), delay); //replace it every 100ms
			delay += 200;
	}
}

//shows the content that selected in the page 2 menu
var isShowContent = false;
function getContent(subject){
	isShowContent = true;
	var image = document.getElementById('page2Innerlogo');
	image.setAttribute("src", "img/page2images/umbrella-"+ subject +".png"); //set the logo color
	$("#projectPageMenu").toggle();	 // hide the menu
	$("." + subject ).show(600);	//show the content (animate)	
}

//shows back the menu (when clicking on "back")
function backToProjectMenu(subject){
	$("." + subject ).hide();	
	isShowContent = false;
	$("#projectPageMenu").toggle(backToSourceImg());	
}

//sets back the initial logo when mouse leave the menu item
function backToSourceImg(){
	if (!isShowContent)	{
		var image = document.getElementById('page2Innerlogo');	
		image.setAttribute("src", "img/page2images/umbrellaSecondPage.png");
	}	
}


/*---------------------------
	 other functions
	----------------------------*/	
	
//set the aside bar design for each page
function setAsideBarDesign(PageName)
{
	if (PageName != "umbrela") //common settings for all the pages except the umbrela page
	{
		document.getElementById("asideBar").className = "menuForHomePage";
		document.getElementById("locationDot").src = "img/page1images/page1Dot.png";
		document.getElementById("homePageLink").src = "img/page1images/homePageLinkPage1.png";
		document.getElementById("asideArrow").src = "img/page1images/asideArrow.png";	
	}
	switch(PageName) //for each page sets the correct aside bar style
	{
		case "home":
			document.getElementById("mapImg").className = "mapImgForHomePage";
			document.getElementById("pageTitle").style.visibility = "hidden";
			break;
		case "project":
			document.getElementById("mapImg").className = "mapImgForProjectPage";
			document.getElementById("pageTitle").style.visibility = "visible";		
			document.getElementById("pageTitle").innerHTML = "<p>the</p><p>project</p>";
			break;
		case "collection":
			document.getElementById("mapImg").className = "mapImgForCollectionPage";
			document.getElementById("pageTitle").style.visibility = "visible";
			document.getElementById("pageTitle").innerHTML = "<p>our</p><p>collection</p>";	
			break;
		case "umbrela":
			document.getElementById("asideBar").className = "menuForUmbrelaPage";
			document.getElementById("mapImg").className = "mapImgForUmbrelaPage";
			document.getElementById("locationDot").src = "img/page4images/page4Dot.png";
			document.getElementById("homePageLink").src = "img/page4images/homePageLinkPage4.png";	
			document.getElementById("asideArrow").src = "img/page4images/asideArrowPage4.png";	
			document.getElementById("pageTitle").style.visibility = "visible";		
			document.getElementById("pageTitle").innerHTML = "<p>your</p><p>umbrela</p>";
			break;
	}
}

//set the height and width of the pages acording to the window size
var updatePagesHeihgt = function(){
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	//var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	var laptopHeight = "800px";
	var tabletHeight = "1000px";
	if (windowHeight < 800)	{
		if (windowWidth > 997)
		{
			$("#homePage").css("height", "800px");
			$("#page_2").css("height", "800px");
			$("#page_3").css("height", "800px");
			$("#page_4").css("height", "800px");
		}
		else {
			$("#homePage").css("height", laptopHeight);
			$("#page_2").css("height", laptopHeight);
			$("#page_3").css("height", tabletHeight);
			$("#page_4").css("height", tabletHeight);
		}
		document.body.style.overflowY = "scroll";
		if (windowHeight < 650)	{
			$("#asideBar").css("height", "800px");	
		}
	}
	else {
		$("#homePage").css("height", "100%");
		$("#page_2").css("height", "100%");
		$("#page_3").css("height", "100%");
		$("#page_4").css("height", "100%");
		document.body.style.overflowY = "hidden";
	}
//	if (windowWidth < 1000)	{
//		$("#homePage").css("width", "1000px");
//		$("#page_2").css("width", "1000px");
//		$("#page_3").css("width", "1000px");
//		$("#page_4").css("width", "1000px");
//		document.body.style.overflowX = "scroll";		
//	}
//	else {
//		$("#homePage").css("width", "100%");
//		$("#page_2").css("width", "100%");
//		$("#page_3").css("width", "100%");
//		$("#page_4").css("width", "100%");
//		document.body.style.overflowX = "hidden";		
//	}
}
		