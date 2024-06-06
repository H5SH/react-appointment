import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar"
import ApiErrorMessages from "../../../components/helpers/ApiErrorMessage"
import { InertiaForm, LabelField, updateOrCreate, Form, LabeledDropdown, LabelTextArea, isActiveDataTypeSwitch } from "../../../components/helpers/InertiaForm"
import { SubmitButton } from "../../../components/helpers/utilities"
import { initialValues } from "./components/AppointmentForm/initialValues"
import { yyyy_mm_dd } from "./components/data"
import { reasonsForVisit } from "./components/AppointmentForm/initialValues"
import { Toolbar } from "../../../components/layout/components/toolbar/Toolbar"
import { PageTitle } from "../../../components/layout/core/PageData"

const InputDataForm = ({ locations, providers, patients }) => {

    return (
        <div className="card w-100 rounded-0">
            <InertiaForm
                initialValues={{
                    ...initialValues,
                    provider: providers && providers[0],
                    provider_id: providers && providers[0].id,
                    location: locations && locations[0],
                    location_id: locations && locations[0].id,
                    patient: patients && patients[0],
                    patient_id: patients && patients[0].id 
                }}
                onSubmit={(data) => {
                    updateOrCreate('/appointment', {
                        ...data,
                        appointment_date: yyyy_mm_dd(data.appointment_date),
                        status: data.status === 'Active' ? 1:0
                    }, false, null, null, null, null, true)
                }}
            >
                {({ handleSubmit, errors, data, setData }) => (
                    <>
                        <Toolbar>
                            <PageTitle>Make New Appointment</PageTitle>
                        </Toolbar>

                        <ApiErrorMessages errormsg={errors} errorcheck={JSON.stringify(errors) !== '{}'} />
                        <div className="card-body">
                            <Form>
                                <div className="row mb-5">
                                    <div className="col-4">
                                        <Calendar
                                            onChange={(date) => setData({
                                                ...data,
                                                appointment_date: yyyy_mm_dd(date)
                                            })}
                                            value={data.appointment_date}
                                            className='border border-white fs-7'
                                        />
                                    </div>
                                    <div className="col-8">
                                        <div className="row mb-5">
                                            <div className="col-4">
                                                {locations && <LabeledDropdown
                                                    list={locations}
                                                    label="Location"
                                                    formateLabel={({ name }) => (
                                                        <>
                                                            {name}
                                                        </>
                                                    )}
                                                    name='location'
                                                    onChange={(value) => {
                                                        setData({
                                                            ...data,
                                                            location_id: value.id,
                                                            location: value
                                                        })
                                                    }}
                                                />}
                                            </div>
                                            <div className="col-4">
                                                {providers && <LabeledDropdown
                                                    list={providers}
                                                    label="Provider"
                                                    formateLabel={({ first_name, last_name }) => (
                                                        <>
                                                            {`${first_name} ${last_name}`}
                                                        </>
                                                    )}
                                                    onChange={(value) => {
                                                        setData({
                                                            ...data,
                                                            provider_id: value.id,
                                                            provider: value
                                                        })
                                                    }}
                                                    name='provider'
                                                />}
                                            </div>
                                            <div className="col-4">
                                                <LabeledDropdown
                                                    list={patients}
                                                    name='patient'
                                                    label='Patient'
                                                    formateLabel={({ first_name, last_name }) => (
                                                        <>
                                                            {`${first_name} ${last_name}`}
                                                        </>
                                                    )}
                                                    onChange={(value) => setData({
                                                        ...data,
                                                        patient: value,
                                                        patient_id: value.id
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        <div className="row mb-5">
                                            <div className="col-3">
                                                <LabelField type='time' name="appointment_time" label="Time" />
                                            </div>
                                            <div className="col-3">
                                                <LabeledDropdown list={reasonsForVisit} name="visit_reason" label="Visit Reason" />
                                            </div>

                                            <div className="col-3">
                                                <LabeledDropdown list={[15, 30]} label="Visit Length" name="visit_reason" />
                                            </div>
                                            <div className="col-1">
                                                <LabelField type="color" name="color" label="Color" value="#e66465" />
                                            </div>
                                            <div className="col-2">
                                                <LabeledDropdown list={['Active', 'Not Active']} label="Status" name="status" />
                                            </div>
                                        </div>

                                        <div className="row mb-5">
                                            <div className="col-12">
                                                <LabelTextArea label="Comment" name="comment" />
                                            </div>
                                        </div>
                                        <div className="row mb-5">
                                            <div className="col-12">
                                                <SubmitButton title={'Add Appointment'} callback_event={handleSubmit} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </>
                )}
            </InertiaForm>
        </div>
    )
}

export default InputDataForm