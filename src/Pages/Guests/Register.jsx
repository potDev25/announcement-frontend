import React from "react";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="w-[50%] m-auto">
      <h1 className="text-center text-xl uppercase font-bold text-gray-700 tracking-wider">
        Register to the System
      </h1>
      <Form>
        <Input
          type={"email"}
          label={"Email"}
          placeholder={"Enter your Email Address"}
        />

        <Input
          type={"password"}
          label={"Password"}
          placeholder={"***********"}
        />

        <div className="w-full flex items-center justify-between">
          <Button variant="primary" text={"Register"} />
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
