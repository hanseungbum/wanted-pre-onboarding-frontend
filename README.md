# 원티드 프리온보딩 프론트엔드 - 선발 과제

## 설치 및 실행

```zsh
$ git clone https://github.com/hanseungbum/wanted-pre-onboarding-frontend.git
$ npm install
$ npm start
```


### 안내 사항
  1. 배포 url : https://golden-palmier-b94309.netlify.app/

### 코드리뷰
1. 디렉토리 구조
```bash
 src
  ├── App.js
  ├── Login.js
  └── Todo.js

``` 
2. 기능 구현
  a. 로그인/회원가입
  ``` javascript
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
              alert("로그인성공");
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
  ```
  => 'requestOptions'을 잘 설정한지 궁금   
  => 로그인 클릭 이벤트에서는 http status에따라 분기로 alert창 띄움   
  => 회원가입 동일   
 
  b. todoList   
  ``` javascript
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
  ```
  => 타겟의 children 으로 버튼 컨트롤을 하는데 어떤 방식 좋을지?   

  c. 리다이렉트   
  ``` javascript
      if(localStorage.getItem('tokenid') != null) 
        document.location.href = '/todo';
      },[])
  ```
  => 토큰 아이디가 있다면 해당 url로 이동 (Navigation 기능을 사용하는 것이 더 깔끔하게 보일 것 같음)   
   
4.총평
 사전과제 통과에만 목적을 둔 것이기 때문에 대충 만든 것이 눈에 보임   
 (~~워스트 케이스~~)


