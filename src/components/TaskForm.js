import { useEffect, useState } from "react";

function TaskForm (props) {
  const [inputValue, setInputValue] = useState({
    key: "",
    name: "",
    status: false
  })

  const handleOnChange = (event) => {
    const {name, value} = event.target;
    setInputValue({...inputValue, [name]: value});
  }

  const onSubmit = (event) => {
    event.preventDefault();
    inputValue.status = (inputValue.status === true || inputValue.status === "true" ? true : false);
    props.submitData(inputValue);
    onCloseForm();
    onClear();
  }

  useEffect ( () => {
    if (props.editForm) {
      setInputValue({
        key: props.editForm.key,
        name: props.editForm.name,
        status: props.editForm.status
      })
    } else if (!props.editForm) {
      setInputValue({
        key: "",
        name: "",
        status: false
      });
    }
  }, [props.editForm])

  const onCloseForm = () => {
    props.closeForm();
  }

  const onClear = () => {
    setInputValue({
      name: "",
      status: false
    })
  }


  return (
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">{(inputValue.key ? "Editting" : "Adding")}
            <span className="btn-close fl-right" onClick={onCloseForm}>x</span>
          </h3>
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input name="name" 
                     className="form-control"
                     value={inputValue.name}     
                     onChange={handleOnChange}  
              />
            </div>
            <label>Status</label>
            <select name="status" 
                    className="form-control"
                    value={inputValue.status}
                    onChange={handleOnChange} >
              <option value={true}>Active</option>
              <option value={false}>Hide</option>
            </select>
            <div className="mt-15 text-center">
              <button type="submit" className="btn btn-warning" onClick={onSubmit}>Submit</button>
              <button type="button" className="btn btn-danger ml-5" onClick={onClear}>Cacel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
        
  )
  
}

export default TaskForm;