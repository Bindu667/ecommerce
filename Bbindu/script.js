const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentDate = new Date();

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Set month name in header
    document.getElementById("month-name").innerText = `${monthNames[month]} ${year}`;
    
    // Get the first day of the month and the total number of days in the month
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const tbody = document.querySelector("#calendar tbody");
    tbody.innerHTML = ''; // Clear any previous content
    
    let dayCount = 1;
    
    // Create the calendar rows and cells
    for (let i = 0; i < 6; i++) { // At most 6 rows for a calendar
        let row = document.createElement('tr');
        
        // Create each day of the week for this row
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement('td');
            
            if (i === 0 && j < firstDay) {
                // Fill the initial empty cells
                cell.classList.add('empty');
            } else if (dayCount <= totalDays) {
                // Fill the actual days
                cell.innerText = dayCount;
                
                // Highlight the current day
                if (dayCount === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                    cell.classList.add('selected');
                }
                
                // Add click event to select the day
                cell.addEventListener('click', () => {
                    document.querySelectorAll('td').forEach((el) => el.classList.remove('selected'));
                    cell.classList.add('selected');
                    alert(`You selected: ${monthNames[month]} ${dayCount}, ${year}`);
                });
                
                dayCount++;
            } else {
                // Fill remaining empty cells in the last row
                cell.classList.add('empty');
            }
            
            // Color weekends differently (Sunday and Saturday)
            if (j === 0 || j === 6) {
                cell.classList.add('sun');
            }
            
            row.appendChild(cell);
        }
        
        tbody.appendChild(row);
        
        // Stop when all days are placed
        if (dayCount > totalDays) break;
    }
}

// Render the initial calendar
renderCalendar(currentDate);

// Navigation buttons functionality
document.getElementById("prev-month").addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

document.getElementById("next-month").addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});
