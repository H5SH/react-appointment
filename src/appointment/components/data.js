import { pad } from "../../../../components/helpers/utilities";

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

const prefixDays = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thur',
    'Fri',
    'Sat',
]

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const prefixMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]

function times(start, end) {
    const times = []
    for (let i = start; i <= end; i++) {
        times.push(i)
    }
    return times
}

function timeSlotsAndGaps(start, end, gap) {
    const times = []
    let min = 0
    for (let i = start; i <= end; i++) {
        for (let j = 0; j < (60 / gap); j++) {
            if (j === 0) {
                times.push(`${pad(i)}:00`)
            } else {
                times.push(`${pad(i)}:${min += gap}`)
            }
        }
    }
    return times
}

function skips(gap) {
    const gaps = [0]
    let min = 0
    for (let i = 0; i < (60 / gap - 1); i++) {
        gaps.push(min += gap)
    }
    return gaps
}

const providerAppointment = {
    id: 1,
    name: 'JOHN M AARON',
    appointments: [
        { from: '12:15', to: '12:30' },
        { from: '15:15', to: '15:30' },
    ]
}


function timeComparer(appointmentFrom, appointmentTo, time, display) {
    // 08:45 <= 08:45 && 08:58 >= 08:45
    // 12:00 <= 12:15 && 12:15 >= 12:15
    if (appointmentFrom <= time && appointmentTo > time) {
        return true
    }
    return false
}

function providerAppointmentTimeCompare(provider, time, gap) {
    const [hour, min, sec] = provider.appointment_time.split(':')
    return timeComparer(provider.appointment_time.slice(0, 5),
        parseInt(min) + provider.visit_length >= 60
            ? `${pad(parseInt(hour) + 1)}:00` :
            `${hour}:${pad(parseInt(min) + provider.visit_length)}`,
        `${pad(time)}:${pad(gap)}`)
}

function dateComparer(selectedDate, compareDate) {
    if (selectedDate === compareDate) {
        return true
    }
    return false
}

function yyyy_mm_dd(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function dayFinder(d) {
    const date = new Date(d)
    return prefixDays[date.getDay()]
}

function dayComparer(day, appointedDate) {

    if (day === dayFinder(appointedDate)) {
        return true
    }
    return false
}

function getFullWeekDates(date) {
    const dayOfWeek = date.getDay(); // Get the day of the week (0-6, where 0 is Sunday)
    const firstDayOfWeek = new Date(date); // Clone the input date
    firstDayOfWeek.setDate(date.getDate() - dayOfWeek); // Get the first day of the week

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(firstDayOfWeek);
        currentDate.setDate(firstDayOfWeek.getDate() + i); // Increment by day
        weekDates.push(currentDate);
    }

    return weekDates;
}

function getNext7Days(selectedDate) {
    const dates = [];
    const startDate = new Date(selectedDate);

    // Loop through the next 7 days
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        dates.push(currentDate);
    }

    return dates;
}

function groupAppointmentsByTime(appointments) {
    return appointments.reduce((acc, appointment) => {
        const [time, hour, sec] = appointment.appointment_time.split(':');
        if (!acc[`${time}:${hour}`]) {
            acc[`${time}:${hour}`] = [];
        }
        acc[`${time}:${hour}`].push(appointment);
        return acc;
    }, {});
}

function groupAppointmentsByDateTime(appointments) {
    return appointments.reduce((acc, appointment) => {
        const dateTime = appointment.appointment_date + '/' + appointment.appointment_time;
        if (!acc[dateTime]) {
            acc[dateTime] = [];
        }
        acc[dateTime].push(appointment);
        return acc;
    }, {});
}



export {
    days, months, times, prefixDays, skips, prefixMonths, providerAppointment,
    timeComparer, providerAppointmentTimeCompare, timeSlotsAndGaps, dateComparer,
    yyyy_mm_dd, dayFinder, dayComparer, getNext7Days, getFullWeekDates, groupAppointmentsByTime,
    groupAppointmentsByDateTime
}

