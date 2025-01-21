import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  //Executa a função sempre que algum valor do array for alterado
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //Com lista vazia sendo passada como segundo parâmetro, só é executada uma vez (na primeira vez que o usuário entrar na aplicação)
  // useEffect(() => {
  //   async function fetchTasks() {
  //     //Chamar API
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10",
  //       {
  //         method: "GET",
  //       }
  //     );

  //     //Pegar dados que retorna
  //     const data = await response.json();

  //     //Persistir dados no State
  //     setTasks(data);
  //   }

  //   //Chamar API para puxar tarefas de algum lugar
  //   fetchTasks();
  // }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        //Preciso atualizar essa tarefa
        return { ...task, isCompleted: !task.isCompleted };
      }
      //Não preciso atualziar
      return task;
    });
    setTasks(newTasks);
  }

  function deleteTask(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function addTask(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>TO-DO LIST</Title>
        <AddTask addTask={addTask} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
