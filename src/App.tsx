import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "./store/apiSlice";

interface itemsType {
  id: string;
  value: string;
  completed: boolean;
}
function App() {
  const [newTask, setNewTask] = useState("");
  const { data: items, isError, isLoading, error } = useGetTasksQuery("");

  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const handleSumbit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const task = {
      value: newTask,
      completed: false,
    };
    addTask(task);
    setNewTask("");
  };

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </form>

      {isLoading ? (
        <p>Loading ...</p>
      ) : isError ? (
        <p> {isError ?? "Something went wrong"}</p>
      ) : (
        items.length > 0 &&
        items.map((res: itemsType) => (
          <div
            key={res.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <input
              className="hidden"
              type="checkbox"
              id={res.id}
              checked={res.completed}
              onChange={() => {
                const task = {
                  id: res.id,
                  completed: !res.completed,
                };
                updateTask(task);
              }}
            />
            <h6 style={{ textDecoration: res.completed ? "line-through" : "" }}>
              {res.value}
            </h6>
            <button onClick={() => deleteTask(res.id)}>remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
