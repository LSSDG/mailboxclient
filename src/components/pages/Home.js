import { useState } from "react";
import Composer from "./Composer";


const Home = () =>{
    const [toggleComposer,setToggleComposer]=useState(false);
    const composeHandler=()=>{
        setToggleComposer(true);
    }
    return(<div>
        <h2>Welcome to Mailbox</h2>
        <button onClick={composeHandler}>Compose mail</button>
        {toggleComposer && <Composer/>}
    </div>)
}

export default Home;