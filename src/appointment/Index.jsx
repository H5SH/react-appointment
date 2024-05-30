import { Toolbar } from "../../../components/layout/components/toolbar/Toolbar"
import AppointmentMain from "./AppointmentMain"
import { AppointmentProvider } from "./settingContext"


const Index = ({ providers, locations, patients, appointments }) => (
    <AppointmentProvider>
        <Toolbar>
        <button
                onClick={()=> console.log('toolbar clicked')}
                className='btn btn-primary'
                >
                    Toolbar Button
                </button>
        </Toolbar>
        <AppointmentMain providers={providers} locations={locations} patients={patients} appointments={appointments} />
    </AppointmentProvider>
)

export default Index