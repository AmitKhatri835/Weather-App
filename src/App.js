import './App.css';
import { useState } from 'react';
function App() {
  let [city, setCity] = useState('')
  let [wdetails, setWdetails] = useState()
  let [loader, setLoader] = useState(false)

  let getData = (e) => {
    setLoader(true)
    let api_key = "2e2f8a40413c696a156c37debb0d73e8";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        if(data.cod==="404"){
          setWdetails(undefined)
        }
        else{
          setWdetails(data)
          console.log(data);
          
        }
        setLoader(false)
      })
    e.preventDefault();
    setCity('');
  }
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <h1 className='text-light py-3'>The Whether App</h1>
          <form onSubmit={getData}>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='City Name' /><button className='btn btn-primary' type="submit">Submit</button>
          </form>
          <div className="p-4 bg-light mx-auto mt-5 position-relative" style={{ width: '400px' }} >
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" alt="Loading" width={50} className={`position-absolute top-50 start-50 translate-middle ${loader? '' : 'visually-hidden'}`} />
            {
              wdetails!==undefined
                ?
                <>
                  <h3>{wdetails.name} <span className='text-warning' >{wdetails.sys.country}</span> </h3>
                  <h2>{wdetails.main.temp} Deg</h2>
                  <img src={`https://openweathermap.org/img/w/${wdetails.weather[0].icon}.png`} width={'100px'} alt="Foggy weather" />
                  <p>{wdetails.weather[0].description}</p>
                </>
                :
                "City Not Found"

            }

          </div>
        </div>
      </div>
    </>
  )
}

export default App;
