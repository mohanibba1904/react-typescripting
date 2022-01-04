import React, { useReducer, useEffect } from 'react';
import "./login.scss";

export default function Login() {

    type State = {
        username: string
        password:  string
        isButtonDisabled: boolean
        helperText: string
        isError: boolean
      };
      
      const initialState:State = {
        username: '',
        password: '',
        isButtonDisabled: true,
        helperText: '',
        isError: false
      };
      
      type Action = { type: 'setUsername', payload: string }
        | { type: 'setPassword', payload: string }
        | { type: 'setIsButtonDisabled', payload: boolean }
        | { type: 'loginSuccess', payload: string }
        | { type: 'loginFailed', payload: string }
        | { type: 'setIsError', payload: boolean };
      
      const reducer = (state: State, action: Action): State => {
        switch (action.type) {
          case 'setUsername': 
            return {
              ...state,
              username: action.payload
            };
          case 'setPassword': 
            return {
              ...state,
              password: action.payload
            };
          case 'setIsButtonDisabled': 
            return {
              ...state,
              isButtonDisabled: action.payload
            };
          case 'loginSuccess': 
            return {
              ...state,
              helperText: action.payload,
              isError: false
            };
          case 'loginFailed': 
            return {
              ...state,
              helperText: action.payload,
              isError: true
            };
          case 'setIsError': 
            return {
              ...state,
              isError: action.payload
            };
        }
      }
      

    const [state, dispatch] = useReducer(reducer, initialState);
  
    useEffect(() => {
        
      if (state.username.trim() && state.password.trim()) {
       dispatch({
         type: 'setIsButtonDisabled',
         payload: false
       });
      } else {
        dispatch({
          type: 'setIsButtonDisabled',
          payload: true
        });
      }
    
    }, [state.username, state.password]);

    const handleLogin = () => {
        console.log("success")
        if (state.username === 'abc@email.com' && state.password === 'password') {
          dispatch({
            type: 'loginSuccess',
            payload: 'Login Successfully'
          });
       
        } else {
          dispatch({
            type: 'loginFailed',
            payload: 'Incorrect username or password'
          });
         
        }
      };
    
      const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
          state.isButtonDisabled || handleLogin();
        }
      };
    
      const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            console.log(event.target.value)
          dispatch({
            type: 'setUsername',
            payload: event.target.value
          });
        };
    
      const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            console.log(event.target.value)

          dispatch({
            type: 'setPassword',
            payload: event.target.value
          });
        }



    async function fetchPokemon() {
        const user_name = 'santosh'
        const password = 'santosh123@'
        const userDetails = {user_name, password}

        const response = await window.fetch('http://127.0.0.1:8000/login', {
              // learn more about this API here: https://graphql-pokemon2.vercel.app/
              method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userDetails),
            })

        console.log(response)    
        }
            
            
    const val = fetchPokemon().then(data => console.log(data))    
                









  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form noValidate autoComplete="off">
          <h1>Sign In</h1>
          <input type="email" placeholder="Email or phone number"
           onChange={handleUsernameChange} onKeyPress={handleKeyPress}/>
          <input type="password" placeholder="Password" 
          onChange={handlePasswordChange}  onKeyPress={handleKeyPress}/>
          <button className="loginButton"
           onClick={handleLogin} disabled={state.isButtonDisabled}>Sign In</button>
          <span>
            New to Netflix? <b>Sign up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}