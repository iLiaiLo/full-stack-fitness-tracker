
const Navigation = ({days,setDays,date,setDate}) => {

    const handleChooseDate=(e)=>setDate(e.target.value);
   

    const addDays=async ()=>{
        try {
          const data={id:1+Math.random(),exercises:[],date:date,completed:false,chosen:false}
          setDays([...days,data])
    
          await fetch('http://localhost:5000/exercises',{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
              "Content-type":"application/json"
            }
          })
    
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <nav className='navigation'>
      <section style={{display:"inherit",gap:"10px"}}>
      <label htmlFor="date">Choose date</label>
      <input name="date" type="date" onChange={handleChooseDate} />
      </section>

      <button className='create-btn' onClick={addDays}>Create plan</button>
     </nav>
  )
}

export default Navigation