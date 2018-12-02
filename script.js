
var field = document.getElementById('field');
var score = document.getElementById('score');
var currScore = score.firstElementChild;
var currNum = 0;

currScore.innerHTML = currNum;

//creating field
for (var i = 0; i < 70; i++) {
	var line = document.createElement('div');
	line.classList.add('line');
	for (var j = 0; j < 100; j++) {
		var column = document.createElement('div');
		column.classList.add('column');
		line.appendChild(column);
	}
	field.appendChild(line);
}

var lines = document.getElementsByClassName('line');
var columns = document.getElementsByClassName('column');
columns.map = Array.prototype.map;

//snake def cords
var snake = [
{x: 51, y: 35},
{x: 50, y: 35},
{x: 49, y: 35},
];

//apple def cords
var apple = {
	x: randX(), 
	y:randY()
};

addApple();

snake.forEach( (elem) => lines[elem.y].children[elem.x].classList.add('snake') );

var courses = [
	'top',
	'bottom',
	'left',
	'right'
];

var currCourse = courses[3];

//moving functions
function moveLeft(event) {
	if (event.keyCode == 97) {
		currCourse = courses[2];
	}
};


function moveRight(event) {
	if (event.keyCode == 100) {
		currCourse = courses[3];
	}
};


function moveTop(event) {
	if (event.keyCode == 119) {
		currCourse = courses[0];
	}
};


function moveBottom(event) {
	if (event.keyCode == 115) {
		currCourse = courses[1];
	}
};

//main script
var timerId = setInterval(function() {

	var tail = snake[snake.length - 1];

	//remove snake tail
	lines[tail.y].children[tail.x].classList.remove(lines[tail.y].children[tail.x].classList[1]);

	var head = snake[0];


	//course check;
	if (currCourse == courses[0]) {
		tail.x = head.x;
		tail.y = head.y - 1;
		addX();
		removeY();
	}

	if (currCourse == courses[1]) {
		tail.x = head.x;
		tail.y = head.y + 1;
		addX();
		removeY();
	}

	if (currCourse == courses[2]) {
		tail.x = head.x - 1;
		tail.y = head.y;
		addY();
		removeX();
	}

	if (currCourse == courses[3]) {
		tail.x = head.x + 1;
		tail.y = head.y;
		addY();
		removeX();
	}

	//add snake head
	snake.pop(-1);
	snake.unshift(tail);


	//check for loose
	var loose = false;

	for (var i = 1; i < snake.length; i++) {

		var xLooseTest = snake[0].x == snake[i].x;
		var yLooseTest = snake[0].y == snake[i].y;

		if ( xLooseTest && yLooseTest ) {
			loose = true;
		}
	}

	if (snake[0].x < 0 || snake[0].x > lines[0].children.length - 1) {
		loose = true;
	}

	if (snake[0].y < 0 || snake[0].y > lines.length - 1) {
		loose = true;
	}

	if (loose) {
		restart();
		loose = false;
	}

	//draw snake;
	lines[snake[0].y].children[snake[0].x].classList.add('snake');

	//check for eating apple
	var xTest = snake[0].x == apple.x;
	var yTest = snake[0].y == apple.y;

	if (xTest && yTest) {
		currNum++;
		currScore.innerHTML = currNum;
		removeApple();
		apple.x = randX();
		apple.y = randY();
		addApple();
		addTail();
	}

}, 100);

//course add funcs
function addY() {
	window.addEventListener('keypress', moveTop);
	window.addEventListener('keypress', moveBottom);
}


function addX() {
	window.addEventListener('keypress', moveLeft);
	window.addEventListener('keypress', moveRight);
}

//course remove funcs
function removeX() {
	window.removeEventListener('keypress', moveLeft);
	window.removeEventListener('keypress', moveRight);
}

function removeY() {
	window.removeEventListener('keypress', moveTop);
	window.removeEventListener('keypress', moveBottom);
}


//random cords funcs
function randX() {
	var x = Math.round(Math.random() * 100);
	if (x == 100) x--;
	return x; 
}


function randY() {
	var y = Math.round(Math.random() * 100);
	if (y >= 70) y-= 31;
	return y; 
}

//funcs for add and removing apple
function addApple() {
	lines[apple.y].children[apple.x].classList.add('apple');
}


function removeApple() {
	lines[apple.y].children[apple.x].classList.remove('apple');
}

//func for tail add
function addTail() {
	var lastInd = snake.length - 1;

	var tail = {
		x: undefined,
		y: undefined
	};

	tail.x = snake[lastInd].x;
	tail.y = snake[lastInd].y;

	snake.push(tail);
}

//restart func
function restart() {
	while(snake.length != 3) {
		snake.pop();
	}

	columns.map( (element) => element.classList.remove('snake') );

	var startX = 51;
	var startY = 35;

	snake.map( function(element) {
		startX--;
		element.x = startX;
		element.y = startY;
	});

	currNum = 0;
	currScore.innerHTML = currNum;
	currCourse = courses[3];
	removeApple();
	addApple();
}
