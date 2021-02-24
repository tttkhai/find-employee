import "./styles.css";
import { Form, Field, withFormik } from "formik";
import Select from "react-select";
import { useState } from "react";
import Employee from "./Employee";

const roles = [
  { label: "Software Engineer", value: "Software Engineer" },
  { label: "Accountant", value: "Accountant" },
  { label: "Manager", value: "Manager" },
  { label: "Principle Engineer", value: "Principle Engineer" }
];

const MultipleForm=({name, isMulti, options, onChange})=>{
  const handleChange=(e)=>{
    onChange(name, e)
  }

  return (<Select
    name={name}
    onChange={handleChange}
    options={options}
    isMulti={isMulti}
  />)
}

function App({ values, setFieldValue, resetForm }) {
  let [managers, setManagers] = useState([]);
  let [employees, setEmployees] = useState([]);

  const handleSubmit = (values) => {
    console.log("Handle submit being called");
    let id = employees.length === 0 ? 1 : Math.max(employees.map(({ id }) => id)) + 1;
    let employee_manager = employees.length === 0 ? 1 : values.manager.value;
    employees.push({
      id: id,
      first_name: values.first_name,
      last_name: values.last_name,
      manager: employee_manager,
      employee_id: values.employee_id,
      roles: values.roles
    });
    setEmployees(employees);
    let isExistingManager = managers.find(({ id }) => {
      return id === employee_manager;
    });
    if (!isExistingManager) {
      let manager = employees.find(({ id }) => {
        return id === employee_manager;
      });
      managers.push(manager);
      setManagers(managers);
    }
    resetForm();
  };
 
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Add new employee</h2>
      <Form
        onSubmit={(e) => {
          handleSubmit(values);
          e.preventDefault();
        }}
      >
        <div>
          <label> Employee Id </label>
          <Field name="employee_id" />
        </div>
        <div>
          <label>First Name </label>
          <Field name="first_name" />
        </div>
        <div>
          <label>Last Name </label>
          <Field name="last_name" />
        </div>
        <div style={{ width: "500px", margin: "auto" }}>
          <label>Roles</label>
          <MultipleForm 
            name="roles"
            isMulti={true} 
            onChange={setFieldValue} 
            options={roles}
          />
        </div>
        <div style={{ width: "500px", margin: "auto" }}>
          <label>Manager</label>
          <MultipleForm 
            name="manager" 
            isMulti={false} 
            onChange={setFieldValue} 
            options={employees.map(({id, first_name, last_name})=> ({
              value: id,
              label: first_name + " " + last_name
            }))}
          />
        </div>
        <button type="submit">submit</button>
      </Form>
      <Employee employees={employees} managers={managers} />
    </div>
  );
}

const addEmployeeForm = withFormik({
  mapPropsToValues() {
    return {
      roles: [],
      first_name: "",
      last_name: "",
      employee_id: "",
      manager: null
    };
  }
})(App);

export default addEmployeeForm;
