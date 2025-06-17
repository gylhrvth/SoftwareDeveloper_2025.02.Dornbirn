import { NextResponse } from "next/server";
import { getAllCountries } from "@/lib/db";

export async function GET(){
    try {
        const countries = await getAllCountries();
        return NextResponse.json(countries);
    } catch {
        return NextResponse.json({ error: "Failed to fetch countries"}, { status: 500 });
    }
}
