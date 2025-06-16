'use client';
import React, { useState, useEffect } from 'react';

type Country = {
    [key: string]: string | number | null;
};

export default function TestPage() {
    const [data, setData] = useState<Country[] | null>(null);

    const fetchData = async () => {
        const res = await fetch('/api/test');
        const result = await res.json();
        setData(result);
        if (!res.ok) {
            console.error('Failed to fetch data:', result);
        }
    };

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
            <h1 className="text-4xl font-bold mb-4">Test Page</h1>
            {data && Array.isArray(data) && (
                <table className="mt-6 border">
                    <thead>
                    <tr>
                        {Object.keys(data[0]).map((key) => (
                            <th key={key} className="border px-2 py-1">{key}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx}>
                            {Object.values(row).map((value, i) => (
                                <td key={i} className="border px-2 py-1">{String(value)}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}