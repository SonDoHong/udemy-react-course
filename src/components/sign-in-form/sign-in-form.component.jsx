import { useState } from "react";

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                formFields.email,
                formFields.password
            );

            resetFormFields();
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                alert("auth/invalid-credential");
            } else console.log("error ", error);
        }
    };

    const handleChage = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChage}
                    name="email"
                    value={formFields.email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChage}
                    name="password"
                    value={formFields.password}
                />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>

                    <Button type="button" buttonType={"google"} onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
