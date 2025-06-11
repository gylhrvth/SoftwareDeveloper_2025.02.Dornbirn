

import Input from './input.tsx';


export default function Login() {
  return (
      <div>
        <h1>Please log in.</h1>
        <form className ="form">
          <Input 
            type="text"
            placeholder="Username"
            />
          <Input
            type="password"
            placeholder="Password"
          />
          <button type='submit'>Login</button>
        </form>
      </div>
    );
}