function start() {
	if(is_gaming)return;
	is_gaming = true;
	game = setInterval(step, delay);
}


function pause() {
	if(!is_gaming)return;
	is_gaming = false;
	clearInterval(game);
}


function step() {
	let arr = [];
	for(let i = 0; i < FIELD.length; i++)
	{
		let p = 0;
		if(FIELD[(i+N*N-N)%(N*N)] == 1)p++;
		if(FIELD[(i+N*N-N-1)%(N*N)] == 1)p++;
		if(FIELD[(i+N*N-1)%(N*N)] == 1)p++;
		if(FIELD[(i+1)%(N*N)] == 1)p++;
		if(FIELD[(i+N)%(N*N)] == 1)p++;
		if(FIELD[(i+N-1)%(N*N)] == 1)p++;
		arr.push(p);
	}
	for(let i = 0; i < FIELD.length; i++)
		if(arr[i] == 2 || arr[i] == 3)revive(i);
		else kill(i);
}
