let squareX = 0, 
    squareY = 0, 
    step = 1,
    iteration = 0;
let messageCount = 1;
let messages = [];
const squareSide = 10;
const directions = [
    [0, 1], // Up
    [1, 0], // Right
    [0, -1], //Down
    [-1, 0] // Left 
];
let isAnimationRunning = false;
let initialContent = document.querySelector(".main__content").innerHTML;
if (localStorage.getItem("messages") !== null)
    document.querySelector(".allMessages").innerHTML = JSON.parse(localStorage.getItem("messages"));
document.querySelector(".button__play").addEventListener("click", openWork);
function openWork ()
{
    /* Creating all objects */
    let work = document.createElement("div");
    work.classList.add("work");
    let controls = document.createElement("div");
    controls.classList.add("controls");
    let anim = document.createElement("div");
    anim.classList.add("anim");

    work.appendChild(controls);
    work.appendChild(anim);

    /* Message box */
    let messages = document.createElement("p");
    messages.classList.add("messages");
    messages.innerHTML = "Here messages will be displayed";
    controls.appendChild(messages);
    /* Start button */
    let buttonStart = document.createElement("button");
    buttonStart.classList.add("button__start");
    buttonStart.innerHTML = "Start";
    controls.appendChild(buttonStart);
    buttonStart.addEventListener("click", startAnimation);
    
    /* Close button */
    let buttonClose = document.createElement("button");
    buttonClose.classList.add("button__close");
    buttonClose.innerHTML = "Close";
    controls.appendChild(buttonClose);
    buttonClose.addEventListener("click", closeWork);

    /* Animated square */
    let square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("style", `top: calc(50% - ${squareSide / 2 - squareY}px); left: calc(50% - ${squareSide + squareX}px);`);
    anim.appendChild(square);

    /* Replacing initial content with the objects */
    document.querySelector(".main__content").innerHTML = "";
    document.querySelector(".main__content").appendChild(work);
}
function closeWork ()
{
    clearInterval(intervalAnimation);
    resetSquare();
    document.querySelector(".main__content").innerHTML = initialContent;
    document.querySelector(".button__play").addEventListener("click", openWork);
    localStorage.setItem("messages", JSON.stringify(messages));
    document.querySelector(".allMessages").innerHTML = messages;
    messageCount = 1;
}

let intervalAnimation;
function startAnimation ()
{
    isAnimationRunning = true;
    intervalAnimation = window.setInterval(runAnimation, 100);
    changeStartToStop();
    messages.push(`Message ${messageCount++}: animation started. ${Date.now().toString()}`);
    document.querySelector(".messages").innerHTML = messages[messages.length - 1];
}
function runAnimation ()
{
    squareX += directions[iteration][0] * step;
    squareY += directions[iteration][1] * step;
    step += 2;
    iteration = (iteration + 1) % directions.length;
    document.querySelector(".square").setAttribute("style", `top: calc(50% - ${squareSide / 2 - squareY}px); left: calc(50% - ${squareSide + squareX}px);`);
    messages.push(`Message ${messageCount++}: square moved. ${Date.now().toString()}`);
    document.querySelector(".messages").innerHTML = messages[messages.length - 1];
    if (isSquareOutOfBoundaries() || !isAnimationRunning)
    {
        endAnimation();
        return;
    }
}
function stopAnimation ()
{
    isAnimationRunning = false;
    clearInterval(intervalAnimation);
    changeStopToStart();
    messages.push(`Message ${messageCount++}: animation stopped. ${Date.now().toString()}`);
    document.querySelector(".messages").innerHTML = messages[messages.length - 1];
}
function isSquareOutOfBoundaries ()
{
    let square = document.querySelector(".square").getBoundingClientRect(),
    anim = document.querySelector(".anim").getBoundingClientRect();
    return square.bottom < anim.top || square.top > anim.bottom || square.right < anim.left || square.left > anim.right;
}

function changeStartToStop ()
{
    let stopButton = document.createElement("button");
    stopButton.classList.add("button__stop");
    stopButton.innerHTML = "Stop";
    document.querySelector(".controls").replaceChild(stopButton, document.querySelector(".button__start"));
    stopButton.addEventListener("click", stopAnimation);
}
function changeStopToStart ()
{
    let startButton = document.createElement("button");
    startButton.classList.add("button__start");
    startButton.innerHTML = "Start";
    document.querySelector(".controls").replaceChild(startButton, document.querySelector(".button__stop"));
    startButton.addEventListener("click", startAnimation);
}
function endAnimation ()
{
    isAnimationRunning = false;
    clearInterval(intervalAnimation);
    /* Change Stop to Reload */
    let reloadButton = document.createElement("button");
    reloadButton.classList.add("button__reload");
    reloadButton.innerHTML = "Reload";
    document.querySelector(".controls").replaceChild(reloadButton, document.querySelector(".button__stop"));
    reloadButton.addEventListener("click", reloadAnimation);
    messages.push(`Message ${messageCount++}: square popped out. ${Date.now().toString()}`);
    document.querySelector(".messages").innerHTML = messages[messages.length - 1];
}
function reloadAnimation ()
{
    resetSquare();
    document.querySelector(".square").setAttribute("style", `top: calc(50% - ${squareSide / 2 - squareY}px); left: calc(50% - ${squareSide + squareX}px);`);
    /* Change Reload to Start */
    let startButton = document.createElement("button");
    startButton.classList.add("button__start");
    startButton.innerHTML = "Start";
    document.querySelector(".controls").replaceChild(startButton, document.querySelector(".button__reload"));
    startButton.addEventListener("click", startAnimation);
    messages.push(`Message ${messageCount++}: animation reloaded. ${Date.now().toString()}`);
    document.querySelector(".messages").innerHTML = messages[messages.length - 1];
}
function resetSquare ()
{
    squareX = 0;
    squareY = 0;
    iteration = 0;
    step = 1;
}