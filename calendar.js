let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let events = {
    '2024-09-26': 'Primer partido',
    '2024-09-27': 'Segundo partido',
    '2024-09-29': 'Semifinales',
    '2024-09-30': 'Tercer lugar'
};  // Objeto para almacenar eventos

function createCalendar(year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    // Ajustar para que el lunes sea el día 0
    const adjustedFirstDay = (firstDay === 0) ? 6 : firstDay - 1;

    let calendarHTML = '<table>';
    calendarHTML += '<thead><tr>';
    calendarHTML += '<th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th><th>Sáb</th><th>Dom</th>';
    calendarHTML += '</tr></thead><tbody>';

    let day = 1;

    // Primer semana con días vacíos si es necesario
    for (let row = 0; row < 6; row++) {
        calendarHTML += '<tr>';

        for (let col = 0; col < 7; col++) {
            if (row === 0 && col < adjustedFirstDay) {
                calendarHTML += '<td class="prev-month"></td>';
            } else if (day > daysInMonth) {
                break;
            } else {
                const currentDate = new Date(year, month, day);
                const today = new Date();
                const isToday = currentDate.toDateString() === today.toDateString();
                const dayClass = isToday ? 'current-day' : '';
                const dateString = currentDate.toISOString().split('T')[0]; // formato yyyy-mm-dd
                const eventText = events[dateString] ? `<span class="event">${events[dateString].title}</span>` : '';

                calendarHTML += `<td class="${dayClass}" onclick="showEventForm('${dateString}')">${day} ${eventText}</td>`;
                day++;
            }
        }

        calendarHTML += '</tr>';
        if (day > daysInMonth) break;
    }

    calendarHTML += '</tbody></table>';
    document.getElementById('calendar').innerHTML = calendarHTML;
    document.getElementById('month-year').textContent = `${getMonthName(month)} ${year}`;
}

function getMonthName(month) {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return monthNames[month];
}

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    createCalendar(currentYear, currentMonth);
}

function showEventForm(date) {
    document.getElementById('event-form').style.display = 'block';
    document.getElementById('add-event-form').onsubmit = (e) => saveEvent(e, date);
}

function hideEventForm() {
    document.getElementById('event-form').style.display = 'none';
}

function saveEvent(e, date) {
    e.preventDefault();

    const title = document.getElementById('event-title').value;
    const description = document.getElementById('event-description').value;

    if (title && description) {
        events[date] = { title, description };  // Guardar el evento

        document.getElementById('event-title').value = '';
        document.getElementById('event-description').value = '';
        hideEventForm();

        createCalendar(currentYear, currentMonth);  // Actualizar el calendario
    }
}

function showEventDetails(date) {
    if (events[date]) {
        document.getElementById('event-description-text').textContent = events[date].description;
        document.getElementById('event-details').style.display = 'block';
    }
}

function hideEventDetails() {
    document.getElementById('event-details').style.display = 'none';
}

// Inicializar el calendario al cargar la página
createCalendar(currentYear, currentMonth);