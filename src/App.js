import React, { useState } from "react";
import "./App.css";
import TodoList from "./Components/TodoList";
import { v4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [newValue, setNewValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [dummyTodoList, setDummyTodoList] = useState([]);
  const [toComplete, setToComplete] = useState([]);
  const [toDelete, setToDelete] = useState([]);

  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [countTodo, setCountTodo] = useState(0);
  const [newInput, setInputValue] = useState("");
  const onChangehandler = (event) => {
    setTodo(event.target.value);
  };

  const addNewTodo = () => {
    setTodoList([
      ...todoList,
      { todo: todo, key: v4(), stripe: false, hovering: false, toEdit: false },
    ]);
    setTodo("");
    setCountTodo(countTodo + 1);
    countTodo >= 0 ? setOpen(true) : setOpen(false);
  };

  // const updateTodo = (e) => {
  //   setTodo(e.atrget.value);
  //   setTodoList([...todoList, { todo: todo, key: v4 }]);
  // };

  const deleteTodos = (key) => {
    let delTodo = todoList.filter((item) => {
      return item.key !== key;
    });
    setTodoList(delTodo);

    if (countTodo >= 0) {
      setCountTodo(countTodo - 1);
      setOpen(false);
    } else {
      setCountTodo(countTodo);
    }
  };

  const deleteAllTodo = () => {
    setTodoList([]);
    setCountTodo(0);
    setOpen(false);
  };

  // const checkboxToggle = (id) => {
  //   const newList = todoList.map((todo) => {
  //     if (todo.id === id) {
  //       return { ...todo, stripe: !todo.stripe };
  //     }
  //     return todo;
  //   });
  //   console.log(newList);
  //   setTodoList(newList);
  // };

  // const displayTogglerOn = (key) => {
  //   setTodoList(
  //     todoList.map((item) => {
  //       if (item.id === key) {
  //         return { ...item, hovering: !item.hovering };
  //       }

  //       return item;
  //     })
  //   );
  // };

  // const displayTogglerOff = (key) => {
  //   setTodoList(
  //     todoList.map((item) => {
  //       if (item.id === key) {
  //         return { ...item, hovering: !item.hovering };
  //       }
  //       return item;
  //     })
  //   );
  // };

  const checkStripe = (key) => {
    countTodo > 0 ? setCountTodo(countTodo - 1) : setCountTodo(countTodo);
    setCheck(!check);

    setTodoList(
      todoList.map((item) => {
        if (item.key === key) {
          setToDelete((prevCount) => [...prevCount, item]);
          console.log("To Delete:", toDelete);
          return { ...item, stripe: !item.stripe };
        } else {
          setToComplete((prevCount) => [...prevCount, item]);
          console.log("To Complete:", toComplete);
        }

        return item;
      })
    );
  };
  // console.log(dummyList.map((item) => item.stripe));

  // const handleEdit = (key) => {
  //   const newTodo = todoList.find((item) => item.id === key);

  //   setNewValue(newTodo.todo);
  //   setTodoList(
  //     todoList.map((item) => {
  //       if (item.key === key) {
  //         return { ...item, todo: newValue };
  //       }
  //       return item;
  //     })
  //   );
  // };

  const handleAllTodos = () => {
    setTodoList(dummyTodoList);
  };

  const handleCompletedTodos = () => {
    setTodoList(toDelete);
  };

  const handleActiveTodos = () => {
    setTodoList(toComplete);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewTodo();
  };

  // console.log("todo type:", typeof todo);
  return (
    <div className="cnt">
      <div>
        {/* <button onClick={deleteAllTodo}>clear all</button> */}
        <form onSubmit={handleSubmit} className="form">
          <label
            htmlFor="input"
            className="input-label"
            onClick={deleteAllTodo}
            style={{ display: open ? "flex" : "none" }}
          >
            clearAll
          </label>
          <input
            type="text"
            id="input"
            value={todo}
            onChange={onChangehandler}
            className=""
          />
        </form>
      </div>
      <TodoList
        newTodos={todoList}
        deleteTodos={deleteTodos}
        checkStripe={checkStripe}
        countTodo={countTodo}
        handleCompletedTodos={handleCompletedTodos}
        handleActiveTodos={handleActiveTodos}
        handleAllTodos={handleAllTodos}
        // handleedit={handleEdit}
        open={open}
      />
    </div>
  );
}

export default App;
