import './App.css';
import React, {useState,useEffect} from "react";

function Login() {
  const [tokenid,setTokenid] = useState(localStorage.getItem('tokenid'));
  const [emailtxt, setEmailtxt] = useState("");
  const [pwd, setPwd] = useState("");
  const [flag, setFlag] = useState(true);
  useEffect(()=>{
    if(localStorage.getItem('tokenid') != null)
        document.location.href = '/todo';
  },[])
  const checkValid =() =>{
        var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(emailtxt.match(regExp) != null && pwd.length >=8)
          setFlag(false);
  }
  
  const handleLogin =() => {
    var requestOptions = {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           email: emailtxt,
           password : pwd
        }),
        
     };

     fetch('https://pre-onboarding-selection-task.shop/auth/signin', requestOptions)
     .then(response =>{
        if(response.status ==200){
            alert("로그인 성공");
            return response.json();
        }
            
        if(response.status ==404)
            alert("id 없음");
        if(response.status ==401)
            alert("패스워드 오류");
        
    })
     .then(json =>{
        if(json != undefined){
            setTokenid(json.access_token);
            localStorage.setItem('tokenid',json.access_token);
            document.location.href = '/todo';
        }});
  }
  const handleJoin =(e) => {
    var requestOptions = {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           email: emailtxt,
           password : pwd
        }),
        
     };
    fetch('https://pre-onboarding-selection-task.shop/auth/signup', requestOptions)
        .then(response => {
        response.json();
        console.log(response);
        if(response.status ==201)
            alert("회원가입 성공");
        if(response.status == 400)
            alert("회원가입 실패(id 중복)");
        if(response.status == 404)
            alert("회원가입 실패(주소 오류)");
        })
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div> 
            이메일 : <input 
              id="Email" 
              type="text"
              placeholder='email 형식'
              value={emailtxt} 
              onKeyUp={checkValid} 
              onChange={e=>setEmailtxt(e.target.value)}/>
          </div>
          <div> 
            비밀번호 : <input 
              id="Password" 
              type="password"
              placeholder='8자리 이상'
              value={pwd} 
              onKeyUp={checkValid} 
              onChange={e=>setPwd(e.target.value)}/>
          </div>
          <div>
          <button onClick = {handleLogin} disabled={flag}>로그인</button>
          <button onClick = {handleJoin}> 회원가입
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}


export default Login;
