// Set the current date on page load
window.onload = function() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    document.getElementById('cd').value = formattedDate;
};

function calculateAge() {
    // Get the value from the date inputs
    const currentDateValue = document.getElementById('cd').value;
    const birthDateValue = document.getElementById('dob').value;

    // Check if the date of birth is provided
    if (!birthDateValue) {
        alert("Please enter a valid date of birth.");
        return;
    }

    // Convert the current date string to a Date object
    const [currentDay, currentMonth, currentYear] = currentDateValue.split('/').map(Number);
    const currentDate = new Date(currentYear, currentMonth - 1, currentDay); // Months are 0-indexed in JavaScript

    // Convert the birth date string directly to a Date object
    const [birthYear, birthMonth, birthDay] = birthDateValue.split('-').map(Number);
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay); // Months are 0-indexed in JavaScript

    // Calculate age in years
    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

    // Adjust age if the current month/day is before the birth month/day
    if (ageDays < 0) {
        ageMonths--;
        const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
        ageDays += lastMonthDate.getDate() + 1;
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    // Display the result
    document.getElementById('ageText').textContent = `${ageYears} years, ${ageMonths} months, ${ageDays} days`;
}