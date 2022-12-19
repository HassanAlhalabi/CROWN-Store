import { ChangeEvent, FormEvent, useReducer } from "react";
import { SignUpUser } from "../../../models/users";
import { createEmailPasswordUser, handleCreateUser } from '../../../firebase';
import Button from "../../Button";
import FormInput from "../../form-input";
import "./style.scss"

const initialInputsState: SignUpUser = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const userReducerFunction = (state: SignUpUser, action: any) => {
    return ({
        ...state,
        ...action
    })
}

const SignUpForm = () => {

    const [inputs, dispatch] = useReducer(userReducerFunction, initialInputsState );

    const handleInputs = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = inputs;

        // Validate
        if(!displayName || !email || !password) {
            alert('Required Fields Are Missing')
            return false;
        }
        if(password !== confirmPassword) {
            alert('Passwords Not Match')
            return false;
        }

        // Add User To Authentication
        let userId = null;
        try {
            userId = (await createEmailPasswordUser(email, password)).user.uid
        } catch (error) {
            return console.log(error)
        }

        // Add User To DB
        try {
            await handleCreateUser({displayName, email, uid: userId});
            dispatch(initialInputsState);
        } catch (error) {
            return console.log(error)
        }
        
    }

    return  <form onSubmit={handleSubmit} className="sign-up-container">
                <div className="mb-1">
                    <h2>Don't Hava An Account?</h2>
                    <span>Sign Up With Your Email And Password</span>
                </div>
                <FormInput label="Display Name" type="text" name="displayName" value={inputs.displayName} onChange={handleInputs}/>
                <FormInput label="Email" type="email" name="email" value={inputs.email} onChange={handleInputs}/>
                <FormInput label="Password" type="password" name="password" value={inputs.password} onChange={handleInputs}/>
                <FormInput label="Confirm Password" type="password" name="confirmPassword" value={inputs.confirmPassword} onChange={handleInputs}/>
                <Button type="submit">Sign Up</Button>
            </form>
}

export default SignUpForm
