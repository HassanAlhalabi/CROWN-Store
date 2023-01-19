import { ChangeEvent, FormEvent, useReducer } from "react";
import { SignUpUser } from "../../../models/users";
import { createEmailPasswordUser, handleCreateUser } from '../../../firebase';
import Button from "../../Button";
import FormInput from "../../form-input";
import { handleFireBaseErrorMessage, notify } from "../../../utils";
import { FirebaseError } from "firebase/app";
import { SignUpContainer } from "./style";

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
            notify('ERROR','Required Fields Are Missing', {id: 'required'})
            return false;
        }
        if(password !== confirmPassword) {
            notify('ERROR','Passwords Not Match', {id: 'required'})
            return false;
        }

        // Add User To Authentication
        let userId = null;
        try {
            userId = (await createEmailPasswordUser(email, password)).user.uid;
            dispatch(initialInputsState);
        } catch (error) {
            return notify('ERROR',handleFireBaseErrorMessage((error as FirebaseError).message), {id: 'error'}) 
        }
    }

    return  <SignUpContainer onSubmit={handleSubmit}>
                <div className="mb-1">
                    <h2>Don't Hava An Account?</h2>
                    <span>Sign Up With Your Email And Password</span>
                </div>
                <FormInput label="Display Name" type="text" name="displayName" value={inputs.displayName} onChange={handleInputs}/>
                <FormInput label="Email" type="email" name="email" value={inputs.email} onChange={handleInputs}/>
                <FormInput label="Password" type="password" name="password" value={inputs.password} onChange={handleInputs}/>
                <FormInput label="Confirm Password" type="password" name="confirmPassword" value={inputs.confirmPassword} onChange={handleInputs}/>
                <Button type="submit">Sign Up</Button>
            </SignUpContainer>
}

export default SignUpForm
