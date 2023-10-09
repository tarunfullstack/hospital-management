import React, {useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAddBedsMutation, useGetHospitalDetailsByIdQuery, useLazyGetAllHospitalsQuery, useLazyGetHospitalDetailsByIdQuery } from "../../services/hospApi";
import _ from "lodash";
import {getAuth,signInWithPopup,GoogleAuthProvider} from "firebase/auth";
const provider = new GoogleAuthProvider();
function HospitalDetails(){
  var p = useParams()
var {isLoading,data} = useGetHospitalDetailsByIdQuery(p.id);
var [updateBeds]=useAddBedsMutation()
var [getHospitalDetails]=useLazyGetHospitalDetailsByIdQuery()
// console.log(data)
var [beds,setBeds]=useState(null)
var [bedtypes,setBedtypes]=useState([])
var [selectedBed,setSelectedBed]=useState(-1)
useEffect(()=>{
 if(data)
 {
  var bedsByCategory = _.groupBy(data.beds,"bedType");
  console.log(bedsByCategory)
  setBeds(bedsByCategory)  
  var temp=[]
  for(var k in bedsByCategory)
  {
    temp.push(k)
  }
  setBedtypes([...temp]);
  console.log(beds)
 }
},[data])
function occupybed(bid){
console.clear()
console.log(data)
setSelectedBed(bid)
var tempBeds=data.beds;
tempBeds=tempBeds.map((bed)=>{
if(bed.bedId===bid)
{
return {...bed,bedStatus:"occupied"}
}
else{
return bed;
}
})
console.log("tempBeds:",tempBeds)
var bedsByCategory= _.groupBy(tempBeds,"bedType")
setBeds(bedsByCategory)
}


function updateHospitalBeds(){
 
    const auth=getAuth();
    signInWithPopup(auth,provider).then((result)=>{
        const credential=GoogleAuthProvider.credentialFromResult(result)
        const token=credential.accessToken;
        const user=result.user;

        console.clear()
        console.log(beds)
        console.log(user)
        console.log(token)
    var temp=Object.values(beds).flat(1)
    temp=temp.map((b)=>{
        if(b.bedId===selectedBed)
        {
            return {...b,patients:[...b.patients,{useremail:user.email,token:user.accessToken}]}
        }
        else{
            return b;
        }
    })
    data={...data,beds:[...temp]}
    console.log(data)
    updateBeds(data).then(()=>{alert("updating...")
        getHospitalDetails(p.id)
     })

    }).catch((error)=>{
        console.log(error)
    }) 



    


}
return (

<div>
            <h1>HospitalDetails</h1>
        {
            isLoading && ("...Please wait")
        }
        {
            !isLoading && (
                <div>
                <h3>{data.hospitalName.toUpperCase()}</h3>
                <ul>
                    {
                        bedtypes.map((t,i)=>{
                            return <li key={i}>{t}-{beds[t].length
                            }
                            <br />
                            {
                                beds[t].map((bed)=>{
                                    return( 
                                    <div>
                                    {bed.bedStatus==="open" && <i class="bi bi-clipboard h3 m-2 " onClick={()=>{occupybed(bed.bedId)}}></i>}
                                    {bed.bedStatus==="occupied" && <i class="bi bi-clipboard-fill h3 m-2" onClick={()=>{occupybed(bed.bedId)}}></i>}
                                    </div>
                                    )
                                })
                            }
                            </li>
                        })
                    }
                </ul>
                <button onClick={()=>{updateHospitalBeds()}}>Book IT</button>
                </div>
                )
        }

</div>
    )
}
export default HospitalDetails;