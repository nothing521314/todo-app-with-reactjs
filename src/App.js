import { useEffect, useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App () {
  let [tasks, setTasks] = useState([]);
  let [isDisplayForm, setIsDisplayForm] = useState(false);
  let [editting, setEditting] = useState([]);

  const onSubmit = (data) => {
    let arr = tasks
    if (!data.key) {
      data.key = generateKey();
      arr.push(data)
    } else {
      let index = tasks.findIndex(task => task.key === data.key)
      arr[index] = data;
    }
    setTasks(arr)
    setEditting(null);
    localStorage.setItem("tasks", JSON.stringify(arr));
  }

  const onToggleForm = () => {
    setIsDisplayForm(true);
    setEditting(null)
  }

  const onShowForm = () => {
    setIsDisplayForm(true);
  }

  const onCloseForm = () => {
    setIsDisplayForm(false);
    setEditting(null);
  }

  const onUpdateStatus = (key) => {
    let index = tasks.findIndex(task => task.key === key);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      setTasks(tasks => [...tasks]);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  const onUpdateContent = (key) => {
    let index = tasks.findIndex(task => task.key === key);
      setEditting(tasks[index]);
      onShowForm();
  }

  const onDelete = (key) => {
    let index = tasks.findIndex(task => task.key === key);
    if (index !== -1) {
      tasks.splice(index, 1);
      setTasks(tasks => [...tasks]);
    }
    onCloseForm();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  useEffect (() => {
    if (localStorage.getItem("tasks")) {
      setTasks(JSON.parse(localStorage.getItem("tasks")))
    }
  }, []) 

  function createKey ()  {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  function generateKey () {
    return createKey() + createKey() + "-" + createKey() + createKey() + "-" + createKey() + createKey() + createKey();
  } 

  let elmForm = isDisplayForm ? <TaskForm closeForm={onCloseForm} submitData={onSubmit} editForm={editting}/>: "";
  
  return (
    <div className="container">
      <div className="row">
        <div className="text-center">
          <h1 className="fw-bold cl-blue">TODO APP BY NOTHING</h1>
        </div>
        {/* TaskForm */}
        {elmForm}
        <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
          
          <button type="button" className="btn btn-primary" onClick={onToggleForm}>Add Job</button>
          {/* TaskList */}
          <TaskList exData={tasks} updateStatus={onUpdateStatus} onDeleteContent={onDelete} updateContent={onUpdateContent}/>
        </div>
      </div>
    </div>
  );
}

export default App;
