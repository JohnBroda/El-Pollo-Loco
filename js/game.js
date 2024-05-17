let gameState = false
let fullscreen = false
let fullscreenmobile = true
let muteAudio = false
let canvas;
let world;
let keyboard = new Keyboard();
let gameOn = false

/**
 * Initializes the game environment by setting up the canvas and world objects.
 */

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, winLose(), gameOn);
    if (!localStorage.getItem('audio')) {
        localStorage.setItem('audio', true)
    }
}

/**
 * Handles the end-game scenario by playing an end sound, showing the death or win screen, and updating the start button UI.
 * @param {HTMLAudioElement} endsound - The sound to play at the end of the game.
 * @param {string} buttoncollor - The background color for the 'Back to Menu' button.
 * @param {string} backgroundimg - The URL for the background image displayed at the end screen.
 */

function winLose(endsound, buttoncollor, backgroundimg) {
    if (world) {
        endsound.volume = 0.6
        endsound.play()
        deathAndWinScreen(backgroundimg)
        setTimeout(() => {
            document.getElementById('start').innerHTML = 'Back to Menu'
            document.getElementById('start').style.display = ''
            document.getElementById('start').style.backgroundColor = buttoncollor
        }, 6000);
    }
}

/**
 * Displays the win/lose screen with a specified image and triggers UI changes.
 * @param {string} backgroundimg - The URL for the background image displayed at the end screen.
 */

function deathAndWinScreen(backgroundimg) {
    setTimeout(() => {
        document.getElementById('startWinLoseImg').src = backgroundimg;
        document.getElementById('startWinLoseImg').classList.add('winLoseAnimation')
        document.getElementById('startWinLoseImg').classList.remove('d-none')
        document.getElementById('iconFullscreen').classList.add('d-none')
        document.getElementById('iconAudio').classList.add('d-none')
        document.getElementById('handyIconFlex').classList.add('d-none')
    }, 750);
}

/**
 * Toggles the display of the start button and possibly reloads the page if the game is over.
 */

function startAndRestartGameButton() {
    document.getElementById('start').style.display = 'none'
    document.getElementById('loading').classList.remove('d-none')
    document.getElementById('tutorialButton').classList.add('d-none')
    gameOn = true;
    if (world && world.gameOver) {
        location.reload()
    }
}

/**
 * updating UI components and handling game music if DOMContentLoaded.
 */

function start() {
    setInterval(() => {
        if (world && gameOn == true) {
            if (localStorage.getItem('audio') == 'true') {
                muteAudio = localStorage.getItem('audio')
            }
            ifelseAudio()
            document.getElementById('loading').classList.add('d-none')
            document.getElementById('startWinLoseImg').classList.add('d-none')
            document.getElementById('iconFullscreen').classList.remove('d-none')
            document.getElementById('iconAudio').classList.remove('d-none')
            ifMobile()
        }
    }, 200);
}

function ifMobile(){
    if (window.innerHeight < 540 && fullscreenmobile) {
        document.getElementById('handyIconFlex').classList.remove('d-none')
        fullscreenmobile = false
        document.getElementById('cover').requestFullscreen().then(() => {
            screen.orientation.lock('landscape')
        });
    }
}

function tutorialButton(){
    document.getElementById('tutorial').classList.remove('d-none')
}

function tutorialRemove(){
    document.getElementById('tutorial').classList.add('d-none')
}

/**
 * Toggles the audio state (mute/unmute) and updates the UI icon accordingly.
 */

function setAudio() {
    muteAudio = !muteAudio;
    localStorage.setItem('audio', muteAudio)
}

function ifelseAudio(){
    if (!muteAudio) {
        world.audio.mute = true
        document.getElementById('iconAudio').src = 'img/0_icons/audio_off.png'
    } else {
        world.audio.mute = false
        document.getElementById('iconAudio').src = 'img/0_icons/audio_on.png'
    }
}

/**
 * Toggles the fullscreen mode on and off for the application.
 */

function setFullscreen() {
    if (!fullscreen) {
        document.getElementById('cover').requestFullscreen().then(() => {
            if (screen.height < 500) {
                screen.orientation.lock('landscape')
            }
        });
    } else {
        document.exitFullscreen();
        screen.orientation.unlock();
    }
    fullscreen = !fullscreen;
}

window.addEventListener("keydown", (e) => {
    let key = e.code;

    if (key === 'KeyD') {
        keyboard.RIGHT = true;
    } else if (key === 'KeyA') {
        keyboard.LEFT = true;
    } else if (key === 'Space') {
        keyboard.SPACE = true;
    } else if (key === 'KeyF') {
        keyboard.F = true;
    }
});

window.addEventListener("keyup", (e) => {
    let key = e.code;

    if (key === 'KeyD') {
        keyboard.RIGHT = false;
    } else if (key === 'KeyA') {
        keyboard.LEFT = false;
    } else if (key === 'Space') {
        keyboard.SPACE = false;
    } else if (key === 'KeyF') {
        keyboard.F = false;
    }
});

/**
 * Assigns touch event listeners to a specified button that will trigger keyboard actions.
 * @param {string} elementId - The ID of the HTML element (button).
 * @param {string} action - The action (keyboard key) to toggle on touch start/end.
 */

function setAction(elementId, action) {
    const button = document.getElementById(elementId);
    button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[action] = true;
    });
    button.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard[action] = false;
    });
}

window.addEventListener('DOMContentLoaded', function () {
    setAction('buttonleft', 'LEFT');
    setAction('buttonright', 'RIGHT');
    setAction('buttonjump', 'SPACE');
    setAction('buttonthrow', 'F');
    start()
});
