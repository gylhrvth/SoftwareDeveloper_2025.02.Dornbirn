function updateTime() {
    document.getElementById('time').innerHTML = new Date().toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime(); // Initial call to display time immediately
