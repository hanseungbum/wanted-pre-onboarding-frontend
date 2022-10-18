import React, {useState,useEffect} from "react";

function Todo() {
    const [tokenid,setTokenid] = useState(localStorage.getItem('tokenid'));
    const [todo,setTodo] = useState("");
    const [todolist, setTodoList] = useState([]);
    const [data, setData] = useState([]);
    useEffect(()=>{
        var requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + tokenid,
            }
         };
        fetch('https://pre-onboarding-selection-task.shop/todos', requestOptions)
            .then(response => {
              if(response.status ==200)
                return response.json();
            }).then(json =>{
                if(json != undefined){
                    setTodoList(json);
                }});
  },[todo])
  
  const handleCreateTodo =(e) => {
    var requestOptions = {
        method: 'POST',
        headers: {
           'Authorization': "Bearer " + tokenid,
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            todo : todo.toString()
        }),
        
     };

     fetch('https://pre-onboarding-selection-task.shop/todos', requestOptions)
     .then(response =>{
        if(response.status ==201){
            return response.json();
        }
        if(response.status ==401){
        }
        }).then(json =>{
            setTodoList([...todolist,json]);
        });
  }
  const onEdit = (e)=>{
    setTodoList(
        todolist.map(a=>
            (a.id === parseInt(e.target.id)) ? {...a, todo: e.target.value} : a
        )
    );

  }
  const onEdititem = (e) =>{
    var btn = e.target.parentElement.parentElement.children[4].children[0];
    if(btn.innerText == '수정'){
        e.target.parentElement.parentElement.children[1].children[0].disabled = false;
        e.target.parentElement.parentElement.children[3].children[0].disabled = false;
        e.target.parentElement.parentElement.children[4].children[0].innerText = '제출';
        e.target.parentElement.parentElement.children[5].children[0].innerText = '취소';
    }
    else{//제출
        e.target.parentElement.parentElement.children[1].children[0].disabled = true;
        e.target.parentElement.parentElement.children[3].children[0].disabled = true;
        e.target.parentElement.parentElement.children[4].children[0].innerText = '수정';
        e.target.parentElement.parentElement.children[5].children[0].innerText = '삭제';

        var requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': "Bearer " + tokenid,
                           'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                todo: e.target.parentElement.parentElement.children[1].children[0].value,
                isCompleted : e.target.parentElement.parentElement.children[3].children[0].checked
             }),
         };
        fetch('https://pre-onboarding-selection-task.shop/todos/'+e.target.id, requestOptions)
            .then(response => {
              if(response.status ==204)
              setTodoList(todolist.filter(a=>a.id != parseInt(e.target.id)));
            })

    }
    
  }
  const onChangeClick =(e) =>{
    setTodoList(
        todolist.map(a=>
            (a.id === parseInt(e.target.id)) ? {...a, isCompleted: e.target.checked} : a
    ))
  }

  const onDelitem = (e) =>{
    var btn = e.target.parentElement.parentElement.children[5].children[0];
    if(btn.innerText == '삭제'){
        var requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': "Bearer " + tokenid,
            }
         };
        fetch('https://pre-onboarding-selection-task.shop/todos/'+e.target.id, requestOptions)
            .then(response => {
              if(response.status ==204)
              setTodoList(todolist.filter(a=>a.id != parseInt(e.target.id)));
            })
    }else{//'취소'
        e.target.parentElement.parentElement.children[1].children[0].disabled = true;
        e.target.parentElement.parentElement.children[3].children[0].disabled = true;
        e.target.parentElement.parentElement.children[4].children[0].innerText = '수정';
        e.target.parentElement.parentElement.children[5].children[0].innerText = '삭제';
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div> 
            할일<input 
              id="Todo" 
              type="text"
              value={todo} 
              onChange={e=>setTodo(e.target.value)}/>
              <button onClick = {handleCreateTodo}> 추가</button>
          </div>
          
          <div>
            리스트
            <table>
            <thead>
                <tr>
                <th>ID</th> 
                <th>내용</th> 
                <th>유저ID</th> 
                <th>완료</th> 
                </tr>
            </thead>
            <tbody>
                {todolist.map(a=>{
                    return (
                    <tr key = {a.id+"k"}>
                        <td key = {a.id+"id"}>{a.id} </td>
                        <td><input id={a.id} disabled ={true} key={a.id+"todo"} value={a.todo} onChange={e=>(onEdit(e))}/> </td>
                        <td key = {a.id+"user"}>{a.userId}</td>
                        <td><input id={a.id} disabled ={true} key={a.id+"chk"} type="checkbox" checked={a.isCompleted} onChange={onChangeClick} /></td>
                        <td><button id={a.id} key={a.id} onClick={e=>onEdititem(e)}>수정</button></td>
                        <td><button id={a.id} key={a.id} onClick={e=>onDelitem(e)}>삭제</button></td>
                    </tr>
                    );
                })}
            </tbody>
            </table>
          </div>
        </div>
      </header>
    </div>
  );
}


export default Todo;
