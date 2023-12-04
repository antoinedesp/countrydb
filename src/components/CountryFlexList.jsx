import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CountryCard from './CountryCard'

export default function CountryFlexList({countries, theme}) {
    return (
        <div className="p-16 gap-32 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {countries.map((country, key) => {
                return  (
                    <Fragment key={key}>
                        <Link to={`/country/${country.cca3}`}>
                            <CountryCard theme={theme} country={country}/>
                        </Link>
                    </Fragment>
                    );
            })}
        </div>
    );
}