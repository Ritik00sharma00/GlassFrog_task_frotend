"use client";
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Taskfield from '@/components/FormComponents/Taskfield';
import { UserContext } from '@/components/HelperComponenet/UserContext';
import axios from 'axios';


export const Taskform= ({task_id,tasktitle,taskdescription,taskdueDate,taskstatus,onTaskUpdate}) => {
    const [isFocused, setIsFocused] = useState(false);
  const [editBtnSubmit, setEditBtnSubmit] = useState(false);
  
  const { token,userId} = useContext(UserContext);
  



  const onEditClick = () => {
    setEditBtnSubmit(!editBtnSubmit);}
    
  
    const onSubmit = async (data) => {
      setEditBtnSubmit(false);
    
       
       const { title, description, dueDate, status } = data;
      
       const userId=localStorage.getItem('userId');
       
       const payload = { title, description, dueDate, status };
       
      const id=task_id;
    
     
      try {
        await axios.put(`https://glassfrog-db.onrender.com/api/tasks/${id}/${userId}`, payload);
        console.log("Task updated");
      } catch (error) {
        console.log("Error updating task:", error);
      }
    };

    const deletetask=async ()=>{
      
       
      
      const userId=localStorage.getItem('userId');
      
      
     const id=task_id;
   
    
     try {
       await axios.delete(`https://glassfrog-db.onrender.com/api/tasks/${id}/${userId}`);
       console.log("Task deleted");
     } catch (error) {
       console.log("Error updating task:", error);
     }
    }
  
    const { handleSubmit, control, formState: { errors } } = useForm();
  return (
    <div>
      <form
        key={task_id}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white ml-2 md:p-10 p-5 flex flex-col gap-[4px]"
      >
        <Controller
          name="title"
          control={control}
          defaultValue={tasktitle}
          rules={{ required: 'Title is required' }}
          render={({ field }) => (
            <Taskfield
              type='text'
              {...field}
              disabled={!editBtnSubmit}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue={taskdescription}
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <Taskfield
              type='text'
              {...field}
              disabled={!editBtnSubmit}
            />
          )}
        />

        <Controller
          name="dueDate"
          control={control}
          defaultValue={taskdueDate.split('T')[0]}
          rules={{ required: 'Date is required' }}
          render={({ field }) => (
            <Taskfield
              type={editBtnSubmit ? 'date' : 'text'}
              {...field}
              disabled={!editBtnSubmit}
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          defaultValue={taskstatus}
          rules={{ required: 'Status is required' }}
          render={({ field }) => (
            <select
              {...field}
              className='text-black px-4'
              disabled={!editBtnSubmit}
            >
              <option value="pending">Pending</option>
              <option value="submit">Submit</option>
            </select>
          )}
        />

        <button
          type="button"
          onClick={onEditClick}
          className="bg-[#756fe4] md:text-[16px] text-[10px] text-white py-1 md:px-4 px-2 rounded"
        >
          {editBtnSubmit ? 'Cancel' : 'Edit'}
        </button>

        {editBtnSubmit && (
          <button
            type="submit"
            className="bg-[#756fe4] md:text-[16px] text-[10px] text-white py-1 md:px-2 px-0 rounded"
          >
            Submit
          </button>
        )}

        <button
          type="button" onClick={deletetask()}
          className="bg-[#756fe4] md:text-[16px] text-[10px] text-white py-1 md:px-4 px-2 rounded"
        >
          Delete
        </button>
      </form>
    </div>
  
    
  )
}
const Task = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      //  const userId = localStorage.getItem('userId');
       
       const userid=localStorage.getItem('userId');
      
      const response = await axios.get(`https://glassfrog-db.onrender.com/api/tasks/${userid}`
       );
      console.log(response.data.tasks[0].tasks);
      setTasks(response.data.tasks[0].tasks);
    } catch (error) {
      console.log('Error fetching tasks:', error);
    }
  };
  
  useEffect(() => {
   
    fetchTasks();
  },[]);

  const handleTaskUpdate = () => {
    fetchTasks(); 
  };


  return (
    <div className='w-[40%] mx-auto flex flex-col gap-[4px]'>
      {tasks.map((task,i) => (
        <Taskform task_id={task._id} onTaskUpdate={handleTaskUpdate} tasktitle={task.title} taskdescription={task.description} taskstatus={task.status} taskdueDate={task.dueDate}/>
        
      ))}
    </div>
  );
};

export default Task;




