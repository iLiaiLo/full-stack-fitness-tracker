import { useState,useEffect} from "react"

const Dropdown = ({days,task,setDays,chosen}) => {


 const [exercises,setExercises]=useState([])

  useEffect(()=>{
    async function fetchData(){
      try {
        const res=await fetch("http://localhost:5000/exercises")
        const data=await res.json()
        setExercises(data);

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  },[])

 
  const handleChoose=(id)=>{
    
    const arr=days.map(item=>{
        if(item.id===id){
            return {...item,chosen:!item.chosen}
        }
        return {...item,chosen:false}
    })
    setDays(arr)
  }

  const handleAddExercise=async (id,workout)=>{
    
    try {
      let data={};
    
      const arr=days.map((item)=>{
        if(item.id===id){
          workout.id=Math.random()
          item.exercises.push({...workout,TaskCompleted:false})
          data=item;
        }
        return item
      })
      setDays(arr)

      await fetch(`http://localhost:5000/exercises/${id}`,{
        method:"PATCH",
        body:JSON.stringify({exercises:data.exercises}),
        headers:{
          "Content-type":"application/json"
        }
      })
      alert("exercise added")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <section className="dropdown">

    <button className="choose-category" onClick={()=>handleChoose(task.id)}>Choose categories</button>
    {chosen && <section  className="dropContent">

    { exercises.map((exercise,ind)=>{
            return(<div key={ind} >

                <h2>{exercise.name}</h2>
                {
                    exercise.workouts.map((workout,index)=>{
                        return (<ul key={index} onClick={()=>handleAddExercise(task.id,workout)}>
                            <li><span>Name:</span> <span>{workout.name}</span></li>
                            <li><span>Description:</span> <span>{workout.description}</span></li>
                            <li><span>Duration:</span> <span>{workout.duration} min</span></li>
                            <li><span>How to make:</span> <a href={workout.how_to_make} target="_blank">click here</a></li>
                        </ul>)
                    })
                }
            </div>)
        })
    }

    </section>}
    

    </section>

     
  )
}

export default Dropdown