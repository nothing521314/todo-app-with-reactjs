import TaskItems from "./TaskItems";

function TaskList (props) {

  const tasks = props.exData;

  let elmTask = tasks.map ((task, index) => {
    return <TaskItems key={task.key}
                      id={index}
                      task={task}
                      changeStatus={props.updateStatus}
                      deleteContent={props.onDeleteContent} 
                      changeContent={props.updateContent}
            />
  })

  return (
    <div className="row mt-15">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* TaskItems */}
           {elmTask}
          </tbody>
        </table>
        
      </div>
    </div>
  )
  
}

export default TaskList;