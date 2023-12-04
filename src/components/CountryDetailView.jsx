import { useState, useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
export default function CountryDetailView(props) {

  const [country, setCountry] = useState(null)
  const [readyForRender, setReadyForRender] = useState(false);
  let { countryCode } = useParams();

  const loadCountry = async (countryCode) => {
    const response = await fetch(`https://restcountries.com/v2/alpha/${countryCode}`);
    response.json().then((country) => {
      console.log(country);
      setCountry(country);
      setReadyForRender(true);
    });
  }

  useEffect(() => {
    loadCountry(countryCode);
  }, [props]);


  return readyForRender ? (
          <div className="w-full p-16">
            <div className="grid grid-cols-12">
              <button className={"flex my-12 transition hover:opacity-75 " + (props.theme == 'light' ? 'text-black' : 'text-white')}>
                  <svg className="h-5 w-5 align-middle" height="20" width="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="call-made">
                      <path id="Shape" fillRule="evenodd" clipRule="evenodd" d="M6.46447 4.10744L7.64298 5.28596L3.75389 9.17504L18.6031 9.17504L18.6031 10.825L3.75389 10.825L7.64298 14.714L6.46447 15.8926L0.57191 10L6.46447 4.10744Z" fill={props.theme == 'light' ? 'black' : 'white'}/>
                    </g>
                  </svg>
                  <span className="pl-2">Back</span>
              </button>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="h-400">
                <img src={country.flags.svg} className="rounded-t-md object-cover h-full" alt={country.name.common + "'s flag"} />
              </div>
              <div className={"p-12 " + (props.theme == 'light' ? 'text-black' : 'text-white')}>
                <div className="text-3xl font-bold text-start">{country.name.common}</div>
                <div className="flex flex-col md:flex-row my-12 md:space-x-12">
                  <div className="informations_geo flex flex-col text-start">
                    <div>
                      <span className="font-bold">Native Name:</span>
                      <span> {country.name}</span>
                    </div>
                    <div>
                      <span className="font-bold">Population:</span>
                      <span> {country.population}</span>
                    </div>
                    <div>
                      <span className="font-bold">Region:</span>
                      <span> {country.region}</span>
                    </div>
                    <div>
                      <span className="font-bold">Sub Region:</span>
                      <span> {country.subregion}</span>
                    </div>
                    <div>
                      <span className="font-bold">Capital:</span>
                      <span> {country.capital}</span>
                    </div>
                  </div>
                  <div className="informations_eco flex flex-col text-start">
                    <div>
                      <span className="font-bold">Top Level Domain:</span>
                      <span> {country.topLevelDomain.map((t, k) => {
                        return k == 0 ? t : ", " + t
                      })}</span>
                    </div>
                    <div>
                      <span className="font-bold">Currency:</span>
                      <span> {country.currencies.map((k, t) => {
                        return t == 0 ? k.name : ", " + k.name
                      })}</span>
                    </div>
                    <div>
                      <span className="font-bold">Language:</span>
                      <span> {country.languages.map((k, t) => {
                        return t == 0 ? k.name.toString() : ", " + k.name.toString()
                      })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row text-start">
                  <div className="pb-2">Border countries:</div>
                  <div className="flex">{
                      country.borders !== undefined ?
                      country.borders.map((border, key) => {
                        return (
                        <Fragment key={key}>
                          <Link to={`/country/${border}`}>
                            <div onClick={ () => loadCountry(border) }className={"mx-2 py-1 px-4 rounded  text-sm inline " + (props.theme == 'light' ? 'border-2' : 'border-0 bg-slate-800')}>{border}</div>
                          </Link>
                        </Fragment>
                        );
                      })
                      : null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
  ): <></>;
}