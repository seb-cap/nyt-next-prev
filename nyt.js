createButtons(100);

// Gets the button container
async function getHolder(timeout) {
	while (document.getElementsByClassName("xwd__modal--button-container").length === 0) {
		await new Promise(r => setTimeout(r, timeout));
	}
	return document.getElementsByClassName("xwd__modal--button-container")[0];
}

// Wait for there to be no more holder
async function waitMissingHolder() {
	while (document.getElementsByClassName("xwd__modal--button-container").length !== 0) {
		await new Promise(r => setTimeout(r, 200));
	}
}

// Creates the next day button
async function createButtons(timeout) {
	const holder = await getHolder(timeout);
	
	// create the button
	const nextButton = document.createElement("button");
	const prevButton = document.createElement("button");

	// create the link
	const nextLink = document.createElement("a");
	const prevLink = document.createElement("a");
	const url = window.location.href;
	
	const sub = url.endsWith("/") ? 11 : 10;
	
	const date = url.substring(url.length - sub);
	let restOfURL = url.substring(0, url.length - sub);

	console.log(url);
	console.log(restOfURL);
	console.log(date);

	let nextDay = addDays(date, 1);
	let prevDay = addDays(date, -1);

	if (isNaN(prevDay.valueOf())) {
		const now = new Date(Date.now());
		prevDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
		restOfURL = url + "/";
	}
	
	let nextM = "" + (nextDay.getMonth()+1);
	if (nextM.length == 1) nextM = "0" + nextM;
	
	let prevM = "" + (prevDay.getMonth()+1);
	if (prevM.length == 1) prevM = "0" + prevM;
	
	let nextD = "" + nextDay.getDate();
	if (nextD.length == 1) nextD = "0" + nextD;
	
	let prevD = "" + prevDay.getDate();
	if (prevD.length == 1) prevD = "0" + prevD;

	nextLink.setAttribute("href", restOfURL + nextDay.getFullYear() + "/" + nextM + "/" + nextD);
	nextLink.innerHTML = "Next Day's Puzzle";
	
	prevLink.setAttribute("href", restOfURL + prevDay.getFullYear() + "/" + prevM + "/" + prevD);
	prevLink.innerHTML = "Previous Day's Puzzle";

	nextButton.appendChild(nextLink);
	prevButton.appendChild(prevLink);
	
	nextButton.className = "pz-moment__button";
	prevButton.className = "pz-moment__button";
	
	holder.prepend(prevButton); // i dont care enough to change this for the first crosswords
	if (nextDay < Date.now()) holder.appendChild(nextButton);
	
	// wait for something to be clicked, then try to create end screen buttons
	await waitMissingHolder();
	createButtons(1000);
}

// adds a day to the date string
// must be formatted as YYYY/MM/DD
function addDays(date, days) {
	const split = date.split("/");
	let y = split[0];
	let m = split[1];
	let d = split[2];
	
	let newDate = new Date(y, m-1, parseInt(d)+parseInt(days));
	
	return newDate;
}