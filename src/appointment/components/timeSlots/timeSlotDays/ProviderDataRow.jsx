

function ProviderDataRow({ provider, callBack, draggedDiv, setDraggedDiv, index }) {

    const divStyle = 'text-light text-center'

    return (
        <div
            key={index}
            draggable
            className="row m-1 draggable"
            style={{ backgroundColor: provider?.color, cursor: draggedDiv.appointment ? 'grab' : 'pointer' }}
            onClick={()=> callBack()}
            onDragStart={() => setDraggedDiv({
                ...draggedDiv,
                appointment: provider
            })}
        >
            <div className={`col-1 ${divStyle}`}>
                visit length
            </div>
            <div className={`col-2 ${divStyle}`}>
                name
            </div>
            <div className={`col-2 ${divStyle}`}>
                dob
            </div>
            <div className={`col-2 ${divStyle}`}>
                phone
            </div>
            <div className={`col-2 ${divStyle}`}>
                provider
            </div>
            <div className={`col-2 ${divStyle}`}>
                visit reason
            </div>
            <div className={`col-1 ${divStyle}`}>
                Active
            </div>
        </div>
    )
}

export default ProviderDataRow