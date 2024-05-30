import { AgeCalculator } from "../../../../../../components/helpers/utilities"
import { openDrawer } from "../../../../../../components/assets/js/_DrawerComponents"


function ProviderDataRow({ provider, noData = false, callBack, draggedDiv, setDraggedDiv, index }) {

    const divStyle = 'text-light text-center'

    return (
        <div
            key={index}
            draggable
            className="row m-1 draggable"
            style={{ backgroundColor: provider.color, cursor: draggedDiv.appointment ? 'grab' : 'pointer' }}
            onClick={()=>{
                callBack()
                openDrawer('kt-drawer-appointment')
            }}
            onDragStart={() => setDraggedDiv({
                ...draggedDiv,
                appointment: provider
            })}
        >
            <div className={`col-1 ${divStyle}`}>
                {!noData && `${provider.visit_length}min`}
            </div>
            <div className={`col-2 ${divStyle}`}>
                {!noData && provider.patient_name}
            </div>
            <div className={`col-2 ${divStyle}`}>
                {!noData && <AgeCalculator dob={provider.patient_dob} />}
            </div>
            <div className={`col-2 ${divStyle}`}>
                {!noData && provider.patient_phone}
            </div>
            <div className={`col-2 ${divStyle}`}>
                {!noData && provider.provider_name}
            </div>
            <div className={`col-2 ${divStyle}`}>
                {!noData && provider.visit_reason}
            </div>
            <div className={`col-1 ${divStyle}`}>
                {!noData ? (provider.status ? 'Active' : 'Non Active') : null}
            </div>
        </div>
    )
}

export default ProviderDataRow