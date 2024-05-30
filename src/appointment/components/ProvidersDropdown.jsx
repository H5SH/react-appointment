import { useEffect } from "react"
import Select from 'react-select'
import { useAppointmentContext } from "../settingContext"

function ProvidersDropdown({ providers }) {

    const { appointmentProvider, setAppointmentProvider } = useAppointmentContext()

    const formateProviderLabel = ({ first_name, last_name }) => (
        <div>
            {`${first_name} ${last_name}`}
        </div>
    )

    useEffect(() => {
        setAppointmentProvider(providers[0])
    }, [])

    return (
        <Select
            options={providers}
            formatOptionLabel={formateProviderLabel}
            onChange={(provider) => setAppointmentProvider(provider)}
            value={appointmentProvider}
            getOptionValue={({first_name, last_name}) => `${first_name} ${last_name}`}
            isSearchable
        />
    )
}

export default ProvidersDropdown