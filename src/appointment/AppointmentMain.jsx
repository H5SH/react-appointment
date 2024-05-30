import TimeSlotDay from './components/timeSlots/timeSlotDays/TimeSlotDay';
import TimeSlotWeek from './components/timeSlots/TimeSlotWeek';
import { useState } from 'react';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { days, groupAppointmentsByTime, getNext7Days, groupAppointmentsByDateTime } from './components/data';
import AppointmentForm from './components/AppointmentForm/AppointmentForm';
import AppointmentHeader from './AppointmentHeader';
import { times, skips } from './components/data'
import { PageTitle } from '../../../components/layout/core/PageData';
import LocationDropdown from './components/LocationDropdown';
import ProvidersDropdown from './components/ProvidersDropdown';
import { useAppointmentContext } from './settingContext';
import { openDrawer } from '../../../components/assets/js/_DrawerComponents';
import { addAppointment } from '../../redux/slice';
import { useDispatch } from 'react-redux';
import { Toolbar } from '../../../components/layout/components/toolbar/Toolbar';


function AppointmentMain({ providers, locations, patients, appointments }) {

    const { setPatients, setProviders, setLocations, appointmentDate, setAppointmentDate, appointmentProvider, appointmentLocation } = useAppointmentContext()
    setPatients(patients)
    setProviders(providers)
    setLocations(locations)
    const [showWeeks, setShowWeeks] = useState(false)
    const [providerAppointments, setProviderAppointments] = useState()
    const [showSideBar, setShowSideBar] = useState(true)
    const weekDates = getNext7Days(appointmentDate)
    appointments?.sort((a, b)=> a.appointment_time.localeCompare(b.appointment_time))
    const Appointments = showWeeks ? groupAppointmentsByDateTime(appointments):groupAppointmentsByTime(appointments)
    const dispatch = useDispatch()

    const slots = times(8, 17, 15)
    const gaps = skips(15)

    function appointmentsFilter() {
        // let filter = showWeeks ? {
        //     "start_date" : yyyy_mm_dd(appointmentDate),
        //     "end_date" : yyyy_mm_dd(weekDates[weekDates.length - 1]) 
        // }:{
        //     "appointment_date": yyyy_mm_dd(appointmentDate)
        // }
        // if(appointmentLocation.id){
        //     filter = {
        //         ...filter,
        //         'facility': appointmentLocation.id
        //     }
        // }
        // if(appointmentProvider.id){
        //     filter = {
        //         ...filter,
        //         'provider': appointmentProvider.id
        //     }
        // }
        // return filter
    }

    function editAppointment(appointment) {
        dispatch(addAppointment(appointment))
     }

    async function getProviderAppointments() {
        // try {
        //     const response = await getAppointmentReq(appointmentsFilter())
        //     if (response.data.data) {

        //         response.data.data.sort((a, b) => {
        //             return a.appointment_time.localeCompare(b.appointment_time);
        //         });

        //         console.log(response.data.data)
        //         console.log(groupAppointmentsByDateTime(response.data.data))
        //         setProviderAppointments(showWeeks ? groupAppointmentsByDateTime(response.data.data) :groupAppointmentsByTime(response.data.data))
        //         setRefresh(false)
        //     }

        // } catch (err) {
        //     console.log(err)
        //     toast.error('Failed To Load Appointment')
        // }
    }


    return (
        <div className='card bg-light-primary overflow-scroll'>
            {/* <Toolbar>
                <button
                onClick={()=> console.log('toolbar clicked')}
                className='btn btn-primary'
                >
                    Tool Button
                </button>
            <PageTitle>Appment</PageTitle>
            </Toolbar> */}
            <AppointmentForm />
            <AppointmentHeader
                    showSideBar={showSideBar}
                    setShowSideBar={setShowSideBar}
                    getProviderAppointments={getProviderAppointments}
                    showWeeks={showWeeks}
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
                                <Calendar onChange={setAppointmentDate} value={appointmentDate} className='border border-white fs-7' />
                            </div>
                        </div>
                        <div className="card my-3">
                            <div className="card-body d-flex flex-column px-9 pt-6 pb-8">
                                <div className="mb-10 fv-row">
                                    <label className="form-label mb-3">Location</label>
                                    {locations && <LocationDropdown locations={locations} />}
                                </div>
                                <div className="mb-10 fv-row">
                                    <label className="form-label mb-3">Providers</label>
                                    {providers && <ProvidersDropdown providers={providers} />}
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
                            <div className="card-toolbar" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add a user">
                                <a href="#" className="btn btn-sm btn-light-primary" id='kt_appointment_toggle' onClick={() => {
                                    openDrawer('kt-drawer-appointment')
                                    editAppointment(null)
                                    }}>
                                    <i className="ki-duotone ki-plus fs-3"></i>New Appointment
                                </a>
                            </div>
                        </div>
                        <div className="card-body d-flex flex-column px-8 py-0">
                            {showWeeks ?
                                <>
                                    <TimeSlotWeek setShowWeeks={setShowWeeks} skip={15} slots={slots} gaps={gaps} editAppointment={editAppointment} providerAppointments={Appointments} weekDates={weekDates} />
                                </> :
                                <>
                                    <TimeSlotDay skip={15} day={days[appointmentDate.getDay()]} slots={slots} gaps={gaps} appoitments={Appointments} editAppointment={editAppointment} />
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
