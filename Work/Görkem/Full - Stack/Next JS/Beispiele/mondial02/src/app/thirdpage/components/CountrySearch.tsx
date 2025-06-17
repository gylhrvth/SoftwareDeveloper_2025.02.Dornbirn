'use client';

import { useState } from "react";
import type { Country } from '@/lib/db';
import SearchBar from './SearchBar';
import CountryTable from './CountryTable';

type CountrySearchProps = {
    countries: Country[];
};

export default function CountrySearch({ countries }: CountrySearchProps) {
    const [search, setSearch] = useState("");

    const filteredCountries = countries.filter((country) =>
        country.Name.toLowerCase().includes(search.toLowerCase())
    );

    return (
    <>
      <SearchBar value={search} onChange={setSearch} />
      <div className="overflow-x-auto">
        <CountryTable countries={filteredCountries} />
      </div>
    </>
  );
}