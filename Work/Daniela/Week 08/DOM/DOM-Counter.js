
window.addEventListener("DOMContentLoaded", () => {
  let count = 0;
  const counter = document.getElementById("counter");
  const increase = document.getElementById("increase");
  const decrease = document.getElementById("decrease");

  increase.addEventListener("click", () => {
    count++;
    counter.textContent = count;
  });

  decrease.addEventListener("click", () => {
    count--;
    counter.textContent = count;
  });

});
