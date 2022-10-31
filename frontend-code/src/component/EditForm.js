import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function EditForm() {
  

  const [userInfo, setuserInfo] = useState({
    file:[],
    filepreview:null,
   });

  const[id,setId]=useState("");
  const[name,setName]=useState("");
  const[email, setEmail]=useState("");
  const[dob, setDob]=useState("");
  const[location, setLocation]=useState("");
  const[number,setNumber]=useState("");
  const[password,setPassword]=useState("");
  const[image,setImage]=useState("");

  useEffect(() => {
      setId(localStorage.getItem('id'))
      setName(localStorage.getItem('name'))
      setEmail(localStorage.getItem('email'))
      setDob(localStorage.getItem('dob'))
      setLocation(localStorage.getItem('location'))
      setNumber(localStorage.getItem('number'))
      setPassword(localStorage.getItem('password'))
      setImage(localStorage.getItem("image"))
  }, []);  

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file:event.target.files[0],
      filepreview:URL.createObjectURL(event.target.files[0]),
    });

    setImage('uploads/'+event.target.files[0].name);

  }


  const navigate = useNavigate();


 
  const handlesubmit=(e)=>{
    e.preventDefault();
    const empdata={id,name,email,dob,location,number,password,image};
    
    const formdata = new FormData(); 
    formdata.append('avatar', userInfo.file);


    axios.post("http://localhost:3003/imageupload", formdata,{   
            headers: { "Content-Type": "multipart/form-data" } 
    })
    .then(res => { // then print response status
      console.warn(res);
      if(res.data.success === 1){
        alert("Image upload successfully");
      }

    })

    fetch("http://localhost:3003/api/v1/users/" + id,{
      method:"PUT",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(empdata)
    }).then((res)=>{
      alert('Saved successfully.')
      navigate('/');
    }).catch((err)=>{
      console.log(err.message)
    })

   
   
            

  }




  
  return (
    <div>

    <div className="row">
        <div className="offset-lg-4 col-lg-6">
            <form className="container" onSubmit={handlesubmit}>

                <div className="card" style={{"textAlign":"left"}}>
                    <div className="card-title">
                    <br></br>
                        <h2 className="text-center">Employee Edit</h2>
                        <div className="text-center">
               <img className="card-img-top rounded-circle img-cover" style={{height:"200px", width:"200px"}}  src={image} />
               </div>
                    </div>
                    <div className="card-body">

                        <div className="row">

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>ID</label>
                                    <input value={id} disabled="disabled" className="form-control"></input>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input required value={name}  onChange={e=>setName(e.target.value)} className="form-control"></input>
                                
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={email} onChange={e=>setEmail(e.target.value)} className="form-control"></input>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>DOB</label>
                                    <input value={dob} onChange={e=>setDob(e.target.value)} className="form-control"></input>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Location</label>
                                    <input value={location} onChange={e=>setLocation(e.target.value)} className="form-control"></input>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input value={number} onChange={e=>setNumber(e.target.value)} className="form-control"></input>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input value={password} onChange={e=>setPassword(e.target.value)} className="form-control"></input>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Image</label>
                                    <input value={image} disabled="disabled" className="form-control"></input>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                <input type="file"
                       onChange={handleInputChange}
                       className="form-control"
                       />
                                </div>
                            </div>

                            
                           
                            <div className="col-lg-4 ">
                                   <button className="btn btn-success text center edit" type="submit" style={{"width":"140px"}}>Save</button>
                                   </div>
                                   <div className="col-lg-4"></div>
                                   <div className="col-lg-4">
                                   <Link to="/" className="btn btn-danger text center delete">Back</Link>
                                   </div>

                        </div>

                    </div>

                </div>

            </form>

        </div>
    </div>
</div>
  )
}

export default EditForm
