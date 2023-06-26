import { useState, useEffect } from "react";
import { Container, Text,Input,Button,Notification } from "@nextui-org/react";

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

  const addTodo = e => {
    e.preventDefault();
    if (!input) return;
    const newTodo = { id: Date.now(), text: input, done: false }; //object literal
    setTodos([...todos, newTodo]);
    setInput("");
    alert('added!!')
    console.log("New Todo:", newTodo);
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
    localStorage.clear(); // Clear local storage when deleting a todo
  };

  const toggleTodo = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      })
    );
  };

  // const markTodo = (id) => {
  //   setTodos(
  //     todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
  //   );
  // };

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <Container css={{ p: "2rem", background: "$pink100", h:"100vh", mt:"2rem", w:"70%" }}>
      <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="bold"
      >
        Todo App
      </Text>
      <form onSubmit={addTodo}>
        <Input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new todo"
        />
        <Button
          type="submit"
          gradient
          auto
          css={{
            borderRadius: "$xs",
            boxShadow: "$sm",
          }}
        >
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`todo-item ${todo.done ? "done" : ""}`}
            css={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              animation: "fade-slide 0.3s ease-in",
              "@keyframes fade-slide": {
                "0%": {
                  opacity: 0,
                  transform: "translateX(-10px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              },
            }}
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <Input
              type="text"
              value={todo.text}
              onChange={e => updateTodo(todo.id, e.target.value)}
            />
            <Button
              className="delete"
              auto
              ghost
              onClick={() => deleteTodo(todo.id)}
              css={{
                opacity: 0.7,
                p:"2px",
                transition: "opacity 0.3s ease-in-out",
                "&:hover": {
                  opacity: 1,
                  
                },
              }}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default TodoApp;