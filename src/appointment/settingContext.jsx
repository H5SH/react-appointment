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
    const [showWeeks, setShowWeeks] = useState(false)
    const [unblockTime, setUnblockTime] = useState({
        from: '',
        to: ''
    })
    const [showSideBar, setShowSideBar] = useState(true)


    return (
        <AppointmentContext.Provider value={{
            showSideBar, 
            setShowSideBar,

            unblockTime, 
            setUnblockTime,

            showWeeks,
            setShowWeeks,

            appointmentDateWeek,
            setAppointmentDateWeek,

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