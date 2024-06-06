import { useEffect } from "react"
import Select from 'react-select'
import { useAppointmentContext } from "../settingContext"
import { appointmentsFilter } from "./data"
import { router } from "@inertiajs/react"

function ProvidersDropdown({ providers, weekDates }) {

    const { appointmentProvider, setAppointmentProvider, appointmentLocation, appointmentDate, showWeeks } = useAppointmentContext()

    

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
            onChange={(provider) => {
                router.get('/appointment', 
                appointmentsFilter(showWeeks, appointmentLocation, provider, appointmentDate, weekDates),
                {preserveScroll: true, preserveState: true}
            )
                setAppointmentProvider(provider)
            }}
            value={appointmentProvider}
            getOptionValue={({first_name, last_name}) => `${first_name} ${last_name}`}
            isSearchable
        />
    )
}

export default ProvidersDropdown