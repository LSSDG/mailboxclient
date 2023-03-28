import { useRef } from "react"

const Login = () => {

    const emailRef=useRef();
    const passwordRef=useRef();
    //const cpasswordRef=useRef();

    const loginHandler = async (e) =>{
        e.preventDefault();
        const email=emailRef.current.value;
        const password=passwordRef.current.value;
         
         
        const user={
            email:email,
            password:password,
            returnSecureToken:true
        }
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signIn?key=AIzaSyBUiaKIOB1weqkngF-EFIUNdGu_AugP7EY',{
            method:'POST',
            body:JSON.stringify(user),
        })
        if(res.ok){
            const data=await res.json();
        }else{
            console.log("error");
        }
    }

    return(<div>
            <form onSubmit={loginHandler}>
                <h4>Login</h4>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" ref={emailRef} required></input>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={passwordRef} required></input>
                 
                <button type="submit">Login</button>
            </form>
        </div>)
}


export default Login