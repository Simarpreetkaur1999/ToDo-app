import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

function App() {
  const [Todo, setTodo] = useState("");
  const [showFinished, setshowFinished] = useState(true);
  const [Todos, setTodos] = useState([]);

  const SaveToLocalStorage = (params) => {
    localStorage.setItem("Todos", JSON.stringify(Todos));
  };

  useEffect(() => {
    let TodoString = localStorage.getItem("Todos");
    if (TodoString) {
      let Todos = JSON.parse(localStorage.getItem("Todos"));
      setTodos(Todos);
    }
  }, []);

  const handleEdit = (e, id) => {
    let t = Todos.filter((i) => i.id === id);
    setTodo(t[0].Todo);
    let newTodos = Todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    SaveToLocalStorage();
  };

  const handleDelete = (e, id) => {
    // let id=e.target.name;
    let newTodos = Todos.filter((item) => {
      return item.id !== id;
    });
    // newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos);
    SaveToLocalStorage();

    // confirm("do you want to delete it?");
  };

  const handleAdd = () => {
    setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }]);
    setTodo("");
    SaveToLocalStorage();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    SaveToLocalStorage();
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <div className=" bg-[url('https://cdn.wildrocket.io/media/JWKzdonTttBD2UGQ0R28nLSLX4I0pYdADrV1FnU6.png')] bg-cover bg-no-repeat w-[100vw] h-[100vh]">
        <Navbar />
        <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5  md:w-1/2 ring-1  ring-offset-2  hover:shadow-2xl shadow-black   ">
          <h1 className="font-bold text-center text-xl italic">
            i-Task - Manage your todos at one place
          </h1>
          <div className="addtTodo my-5 flex flex-col gap-4 ">
            <h2 className="text-lg font-bold">Add a TODO</h2>
            <input
              onChange={handleChange}
              value={Todo}
              type="text"

              className="w-full rounded-full px-5 py-1 outline-none "
            />
            <button
              onClick={handleAdd}
              disabled={Todo.length <= 3}
              className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-500 p-2 py-1 text-sm font-bold text-white rounded-md"
            >
              Save
            </button>
          </div>
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            className="cursor-pointer my-4 "
          />
          Show Finished
          <h2 className="text-lg font-bold">Your Todo</h2>
          <div className="todos">
            {Todos.length === 0 && (
              <div className="m-5 text-xl">No todos to display</div>
            )}
            {Todos.map((item) => {
              return (
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="todo flex w-1/2 md:w-1/2 justify-between my-3"
                  >
                    <div className="flex gap-5">
                      <input
                        className="cursor-pointer"
                        name={item.id}
                        onChange={handleCheckBox}
                        type="checkbox"
                        checked={item.isCompleted}
                        id=""
                      />
                      <div className="flex flex-col">
                        <div className={item.isCompleted ? "line-through" : ""}>
                          {item.Todo}
                        </div>
                      </div>
                    </div>
                    <div className="button flex h-full ">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="bg-violet-700 hover:bg-sky-900 p-2 py-1 text-white text-sm hover:font-bold rounded-md mx-1"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className="bg-violet-700 hover:bg-sky-900 p-2 py-1 text-white text-sm hover:font-bold rounded-md mx-1"
                      >
                       <MdOutlineDelete />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
