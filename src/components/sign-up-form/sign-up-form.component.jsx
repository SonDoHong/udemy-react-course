import { useState } from "react";

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component'

import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formFields.password !== formFields.confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                formFields.email,
                formFields.password
            );

            await createUserDocumentFromAuth(user, { displayName: formFields.displayName });

            resetFormFields()
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use')
            } else  {
                console.log("user creation encountered an error", error);
            }
        }
    };

    const handleChage = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    type="text"
                    required
                    onChange={handleChage}
                    name="displayName"
                    value={formFields.displayName}
                />

                <FormInput
                    label='Email'
                    type="email"
                    required
                    onChange={handleChage}
                    name="email"
                    value={formFields.email}
                />
                
                <FormInput
                    label='Password'
                    type="password"
                    required
                    onChange={handleChage}
                    name="password"
                    value={formFields.password}
                />

                <FormInput
                    label='Confirm Password'
                    type="password"
                    required
                    onChange={handleChage}
                    name="confirmPassword"
                    value={formFields.confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;
