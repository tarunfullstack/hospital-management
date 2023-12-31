import React, { useState } from "react";
import { Formik } from "formik";
import { bedTypes } from "../../constants";
import { useAddHospitalMutation } from "../../services/hospApi";

function AddHospital(){
    var[newbedtype,setNewbedtype]= useState({
        bedType :'',
        price :0
    })
   var [addedBedTypes,setAddedBedType]= useState([])
  var[addHospital] = useAddHospitalMutation()
  
    function addBedType(){
      setAddedBedType([...addedBedTypes,newbedtype])
    }
    return( 
        <div className="border border-2 border-info m-2 p-2">
            <h2>AddHospital</h2>
  
            <Formik
       initialValues={
        { 
        hospitalName: '', 
        image: '',
        area :'',
        reviews :[],
        bedTypes : [],
        beds:[]
    }
    }
       onSubmit={(values)=>{
        values.bedTypes=[...addedBedTypes]
        addHospital(values).then((res)=>{
          console.log("res::",res)
        })
       }}
       >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           <input
             type="text"
             name="hospitalName"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.hospitalName}
             placeholder="Enter Hospital Name"
           />
          <br />
           <input
             type="text"
             name="image"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.image}
             placeholder="Enter Image URL"
           />
           <br />
           <input
             type="text"
             name="area"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.area}
             placeholder="Enter Hospital Location"
           />  
           <br />
           <ul>
            {
              addedBedTypes.length>0 &&   (<u>selected bedTypes</u>)
            }
            {
              addedBedTypes.length>0 && addedBedTypes.map((a)=>{
                return <li>
                  <i>{a.bedType}</i>&nbsp;
                  <i>{a.price}</i>&nbsp;
                </li>
              })
            }
           </ul>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  +Bed Type 
  </button> 
     <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Bed Type with Price</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <label htmlFor="">Select Bed Type:</label>
        <select onChange={(e)=>{setNewbedtype({...newbedtype,bedType:e.target.value})}}>
            <option value={null} disabled selected>Please Select</option>
            {
                bedTypes.map((bedtype)=>{
                    return <option value={bedtype}>{bedtype}</option>
                })
            }
        </select>
        <br />
        <label htmlFor="">Set The Price:</label>
        <input type="text" placeholder="Enter the price" onChange={(e)=>{setNewbedtype({...newbedtype,price:e.target.value})}} />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{addBedType()}}>Add Bed Type</button>
      </div>
    </div>
  </div>
</div>
<br />
<button type="submit">Submit</button>
           
         </form>
       )}
     </Formik>

        </div>
    )
}
export default AddHospital;