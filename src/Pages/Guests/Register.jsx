import React, { useState } from "react";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slice/registerSlice";

export default function Register() {
  const dispatch = useDispatch()
  const {error, btnLoading} = useSelector((state) => state.register)
  const navigate = useNavigate()
  const [payload, setPayload] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(payload))
  }
  return (
    <div className="w-[50%] m-auto">
      <h1 className="text-center text-xl uppercase font-bold text-gray-700 tracking-wider">
        Register to the System
      </h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type={"text"}
          label={"Name"}
          placeholder={"Enter your Name"}
          onChange={(ev) => setPayload({...payload, name: ev.target.value})}
          error={error ? error.name : ''}
        />

        <Input
          type={"email"}
          label={"Email"}
          placeholder={"Enter your Email Address"}
          onChange={(ev) => setPayload({...payload, email: ev.target.value})}
          error={error ? error.email : ''}
        />

        <Input
          type={"password"}
          label={"Password"}
          placeholder={"***********"}
          onChange={(ev) => setPayload({...payload, password: ev.target.value})}
          error={error ? error.password : ''}
        />

        <Input
          type={"password"}
          label={"Confirm Password"}
          placeholder={"***********"}
          onChange={(ev) => setPayload({...payload, password_confirmation: ev.target.value})}
          error={error ? error.password_confirmation : ''}
        />

        <div className="w-full flex items-center justify-between">
          <Button isLoading={btnLoading} variant="primary" text={"Register"} />
          <Link
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to={'/login'}
          >
            Already have an account?
          </Link>
        </div>
      </Form>
    </div>
  );
}
