import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const [rows] = await db.query('SELECT * FROM country');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }
}