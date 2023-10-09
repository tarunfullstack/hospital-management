import React from "react";
import { useGetAllHospitalsQuery } from "../../services/hospApi";
import { Link } from "react-router-dom";
function Home(){
    var {isLoading,data}=useGetAllHospitalsQuery();
return(
<div>
<h1>Home</h1>
{
    isLoading && ("...Please Wait")
}
<ul className="d-flex flex-wrap p-0">
{
    !isLoading && (
        data.map(function(hosp){
            return <li className=" w-25 border border-2 m-2" style={{listStyle:"none"}}>
            <h3 className="text-center">{hosp.hospitalName.toUpperCase()}</h3>
            <img src={hosp.image}  width="100%" /><br /><br />
            <b>Total Beds:{hosp.beds.length}</b>
            <br />
            <Link to={`details/${hosp.id}`}>Details</Link>
            </li>
        })
    )
}
</ul>
</div>
)
}
export default Home;