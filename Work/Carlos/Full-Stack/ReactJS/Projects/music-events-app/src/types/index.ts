export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  adress: string;
  price: number;
  ticketsAvailable: number;
  description: string;
}

export interface BuyTicketButtonProps {
  disabled: boolean;
  onClick?: () => void;
}

//This says: “My form needs to know which event you’re buying tickets for, and it needs a way to close itself.”
export interface PurchaseFormProps {
  event: Event
  onClose: () => void
}