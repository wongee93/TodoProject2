import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {

  // todolist 관리
  const [todos, setTodos] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/todolist/')
      .then((Response) => {
        setTodos(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      })
  }, [])

  // console.log(todos)

  // Inputvalue 관리
  const [inputvalue, SetInputvalue] = useState("");

  function InputValue(e){
    SetInputvalue(e.target.value);
  }

  // todo 추가하기
  function AddTodo(){
    axios.post('http://localhost:3001/todolist/', {
      id : todos.length+1,
      body : inputvalue,
      checked : false
    })
    .then((Response) => {
      setTodos(...Response.data,Response.data);
    })
    .catch((Error) => {
      console.log(Error);
    })

    window.location.reload();
    SetInputvalue("");
  }

  const DeleteTodo = (id) => {
    
    fetch(`http://localhost:3001/todolist/${id}`, {
      method: "DELETE"
    })
    
    window.location.reload();
  }

  return (

    <div className='TodoApp'>

      <div className='title'>Todo List</div>

      <div className='inputline'><input onChange={InputValue}></input> <button className='addbtn' onClick={AddTodo}>Add</button></div>

      <ul className='list'>
        {todos && todos.length > 0 ?
          todos.map((el) => {
            return (
              <li key={el.id}> <button className='checkbtn'>Check</button> {el.body} <button className='delbtn' onClick={() => DeleteTodo(el.id)}>Del</button> </li>
            )
          }) : <li></li>}
      </ul>

    </div>

  )

}
export default App;
