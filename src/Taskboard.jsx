import React, { useState, useEffect } from 'react';
import { db } from './firebase';  // Firebase configuration for Firestore
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './Taskboard.css';  // Make sure the CSS file is imported
import Header from './Header';

const Taskboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [taskStatus, setTaskStatus] = useState('To Do');
  const [assignedBy, setAssignedBy] = useState('');
  const [editingTask, setEditingTask] = useState(null);  // State to track the task being edited

  // Fetch tasks from Firestore when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksSnapshot = await getDocs(collection(db, 'tasks'));
      const tasksList = tasksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksList);
      console.log('Fetched tasks:', tasksList);  // Log fetched tasks for debugging
    };

    fetchTasks();
  }, []);  // Empty array means this effect runs only once when the component mounts

  // Handle task deletion
  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
    setTasks(tasks.filter(task => task.id !== id));  // Remove task from state
  };

  // Handle task editing
  const handleEditTask = (task) => {
    // Set the task being edited
    setEditingTask(task);
    setTaskText(task.text);
    setTaskStatus(task.status);
    setAssignedBy(task.assignedBy);
  };

  // Update task in Firestore
  const handleUpdateTask = async () => {
    if (taskText.trim() && assignedBy.trim()) {
      const taskRef = doc(db, 'tasks', editingTask.id);
      await updateDoc(taskRef, {
        text: taskText,
        status: taskStatus,
        assignedBy: assignedBy,
      });

      setTasks(tasks.map(task => (task.id === editingTask.id ? { ...task, text: taskText, status: taskStatus, assignedBy: assignedBy } : task)));
      
      setEditingTask(null);
      setTaskText('');
      setTaskStatus('To Do');
      setAssignedBy('');
    }
  };

  const handleAddTask = async () => {
    if (taskText.trim() && assignedBy.trim()) {
      await addDoc(collection(db, 'tasks'), {
        text: taskText,
        status: taskStatus,
        assignedBy: assignedBy,
      });

      setTaskText('');
      setTaskStatus('To Do');
      setAssignedBy('');

      const tasksSnapshot = await getDocs(collection(db, 'tasks'));
      const tasksList = tasksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksList);
    }
  };

  return (
    <div>
        <Header/>
      <h2>Task Board</h2>

      <div className="taskCont">
        <h1>{editingTask ? 'Edit Task' : 'Add New Task'}</h1>
        <div className="add-task">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter new task"
          /><br/>

          <select 
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select><br/>

          <input
            type="text"
            value={assignedBy}
            onChange={(e) => setAssignedBy(e.target.value)}
            placeholder="Assigned By"
          /><br/>

          <button onClick={editingTask ? handleUpdateTask : handleAddTask}>
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </div>

      <div className="task-columns">
        <div className="task-column">
          <h3>To Do</h3>
          {tasks
            .filter((task) => task.status === 'To Do')
            .map((task) => (
              <div key={task.id} className="task-card">
                <p>{task.text}</p>
                <p><strong>Assigned By:</strong> {task.assignedBy}</p>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                <button onClick={() => handleEditTask(task)}>Edit</button>
              </div>
            ))}
        </div>

        <div className="task-column">
          <h3>In Progress</h3>
          {tasks
            .filter((task) => task.status === 'In Progress')
            .map((task) => (
              <div key={task.id} className="task-card">
                <p>{task.text}</p>
                <p><strong>Assigned By:</strong> {task.assignedBy}</p>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                <button onClick={() => handleEditTask(task)}>Edit</button>
              </div>
            ))}
        </div>

        <div className="task-column">
          <h3>Done</h3>
          {tasks
            .filter((task) => task.status === 'Done')
            .map((task) => (
              <div key={task.id} className="task-card">
                <p>{task.text}</p>
                <p><strong>Assigned By:</strong> {task.assignedBy}</p>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                <button onClick={() => handleEditTask(task)}>Edit</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Taskboard;