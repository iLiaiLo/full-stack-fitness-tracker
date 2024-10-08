import Dropdown from './pages/Dropdown'
import Exercise from './pages/Exercise';
import Navigation from './pages/Navigation';
import './App.css'
import {  useEffect, useState } from 'react'

function App() {
  const [date,setDate]=useState("");
  const [days,setDays]=useState([]);
  

  useEffect(()=>{
    async function fetchData(){
      try {
        const res=await fetch("http://localhost:5000/Days");
        const data=await res.json();
        setDays(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])


  const handleRemoveExercise=async (id)=>{
    try {
     
      const arr=days.filter(it=>it.id!==id)
      setDays(arr)
      await fetch(`http://localhost:5000/exercises/${id}`,{
        method:"DELETE",
        headers:{
          "Content-type":"application/json"
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

 
  return (
    <>
     <Navigation days={days} setDays={setDays} date={date} setDate={setDate}/>
     <section className='exercise-content'>
      {
        days.map((task,ind)=>{
          return(<div key={ind} className="exercises">
            <Dropdown days={days} task={task} chosen={task.chosen} setDays={setDays} />

            {task.exercises.length!==0 && <Exercise task={task} days={days} setDays={setDays}/>}

            <button className='remove-activity' onClick={()=>handleRemoveExercise(task.id)}>remove activity</button>

            {task.date?<footer className='date'>Date: {task.date}</footer>:<></>}
          </div>)
        })
      }

     </section>
    </>
  )
}

export default App
