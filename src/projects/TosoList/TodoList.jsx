import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CheckCircle, Delete } from "@mui/icons-material"; 
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState([]);
  const [dateTime, setDateTime] = useState('');
  const [alert, setAlert] = useState({ open: false, message: "", severity: "error" });

  const handleInput = (value)=>{
    setInputValue(value)
  }

  const handleSubmit = (event)=>{
    event.preventDefault(); 

    if(!inputValue){
      setAlert({ open: true, message: "Empty value not allowed!", severity: "error" });
      return;
    };

    if(task.includes(inputValue)){
      setAlert({ open: true, message: "This item already exists!", severity: "warning" });
      setInputValue("");
      return;
    } 
    setTask((pervTask)=>[...pervTask, inputValue]);
    setInputValue(""); 
    setAlert({ open: true, message: "Item added successfully!", severity: "success" });
  }

  // Date and Time
  
  useEffect(()=>{
    setInterval(()=>{
      const now = new Date();
     const formatteDate = now.toLocaleDateString();
     const formatteTime = now.toLocaleTimeString();
    
     setDateTime(`${formatteDate} - ${formatteTime}`)

    return () => clearInterval(); 
     },1000)
  },[])

 // delete handleing
 const handleDelete = (index)=>{
  const newTask = [...task];
  newTask.splice(index, 1);
  setTask(newTask);
  setAlert({ open: true, message: "Item deleted!", severity: "info" });
 }

 // Clean All
  const handleCleanAll = ()=>{
    setTask([]);
    setAlert({ open: true, message: "All items deleted!", severity: "error" });
  }


  return (
    <section className='flex flex-col justify-center items-center gap-8'>
      <header>
        <h1 className='text-6xl'>Todo List</h1>
        <h2  className='text-3xl mt-2'>{dateTime}</h2>
      </header>

<form onSubmit={handleSubmit}>
   {/* Input and Button in One Line */}
   <div className="flex items-center gap-4">
   <Box sx={{ width: 500, maxWidth: '100%'}}>
          <TextField 
            fullWidth 
            label="Enter Product Name" 
            id="fullWidth" 
            autoComplete='off'
            value={inputValue}
            onChange={(ev) => handleInput(ev.target.value)}
          />
        </Box>

        <Button variant="contained" 
        color="success"
         className='h-full' 
         type="submit" 
          sx={{ height: 46, width:150, fontSize: 13}}>Add Items</Button>
      </div>

      {/* Styled Task List */}
      <ul className="mt-4 w-[500px] max-w-full  border-gray-400 bg-blue-400 text-black rounded-lg shadow-md">
          {task.map((item, index) => (
            <li
              key={index}
              className="text-2xl p-3 w-full flex justify-between items-center border-2 border-green-300 rounded-lg bg-gray-100 hover:bg-gray-300 text-yellow-900"
            >
              {item}
              <div className="flex gap-2">
                
                <CheckCircle className="text-green-500 cursor-pointer hover:text-green-700 " />
                
                <Delete
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(index)}
                />
              </div>
            </li>
          ))}
        </ul>

       <dev className="flex justify-center items-center  mt-10">
       <Button
              variant="contained"
              color="error"
              className="mt-4"
              onClick={handleCleanAll}
              sx={{ height: 46, width: 200, fontSize: 13 }}
              startIcon={<Delete />} 
            >
              Clean All
            </Button>
       </dev>
</form>

<Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>

    </section>
  );
}
