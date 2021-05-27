import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './Hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

 const {isLoading, error, fetchData:fetchTasks} = useHttp()

  useEffect(() => {
    const fetchHttpData = (dataObj)=>{
      const loadedTasks = [];
  
      for (const taskKey in dataObj) {
        loadedTasks.push({ id: taskKey, text: dataObj[taskKey].text });
      }
  
      setTasks(loadedTasks);
    }
    fetchTasks({url:'https://react-learning-ad3fc-default-rtdb.firebaseio.com//tasks.json'},fetchHttpData);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
