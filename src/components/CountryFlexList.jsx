import CountryCard from './CountryCard'

export default function CountryFlexList({countries, onCountryClick, theme}) {
    return (
        <div className="p-16 gap-32 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {countries.map((country, key) => {
                return <CountryCard theme={theme} onCountryClick={onCountryClick} key={key} country={country}/>
            })}
        </div>
    );
}