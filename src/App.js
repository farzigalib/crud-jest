import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [allItem, setAllItem] = useState([
    {
      id: "cc8a6b78-5c57-47cf-b84b-c1b113b09a3b",
      task: "Hello",
    },
    {
      id: "8e3e8cf4-2994-48e8-bb7a-03cc2f803e54",
      task: "Task",
    },
  ]);
  const [task, setTask] = useState("");
  const [uuid, setUuid] = useState("");
  const [edit, setEdit] = useState(false);

  // const getItems = localStorage.getItem("tasks");
  // useEffect(() => {
  //   if (getItems === null) {
  //     setAllItem([]);
  //   } else {
  //     setAllItem(JSON.parse(getItems));
  //   }
  // }, []);

  const handleDelete = (id) => {
    const deleteTask = allItem.filter((task) => task.id !== id);
    setAllItem(deleteTask);
    localStorage.setItem("tasks", JSON.stringify(deleteTask));
  };

  const handleEdit = (item) => {
    setTask(item?.task);
    setUuid(item?.id);
    setEdit(true);
  };

  const handleUpdate = () => {
    let data = JSON.parse(localStorage.getItem("tasks"));
    const myData = data.map((x) => {
      if (x.id === uuid) {
        return {
          ...x,
          task: task,
          id: uuidv4(),
        };
      }
      return x;
    });
    localStorage.setItem("tasks", JSON.stringify(myData));
    setEdit(false);
    window.location.reload();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateTask) {
      if (uuid) {
        handleUpdate();
      } else {
        const id = uuidv4();
        const newTask = { id: id, task: task };
        setAllItem([...allItem, newTask]);
        localStorage.setItem("tasks", JSON.stringify([...allItem, newTask]));
        setTask("");
      }
    } else {
      alert("Please enter task...");
    }
  };

  return (
    <>
      <header className="w-full bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] font-inter font-medium">
        CURD App
      </header>
      <main className="px-8 py-4">
        <form onSubmit={onSubmit}>
          <div className="w-6/12 m-auto">
            <label
              for="task"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Your Task
            </label>
            <div className="my-2">
              <input
                id="task"
                name="task"
                type="text"
                placeholder="Add a Task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {!edit ? (
              <button
                type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            ) : (
              <button
                type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            )}
          </div>
        </form>

        {allItem?.length > 0 && (
          <table class="w-6/12 m-auto mt-5 text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Sr. No.
                </th>
                <th scope="col" class="px-6 py-3">
                  Task
                </th>
                <th scope="col" class="px-6 py-3">
                  Delete
                </th>
                <th scope="col" class="px-6 py-3">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {allItem?.map((item, idx) => (
                <tr
                  key={idx}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {idx + 1}
                  </th>
                  <td class="px-6 py-4">{item?.task}</td>
                  <td
                    class="px-6 py-4 cursor-pointer"
                    onClick={() => handleDelete(item?.id)}
                  >
                    ❌
                  </td>
                  <td
                    class="px-6 py-4 cursor-pointer"
                    onClick={() => handleEdit(item)}
                    data-testid={`edit-task-${item?.id}`}
                  >
                    ✏️
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}

export const validateTask = (task) => {
  if (task) {
    return true;
  }
  return false;
};

export default App;
