import { useState, useEffect } from 'react'

export default function DropDown({ choiceName, values, onValueClick, theme }) {
  
    const [isToggled, setIsToggled] = useState(false)
    const [value, setValue] = useState('');
  
    const handleToggle = () => {
      setIsToggled(!isToggled);
    }
  
    const handleValueClick = (v) => {
      handleToggle();
      setValue(v);
    }
  
    useEffect(() => {
      onValueClick(value);
    }, [value]);
  
    return (
      <div className="cursor-pointer pt-2 md:pt-0 col-span-10 md:col-span-2">
        <div className={"hover:opacity-75 opacity-100 transition p-4 w-80 shadow font-semibold rounded-md text-start px-6 " + (theme == 'light' ? 'text-black bg-white' : 'text-white bg-slate-800')} onClick={handleToggle}>
          <div className="grid grid-cols-8">
            <div className="col-span-7">{ value === '' || value === 'All' ? choiceName : value }</div>
            <div className="col-span-1">{ value === '' || value === 'All' ? (
                <svg className="h-5 w-5" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.45 3.45L6 6.9L2.55 3.45L1.5 4.5L6 9L10.5 4.5L9.45 3.45Z" fill={theme == 'light' ? 'black' : 'white'}/>
                </svg>
            ) : <></> }</div>
          </div>
        </div>
        <div className="w-80">
          {isToggled
            ? (
              <div style={{ position: 'absolute', zIndex: 50 }} className="pt-2 cursor-pointer w-80 text-start">
                {
                  values.map(
                    (value, key) => {
                      return (
                        <div key={key} onClick={() => { handleValueClick(value) }} className={"px-6 py-4 w-full "  + (theme == 'light' ? 'bg-white hover:bg-slate-100 text-black' : 'bg-slate-800 text-white hover:bg-slate-700')}>{value}</div>
                      )
                    }
                  )
                }
                  {value == 'All' ? <></> : <div onClick={() => { handleValueClick('All') }} className={"px-6 py-4 w-full "  + (theme == 'light' ? 'bg-white hover:bg-slate-100 text-black' : 'bg-slate-800 text-white hover:bg-slate-700')}>All regions</div>}
              </div>
            )
            : <></>
            }
        </div>
      </div>
    );
  }
