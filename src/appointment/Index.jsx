import AppointmentMain from "./AppointmentMain"
import { AppointmentProvider } from "./settingContext"

const Index = ({ appointments }) => {


    return (
        <AppointmentProvider>
            <AppointmentMain appointments={appointments} />
        </AppointmentProvider>
    )
}

export default Index