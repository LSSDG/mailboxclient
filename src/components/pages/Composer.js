import { useRef } from "react";
import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";
import { useSelector, } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css'


const Composer = ()=>{
    const senderEmail=useSelector(state=>state.auth.email);
    console.log(senderEmail)
    //const senderEmail=useSelector(state=>state.a)
    const emailRef=useRef();
    const subjectRef=useRef();
    const mesgRef=useRef();
    const sendMessageHandler = async (e) =>{
        e.preventDefault();
        
        console.log(senderEmail)
        const email = emailRef.current.value;
        const subject=subjectRef.current.value;
        const mesg=mesgRef.current.value;
        const emailObj={
            receiverEmail:email,
            subject:subject,
            message:mesg,
            senderEmail:senderEmail,
            read:false

        }
        const emailc=email.replace(/[^a-zA-Z0-9]/g,'');
        console.log(emailc)
        const resReceived = await fetch(`https://mailboxclient-33fe1-default-rtdb.firebaseio.com/inbox/${emailc}.json`,{
            method:'POST',
            body:JSON.stringify(emailObj)
        })
        const sender=localStorage.getItem('userEmail');
        const senderE=senderEmail.replace(/[^a-zA-Z0-9]/g,'');
        console.log(scryRenderedDOMComponentsWithClass)
        const resSent = await fetch(`https://mailboxclient-33fe1-default-rtdb.firebaseio.com/sent/${senderE}.json`,{
            method:'POST',
            body:JSON.stringify(emailObj)
        })
        if(resReceived.ok && resSent.ok){
            alert('message sent')
        }else{
            console.log("message not sent,error")
        }
    }
    return(<div>
        <form className="form-group" onSubmit={sendMessageHandler}>
            <label htmlFor="email" className="form-label">To :</label>
            <input className="form-control" type="email" ref={emailRef} id="email"/>
            <label htmlFor="subject" className="form-label">Subject :</label>
            <input className="form-control" type="text" ref={subjectRef}/>
            <label htmlFor="message" className="form-label">Message:</label>
            <textarea className="form-control" ref={mesgRef} id="message"></textarea>
            <button className="btn btn-success" type="submit">SEND</button>
            </form>
    </div>)
}

export default Composer;