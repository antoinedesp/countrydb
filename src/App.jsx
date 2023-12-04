import { Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CountryFlexList from './components/CountryFlexList'
import DropDown from './components/DropDown'
import CountryDetailView from './components/CountryDetailView'
import './App.css'


function App() {
  const [countryList, setCountryList] = useState([])
  const [regionsList, setRegionsList] = useState([])
  const [viewableCountries, setViewableCountries] = useState([])
  const [isCountryListLoaded, setIsCountryListLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    if(!isCountryListLoaded) {
      loadCountryList();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme == 'light' ? 'bg-slate-50' : 'bg-slate-800';
  }, [theme]);


  useEffect(() => {
    getViewableCountries();
  }, [selectedRegion, searchTerm]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const onSearchHandler = (e) => {
    setSearchTerm(e.target.value);
  }

  const loadCountryList = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    response.json().then((countries) => {
      setCountryList(countries);
      setIsCountryListLoaded(true);
      setAvailableRegions(countries);
    });
  }

  const setAvailableRegions = (countries) => {
    var regions = []
    countries.map(({region}) => {
      if(!regions.find((e) => e == region)) {
        regions.push(region);
      }
    });
    setRegionsList(regions);
    setRegionFilter('All');
  }

  const setRegionFilter = (selectedRegion) => {
    setSelectedRegion(selectedRegion)
  }

  const getViewableCountries = () => {
    var viewableCountries = [];

      if(searchTerm == '') {
        if(selectedRegion == 'All') {
          viewableCountries = countryList;
        }
        else {
          viewableCountries = countryList.filter((value) => {
            return value.region === selectedRegion;
          });
        }
      }
      else {
        if(selectedRegion == 'All' || selectedRegion == '') {
          viewableCountries = countryList.filter((value) => {
            return value.name.common.includes(searchTerm);
          });
          if(viewableCountries.length == 0) {
            viewableCountries = [];
            setViewableCountries(viewableCountries);
            return;
          }
        }
        else {
          viewableCountries = countryList.filter((value) => {
            return value.region === selectedRegion && value.name.common.includes(searchTerm);
          });
          if(viewableCountries.length == 0) {
            viewableCountries = [];
            setViewableCountries(viewableCountries);
            return;
          }
        }
      }

      if(viewableCountries.length == 0) {
        viewableCountries = countryList;
      }
      setViewableCountries(viewableCountries);
    }

  const findCountryByCode = async (countryCode) => {
    while(!isCountryListLoaded) {
      await loadCountryList();
    }
    // console.log('called');
    let country = countryList.find(country => {
      console.log(country.cca3);
      return countryCode === country.cca3;
    });
    return country;
  }

  return (
    <>
    <div className={ theme == 'light' ? 'w-full bg-slate-50' : 'w-full bg-slate-900' }>
      <div className={"px-16 py-8 shadow w-full grid grid-cols-10 " + (theme == 'light' ? 'bg-white' : 'bg-slate-800')}>
        <span className={"col-span-4 text-2xl font-bold " + (theme == 'light' ? ' text-black' : 'text-white')}>Where In The World?</span>
        <div className="col-span-4"></div>
        <button className="col-span-2 flex" onClick={toggleTheme}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.5532 13.815C9.66857 13.815 6.51929 10.9278 6.51929 7.36821C6.51929 6.0253 6.96679 4.78158 7.73143 3.75C4.69036 4.69515 2.5 7.33122 2.5 10.4381C2.5 14.3385 5.94929 17.5 10.2036 17.5C13.5929 17.5 16.4696 15.4932 17.5 12.7045C16.375 13.4048 15.0161 13.815 13.5532 13.815Z" fill={theme == 'light' ? "black" : "white"}/>
              </svg>
          <span className={ theme == 'light' ? 'align-middle px-2 text-black font-semibold' : 'align-middle px-2 text-white font-semibold' }>{ theme == 'light' ? 'Light' : 'Dark' } Mode</span>
        </button>
      </div>
    </div>
    <Router>
      <Routes>
        <Route exact path="/country/:countryCode" element={<CountryDetailView findCountry={ (countryCode) => { findCountryByCode(countryCode) } } theme={theme} />} />
        <Route path="/" element={(
        <>
        { 
          isCountryListLoaded ? 

          (
            <>
              <div className="px-16 py-8 grid grid-cols-10">
                <div className="col-span-10 md:col-span-4 relative">
                  
                  <input className={ 'w-full pl-16 py-4 px-4 w-auto border-0 shadow focus:outline-none focus:ring-none rounded-md ' + (theme == 'light' ? 'text-slate-800 bg-white' : 'text-white bg-slate-800') } type="text" name="country" onChange={onSearchHandler} placeholder="Search for a country..." id="" />
                
                  <div className="absolute inset-y-0 left-0 pl-7 pb-2 flex items-center pointer-events-none">
                    <svg className={"h-5 w-5 " + (theme == 'light' ? 'text-black' : 'text-white')} width="18" height="18" viewBox="0 0 18 18" fill={(theme == 'light' ? 'black' : 'white')} xmlns="http://www.w3.org/2000/svg">
                    <g id="search">
                      <path id="Shape" fillRule="evenodd" clipRule="evenodd" d="M12.5 11H11.7L11.4 10.7C12.4 9.6 13 8.1 13 6.5C13 2.9 10.1 0 6.5 0C2.9 0 0 2.9 0 6.5C0 10.1 2.9 13 6.5 13C8.1 13 9.6 12.4 10.7 11.4L11 11.7V12.5L16 17.5L17.5 16L12.5 11ZM6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5C11 9 9 11 6.5 11Z" fill={(theme == 'light' ? 'black' : 'white')}/>
                    </g>
                    </svg>
                  </div>

                </div>
                <div className="md:col-span-4"></div>
                <DropDown theme={theme} choiceName="Filter by region" values={regionsList} onValueClick={setRegionFilter}/>
              </div>
              <CountryFlexList theme={theme} countries={viewableCountries}/>
            </>
          )
        : (
            <>
              <h1>Merci de patienter</h1>
            </>
          )
        }
        </>)}>
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App

