
export const initialValues = {
    location_id: '',
    location: '',
    provider: null,
    patient: '',
    provider_id: '',
    appointment_date: new Date,
    appointment_time: '00:00',
    visit_reason: 'New Patient',
    visit_length: '15',
    color: '#000000',
    comment: '',
    status: 'Active',
    patient_id: '',
}


export const reasonsForVisit = [
    'New Patient',
    'Established Patient',
    'Follow Up',
    'Anxiety',
    'Depression',
]