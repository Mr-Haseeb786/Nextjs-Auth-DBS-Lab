"use client";
import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import Link from "next/link";
import { signup } from "@/utils/oracle/signup";

const SignUpComp = () => {
  const initInfo = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  const initContent = {
    type: "",
    message: "",
  };

  const [info, setInfo] = useState(initInfo);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(initContent);
  const [erroInput, setErrorInput] = useState(false);
  const [seePass, setSeePass] = useState(false);
  const [seeConfPass, setSeeConfPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (info.password != info.confirmPassword) {
      setModalContent({
        type: "Failed",
        message: "Passwords don't match",
      });

      setErrorInput(true);
      setisModalOpen(true);
      return;
    }

    setLoading(true);

    const res = await signup(info);

    setLoading(false);

    if (res) {
      setModalContent({
        type: "Success",
        message: "User created successfully",
      });
      setisModalOpen(true);
      setInfo(initInfo);
    }
  };

  return (
    <article className='grid justify-items-center gap-5 h-[43rem] relative'>
      <h1 className='mt-6 text-2xl font-bold self-center'>Sign Up</h1>
      <form
        className='flex flex-col gap-2 justify-self-center mt-6'
        onSubmit={handleSubmit}
      >
        <Modal
          type={modalContent.type}
          message={modalContent.message}
          isModalOpen={isModalOpen}
          setisModalOpen={setisModalOpen}
        />
        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='w-4 h-4 opacity-70'
          >
            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
          </svg>
          <input
            name='username'
            type='text'
            className='grow'
            placeholder='Username'
            onChange={handleChange}
            value={info.username}
            autoComplete='off'
          />
        </label>

        <label
          className={`input input-bordered flex items-center gap-2 ${
            erroInput ? "input-error" : ""
          }`}
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
            name='password'
            type={seePass ? "text" : "password"}
            className={`grow`}
            value={info.password}
            placeholder='Password'
            onChange={handleChange}
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
          className={`input input-bordered flex items-center gap-2 ${
            erroInput ? "input-error" : ""
          }`}
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
            type={seeConfPass ? "text" : "password"}
            name='confirmPassword'
            className='grow'
            value={info.confirmPassword}
            placeholder='Confirm Password'
            onChange={handleChange}
            autoComplete='off'
          />
          <div className='w-6 -rotate-90'>
            <img
              src='/flashlight.svg'
              alt='flashlight'
              className='w-full cursor-pointer'
              onClick={() => setSeeConfPass(!seeConfPass)}
            />
            <div
              className={` absolute bottom-[130%] -right-[160%] cone rotate-180 ${
                seeConfPass ? "cone-show" : "hidden"
              }`}
            ></div>
          </div>
        </label>
        <label className='input input-bordered flex items-center gap-2'>
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
            type='text'
            name='email'
            className='grow'
            placeholder='Email'
            onChange={handleChange}
            value={info.email}
            autoComplete='off'
          />
        </label>
        <button
          className='btn btn-primary mt-6'
          disabled={
            info.username == "" ||
            info.password == "" ||
            info.confirmPassword == "" ||
            info.email == "" ||
            loading
          }
        >
          {loading ? (
            <div className='flex items-center gap-2'>
              <span className=''>Creating Account</span>
              <span className='loading loading-ring loading-lg'></span>
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
        <p className='text-center italic'>Or</p>
        <Link href='/' className={`btn btn-accent mt-6`}>
          Login
        </Link>
      </form>
    </article>
  );
};

export default SignUpComp;
