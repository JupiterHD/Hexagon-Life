let N = 40;

let FIELD = [];
let settings = [0, 0, 1, 1, 0, 0, 0]
let color = "black";
let is_random = false;
let delay = 1000;
let game = null;
let stopgame = true;
let gen = 0;

for (let i = 0; i < N; i++) {
	for(let j = 0; j < N; j++)
		FIELD.push(0);
}

let field = document.getElementById('field');
let setcol = document.getElementById('setcol');
let randcol = document.getElementById('randcol');
let randcols = document.getElementById('randcols');
let startbtn = document.getElementById('start');
let pausebtn = document.getElementById('pause');
let speed = document.getElementById('speed');
let random = document.getElementById('random');
let clear = document.getElementById('clear');
let nxtstep = document.getElementById('step');
let yes = document.getElementById('yes_stop');
let no = document.getElementById('no_stop');
let generation = document.getElementById('generation');

window.addEventListener('load', init);

function init() {
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			const cell = document.createElement('div');
			cell.className = "cell";
			cell.id = i*N + j;
			cell.style.left = (j*20 + (i % 2)*10) + "px";
			cell.style.top = i*20 + "px";
			cell.style.position = "absolute";
			cell.addEventListener('click', change)
			document.getElementById('field').appendChild(cell);
		}
	}
	setcol.addEventListener('click', set);
	randcol.addEventListener('click', rand);
	randcols.addEventListener('click', rands);
	startbtn.addEventListener('click', start);
	pausebtn.addEventListener('click', pause);
	speed.addEventListener('change', changeSpeed);
	random.addEventListener('click', randCells);
	clear.addEventListener('click', clearField);
	nxtstep.addEventListener('click', step);
	yes.addEventListener('click', clickYes);
	no.addEventListener('click', clickNo);
	document.getElementById('set0').addEventListener('click', changeSettings);
	document.getElementById('set1').addEventListener('click', changeSettings);
	document.getElementById('set2').addEventListener('click', changeSettings);
	document.getElementById('set3').addEventListener('click', changeSettings);
	document.getElementById('set4').addEventListener('click', changeSettings);
	document.getElementById('set5').addEventListener('click', changeSettings);
	document.getElementById('set6').addEventListener('click', changeSettings);

}

function rgbToHex(color) {
    if (color.charAt(0) == "#") {
        return color;
    }

    let nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
        r = parseInt(nums[2], 10).toString(16),
        g = parseInt(nums[3], 10).toString(16),
        b = parseInt(nums[4], 10).toString(16);

    return "#"+ (
        (r.length == 1 ? "0"+ r : r) +
        (g.length == 1 ? "0"+ g : g) +
        (b.length == 1 ? "0"+ b : b)
    );
}

function randInt(max) {
	return Math.floor(Math.random() * (max + 1));
}

function randCol() {
	return "rgb(" + randInt(255) + ", " + randInt(255) + ", " + randInt(255) + ")";
}

function rand() {
	color = randCol();
	col.value = rgbToHex(color);
	//console.log(rgbToHex(color));
	changeColors();
}

function rands() {
	if(is_random)
	{
		is_random = false;
		randcols.textContent = "Случайные цвета";
		changeColors();
		randcol.removeAttribute('disabled');
		setcol.removeAttribute('disabled');
	}else
	{
		is_random = true;
		randcols.textContent = "Одинаковые цвета";
		for(let i = 0; i < FIELD.length; i++)
			if(FIELD[i] == 1)
				document.getElementById(i).style.background = randCol();
		randcol.setAttribute('disabled', "");
		setcol.setAttribute('disabled', "");
	}
}

function set() {
	color = document.getElementById('col').value;
	changeColors();
	//console.log(color);
}

function changeColors() {
	for(let i = 0; i < FIELD.length; i++)
		if(FIELD[i] == 1)
			document.getElementById(i).style.background = color;
}

function change() {
	if(game != null)return;
	let id = parseInt(this.id);
	let row = Math.floor(id / N);
	//console.log(row);
	let col = id % N;
	//console.log(col);
	if(FIELD[id] == 1)kill(id);
	else revive(id);
	updateGen(0);
}

function revive(pos) {
	FIELD[pos] = 1;
	if(is_random)
		document.getElementById(pos).style.background = randCol();
	else
		document.getElementById(pos).style.background = color;
}

function kill(pos) {
	FIELD[pos] = 0;
	document.getElementById(pos).style.background = "white";
}

function changeSpeed() {
	delay = this.value;
	if(game != null)
	{
		clearInterval(game);
		game = setInterval(step, delay);
	}
}

function clearField() {
	for (let i = 0; i < FIELD.length; i++) {
		kill(i);
	}
	if(game != null)clearInterval(game);
	game = null;

	updateGen(0);
}

function extinction() {
	let num = 0;
	for (let i = 0; i < FIELD.length; i++) {
		if(FIELD[i] == 1)num++;
	}
	if(num == 0)
	{
		if(game != null)clearInterval(game);
		game = null;
	}
}

function randCells() {
	for (let i = 0; i < FIELD.length; i++) {
		if(randInt(1) == 1)revive(i);
		else kill(i);
	}
	updateGen(0);
}

function changeSettings() {
	if(settings[parseInt(this.value)] == 1)
	{
		settings[parseInt(this.value)] = 0;
		this.removeAttribute("checked");
	}else
	{
		settings[parseInt(this.value)] = 1;
		this.setAttribute("checked", "");
	}
}

function clickNo() {
	stopgame = false;
}

function clickYes() {
	stopgame = true;
}

function updateGen(num) {
	gen = num;
	generation.textContent = gen;
}
