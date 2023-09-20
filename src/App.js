import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [randomUsers, setRandomUsers] = useState(null);
  
  const shortDateTime = (date) => {
    let dateObject = new Date(date);
    return dateObject.toLocaleDateString("en-GB");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('https://randomuser.me/api/')
        .then((res) => {
          setRandomUsers(res.data?.results);
        });
    }, 10000);

    return () => {
      clearInterval(interval);
    };

  }, []);

  return <>
     {(randomUsers?.map((user,index)=>{
       return(
        <div className="card marginTop" key={index}>
          <img src={user.picture.large} alt={`${user?.name}`}/>
          <h3>{user.name.title} {user.name.first} {user.name.last}</h3>
          <p style={{textTransform: "capitalize"}} >{user.gender}  ( {user.dob.age} )</p>
          <p><strong>DOB: </strong>{shortDateTime(user.dob.date)}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone: </strong> {user.phone}</p>   
        </div>
       )
     }))}
  </>
}

export default App;
