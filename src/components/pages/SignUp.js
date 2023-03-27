//import 

import { useRef } from "react"

const SignUp = () => {

    const emailRef=useRef();
    const passwordRef=useRef();
    const cpasswordRef=useRef();

    const signupHandler = (e) =>{
        e.preventDefault();
        const email=emailRef.current.value;
        const password=passwordRef.current.value;
        const cpassword=cpassword.current.value;
        if(password!==cpassword){
            return;
        }
        const user={
            email:email,
            password:password,
            returnSecureToken:true
        }
    }

    return(<div>
            <form onSubmit={signupHandler}>
                <h4>SignUp</h4>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" ref={emailRef}></input>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={passwordRef}></input>
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="password" id="cpassword" ref={cpasswordRef}></input>
                <button type="submit">Sign Up</button>
            </form>
        </div>)
}