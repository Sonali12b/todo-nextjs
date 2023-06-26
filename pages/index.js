import { useState, useEffect } from "react";
import {AiFillDelete,AiOutlineFileAdd} from "react-icons/ai";
import {GrAddCircle} from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container, Text, Input, Button, Card, Spacer, Checkbox } from "@nextui-org/react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input) return;
    const newTodo = { id: Date.now(), text: input, done: false };
    setTodos([...todos, newTodo]);
    setInput("");
    toast.success('Added!');
    console.log("New Todo:", newTodo);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.error('deleted!');
    localStorage.clear(); // Clear local storage when deleting a todo
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      })
    );
  };

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <>
      <ToastContainer />
      <Container >
        <Text h3 css={{ textGradient: "45deg, #080F61 0%, #FF1A16 100%" }} weight="bold">
          Todo App
        </Text>
      </Container>
      <Container>
        <Card css={{ p: "2rem", background:"#99DBF5" }}>
          <form onSubmit={addTodo}>
            <Input
              underlined
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new todo"
            /><GrAddCircle css={{}} onClick={addTodo}/>
          </form>
        </Card>
        <Container css={{ p: "1rem", background: "#9AC5F4", mt:"2rem", borderRadius:"1rem"}}>
          {todos.length === 0 ? (
            <Text h3 css={{ textGradient: "45deg, #080F61 0%, #FF1A16 100%" }}>No tasks pending</Text>
          ) : (
            <ul>
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`todo-item ${todo.done ? "done" : ""}`}
                  css={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    w:"100%"
                  }}
                >
                  <Checkbox
                    size="xs"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  ></Checkbox>
                  <Input
                    underlined
                    type="text"
                    value={todo.text}
                    onChange={(e) => updateTodo(todo.id, e.target.value)}
                  /><AiFillDelete onClick={() => deleteTodo(todo.id)}/>
                </li>
              ))}
              <Spacer y={1.5} />
            </ul>
          )}
        </Container>
      </Container>
    </>
  );
};

export default TodoApp;
