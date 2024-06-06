import AppointmentMain from "./AppointmentMain"
import { AppointmentProvider } from "./settingContext"
import { useEffect } from "react"
import { toast } from "react-toastify"

const Index = ({ providers, locations, patients, appointments, success, schedule }) => {

    useEffect(()=>{
        success && toast.success(success)
    },[success])

    return (
        <AppointmentProvider>
            <AppointmentMain schedules={schedule} providers={providers} locations={locations} patients={patients} appointments={appointments} />
        </AppointmentProvider>
    )
}

export default Index