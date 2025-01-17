import React, { useState } from "react";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slice/authSlice";

export default function Login() {
  const {btnLoading, error} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [payload, setPayload] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(payload))
  }

  return (
    <div className="w-[50%] m-auto">
      <h1 className="text-center text-xl uppercase font-bold text-gray-700 tracking-wider">
        Login to your account
      </h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type={"email"}
          label={"Email"}
          error={error ? error.email : ''}
          placeholder={"Enter your Email Address"}
          onChange={(e) => setPayload({...payload, email: e.target.value})}
        />

        <Input
          type={"password"}
          label={"Password"}
          error={error ? error.password : ''}
          placeholder={"***********"}
          onChange={(e) => setPayload({...payload, password: e.target.value})}
        />

        {
          error ? <>{
            error.status ? <p className="text-color text-sm text-red-500 italic capitalize">{error.message}</p> : null 
          }</> : null
        }

        <div className="flex items-center justify-between">
          <Button isLoading={btnLoading} type={'submit'} variant="primary" text={"Sign in"} />
          <Link
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to={"/register"}
          >
            Don't have an account?
          </Link>
        </div>
      </Form>
    </div>
  );
}
