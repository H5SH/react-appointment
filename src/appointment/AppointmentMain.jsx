import 'react-calendar/dist/Calendar.css';
import TimeSlotDay from './components/timeSlots/timeSlotDays/TimeSlotDay';
import TimeSlotWeek from './components/timeSlots/TimeSlotWeek';
import { useEffect, useState } from 'react';
import Calendar from "react-calendar";
import { days, groupAppointmentsByTime, getNext7Days, groupAppointmentsByDateTime, yyyy_mm_dd, appointmentsFilter, prefixDays } from './components/data';
import AppointmentForm from './components/AppointmentForm/AppointmentForm';
import AppointmentHeader from './AppointmentHeader';
import { times, skips } from './components/data'
import LocationDropdown from './components/LocationDropdown';
import ProvidersDropdown from './components/ProvidersDropdown';
import { useAppointmentContext } from './settingContext';
import { openDrawer } from '../../../components/assets/js/_DrawerComponents';
import { addAppointment } from '../../redux/slice';
import { useDispatch } from 'react-redux';
import { router } from '@inertiajs/react';
import ApiErrorMessages from '../../../components/helpers/ApiErrorMessage';


function AppointmentMain({ schedules, providers = [{id:0}], locations = [{id:0}], patients = [{id:0}], appointments = [] }) {

    const { showWeeks, setShowWeeks, setPatients, setProviders, setLocations, appointmentDate, setAppointmentDate, appointmentProvider, setAppointmentProvider, setAppointmentLocation, appointmentLocation } = useAppointmentContext()
    patients && setPatients(patients)
    providers && setProviders(providers)
    locations && setLocations(locations)
    const [providerAppointments, setProviderAppointments] = useState()
    const [unblockTime, setUnblockTime] = useState({
        from: '',
        to: ''
    })
    const [showSideBar, setShowSideBar] = useState(true)
    const [error, setError] = useState({})
    const weekDates = getNext7Days(appointmentDate)
    const dispatch = useDispatch()

    const slots = times(8, 17, 15)
    const gaps = skips(15)

    const Providers = [
        {
            first_name: 'All', last_name:'', id: 0
        },
        ...providers
    ]

    const Locations = [
        {
            name: 'All', id: 0
        },
        ...locations
    ]


    function editAppointment(appointment) {
        dispatch(addAppointment(appointment))
    }

    function getProviderAppointments() {
        appointments?.sort((a, b) => {
            return a.appointment_time.localeCompare(b.appointment_time);
        })
        appointments && setProviderAppointments(showWeeks ? groupAppointmentsByDateTime(appointments) : groupAppointmentsByTime(appointments))
    }

    function providerSchedule(date){
        const providerSchedule = schedules.filter(schedule => {
            if(schedule.provider_id === appointmentProvider?.id)
                return schedule
        })
        const day = prefixDays[date.getDay()]
        const schedule = providerSchedule[0]?.schedule && JSON.parse(providerSchedule[0]?.schedule)
        if(providerSchedule[0]?.schedule && schedule[day]){
            setError({})
            setUnblockTime({
                from: schedule[day].From,
                to: schedule[day].To
            })
        }else if(appointmentProvider.id){
            setError({[`${appointmentProvider.first_name} ${appointmentProvider.last_name}`]: `Is Not Available on ${day}`})
        }

    }
    console.log(unblockTime)

    useEffect(() => {
        getProviderAppointments()
        schedules && providerSchedule(appointmentDate)
    }, [appointments])

    return (
        <div className='card bg-light-primary overflow-scroll'>
            <AppointmentForm />
            <AppointmentHeader
                showSideBar={showSideBar}
                setShowSideBar={setShowSideBar}
                appointmentLocation={appointmentLocation}
                appointmentProvider={appointmentProvider}
                getProviderAppointments={getProviderAppointments}
                editAppointment={editAppointment}
                showWeeks={showWeeks}
                weekDates={weekDates}
                setShowWeeks={setShowWeeks}
                appointmentDate={appointmentDate}
                first={weekDates && weekDates[0]}
                last={weekDates && weekDates[weekDates.length - 1]}
            />
            <div className='row p-2'>
                <ApiErrorMessages errormsg={error} errorcheck={JSON.stringify(error) !== '{}'} />
                {showSideBar &&
                    <div className='col-3'>
                        <div className="card">
                            <div className="card-body d-flex flex-column px-9 pt-6 pb-8">
                                <Calendar onChange={(date) => {
                                    router.get('/appointment',
                                        appointmentsFilter(showWeeks, appointmentLocation, appointmentProvider, date, weekDates),
                                        {
                                            preserveScroll: true,
                                            preserveState: true
                                        })
                                    setAppointmentDate(date)
                                }} value={appointmentDate} className='border border-white fs-7' />
                            </div>
                        </div>
                        <div className="card my-3">
                            <div className="card-body d-flex flex-column px-9 pt-6 pb-8">
                                <div className="mb-10 fv-row">
                                    <label className="form-label mb-3">Location</label>
                                    {locations && <LocationDropdown locations={Locations} weekDates={weekDates} />}
                                </div>
                                <div className="mb-10 fv-row">
                                    <label className="form-label mb-3">Providers</label>
                                    {providers && <ProvidersDropdown providers={Providers} weekDates={weekDates} />}
                                </div>
                                <div className="mb-10 fv-row">
                                    <button onClick={()=> {
                                        router.get('/appointment', 
                                        appointmentsFilter(showWeeks, Locations[0], Providers[0], appointmentDate, weekDates), 
                                    {
                                        preserveScroll: true,
                                        preserveState: true
                                    })
                                        setAppointmentProvider(Providers[0])
                                        setAppointmentLocation(Locations[0])
                                    }} className='btn btn-primary'>
                                        Clear
                                    </button>
                                </div>
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
                                <>
                                    <TimeSlotWeek setError={setError} setShowWeeks={setShowWeeks} skip={15} slots={slots} gaps={gaps} editAppointment={editAppointment} providerAppointments={providerAppointments} weekDates={weekDates} />
                                </> :
                                <>
                                    <TimeSlotDay unblockTime={unblockTime} setError={setError} skip={15} day={days[appointmentDate.getDay()]} slots={slots} gaps={gaps} appoitments={providerAppointments} editAppointment={editAppointment} />
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppointmentMain;
