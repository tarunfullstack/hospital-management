import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useGetAllHospitalsQuery } from "../../services/hospApi";
function AdminDashboard(){
    // var{isLoading,data}=useGetAllHospitalsQuery();
    // console.log(data);
    return(
<div>
            <h1>AdminDashboard</h1>
            <div>
            <Link to="addhospital"><button className="btn btn-danger">+Add Hospital</button></Link>
            <Link to="addBed"><button className="btn btn-success">+Add Bed</button></Link>
            <Outlet></Outlet>
            </div>
    {/* </div> */}
</div>
    )
}
export default AdminDashboard;