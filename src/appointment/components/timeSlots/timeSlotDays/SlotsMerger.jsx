import { useDispatch } from "react-redux"
import ProviderDataRow from "./ProviderDataRow"



function SlotsMerger({ appointment = {} }) {

    const dispatch = useDispatch()

    const rows = []
    for (let i = 0; i <= Math.ceil(appointment.visit_length / 15) + 1; i++) {
        if (i === Math.ceil(appointment.visit_length / 15) / 2) {
            rows.push(
                <div className="col-11 row ms-1"
                    onClick={() => dispatch(setShowAppointmentId(appointment.id))}
                    id='kt_appointment_toggle'
                >
                    {/* <ProviderDataRow provider={appointment} noData={false} /> */}
                    <div className="row" style={{ backgroundColor: appointment.color }}></div>
                </div>
            )
        }
        else {
            rows.push(
                <div className="col-11 row ms-1" style={{ backgroundColor: appointment.color }}>
                </div>
            )
        }
    }


    return (
        <>
            {rows.map(div => (
                div 
            ))}
        </>
    )
}

export default SlotsMerger