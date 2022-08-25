import React, { Fragment, useEffect, useState } from 'react'
import "./Todo.css";

function Todo() {
    const [users,setUsers]=useState([])
    const [displayUsers,setDisplayUsers] = useState([]);    
    const [filter,setFilter]=useState([])
    const [name,setName] = useState("");
    const [isSearch,setSearch] = useState(false);
    const [isDataFound,setDataFound] = useState(true);
    const data= fetch("https://jsonplaceholder.typicode.com/users")
    useEffect(()=>{
      function Fetch(){
        data
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
              setUsers(data)
              setDisplayUsers(data);
        })
      }
      Fetch()
    },[])
    
    const handleChange=(event)=>{
        const value=event.target.value;
        setSearch(true);
        console.log(value);
        var newarray=[];
        newarray=users.filter((ele)=>{
            return ele.email.toLowerCase().includes(value) || ele.name.toLowerCase().includes(value) || ele.username.toLowerCase().includes(value)
        })
        if(newarray.length === 0){
          setDataFound(false);
          return;
        }else{
          setDataFound(true);
          setFilter(newarray)
          setDisplayUsers(newarray);
        }
        if(value==""){
          setFilter([]);
          setDisplayUsers(users);
          setSearch(false);
        }
    }

    const handleClick=(ele)=>{
    

      setName(ele.email);
      
      setDisplayUsers([ele]);
      setFilter([]);
    }
  return (
    <div>
    <div className='searchBar'>
        <div className='searchInput' style={{paddingTop:"100px"}}>
            <input type="text" className='input' style={{width:"450px",height:"30px",borderRadius:"200px"}} placeholder="Search User By Name or UserName or Email" onChange={handleChange}/>
            </div>
        {isDataFound && isSearch && <div style={{marginLeft:"550px"}} className='dataresult'>
            {filter.slice(0,10).map((ele)=>{
                return <div>
                  <p className='dataitem' onClick={()=>handleClick(ele)}>{ele.name}--{ele.username}--{ele.email}</p>
                  </div>
            })}
        </div>}
            
        { isDataFound && <div>
        <table className='body'>
      <thead>
      <tr>
        <div>
        <th>NAME</th>
        <th>USER NAME</th>
        <th>EMAIL ID</th>
        <th>WEBSITE</th>
        </div>
      </tr>
      </thead>
      <tbody className='table'>
      {displayUsers.slice(0,10).map((ele)=>{
          return <div>
          <tr>
      
            <td>{ele.name}</td>
            <td >{ele.username}</td>
            <td >{ele.email}</td>
            <td><a href='/' target='blank'>{ele.website}</a></td>
            </tr>
            </div> 

        
     })} 
  
      </tbody>
     </table>
        </div>
    } 
    {!isDataFound && <div>
      <h1>User not found</h1>
      </div>
      }
    </div>
    </div>
  )
}

export default Todo