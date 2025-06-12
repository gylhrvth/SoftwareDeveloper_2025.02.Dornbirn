
import '../styles/Modal.css'

const Modal: React.FC<{ 
    open:boolean, 
    onClose:() => void, 
    children: React.ReactNode }> = ({open, onClose, children}) => {

        if (!open) return null
            return (
                <div className="modalOverlay" onClick={onClose}>
                    <div className="modalContent" onClick={e => e.stopPropagation()}>
                        <button className="modalClose" onClick={onClose}>x</button>
                        {children}
                    </div>
                </div>
        )
    }

export default Modal