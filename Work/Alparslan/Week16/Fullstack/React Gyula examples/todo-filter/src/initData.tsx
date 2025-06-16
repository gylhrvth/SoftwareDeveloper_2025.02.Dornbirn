import { type TodoItem } from "./App";

function getRandomFutureDate(daysFromNowMin: number, daysFromNowMax: number): Date {
    const days = Math.floor(Math.random() * (daysFromNowMax - daysFromNowMin + 1)) + daysFromNowMin;
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

export const initialTodos: TodoItem[] = [
    {
        id: 1,
        title: 'Buy groceries',
        complete: false,
        description: 'Milk, Bread, Eggs, Cheese',
        priority: 'high',
        dueDate: getRandomFutureDate(1, 30)
    },
    {
        id: 2,
        title: 'Read a book',
        complete: true,
        description: 'Finish reading React documentation',
        priority: 'medium',
        dueDate: getRandomFutureDate(1, 30)
    },
    {
        id: 3,
        title: 'Workout',
        complete: false,
        description: '30 minutes of cardio',
        priority: 'low',
        dueDate: getRandomFutureDate(1, 30)
    },
    {
        id: 4,
        title: 'Call Mom',
        complete: false,
        description: 'Check in and say hello',
        priority: 'high',
        dueDate: getRandomFutureDate(1, 30)
    },
    {
        id: 5,
        title: 'Clean the house',
        complete: false,
        description: 'Vacuum and dust all rooms',
        priority: 'medium',
        dueDate: getRandomFutureDate(1, 30)
    },
    {
        id: 6,
        title: 'Finish project report',
        complete: false,
        description: 'Complete and submit the weekly project report',
        priority: 'high',
        dueDate: getRandomFutureDate(1, 30)
    },
    {
        id: 7,
        title: 'Plan weekend trip',
        complete: false,
        description: 'Research destinations and book hotel',
        priority: 'low',
        dueDate: getRandomFutureDate(1, 30)
    },
    {
        id: 8,
        title: 'Pay utility bills',
        complete: false,
        description: 'Electricity and water bills due this week',
        priority: 'medium',
        dueDate: getRandomFutureDate(1, 30)
    }
];
