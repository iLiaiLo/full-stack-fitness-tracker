

const Exercise = ({task,days,setDays}) => {

    const handleComplete=async (id,TaskId)=>{

        try {
    
        let data={};
      
        const arr=days.map(item=>{
          if(item.id===TaskId){
              const ar=item.exercises.map(it=>{
                if(it.id===id){
                return {...it,TaskCompleted:true}
              }
              return it
            })
            data={exercises:ar}
            return {id:item.id,exercises:ar,date:item.date,completed:item.completed,chosen:item.chosen}
          }
          return item
        })
        setDays(arr)
    
          await fetch(`http://localhost:5000/exercises/${TaskId}`,{
            method:"PATCH",
            body:JSON.stringify({exercises:data.exercises}),
            headers:{
              "Content-type":"application/json"
            }
    
          })
        } catch (error) {
          console.log(error)
        }
      }

      const handleRemoveTask=async (id,TaskId)=>{

        try {
          let data={}
          const arr=days.map(item=>{
            if(item.id===TaskId){
              const ar=item.exercises.filter(it=>it.id!==id)
              data={exercises:ar}
      
              return {id:item.id,exercises:ar,date:item.date,completed:item.completed}
            }
            return item
          })
      
          setDays(arr)
    
          await fetch(`http://localhost:5000/exercises/${TaskId}`,{
            method:"PATCH",
            body:JSON.stringify({exercises:data.exercises}),
            headers:{
              "Content-type":"application/json"
            }
          })
          
        } catch (error) {
          console.log(error)
        }
      }
  return (
   <section className='exercise'>
            {
              task.exercises.map((exercise,i)=>{
                return(
                  <ul key={i} className="task" style={{backgroundColor:exercise.TaskCompleted?"#90ee90ec":""}} >
                    <li>Name: {exercise?.name}</li>
                    <li>Description: {exercise?.description}</li>
                    <li>Duration: {exercise?.duration} min</li>
                    <li>How to make: <a href={exercise?.how_to_make} target="_blank">click here</a></li>
                    <li>
                    <button onClick={()=>handleComplete(exercise.id,task.id)}>{exercise.TaskCompleted?"completed":"complete"}</button>
                    <button onClick={()=>handleRemoveTask(exercise.id,task.id)}>remove</button>
                    </li>
                    
                  </ul>
                )
              })
            }
    </section>
  )
}

export default Exercise