// Thanks https://stackoverflow.com/questions/16637051/adding-space-between-numbers

export default function CountryCard({ country, theme }) {
    return (
        <div className={"m-2 shadow-sm rounded-md grid grid-rows-2 hover:opacity-75 transition cursor-pointer " + (theme == 'light' ? 'bg-white' : 'bg-slate-800')}>
            <div className="h-128 w-full">
                <img src={country.flags.svg} className="rounded-t-md object-cover h-full" alt={country.name.common + "'s flag"} />
            </div>
            <div className="p-5">
                <span className={"text-md block font-bold py-2 text-start "  + (theme == 'light' ? 'text-black' : 'text-white')}>{country.name.common}</span>
                <div className="block text-start text-gray-500 text-sm">
                    <span className={(theme == 'light' ? 'text-black' : 'text-white')}>Population:</span> {country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                <div className="block text-start text-gray-500 text-sm">
                <span className={(theme == 'light' ? 'text-black' : 'text-white')}>Region:</span> {country.region}
                </div>
                <div className="block text-start text-gray-500 text-sm">
                <span className={(theme == 'light' ? 'text-black' : 'text-white')}>Capital:</span> {country.capital}
                </div>
            </div>
        </div>
    );

}