import { useState, useEffect } from 'react'
import CountryFlexList from './components/CountryFlexList'
import DropDown from './components/DropDown'
import './App.css'

function HomeView({ theme }) {
    const [countryList, setCountryList] = useState([])
    const [regionsList, setRegionsList] = useState([])
    const [viewableCountries, setViewableCountries] = useState([])
    const [isCountryListLoaded, setIsCountryListLoaded] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('All');
  
  
    useEffect(() => {
      if(!isCountryListLoaded) {
        loadCountryList();
      }
    }, []);
  
    
  
    useEffect(() => {
      getViewableCountries();
    }, [selectedRegion, searchTerm]);
  
    
  
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
              return (value.name.common.includes(searchTerm)  || value.cca3.includes(searchTerm));
            });
            if(viewableCountries.length == 0) {
              viewableCountries = [];
              setViewableCountries(viewableCountries);
              return;
            }
          }
          else {
            viewableCountries = countryList.filter((value) => {
              return value.region === selectedRegion && (value.name.common.includes(searchTerm) || value.cca3.includes(searchTerm));
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
  
    return (
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
      </>)
  }

  export default HomeView;