import { useEffect } from 'react'
import Select from 'react-select'
import { useAppointmentContext } from '../settingContext'
import { router } from '@inertiajs/react'
import { appointmentsFilter } from './data'


function LocationDropdown({ locations, weekDates }) {

    const { appointmentLocation, setAppointmentLocation, appointmentDate, showWeeks, appointmentProvider } = useAppointmentContext()

    

    const formatLocationLabel = ({ name }) => (
        <div>
            {name}
        </div>
    )

    useEffect(() => {
        setAppointmentLocation(locations[0])
    }, [])

    return (
        <Select
            options={locations}
            formatOptionLabel={formatLocationLabel}
            onChange={(option) => {
                router.get('/appointment', 
                appointmentsFilter(showWeeks, option, appointmentProvider, appointmentDate, weekDates),
                {preserveScroll: true, preserveState: true}
            )
                setAppointmentLocation(option)
            }}
            value={appointmentLocation}
            getOptionValue={({ name }) => name}
        />
    )
}

export default LocationDropdown