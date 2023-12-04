import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountryDetailView from './components/CountryDetailView'
import HomeView from './HomeView';
import './App.css'


function App() {

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme == 'light' ? 'bg-slate-50' : 'bg-slate-800';
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };



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
        <Route exact path="/country/:countryCode" element={<CountryDetailView theme={theme} />} />
        <Route path="/" element={<HomeView theme={theme} />}>
        </Route>
      </Routes>
    </Router>
    </>
  );
}



export default App

