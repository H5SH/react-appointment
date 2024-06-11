import AppointmentMain from "./AppointmentMain"
import { AppointmentProvider } from "./settingContext"
import { useEffect } from "react"
import { toast } from "react-toastify"

const Index = ({ appointments }) => {

    useEffect(()=>{
        success && toast.success(success)
    },[success])

    return (
        <AppointmentProvider>
            <AppointmentMain appointments={appointments} />
        </AppointmentProvider>
    )
}

export default Index