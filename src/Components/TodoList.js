import React, { useState } from "react";

const TodoList = ({
  newTodos,
  deleteTodos,
  checkStripe,
  countTodo,
  handleActiveTodos,
  handleCompletedTodos,
  open,
  newInput,
}) => {
  return (
    <div className="todo-list">
      {newTodos.map((item) => {
        return (
          <>
            <div key={item.key} className="todos">
              <div>
                <input type="checkbox" onClick={() => checkStripe(item.key)} />
              </div>
              <div>
                <p
                  style={{
                    textDecoration: item.stripe ? "line-through" : "",
                    width: "15rem",
                  }}
                  onDoubleClick={() => newInput(item.id)}
                  className="todo"
                >
                  {item.todo}
                </p>
              </div>
              <div>
                <button
                  style={{
                    padding: "5px",
                    borderRadius: "50%",
                    outline: "none",
                    border: "none",
                  }}
                  onClick={() => deleteTodos(item.key)}
                >
                  X
                </button>
              </div>
            </div>
          </>
        );
      })}
      {open && (
        <div>
          <p>{countTodo}</p>
          <button>All</button>
          <button onClick={handleActiveTodos}>Active</button>
          <button onClick={handleCompletedTodos}>Completed</button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
