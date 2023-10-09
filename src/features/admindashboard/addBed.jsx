import React,{ useState} from "react";
import {useAddBedsMutation, useGetAllHospitalsQuery} from "../../services/hospApi";
import { json } from "react-router-dom";

function AddBed(){
var {isLoading:isHospitalsLoading,data:hospitals}=useGetAllHospitalsQuery()
var [addBedsToDB]=useAddBedsMutation();
var [bedcount,setBedcount]=useState(0)
var [bedprice,setBedPrice]=useState(0)
var [selectedBedtype,setSelectedBedtype]=useState("")
var [selectedHospital,setSelectedHospital]=useState(null)


function savebeds(){
    var newbeds=[];
    // console.log("selectedhospital:",selectedHospital)
var numBeds=selectedHospital.beds.filter(b=>b.bedType===selectedBedtype).length;
    for(var i=0;i<=bedcount-1;i++)
    {
    var newBed= {
        bedStatus:"open",
        bedType:selectedBedtype,
        bedprice,
        patients:[],
        bedId:`${selectedBedtype+(numBeds+i+1)}`
    
     }   
     newbeds.push(newBed)
     console.log(selectedBedtype)
    }
    var latestHospitalDetails={...selectedHospital,beds:[...selectedHospital.beds,...newbeds]}
    setSelectedHospital({...selectedHospital,beds:[...selectedHospital.beds,...newbeds]})
  addBedsToDB(latestHospitalDetails)
}

    return(
    <div class="border border-danger">
        <h1>AddBed</h1>
        {
            isHospitalsLoading && ("Please Wait...")
        }
        {
            !isHospitalsLoading &&(
                <div>
                <select onChange={(e)=>{setSelectedHospital(JSON.parse(e.target.value))}}>
                    <option value={null} disabled selected>Select Hospital</option>
                    {
                        hospitals.map(function(h){
                            return <option value={JSON.stringify(h)}>{h.hospitalName}</option>

                        })
                    }
                </select>
                <br />
                </div>
            )
        }

    {
         selectedHospital && selectedHospital.bedTypes.length>0 &&(
                <div>
                <select onChange={(e)=>{setSelectedBedtype(e.target.value)}}>
                    <option value={null} disabled selected>Select Bedtype</option>
                    {
                        selectedHospital.bedTypes.map(function(b){
                        return <option value={b.bedType}>{b.bedType}</option>
                        })
                            
                    }
                </select>
                <br/>
                 <input type="number" placeholder="Enter Bed Count" onChange={(e)=>{setBedcount(e.target.value)}}/>
                 <br/>
                 <input type="number" placeholder="Enter Bed Price" onChange={(e)=>{setBedPrice(e.target.value)}}/>
                 <br/>
             </div>
            )
        }
        <br />
        <button onClick={()=>{savebeds()}}>SaveBeds</button>
    </div>
    )
}
export default AddBed;