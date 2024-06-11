import 'react-calendar/dist/Calendar.css';
import TimeSlotDay from './components/timeSlots/timeSlotDays/TimeSlotDay';
import TimeSlotWeek from './components/timeSlots/TimeSlotWeek';
import { useState } from 'react';
import Calendar from "react-calendar";
import { days, getNext7Days } from './components/data';
import AppointmentHeader from './AppointmentHeader';
import { times, skips } from './components/data'
import { useAppointmentContext } from './settingContext';


function AppointmentMain({ appointments = [] }) {

    const { showSideBar, setShowSideBar, unblockTime, setUnblockTime, showWeeks, setShowWeeks, appointmentDate, setAppointmentDate, appointmentProvider, setAppointmentProvider, setAppointmentLocation, appointmentLocation } = useAppointmentContext()
    const [error, setError] = useState({})
    const weekDates = getNext7Days(appointmentDate)

    const slots = times(8, 17, 15)
    const gaps = skips(15)

    return (
        <div className='card bg-light-primary overflow-scroll'>
            <AppointmentHeader
                showSideBar={showSideBar}
                setShowSideBar={setShowSideBar}
                showWeeks={showWeeks}
                weekDates={weekDates}
                setShowWeeks={setShowWeeks}
                appointmentDate={appointmentDate}
                first={weekDates && weekDates[0]}
                last={weekDates && weekDates[weekDates.length - 1]}
            />
            <div className='row p-2'>
                {showSideBar &&
                    <div className='col-3'>
                        <div className="card">
                            <div className="card-body d-flex flex-column px-9 pt-6 pb-8">
                                <Calendar onChange={(date) => {
                                    setAppointmentDate(date)
                                }} value={appointmentDate} className='border border-white fs-7' />
                            </div>
                        </div>
                    </div>
                }
                <div className={`${showSideBar ? 'col-9' : 'col-12'} p-1`}>
                    <div className="card">
                        <div className="card-header border-0">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1">{`${appointmentProvider.first_name} ${appointmentProvider.last_name}`}</span>
                            </h3>
                        </div>
                        <div className="card-body d-flex flex-column px-8 py-0">
                            {showWeeks ?
                                <TimeSlotWeek setError={setError} setShowWeeks={setShowWeeks} skip={15} slots={slots} gaps={gaps} weekDates={weekDates} />
                                :
                                <TimeSlotDay unblockTime={unblockTime} setError={setError} skip={15} day={days[appointmentDate.getDay()]} slots={slots} gaps={gaps}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppointmentMain;
