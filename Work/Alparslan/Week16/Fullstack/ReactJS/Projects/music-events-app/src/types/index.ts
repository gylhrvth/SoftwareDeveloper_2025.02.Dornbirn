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
  tags: string[];
}

export interface EventListProps {
  events: Event[]
  onPurchase: (eventId: number, ticketsBought: number) => void
  onToggleFilter: () => void
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
  maxPrice: number | ''
  setMaxPrice: (value: number | '') => void
  minTicketsLeft: number | ''
  setMinTicketsLeft: (value: number | '') => void
  selectedTag: string | null
  setSelectedTag: (tag: string | null) => void
  allTags: string[]
  show: boolean
}