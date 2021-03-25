import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isDisplayForm, setIsDisplayForm] = useState(false);
  const [editting, setEditting] = useState([]);

  const onSubmit = (data) => {
    fetch('http://localhost:3000/tasks/' + (data.id ? data.id : ''), {
      method: data.id ? 'PUT' : 'POST',
      body: JSON.stringify({ name: data.name, status: data.status }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(response => response.json())
      .then(response => {
        if (data.id) {
          let index = tasks.findIndex(task => task.id === data.id);
          tasks[index] = response;
          setTasks(tasks => [...tasks]);
        } else {
          setTasks(tasks => [...tasks, response]);
        }
      })
  }

  const onToggleForm = () => {
    setIsDisplayForm(true);
    setEditting(null);
  }

  const onShowForm = () => {
    setIsDisplayForm(true);
  }

  const onCloseForm = () => {
    setIsDisplayForm(false);
    setEditting(null);
  }

  const onUpdateStatus = (id) => {
    const index = tasks.findIndex(task => task.id === id);
    const varStatus = {
      id: id,
      name: tasks[index].name,
      status: !tasks[index].status
    }
    fetch('http://localhost:3000/tasks/' + id, {
      method: 'PUT',
      body: JSON.stringify(varStatus),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(response => response.json())
      .then(response => {
        tasks[index] = response;
        setTasks(tasks => [...tasks]);
      })
  }

  const onUpdateContent = (id) => {
    const index = tasks.findIndex(task => task.id === id);
    setEditting(tasks[index]);
    onShowForm();
  }

  const onDelete = (id) => {
    const index = tasks.findIndex(task => task.id === id);
    onCloseForm();
    fetch("http://localhost:3000/tasks/" + id, {
      method: "delete",
    })
      .then(response => response.json())
      .finally(() => {
        tasks.splice(index, 1);
        setTasks(tasks => [...tasks]);
      })
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks");
      const tasks = await response.json();
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  let elmForm = isDisplayForm ?
    <TaskForm
      closeForm={onCloseForm}
      submitData={onSubmit}
      editForm={editting}
    /> : "";

  return (
    <div className="container">
      <div className="row">
        <div className="text-center">
          <h1 className="fw-bold cl-blue">TODO APP BY NOTHING</h1>
        </div>
        {/* TaskForm */}
        {elmForm}
        <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onToggleForm}
          >Add Job</button>
          {/* TaskList */}
          <TaskList
            exData={tasks}
            updateStatus={onUpdateStatus}
            onDeleteContent={onDelete}
            updateContent={onUpdateContent}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
