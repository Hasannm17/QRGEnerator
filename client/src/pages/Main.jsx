import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useEffect, useState } from 'react'

const Main = () => {

  const cookie =new Cookies();
  const token =cookie.get('TOKEN');
  console.log(token);
  const [message ,setmessage ] =useState('');
 


  
  useEffect(()=>{
    const config ={
      method:"get" ,
      url:"http://localhost:3000/auth-endpoint" ,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

axios(config).then((result)=>{
  setmessage(result.data.message);
}).catch((error)=>{
  error= new Error();

})


  },[])



  return (
<>
<h1>{message}</h1>
<Navbar/>
<Hero/>
</>
  )
}

export default Main