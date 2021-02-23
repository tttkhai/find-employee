import { Form, withFormik } from "formik";
import { useState } from "react";
import Select from 'react-select';

function Employee( {values,setFieldValue}) {
  let [employeeList, setEmployeeList] = useState(values.employees)

  const handleChange=(e)=>{
    let manager_id = e.value;
    if(manager_id){
      setEmployeeList(values.employees.filter(({manager})=> {return manager===manager_id}))
    } else{
      setEmployeeList(values.employees)
    }
  }
  return (
    <div className="employee">
      <h2>Employee List:</h2>
      <Form onSubmit={(e)=>search(e)}>
        <Select 
          name="manager" 
          options={values.managers.map(({id, first_name, last_name})=>({
            value: id,
            label: first_name +" "+last_name
          }))}
          defaultValue={{ label: "Select Manager", value: 0 }}
          onChange={(e)=>handleChange(e)}
        />
      </Form>
      {employeeList.map(({id, employee_id, first_name, last_name, roles})=>{
        return (<div key={id}>
                  Id: {employee_id}.Name: {first_name} {last_name}. 
                  Roles: {roles.map((res, index)=>{
                    return <span key={index}>{res.value}, </span>
                  })}
                </div>)
      })}
    </div>
  )
}

const employeeForm = withFormik({
  mapPropsToValues({employees, managers}){
    return {
      manager: "",
      employees: employees || [],
      managers: managers || [],
    }
  }
})(Employee)

export default (employeeForm);