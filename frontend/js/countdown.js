// Set the target date (example: 5 days from now)
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 5); // change as needed

// Update countdown every second
const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Calculate time parts
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update HTML
    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

    // If countdown is finished
    if (distance < 0) {
        clearInterval(countdown);
        document.querySelector(".countdown-timer").innerHTML = "<h2>Time’s up!</h2>";
    }
}, 1000);
