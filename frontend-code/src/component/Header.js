import React from 'react'
import {useNavigate} from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const addform = () => {
        navigate("/addform");
    }
  return (
    <div>
        <div className="h1 center">Employee Directory</div>
        <br></br>

        <div class="container">
      
           <div class="row mt-3 align-items-center">
      
        <div class="col col-md-8">
            <input class="form-control rounded-pill bg" placeholder="search by name..." style={{height:"50px", width:"100%"}} >
       </input> </div>
        <div class="col-auto">
            <button class="btn btn-outline-light text-dark border-0 rounded-pill ml-n5" type="button">
                <i class="fa fa-search fa-3x"></i>
            </button>
        </div>


        <div class="col col-md-2"><button className="btn btn-info radius" style={{height:"60px", width:"200px"}} onClick={addform}><b>ADD Emolyee</b></button></div>
    </div>
    </div>
    </div>
  )
}

export default Header
