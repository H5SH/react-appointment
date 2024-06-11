import { useEffect, useState, Fragment } from 'react'
import { providerAppointmentTimeCompare } from '../../data'
import { pad } from '../../../../../../components/helpers/utilities'
import '../timeslots.css'
import ProviderDataRow from './ProviderDataRow'
import { openDrawer } from '../../../../../../components/assets/js/_DrawerComponents'
import { useAppointmentContext } from '../../../settingContext'
import { updateOrCreate } from '../../../../../../components/helpers/InertiaForm'

function TimeSlotDay({
    day, skip = 15, appoitments = [], editAppointment, slots, gaps, unblockTime
}) {

    const { setAppointmentTime, setAppointmentDay } = useAppointmentContext()
    const [hover, setHover] = useState(-1)

    const [draggedDiv, setDraggedDiv] = useState({
        time: '',
        appointment: {},
        droped: false
    })

    useEffect(() => {
        if (draggedDiv.droped) {
            updateOrCreate('/appointment', {
                ...draggedDiv.appointment,
                appointment_time: draggedDiv.time,
            }, true, null, null, null, null, true)
            setDraggedDiv({
                time: '',
                appointment: {},
                droped: false
            })
        }
    }, [draggedDiv.droped])

    return (
        <>
            <div className='row bg-white p-2 border'>
                <div className='col-1 text-center'>
                    Time
                </div>
                <div className='col-1'>
                    Length
                </div>
                <div className='col-2 text-center'>
                    Patient Name
                </div>
                <div className='col-1 text-center'>
                    DOB/Age
                </div>
                <div className='col-2 text-center'>
                    Home/Cell Phone
                </div>
                <div className='col-2 text-center'>
                    Provider/ Staff
                </div>
                <div className='col-2 text-center'>
                    Reason for Visit
                </div>
                <div className='col-1 text-center'>
                    Status
                </div>
            </div>

            {slots?.map((time, index) => (
                <Fragment key={index}>
                    {gaps?.map((gap, gapindex) => (
                        <div key={`${time}:${gap}`} className={`row border ${unblockTime.from <= `${pad(time)}:${pad(gap)}` && unblockTime.to >= `${pad(time)}:${pad(gap)}` ? 'bg-white' : 'bg-secondary'} bg-white`} onClick={() => {

                            setAppointmentTime({ time: `${pad(time)}:${pad(gap)}`, skip: skip })
                            setAppointmentDay(day)
                        }}
                        >
                            <div className='col-1 text-center border-end border-info p-2'>
                                {gapindex === 0 ?
                                    <>
                                        <h6 style={{ display: 'inline' }}>{pad(time)}</h6>:{pad(gap)}
                                    </> :
                                    <div className='ps-5 align-items-center'>
                                        {`:${pad(gap)}`}
                                    </div>
                                }
                            </div>

                            {appoitments[`${pad(time)}:${pad(gap)}`]
                                && appoitments[`${pad(time)}:${pad(gap)}`]?.length > 0
                                && providerAppointmentTimeCompare(appoitments[`${pad(time)}:${pad(gap)}`][0], time, gap) ?

                                <div className="col-11">
                                    {appoitments[`${pad(time)}:${pad(gap)}`].map((appoitment, index) => (
                                        <ProviderDataRow draggedDiv={draggedDiv} setDraggedDiv={setDraggedDiv} provider={appoitment} time={time} gap={gap} callBack={() => editAppointment(appoitment)} index={index} key={index} />
                                    ))}
                                </div>

                                :
                                <div className='col-11 p-0'
                                    onDragEnter={() => {
                                        setHover(`${time}:${pad(gap)}`)
                                    }}
                                    onDragExit={() => {
                                        setHover(-1)
                                    }}
                                    onDragOver={(e) => {
                                        e.preventDefault()
                                    }}
                                    onDrop={() => {
                                        setDraggedDiv({
                                            ...draggedDiv,
                                            time: `${time}:${pad(gap)}`,
                                            droped: true
                                        })
                                    }}
                                    style={hover === `${time}:${pad(gap)}` ?
                                        { borderColor: 'greenyellow', borderWidth: '2px', borderStyle: 'solid' } :
                                        {}}
                                >
                                    <div className="timeInputs"
                                        onClick={() => {
                                        }}>
                                        {unblockTime.from <= `${pad(time)}:${pad(gap)}` && unblockTime.to >= `${pad(time)}:${pad(gap)}` ?
                                            `${time}:${pad(gap)}` : ''
                                        }
                                    </div>
                                </div>
                            }
                        </div >
                    ))}
                </Fragment>
            ))
            }
        </>
    )
}

export default TimeSlotDay