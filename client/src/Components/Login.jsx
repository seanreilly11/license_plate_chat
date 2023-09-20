import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../redux/actions/authentication.actions";
import { NavLink } from "react-router-dom";
import Spinner from "./Spinner";

function Login() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authentication.loading);
    const error = useSelector((state) => state.authentication.error);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = ({ email, password }) =>
        dispatch(authenticationActions.signIn(email, password));

    return (
        <div className="container">
            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        className={
                            "form-control" +
                            (error?.status === 404 ? " is-invalid" : "")
                        }
                        type="email"
                        {...register("email", { required: true })}
                    />
                    {error?.status === 404 && (
                        <span className="invalid-feedback">
                            {error.message}
                        </span>
                    )}
                    {errors.email && (
                        <span className="invalid-feedback">
                            This field is required
                        </span>
                    )}
                </div>
                <div className="mb-2">
                    <label htmlFor="password">Password</label>
                    <input
                        className={
                            "form-control" +
                            (error?.status === 401 ? " is-invalid" : "")
                        }
                        type="password"
                        {...register("password", { required: true })}
                    />
                    {error?.status === 401 && (
                        <span className="invalid-feedback">
                            {error.message}
                        </span>
                    )}
                    {errors.password && (
                        <span className="invalid-feedback">
                            This field is required
                        </span>
                    )}
                </div>
                <div className="mt-3 d-flex align-items-center">
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                    <NavLink to="/register" className="btn btn-link">
                        Register
                    </NavLink>
                    {loading && <Spinner />}
                </div>
            </form>
        </div>
    );
}

export default Login;
