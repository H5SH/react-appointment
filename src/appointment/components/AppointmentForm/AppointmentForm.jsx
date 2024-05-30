import { DrawerHeader, DrawerFooter, SubmitButton } from "../../../../../components/helpers/utilities";
import { useDispatch, useSelector } from "react-redux"
import { yyyy_mm_dd } from "../data"
import { useAppointmentContext } from "../../settingContext";
import { InertiaForm, LabelField, LabeledDropdown, Form, isActiveDataTypeSwitch, updateOrCreate, LabelTextArea } from "../../../../../components/helpers/InertiaForm";
import { initialValues, reasonsForVisit } from "./initialValues";
import { toast } from "react-toastify";
import { closeDrawer, openDrawer } from "../../../../../components/assets/js/_DrawerComponents";


function AppointmentForm() {

    const { appointmentDate, patients, appointmentTime, appointmentDay, appointmentProvider, appointmentLocation, appointmentDateWeek, setRefresh } = useAppointmentContext()

    const appointment = useSelector(state => state.appointment?.payload)

    function Filter(data, id) {
        const value = data.filter(da => {
            if (da.id === id)
                return da
        })
        return value[0]
    }

    return (
        <div
            id='kt-drawer-appointment'
            className='bg-body w-50 drawer drawer-end'
        >
            <div className='card w-100 rounded-0'>
                <DrawerHeader
                    id="kt-drawer-appointment"
                    title={`${appointment ? 'Update' : 'New'} Appointment`}
                />
                <InertiaForm
                    initialValues={appointment ? appointment : {
                        ...initialValues,
                        provider: appointmentProvider,
                        provider_id: appointmentProvider.id,
                        location: appointmentLocation,
                        patient: patients && patients[0],
                        patient_id: patients && patients[0].id,
                        location_id: appointmentLocation.id,
                        appointment_date: yyyy_mm_dd(appointmentDate),
                        appointment_time: appointmentTime.time
                    }}
                    onSubmit={(data) => {

                        updateOrCreate('appointment', isActiveDataTypeSwitch(data), appointment ? true : false,
                            () => {
                                toast.success('Appointment Created')
                                closeDrawer('kt-drawer-appointment')

                            },()=>{},
                            () => {
                                toast.success('Appointment Updated')
                                closeDrawer('kt-drawer-appointment')
                            },()=>{})
                    }}
                    enableReInitialization={true}
                >
                    {({ data, setData, errors, handleSubmit }) => (
                        <>
                            <div className='card-body' id='kt-drawer-appointment-drawer-body'>
                                <Form>
                                    <div className="row mb-5">
                                        <div className="col-4">
                                            <label className="form-label">Appointment Date</label>
                                            {data.appointment_date}
                                        </div>
                                        <div className="col-4">
                                            <label className="form-label">Appointment Time</label>
                                            {data.appointment_time}
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <label className="form-label">Patients</label>
                                            <select className="form-select" onChange={(e) => {
                                                const Patient = JSON.parse(e.target.value)
                                                setData({
                                                    ...data,
                                                    patient: Patient,
                                                    patient_id: Patient?.id
                                                })
                                            }}
                                                value={JSON.stringify(data.patient)}
                                            >
                                                {patients?.map((patient, index) => (
                                                    <option key={index} value={JSON.stringify(patient)}>{`${patient.first_name} ${patient.last_name}`}</option>
                                                ))}
                                            </select>
                                            {errors.patient && <div className="text-danger">{errors.patient}</div>}
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-4">
                                            <LabeledDropdown list={reasonsForVisit} name="visit_reason" label="Visit Reason" />
                                        </div>

                                        <div className="col-4">
                                            <LabeledDropdown list={[15, 30]} label="Visit Length" name="visit_reason" />
                                        </div>

                                        <div className="col-4">
                                            <LabelField type="color" name="color" label="Color" />
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-4">
                                            <LabeledDropdown list={['Active', 'Not Active']} label="Status" name="status" />
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <LabelTextArea label="Comment" name="comment" />
                                        </div>
                                    </div>
                                </Form>
                            </div>
                            <DrawerFooter id={`kt-drawer-appointment`}>
                                <SubmitButton title={`${appointment ? 'Update' : 'New'} Appointment`} callback_event={handleSubmit} />
                            </DrawerFooter>
                        </>
                    )}
                </InertiaForm>
            </div>
        </div>
    )
}

export default AppointmentForm



