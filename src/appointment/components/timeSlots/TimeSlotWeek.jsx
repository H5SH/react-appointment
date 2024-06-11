import './timeslots.css'
import { prefixDays, providerAppointmentTimeCompare, yyyy_mm_dd, dateComparer, pad } from '../data'
import React, { useEffect, useState } from 'react'
import { useAppointmentContext } from '../../settingContext'


function TimeSlotWeek({ setShowWeeks, skip = 15, editAppointment, slots = [], gaps = [], providerAppointments = [], weekDates, formOpen }) {

    const { setAppointmentTime, setAppointmentDate, setAppointmentDateWeek, setAppointmentDay, setRefresh } = useAppointmentContext()
    const [dragHover, setDragHover] = useState(0)
    const [draggedData, setDraggedData] = useState({
        time: '',
        date: '',
        appointment: {},
        drop: false,
    })


    useEffect(() => {
        if (draggedData.drop) {
            setDraggedData({
                time: '',
                date: '',
                appointment: {},
                drop: false
            })
        }
    }, [draggedData.drop])

    return (
        <>
            <div className='row'>
                <div className='col-1'></div>
                {weekDates.map((day) => (
                    <div onClick={() => {
                        setAppointmentDate(day)
                        setShowWeeks(false)
                    }}
                        className='col justify-content-center border border-1 text-center bg-white'
                        style={{ cursor: 'pointer' }}
                    >
                        {`${prefixDays[day.getDay()]} ${day.getMonth() + 1}/${day.getDate()}`}
                    </div>
                ))}
            </div>

            {slots.map((time, index) => (
                <React.Fragment key={index}>
                    {gaps?.map((gap, gapindex) => (
                        <div className='row'>
                            <div key={`${time}:${gap}`} className='col-1 text-center border-end border-info p-2' onClick={() => {
                                setAppointmentTime({ time: `${time}:${pad(gap)}`, skip: skip })
                            }}>
                                {gapindex === 0 ?
                                    <>
                                        <h6 style={{ display: 'inline' }}>{pad(time)}</h6>:{pad(gap)}
                                    </> :
                                    <div className='ps-5'>
                                        {`:${pad(gap)}`}
                                    </div>
                                }
                            </div>
                            {weekDates.map((day, index) => (
                                <React.Fragment key={`${index}:${index}`}>
                                    {providerAppointments[`${yyyy_mm_dd(day)}/${pad(time)}:${pad(gap)}:00`] &&
                                        providerAppointments[`${yyyy_mm_dd(day)}/${pad(time)}:${pad(gap)}:00`][0]
                                        && providerAppointmentTimeCompare(providerAppointments[`${yyyy_mm_dd(day)}/${pad(time)}:${pad(gap)}:00`][0], time, gap)
                                        && dateComparer(yyyy_mm_dd(day), providerAppointments[`${yyyy_mm_dd(day)}/${pad(time)}:${pad(gap)}:00`][0].appointment_date) ?

                                        <div className='col'>
                                            {providerAppointments[`${yyyy_mm_dd(day)}/${pad(time)}:${pad(gap)}:00`].map((appointment) => (
                                                <div
                                                    draggable
                                                    onDragStart={() => {
                                                        setDraggedData({
                                                            ...draggedData,
                                                            appointment: appointment
                                                        })
                                                    }}
                                                    key={appointment.id}
                                                    style={{ backgroundColor: appointment.color, cursor: draggedData.appointment ? 'grab' : 'grabing' }}
                                                    className='justigy-content-center border border-1 text-center'
                                                    onClick={() => {
                                                        setAppointmentDay(prefixDays[day.getDay()])
                                                        editAppointment(appointment)
                                                    }}
                                                    data-toggle="tooltip" data-placement="bottom"
                                                    title={`facility Name: ${appointment.facility_name}, Provider Name: ${appointment.provider_name}`}
                                                >
                                                    {`${appointment.patient.first_name} ${appointment.patient.last_name}`}
                                                </div>
                                            ))}
                                        </div>
                                        :
                                        <div
                                            onDragEnter={() => {
                                                setDragHover(`${time} ${gap} ${day.getDay()}`)
                                            }}
                                            onDragExit={() => {
                                                setDragHover(0)
                                            }}
                                            onDragOver={(e)=> {
                                                e.preventDefault()
                                            }}
                                            onDrop={() => {
                                                setDraggedData({
                                                    ...draggedData,
                                                    time: `${pad(time)}:${pad(gap)}`,
                                                    date: yyyy_mm_dd(day),
                                                    drop: true
                                                })
                                            }}
                                            className={`timeInputs col justify-content-center border border-1 ${dragHover === `${time} ${gap} ${day.getDay()}` && 'border-success'} text-center bg-white`}
                                            id='kt_appointment_toggle'
                                            onClick={() => {
                                                setAppointmentTime({ time: `${time}:${pad(gap)}`, skip: skip })
                                                setAppointmentDateWeek(day)
                                                setAppointmentDay(prefixDays[day.getDay()])
                                                editAppointment(null)
                                            }}>
                                            {`${time}:${pad(gap)}`}
                                        </div>
                                    }
                                </React.Fragment>
                            ))}
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </>
    )
}

export default TimeSlotWeek