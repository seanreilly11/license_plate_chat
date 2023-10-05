import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../redux/actions/authentication.actions";
import { NavLink } from "react-router-dom";
import Spinner from "./Spinner";

function Register() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authentication.loading);
    const error = useSelector((state) => state.authentication.error);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (passport) =>
        dispatch(authenticationActions.register(passport));

    return (
        <div className="container pt-3">
            <h2>Register</h2>
            <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                    <label htmlFor="plate" className="form-label">
                        Plate
                    </label>
                    <input
                        className={
                            "form-control" +
                            (error?.status === 404 ? " is-invalid" : "")
                        }
                        type="text"
                        {...register("plate", { required: true })}
                    />
                    {error?.status === 404 && (
                        <span className="invalid-feedback">
                            {error.message}
                        </span>
                    )}
                    {errors.plate && (
                        <span className="invalid-feedback">
                            This field is required
                        </span>
                    )}
                </div>
                <div className="mb-2">
                    <label htmlFor="firstname" className="form-label">
                        First name
                    </label>
                    <input
                        className={
                            "form-control" +
                            (error?.status === 404 ? " is-invalid" : "")
                        }
                        type="text"
                        {...register("firstname", { required: true })}
                    />
                    {error?.status === 404 && (
                        <span className="invalid-feedback">
                            {error.message}
                        </span>
                    )}
                    {errors.firstname && (
                        <span className="invalid-feedback">
                            This field is required
                        </span>
                    )}
                </div>
                <div className="mb-2">
                    <label htmlFor="lastname" className="form-label">
                        Last name
                    </label>
                    <input
                        className={
                            "form-control" +
                            (error?.status === 404 ? " is-invalid" : "")
                        }
                        type="text"
                        {...register("lastname", { required: true })}
                    />
                    {error?.status === 404 && (
                        <span className="invalid-feedback">
                            {error.message}
                        </span>
                    )}
                    {errors.lastname && (
                        <span className="invalid-feedback">
                            This field is required
                        </span>
                    )}
                </div>
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
                        Register
                    </button>
                    <NavLink to="/login" className="btn btn-link">
                        Login
                    </NavLink>
                    {loading && <Spinner />}
                </div>
            </form>
        </div>
    );
}

export default Register;
