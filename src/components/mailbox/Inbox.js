import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { inboxActions } from '../../store';
const Inbox = ({senderEmail,subject,message,id,item,read,receiverEmail,date})=>{
    const [toggle,setToggle] = useState(false);
    const inboxChanging=useSelector(state=>state.inbox.idata);
    const dispatch=useDispatch();

    const openEmail = ()=>{
        setToggle(prevState=>!toggle);
        async function updateEmailStatus(){
            const newItem={...item,read:true};
            console.log(newItem)
            const creceiverEmail=receiverEmail.replace(/[^a-zA-Z0-9]/g,'');
            const res=await fetch(`https://mailboxclient-33fe1-default-rtdb.firebaseio.com/inbox/${creceiverEmail}/${id}.json`,{
                method:'PUT',
                body:JSON.stringify(newItem)
            })
            if(res.ok){
                const data=await res.json();
                dispatch(inboxActions.changingInbox(data))
            }
        }
        updateEmailStatus();
    }
    const deleteEmail = ()=>{
        
        async function deleteEmailStatus(){
            
            
            const creceiverEmail=receiverEmail.replace(/[^a-zA-Z0-9]/g,'');
            const res=await fetch(`https://mailboxclient-33fe1-default-rtdb.firebaseio.com/inbox/${creceiverEmail}/${id}.json`,{
                method:'DELETE',
                
            })
            if(res.ok){
                const data = await res.json();
                dispatch(inboxActions.changingInbox(data))
                console.log("deleted")
        }else{
            console.log('error in deleting')
        }
        }
        deleteEmailStatus();
    }
    return(<li className='list-group-item' >
        <button className="btn btn-warning" onClick={openEmail}>{toggle===true ? 'Close' : 'Open' }</button>
        <button className="btn btn-warning" onClick={deleteEmail}>Delete</button>
        <div className={read===true ? "bg-dark" : "bg-light"}>
            {toggle && <div>
            <span>From:{senderEmail}</span> <br></br>
            <span>Subject:{subject}</span> <br/>
            <p>Message:{message}</p>
            <span> {date}</span></div>}    
        </div>
            
    </li>)
}

export default Inbox;