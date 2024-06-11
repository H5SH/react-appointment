import { router } from "@inertiajs/react"
import { Toolbar } from "../../../components/layout/components/toolbar/Toolbar"
import { PageTitle } from "../../../components/layout/core/PageData"
import { months, prefixMonths, prefixDays } from "./components/data"

function AppointmentHeader({
    showWeeks,
    setShowWeeks,
    appointmentDate,
    setShowSideBar,
    showSideBar,
    last,
    first,
    editAppointment
}) {

    return (
        <Toolbar>

            <PageTitle>Appointments</PageTitle>

            <div className="card-toolbar" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to Make Appointment">
                <a href="#" className="btn btn-sm btn-light-primary" id='kt_appointment_toggle' onClick={() => {
                    editAppointment(null)
                    router.get('/appointment/create')
                }}>
                    <i className="ki-duotone ki-plus fs-3"></i>New Appointment
                </a>
            </div>

            <button className="btn btn-dark justify-content-center" onClick={() => setShowSideBar(!showSideBar)}>
                <i className="fas fa-bars fs-2"></i>
            </button>

            <a className="btn btn-primary">
                <i className="bi bi-bootstrap-reboot fs-2"></i>
            </a>

            <span className="card-label fw-bold fs-1 mb-1">
                {showWeeks ?
                    `${prefixMonths[first.getMonth()]} ${first.getDate()} - ${first.getMonth() !== last.getMonth() ? prefixMonths[last.getMonth()] : ''} ${last.getDate()} ${appointmentDate.getFullYear()}`
                    :
                    `${prefixDays[appointmentDate.getDay()]}, ${months[appointmentDate.getMonth()]} ${appointmentDate.getDate()} ${appointmentDate.getFullYear()}`
                }
            </span>

            <button onClick={() => setShowWeeks(false)} className={`btn btn-light ${!showWeeks && 'active'} border border-1 rounded rounded-start`}>Days</button>  &nbsp; &nbsp;
            <button onClick={() => setShowWeeks(true)} className={`btn btn-light ${showWeeks && 'active'} border border-1 rounded rounded-end me-2`}>Week</button>
        </Toolbar>
    )
}

export default AppointmentHeader