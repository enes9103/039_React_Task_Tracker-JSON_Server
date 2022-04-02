import { useState, useEffect } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const baseURL = "http://localhost:5000/tasks";
  const [showAddTask, setShowAddTask] = useState(false);

  //! CRUD = Create, Read, Update, Delete

  //! FETCH Tasks
  // const fetchTasks = async () => {
  //   const res = await fetch(baseURL);
  //   const data = await res.json();
  //   setTasks(data);
  // }

 //! FETCH Tasks with Axios
const fetchTasks = async () => {
  const {data} = await axios.get(baseURL);
  setTasks(data);
}
  useEffect(() => {
     fetchTasks();
  }, []);

  // DELETE TASK
  // const deleteTask = (deletedTaskId) => {
  //   // console.log("delete Task", deletedTaskId);
  //   setTasks(tasks.filter((task) => task.id !== deletedTaskId));
  // };

  //! DELETE TASK with Fetch
  // const deleteTask = async (deletedTaskId) => {
  //   await fetch(`${baseURL}/${deletedTaskId}`, {
  //     method: "DELETE",
  //   });
  //   setTasks(tasks.filter((task) => task.id !== deletedTaskId));
  // }
  
  //! DELETE TASK with Axios
  const deleteTask = async (deletedTaskId) => {
    await axios.delete(`${baseURL}/${deletedTaskId}`);
    setTasks(tasks.filter((task) => task.id !== deletedTaskId));
  }

  

  //! ADD TASK with Fetch
  // const addTask = async (newTask) => {
  //   const res = await fetch(baseURL, {
  //     method : "POST",
  //     headers : {
  //       "Content-Type" : "application/json"
  //     },
  //     body : JSON.stringify(newTask)
  // });
  //   fetchTasks();
  // }

  //! ADD TASK with Axios
  const addTask = async (newTask) => {
    await axios.post(baseURL, newTask);
    fetchTasks();
  }


  // const addTask = (newTask) => {
  //   const id = Math.floor(Math.random() * 1000 + 1);
  //   const addNewTask = { id, ...newTask };
  //   setTasks([...tasks, addNewTask]);
  // };

  //! TOGGLE DONE with fetch
  // const toggleDone = async(toggleDoneId) => {
  //   const res = await fetch(`${baseURL}/${toggleDoneId}`);
  //   const data = await res.json();
  //   const updateTask = {...data, isDone: !data.isDone};
  //   await fetch (`${baseURL}/${toggleDoneId}`, {
  //     method : "PUT",
  //     headers : {
  //       "Content-Type" : "application/json"
  //     },
  //     body : JSON.stringify(updateTask)
  //   });

  //   fetchTasks(); //?GET TASK
  // }

  //! TOGGLE DONE with Axios
  const toggleDone = async(toggleDoneId) => {
    const {data} = await axios.get(`${baseURL}/${toggleDoneId}`);
    const updateTask = {...data, isDone: !data.isDone};
    await axios.put(`${baseURL}/${toggleDoneId}`, updateTask);
    fetchTasks();
  }


  
  // const toggleDone = (toggleDoneId) => {
  //   // console.log("double click", toggleDoneId);
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === toggleDoneId ? { ...task, isDone: !task.isDone } : task
  //     )
  //   );
  // };

  // TOGGLESHOW
  const toggleShow = () => setShowAddTask(!showAddTask);

  return (
    <div className="container">
      <Header
        title="TASK TRACKER"
        showAddTask={showAddTask}
        toggleShow={toggleShow}
      />

      {showAddTask && <AddTask addTask={addTask} />}

      {tasks.length > 0 ? (
        <Tasks tasks={tasks} deleteTask={deleteTask} toggleDone={toggleDone} />
      ) : (
        <h2 style={{ textAlign: "center" }}>NO TASK TO SHOW</h2>
      )}
    </div>
  );
}

export default App;
