import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function App() {

  // todolist 관리
  const [todos, setTodos] = useState({});

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

  // todo 삭제하기
  const { id } = useParams();

  function DeleteTodo(){

    console.log(id);

    axios.delete(`http://localhost:3001/todolist/${id}`)
    .then((Response) => {
      console.log(Response.data);
    })
    .catch((Error) => {
      console.log(Error);
    })

    // window.location.reload();
  }

  return (

    <div className='TodoApp'>

      <div className='title'>Todo List</div>

      <div className='inputline'><input onChange={InputValue}></input> <button onClick={AddTodo}>추가</button></div>

      <ul className='list'>
        {todos && todos.length > 0 ?
          todos.map((el) => {
            return (
              <li key={el.id}> {el.body} <button className='btn'>완료</button> <button className='btn' onClick={DeleteTodo}>삭제</button> </li>
            )
          }) : <li></li>}
      </ul>

    </div>

  )

}
export default App;
