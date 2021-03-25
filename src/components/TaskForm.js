import { useEffect, useState } from "react";

function TaskForm(props) {
  const [inputValue, setInputValue] = useState({
    id: "",
    name: "",
    status: false
  })

  let str2bool = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  }

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: str2bool(value) });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    props.submitData(inputValue);
    onCloseForm();
    onClear();
  }

  useEffect(() => {
    if (props.editForm) {
      setInputValue({
        id: props.editForm.id,
        name: props.editForm.name,
        status: props.editForm.status
      })
    } else if (!props.editForm) {
      setInputValue({
        id: "",
        name: "",
        status: false
      });
    }
  }, [props.editForm]);

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
              <input
                name="name"
                className="form-control"
                value={inputValue.name}
                onChange={handleOnChange}
              />
            </div>
            <label>Status</label>
            <select
              name="status"
              className="form-control"
              value={inputValue.status}
              onChange={handleOnChange}
            >
              <option value={`${true}`}>Active</option>
              <option value={`${false}`}>Hide</option>
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