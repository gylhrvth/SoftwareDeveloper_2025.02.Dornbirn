
export default function CountryDetails({ params }: { params: { slug: string } } ) {
    const countryName = params.slug

    return (
        <h1>Welcome in { countryName }!</h1>
    )
}