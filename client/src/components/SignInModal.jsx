import axios from "axios";
import React, { useRef, useState, useContext } from "react";
import { ModalContext } from "../App";

export default function SignInModal() {
    const context = useContext(ModalContext);
    const [signAction, setSignAction] = useState("login");
    const usernameInput = useRef(null);
    const passwordInput = useRef(null);
    const passwordConfirmInput = useRef(null);

    //login api call
    const logIn = async () => {
        const username = usernameInput.current.value;
        const password = passwordInput.current.value;
        try {
            const response = await axios.post("http://localhost:5000/login", {
                username,
                password,
            });
            console.log(response.data)
            document.cookie = `token=${response.data.token}`;
            document.cookie = `username=${username}`;
            window.location = window.location
        } catch (error) {
            console.log(error);
        }
    };

    const register = async () => {
        const username = usernameInput.current.value;
        const password = passwordInput.current.value;
        if (password !== passwordConfirmInput.current.value) {
            alert("Passwords must match");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/login/register",
                {
                    username,
                    password,
                }
            );
            console.log(response.data);
            alert("Account was created. You can log in now");
            setSignAction("login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="h-full w-full bg-base-content bg-opacity-70 absolute z-30 flex justify-center items-center">
            {/* Disable modal on click on background */}
            <div
                onClick={context.toggleLoginModal}
                className="z-40 w-full h-full absolute"
            ></div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="z-50 rounded-box m-auto form-control w-11/12 h-auto bg-base-300 p-5 sm:w-96"
            >
                <h1 className="text-3xl text-center my-2">
                    {signAction == "login" ? "Sign In" : "Sign Up"}
                </h1>
                <label className="label">
                    <span className="label-text">Username</span>
                </label>
                <input
                    ref={usernameInput}
                    placeholder="Username"
                    className="input input-bordered w-full"
                    type="text"
                    autoComplete="true"
                />
                <label className="label">
                    <span className="label-text mt-5">Password</span>
                </label>
                <input
                    ref={passwordInput}
                    placeholder="Password"
                    className="input input-bordered w-full"
                    type="password"
                    autoComplete="true"
                />

                {/* Password Confirmation */}
                {signAction == "register" && (
                    <>
                        <label className="label">
                            <span className="label-text mt-0">
                                Confirm Password
                            </span>
                        </label>
                        <input
                            ref={passwordConfirmInput}
                            placeholder="Confirm Password"
                            className="input input-bordered w-96"
                            type="password"
                            autoComplete="false"
                        />
                    </>
                )}
                {/* Password Part */}
                {signAction == "register" && (
                    <div className="mt-5 flex flex-col gap-3 justify-center">
                        <button
                            className="btn btn-accent w-full"
                            onClick={register}
                        >
                            Register
                        </button>
                        <p
                            className="link self-end"
                            onClick={() => setSignAction("login")}
                        >
                            Login
                        </p>
                    </div>
                )}

                {/* Login Part */}
                {signAction == "login" && (
                    <div className="mt-5 flex flex-col gap-3 justify-center">
                        <button
                            className="btn btn-accent w-full"
                            onClick={logIn}
                        >
                            Login
                        </button>
                        <p
                            className="link self-end"
                            onClick={() => setSignAction("register")}
                        >
                            Register
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
}
