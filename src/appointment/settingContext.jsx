import { useContext, createContext, useState } from "react";

const AppointmentContext = createContext()

export function useAppointmentContext() {
    return useContext(AppointmentContext)
}

export function AppointmentProvider({ children }) {

    const [appointmentDateWeek, setAppointmentDateWeek] = useState(new Date())
    const [appointmentDate, setAppointmentDate] = useState(new Date())
    const [appointmentTime, setAppointmentTime] = useState({ time: '12:00', skip: 0 })
    const [appointmentDay, setAppointmentDay] = useState('')
    const [appointmentLocation, setAppointmentLocation] = useState('')
    const [appointmentProvider, setAppointmentProvider] = useState('')
    const [providers, setProviders] = useState(null)
    const [locations, setLocations] = useState(null)
    const [patients, setPatients] = useState(null)
    const [showWeeks, setShowWeeks] = useState(false)


    return (
        <AppointmentContext.Provider value={{
            showWeeks,
            setShowWeeks,

            patients,
            setPatients,

            providers,
            setProviders,

            locations,
            setLocations,

            appointmentDateWeek,
            setAppointmentDateWeek,

            appointmentLocation,
            setAppointmentLocation,

            appointmentProvider,
            setAppointmentProvider,

            appointmentDay,
            setAppointmentDay,

            appointmentDate,
            setAppointmentDate,

            appointmentTime,
            setAppointmentTime,
        }}>
            {children}
        </AppointmentContext.Provider>
    )
}