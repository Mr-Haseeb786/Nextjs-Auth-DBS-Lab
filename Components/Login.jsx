"use client";
import React, { useState } from "react";
import { connect } from "@/utils/oracle/connection";
import Modal from "./Modal";
import Link from "next/link";
const Login = () => {
  const initState = {
    username: "",
    password: "",
    email: "",
  };

  const initEmpty = {
    username: false,
    password: false,
    email: false,
  };

  const [isempty, setisEmpty] = useState(initEmpty);
  const [seePass, setSeePass] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [res, setRes] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);

  const emptyCheck = (e) => {
    if (e.target.value === "") {
      setisEmpty({ ...isempty, [e.target.name]: true });
    } else {
      setisEmpty({ ...isempty, [e.target.name]: false });
    }
  };

  const handleChange = (e) => {
    setObject({ ...object, [e.target.name]: e.target.value });
  };

  const [object, setObject] = useState(initState);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setisLoading(true);

    // setting response if response exists

    const response = await connect(object);

    if (response) {
      setRes(true);
      console.log("Response: ", response);
    } else {
      setRes(false);
      console.log("No response");
    }

    setisModalOpen(true);

    console.log(response);
    setisLoading(false);
    console.log(res);
    // setObject(initState);
  };

  console.log(res);
  return (
    <article className='h-[35rem] grid place-items-center relative'>
      <Modal
        type={res ? "Success" : "Failed"}
        message={res ? "Login Successful" : "User does not exist"}
        isModalOpen={isModalOpen}
        setisModalOpen={setisModalOpen}
      />
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <label
          className={`input ${
            isempty.username && "input-warning"
          } input-bordered flex items-center gap-2 `}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='w-4 h-4 opacity-70'
          >
            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
          </svg>
          <input
            type='text'
            name='username'
            className='grow'
            value={object.username}
            onChange={handleChange}
            placeholder='Username'
            onBlur={emptyCheck}
            autoComplete='off'
            spellCheck='false'
          />
        </label>
        {/* Password */}
        <label
          className={`input relative ${
            isempty.password && "input-warning"
          } input-bordered flex items-center gap-2`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='w-4 h-4 opacity-70'
          >
            <path
              fillRule='evenodd'
              d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
              clipRule='evenodd'
            />
          </svg>
          <input
            type={seePass ? "text" : "password"}
            name='password'
            className='grow'
            value={object.password}
            placeholder='Password'
            onChange={handleChange}
            onBlur={emptyCheck}
            autoComplete='off'
          />
          <div className='w-6 -rotate-90'>
            <img
              src='/flashlight.svg'
              alt='flashlight'
              className='w-full cursor-pointer'
              onClick={() => setSeePass(!seePass)}
            />
            <div
              className={` absolute bottom-[130%] -right-[160%] cone rotate-180 ${
                seePass ? "cone-show" : "hidden"
              }`}
            ></div>
          </div>
        </label>
        <label
          className={`input ${
            isempty.email && "input-warning"
          } input-bordered flex items-center gap-2`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='w-4 h-4 opacity-70'
          >
            <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
            <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
          </svg>
          <input
            value={object.email}
            type='email'
            className='grow'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            onBlur={emptyCheck}
            autoComplete='off'
          />
        </label>
        <button
          className='btn btn-primary mt-4 relative'
          disabled={
            !object.email || !object.password || !object.username || isLoading
          }
        >
          {isLoading ? (
            <div className='flex items-center gap-2'>
              <span className=''>Logging in</span>
              <span className='loading loading-ring loading-lg'></span>
            </div>
          ) : (
            "Login"
          )}
        </button>
        <p className='text-center mt-2'>
          Don't have an account?{" "}
          <span>
            <Link href='/signup' className='btn ml-2 btn-accent'>
              Sign Up
            </Link>
          </span>{" "}
        </p>
      </form>
    </article>
  );
};

export default Login;
