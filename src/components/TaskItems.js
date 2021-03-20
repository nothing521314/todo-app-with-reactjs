function TaskItems (props) {
  
  const changeStatus = () => {
    props.changeStatus(props.task.key)
  }
  
    const changeContent = () => {
      props.changeContent(props.task.key)
    }

  const deleteContent = () => {
    props.deleteContent(props.task.key)
  }

  return (
    <tr>
      <td className="text-center">{1 + props.id}</td>
      <td>{props.task.name}</td>
      <td className="text-center">
        <span className={props.task.status === true ? "label label-danger" : "label label-success"}
              onClick={changeStatus}
             >
          {props.task.status === true ? "Active" : "Hidden"}
        </span>
      </td>
      <td className="text-center">
        <button type="button" className="btn btn-warning" onClick={changeContent}>
          <span className="mr-5"></span>Edit
        </button>
        &nbsp;
        <button type="button" className="btn btn-danger" onClick={deleteContent}>
          <span className="mr-5"></span>Delete
        </button>
      </td>
    </tr>
  )
  
}

export default TaskItems;