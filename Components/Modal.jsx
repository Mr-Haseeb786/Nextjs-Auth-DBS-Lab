import React, { useEffect } from "react";
import { useState } from "react";

const Modal = ({ type, message, isModalOpen, setisModalOpen }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setisModalOpen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <div
      className={`absolute top-8 -translate-x-1/2 -translate-y-[10rem] left-1/2 text-center w-max transition-all duration-300 ${
        isModalOpen && "translate-y-[0]"
      }`}
    >
      {type === "Success" && (
        <span
          className='alert grid-cols-1 alert-success text-center'
          role='alert'
        >
          {message}
        </span>
      )}
      {type === "Failed" && (
        <span className='alert grid-cols-1 alert-error ' role='alert'>
          {message}
        </span>
      )}
    </div>
  );
};

export default Modal;
