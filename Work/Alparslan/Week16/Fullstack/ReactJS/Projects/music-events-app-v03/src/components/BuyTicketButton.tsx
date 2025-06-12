
import type { BuyTicketButtonProps } from '../types'

const BuyTicketButton: React.FC<BuyTicketButtonProps> = ({ disabled, onClick}) => (
    <button
    className="buyButton"
    disabled={disabled}
    onClick={onClick}
    >Buy Ticket</button>
)

export default BuyTicketButton
