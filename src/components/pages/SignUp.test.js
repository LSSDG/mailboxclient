import { render,screen } from "@testing-library/react";
import SignUp from "./SignUp";


test('checking email is entered',()=>{
    render(<SignUp/>);
    const emailInput=screen.getAllByRole('input');
})