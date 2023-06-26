import { useState, useEffect } from "react";
import { Container, Text,Input,Button,Card,Spacer, Checkbox } from "@nextui-org/react";

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

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <Container css={{ p: "2rem", background: "$pink100", minHeight:"100vh", w:"70%" }}>
      <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, #080F61 0%, #FF1A16 100%",
        }}
        weight="bold"
      >
        Todo App
      </Text>
      <Card css={{p:"2rem"}}>
      <form onSubmit={addTodo} >
        <Input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new todo"
        />
        <Spacer y={0.5} />
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
      </Card>
      <Container css={{p:"2rem" }}>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`todo-item ${todo.done ? "done" : ""}`}
            css={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {/* <Input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            /> */}
            <Checkbox defaultSelected size="xs" checked={todo.done}
            onChange={() => toggleTodo(todo.id)}>
            
          </Checkbox>
          {/* <Spacer /> */}
            <Input
              underlined
              type="text"
              value={todo.text}
              onChange={e => updateTodo(todo.id, e.target.value)}
            />
            <Button
              className="delete"
              auto
              // color="error"
              ghost
              onClick={() => deleteTodo(todo.id)}
              css={{
                opacity: 0.7,
                p:"2px",
                color:"red",
                border:"none"
              }}
            >
              Delete
            </Button>
          </li>
        ))}
          <Spacer y={1.5} />
      </ul>
      </Container>
    </Container>
  );
};

export default TodoApp;