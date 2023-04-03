import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { sentActions } from '../../store';
const Sent = ({receiverEmail,subject,message,senderEmail,item,id,read,date})=>{
    //const datehours=date.getHours()
    const [toggle,setToggle] = useState(false);
    const [color,setColor] = useState(false);
    const sentChanging=useSelector(state=>state.inbox.data);
    const dispatch=useDispatch();
    const openEmail = ()=>{
        setToggle(prevState=>!toggle);
        async function updateEmailStatus(){
            const newItem={...item,read:true};
            console.log(newItem)
            const csenderEmail=senderEmail.replace(/[^a-zA-Z0-9]/g,'');
            const res=await fetch(`https://mailboxclient-33fe1-default-rtdb.firebaseio.com/sent/${csenderEmail}/${id}.json`,{
                method:'PUT',
                body:JSON.stringify(newItem)
            })
        }
        updateEmailStatus();
    }
    const deleteEmail = ()=>{
        
        async function deleteEmailStatus(){
            
            
            const csenderEmail=senderEmail.replace(/[^a-zA-Z0-9]/g,'');
            const res=await fetch(`https://mailboxclient-33fe1-default-rtdb.firebaseio.com/sent/${csenderEmail}/${id}.json`,{
                method:'DELETE',
                
            })
            if(res.ok){
                const data=await res.json();
                dispatch(sentActions.changingSent(data))
                console.log("deletion successful")
            }
        }
        deleteEmailStatus();
    }




    return(<li className='list-group-item'>
        <button className="btn btn-warning" onClick={openEmail}>{toggle===true ? 'Close' : 'Open' }</button>
        <button className="btn btn-warning" onClick={deleteEmail}>Delete</button>
        <div className={read?"bg-dark text-light":"bg-light text-dark"}>
            {toggle && <div className={read?"bg-dark text-light":"bg-light text-dark"}><span>To:{receiverEmail}</span><br></br>
            <span>Subject:{subject}</span><br/>
            <p>Message:{message}</p>
            <span>{date}</span></div>}
        </div>
    </li>)
}

export default Sent;