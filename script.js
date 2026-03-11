let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;
let lapCount = 0;

function startStopwatch() {
    if (!isRunning) {
        interval = setInterval(updateTime, 10); // Update every 10ms
        isRunning = true;
        
        // Update button states
        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('lapBtn').disabled = false;
    }
}

function pauseStopwatch() {
    clearInterval(interval);
    isRunning = false;
    
    // Update button states
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('lapBtn').disabled = true;
}

function resetStopwatch() {
    clearInterval(interval);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    
    // Update display
    updateDisplay();
    
    // Clear laps
    document.getElementById('lapList').innerHTML = '<h3>Laps:</h3>';
    lapCount = 0;
    
    // Update button states
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('lapBtn').disabled = true;
}

function updateTime() {
    milliseconds += 10;
    
    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
    }
    
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('minutes').textContent = padZero(minutes);
    document.getElementById('seconds').textContent = padZero(seconds);
    document.getElementById('milliseconds').textContent = padZero(Math.floor(milliseconds / 10));
}

function padZero(num) {
    return num < 10 ? '0' + num : num;
}

function recordLap() {
    lapCount++;
    let lapTime = `${padZero(minutes)}:${padZero(seconds)}:${padZero(Math.floor(milliseconds / 10))}`;
    
    let lapList = document.getElementById('lapList');
    let lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `
        <span class="lap-number">Lap ${lapCount}</span>
        <span class="lap-time">${lapTime}</span>
    `;
    
    lapList.appendChild(lapItem);
    
    // Auto-scroll to show new lap
    lapList.scrollTop = lapList.scrollHeight;
}