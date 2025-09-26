
let countdown = 5;
const countdownSpan = document.getElementById('countdown');

const interval = setInterval(() => {
  countdown--;
  countdownSpan.textContent = countdown;
  if(countdown <= 0){
    clearInterval(interval);
    window.location.href = 'vibewave.html'; 
  }
}, 1000);

document.getElementById('enterBtn').addEventListener('click', () => {
  window.location.href = 'vibewave.html';
});
