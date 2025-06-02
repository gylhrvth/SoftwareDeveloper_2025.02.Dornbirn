export interface JournalEntry {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
}