import { ChangeEvent, FormEvent, useEffect, useReducer } from 'react';
import Button from '../../Button';
import FormInput from '../../form-input';
import './style.scss';
import { signInEmailAndPassword, loginWithGoogleRedirect, auth, handleCreateUser } from '../../../firebase';
import { getRedirectResult } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { handleFireBaseErrorMessage, notify } from '../../../utils';

const initialInputsState = {
    email: '',
    password: '',
}

const userReducerFunction = (state: typeof initialInputsState, action: any) => {
    return ({
        ...state,
        ...action
    })
}

const SignInForm = () => {
    
    const [inputs, dispatch] = useReducer(userReducerFunction, initialInputsState );

    const handleInputs = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { email, password} = inputs;

        // Validate
        if( !email || !password) {
            notify('ERROR','Required Fields Are Missing', {id: 'required'})
            return false;
        }

        // Sign In
        try {
            const { user } = await signInEmailAndPassword(email, password);
            dispatch(initialInputsState);
        } catch (error) {
            return notify('ERROR',handleFireBaseErrorMessage((error as FirebaseError).message), {id: 'error'}) 
        }
        
    }

    // Handling Google Login Data After Redirect
    useEffect(() =>  {
        (async () => {
            const userData = await getRedirectResult(auth);
            if(userData) {
                const user = {
                    uid: userData.user.uid,
                    displayName: userData.user.displayName,
                    email: userData.user.email 
                }
                // Handle Add User To DB
                await handleCreateUser(user);
            }
        })()
    },[])

    return  <form onSubmit={handleSubmit}  className="sign-in-container">
                <div className='mb-1'>
                    <h2>Already Has An Account?</h2>
                    <span>Sign In With Your Email And Password</span>
                </div>
                <FormInput label="Email" type="email" name="email" value={inputs.email} onChange={handleInputs}/>
                <FormInput label="Password" type="password" name="password" value={inputs.password} onChange={handleInputs}/>
                <div className='d-flex justify-content-between'>
                    <Button type="submit" className='mr-1'>Sign In</Button>
                    <Button type='button' variant='primary' onClick={loginWithGoogleRedirect}>Google Sign In</Button>
                </div>
            </form>
}

export default SignInForm
