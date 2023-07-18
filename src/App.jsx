import { useEffect, useState } from "react";
import "./styles.css";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

export default function App() {
  
  const [toDos, setToDos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if(localValue == null) return []
    return JSON.parse(localValue)
  });

  useEffect(()=>{
    localStorage.setItem("ITEMS", JSON.stringify(toDos))
  }, [toDos])

  function addTodo(title) { 
    setToDos((currentToDos) => {
      return [
        ...currentToDos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed){
    setToDos(currentToDos => {
      return currentToDos.map(todo => {
        if(todo.id === id){
          return {...todo, completed}
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setToDos(currentToDos => {
      return currentToDos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Safety Checklist</h1>
      <TodoList toDos={toDos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} /> 
    </>
  );
}
