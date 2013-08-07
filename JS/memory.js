//start at 0
var timer_id = 0;
var time = 0;
//3 arrays for the three sizes of games to play
var letters_small = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E'];
var letters_medium = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J'];
var letters_large = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O', 'P', 'P', 'Q', 'Q', 'R', 'R', 'S', 'S', 'T', 'T'];
//number of squares on each board - changes depending on game type
var squares;
//number of letters within the squares - "" "" "" "" ""
var letters;

var small = 10;// 10 letters in the small Array
var medium = 20;// 20 in the medium
var large = 40; //40 in the large
var columns = 5; // each game will have 5 columns
var rows;

var last_id = '';
var last_card = '';

//compare with var currentId = $(this).attr('id');
var letters_matched = 0;

//Code In Here gets executed once code is ready. ie hovering, clicking events//
$(function(){
	//attach a click function to the inputs to call startGame.
	$('input').click(startGame); 
	
	//bind hover and click functions to divs, even ones that don't exist yet.
	$('#game').on('hover','div.column', hovering);
	$('#game').on('click','div.column', cardClick);

});

function startGame(){
	//depending on which particular game (this) they pick, give it these attributes.....
	switch($(this).attr('id'))
	{
		
		case "small":
			letters = letters_small;
			rows = 2;
			squares = small;
			break;
		case "medium":
			letters = letters_medium;
			rows = 4;
			squares = medium;
			break;
		case "large":
			letters = letters_large;
			rows = 8;
			squares = large;
			break;
	}
	//shuffle
	randomizeArray(letters); 
	//the corse begins at zero, as 0 letters matched
	letters_matched = 0; 
	//call the timer function
	startTime();
	//clear the board
	$('#game').html('');
	// make a loop to create the rows
	for(var r = 0; r < rows; r++){
		//use the var r as a unique id
		$('#game').append('<div id="r' + r + '" class="row"></div>');
		//make a loop to create the columns
		for(var c = 0; c < columns; c++){
		//target each new row id and create columns with unique ids.
			$('#r' + r).append('<div id="r' + r + 'c' + c + '" class="column"></div>');
		}
	}
}

function cardClick(){
	//get the card's id.
	var card_id = $(this).attr('id');
	//parse the card_id and enter it into the letter array to get the card's letter.
	var card = letters[(parseInt(card_id[1]) * 5) + parseInt(card_id[3])]
	//change the card's text to display the letter
	$(this).text(card);
		//match the cards
		//if the text of the last card clicked equals the current card's text and they're not on the same card id
		if(last_card == card && card_id != last_id){
			//add the found class
			$('#'+card_id).addClass('found');
			$('#'+last_id).addClass('found');
			//this part could probably be fixed logically. make sure both cards are visible.
			$(this).text(card);
			$('#'+last_id).text(card);

			//remove their ids so we can't click on them anymore.
			$('#'+card_id).attr('id','');
			$('#'+last_id).attr('id','');
			 //increase the score.
			letters_matched = letters_matched + 1;
			//check if we've won
			if(letters_matched == squares/2){
				$('div.column').addClass('won');
				clearInterval(timer_id);
			}
		} else {
				//remove previous card
				$('#'+last_id).text('');
				//move the card over to the last_card
				last_card = card;
				//move the card_id over to the last_id
				last_id = card_id;
		}
}

//Add hoverclass to cards.
function hovering(){
	$(this).toggleClass('hover');
}

function startTime(){
	time = 0;
	clearInterval(timer_id);
	timer_id = setInterval(updateTime, 1000);
}

function updateTime(){
	time++;
	$('#timer').text('Game time: '+time);
}

//Randomize the Cards
function randomizeArray(array){
  var i = array.length;
  if (i == 0) return false;
  while (--i){
     var j = Math.floor(Math.random() * (i + 1));
     var tempi = array[i];
     var tempj = array[j];
     array[i] = tempj;
     array[j] = tempi;
  }
  return array;
}
