

interface InputProps {
  type: string;
  placeholder: string;  
}

export default function Input(props: InputProps) {
    return <input
        type={props.type} // will be 'text' for the username input and 'password' for the password input (from login.tsx)
        placeholder={props.placeholder} // will be 'Username' for the username input and 'Password' for the password input (from login.tsx)
    />
}