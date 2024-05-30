import { Toolbar } from "../../../components/layout/components/toolbar/Toolbar"
import { PageTitle } from "../../../components/layout/core/PageData"
import { months, prefixMonths, prefixDays } from "./components/data"

function AppointmentHeader({ showWeeks, setShowWeeks, appointmentDate, setShowSideBar, showSideBar, last, first, getProviderAppointments }) {

    return (
        <Toolbar>
            <PageTitle>Appointment</PageTitle>
            {/* <div className='row bg-light p-4'> */}
                {/* <div className="col-3"> */}
                    <button className="btn btn-dark justify-content-center" onClick={() => setShowSideBar(!showSideBar)}>
                        <i className="fas fa-bars fs-2"></i>
                    </button> &nbsp;
                    <a className="btn btn-primary" onClick={() => getProviderAppointments()}><i className="bi bi-bootstrap-reboot fs-2"></i></a>
                {/* </div> */}

                {/* <div className='col-7'> */}
                    <span className="card-label fw-bold fs-1 mb-1">
                        {showWeeks ?
                            `${prefixMonths[first.getMonth()]} ${first.getDate()} - ${first.getMonth() !== last.getMonth() ? prefixMonths[last.getMonth()] : ''} ${last.getDate()} ${appointmentDate.getFullYear()}`
                            :
                            `${prefixDays[appointmentDate.getDay()]}, ${months[appointmentDate.getMonth()]} ${appointmentDate.getDate()} ${appointmentDate.getFullYear()}`
                        }
                    </span>
                {/* </div> */}

                {/* <div className="col-2"> */}
                    <button onClick={() => setShowWeeks(false)} className={`btn btn-light ${!showWeeks && 'active'} border border-1 rounded rounded-start`}>Days</button>  &nbsp; &nbsp;
                    <button onClick={() => setShowWeeks(true)} className={`btn btn-light ${showWeeks && 'active'} border border-1 rounded rounded-end me-2`}>Week</button>
                {/* </div> */}
            {/* </div> */}
        </Toolbar>
    )
}

export default AppointmentHeader