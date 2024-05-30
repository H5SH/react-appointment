import { useEffect } from 'react'
import Select from 'react-select'
import { useAppointmentContext } from '../settingContext'


function LocationDropdown({ locations }) {

    const { appointmentLocation, setAppointmentLocation } = useAppointmentContext()

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
            onChange={(option) => setAppointmentLocation(option)}
            value={appointmentLocation}
            getOptionValue={({ name }) => name}
        />
    )
}

export default LocationDropdown