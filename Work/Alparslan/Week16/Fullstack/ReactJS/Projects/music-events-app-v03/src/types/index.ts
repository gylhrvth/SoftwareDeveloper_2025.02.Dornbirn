export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  adress: string;
  price: number;
  ticketsAvailable: number;
  description: string;
  image: string; 
}

export interface EventListProps {
  events: Event[]
  onPurchase: (eventId: number, ticketsBought: number) => void
  onShowFilter: () => void
}

export interface EventCardProps {
    event: Event
    onPurchase: (eventId: number, quantity: number) => void
}
export interface BuyTicketButtonProps {
  disabled: boolean;
  onClick?: () => void;
}

//This says: “My form needs to know which event you’re buying tickets for, and it needs a way to close itself.”
export interface PurchaseFormProps {
  event: Event
  onClose: () => void
  onPurchase: (eventId: number, quantity: number) => void
}

export interface EventFilterProps {
  filterDate: string;
  setFilterDate: (value: string) => void
  filterMonth: string;
  setFilterMonth: (value: string) => void
}
