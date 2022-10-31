import React, {useState, useEffect} from 'react';
import Header from './Header';
import { Link} from "react-router-dom";
import axios from 'axios';

function Cards() {
    const [users, setUsers] = useState([]);
    
    const LoadEdit = (ID, Name, EMAIL, DOB, LOCATION, PHONE, PASSWORD, IMAGE) => {
       localStorage.setItem('id', ID)
       localStorage.setItem('name', Name)
       localStorage.setItem('email', EMAIL)
       localStorage.setItem('dob', DOB)
       localStorage.setItem('location', LOCATION)
       localStorage.setItem('number', PHONE)
       localStorage.setItem('password', PASSWORD)
       localStorage.setItem('image', IMAGE)
    }
    
    useEffect(() => {
        getusers();
       }, [])

   

    function getusers() {
        
            fetch("http://localhost:3003/api/v1/users").then((result)=>{
                result.json().then((resp)=>{
                    setUsers(resp)
                })

            })

           
    }

    const randomUsers = async () =>{

        const {data} = await axios.get("https://randomuser.me/api/?results=20")
        for(let i=0;i<20;i++){
            const usersdata = data.results[i];
       
            const name = data.results[i].name.first;
            const email = data.results[i].email;
            const dob = data.results[i].dob.date;
            const location = data.results[i].location.city;
            const number = data.results[i].phone;
            const password = data.results[i].cell;
            const image = data.results[i].picture.large;
    
            const datauser = {name,email,dob,location,number,password,image};
            console.log(datauser);
    
    fetch("http://localhost:3003/api/v1/users/",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(datauser)
      })

        }
       

  window.location.reload();
    }
    
       function deleteUser(id){

        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:3003/api/v1/users/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }

    }

 return (
    <div className='grid1'>
        {
            users.length === 0 ?
            <button type="button" class="btn btn-warning" style={{height:"60px", width:"200px"}} onClick={()=>randomUsers()}><b>ADD RANDOM USERS</b></button>
            :
            null
        }
    <div className='grid flex-items-xs-middle flex-items-xs-center'>
     {users.map((item, index) => (<div>
        <div className="col-xs-12 col-lg-4">
      <div className="card text-center bg border radius rounded" style={{width:"18rem"}}>
      <br></br>
  <img className="card-img-top rounded-circle img-cover" style={{height:"200px", width:"200px"}}  src={item.image} />

  <div className="card-body">
    <h4 className="card-title size">{item.name}</h4>
          


    <ul class="list-group text-start bg">
       

              <li class="list-group-item bg"><i class="fa fa-envelope sizing"> &nbsp; {item.email}</i></li>
              <li class="list-group-item bg"><i class="fa fa-calendar sizing"> &nbsp; {item.dob}</i></li>
              <li class="list-group-item bg"><i class="fa fa-map-marker sizing">&nbsp; {item.location}</i> </li>
              <li class="list-group-item bg"><i class="fa fa-phone sizing">&nbsp; {item.number}</i> </li>
              <li class="list-group-item bg"><i class="fa fa-key sizing">&nbsp; {item.password}</i> </li>
                   
<br></br>


			  
        </ul>
        
       
    
 
    
    <div className="container">
        <div className="row">
        <div className="col-4">
<button type="button" class="btn delete justify-content-btween" onClick={()=>deleteUser(item.id)}>
<i class="fa fa-trash b" aria-hidden="true"></i>
</button>
</div>
<div className="col-4"></div>
<div className="col-4">
<Link to={"/employee/edit/"} >    
<button type="button" className="btn edit justify-content-btween" onClick={() => { LoadEdit(item.id, item.name, item.email, item.dob, item.location, item.number, item.password, item.image) }}>
<i class="fa fa-pen b" aria-hidden="true"></i>
</button></Link>

</div>
         </div>
         </div>
    
    </div>
  </div>
</div>

    </div>))}
    </div>
    </div>
  )
}

export default Cards;
