export default function CountryDetailView({country, onClose, theme}) {
  console.log(country);
  return (<>
          <div className="w-full p-16">
            <div className="grid grid-cols-12">
              <button className={"flex my-12 transition hover:opacity-75 " + (theme == 'light' ? 'text-black' : 'text-white')} onClick={onClose}>
                  <svg className="h-5 w-5 align-middle" height="20" width="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="call-made">
                      <path id="Shape" fillRule="evenodd" clipRule="evenodd" d="M6.46447 4.10744L7.64298 5.28596L3.75389 9.17504L18.6031 9.17504L18.6031 10.825L3.75389 10.825L7.64298 14.714L6.46447 15.8926L0.57191 10L6.46447 4.10744Z" fill={theme == 'light' ? 'black' : 'white'}/>
                    </g>
                  </svg>
                  <span className="pl-2">Back</span>
              </button>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="h-400">
                <img src={country.flags.svg} className="rounded-t-md object-cover h-full" alt={country.name.common + "'s flag"} />
              </div>
              <div className={"p-12 " + (theme == 'light' ? 'text-black' : 'text-white')}>
                <div className="text-3xl font-bold text-start">{country.name.common}</div>
                <div className="flex flex-col md:flex-row my-12 md:space-x-12">
                  <div className="informations_geo flex flex-col text-start">
                    <div>
                      <span className="font-bold">Native Name:</span>
                      <span> {Object.values(country.name.nativeName)[0].common}</span>
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
                      <span> {country.tld.map((t, k) => {
                        return k == 0 ? t : ", " + t
                      })}</span>
                    </div>
                    <div>
                      <span className="font-bold">Currency:</span>
                      <span> {Object.values(country.currencies).map((k, t) => {
                        return t == 0 ? k.name : ", " + k.name
                      })}</span>
                    </div>
                    <div>
                      <span className="font-bold">Language:</span>
                      <span> {Object.values(country.languages).map((k, t) => {
                        return t == 0 ? k.toString() : ", " + k.toString()
                      })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row text-start">
                    <div className="pb-2">Border countries:</div>
                    <div className="flex">{
                      country.borders !== undefined ?
                      country.borders.map((border, key) => {
                        return (<div key={key} className={"mx-2 py-1 px-4 rounded  text-sm inline " + (theme == 'light' ? 'border-2' : 'border-0 bg-slate-800')}>{border}</div>);
                      })
                      : <></>
                    }</div>
                    
                </div>
              </div>
            </div>
          </div>
    </>);
}