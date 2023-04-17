import React, {useState, useRef} from "react";
import {Transition} from "@headlessui/react";
import {NavLink} from "react-router-dom";

function Nav() {
  function lockScroll() {
    document.body.classList.toggle('lock-scroll');
  }
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (<div>
    <nav className="text-gray-400 border-b-2 border-b-gray-500 sm:border-b-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center sm:flex-col sm:items-start">
        <div className="flex">
          <img src="logo.png" alt="Logo" className="w-40"/>
        </div>
        <div className="flex items-center justify-between h-20 sm:w-full">
          <div className="flex-1 items-center">
            <div className="hidden md:block flex flex-direction-column">
              <ul className="flex-grow flex mb-3 mt-10 border-b-2 border-b-gray-500 h-10 items-stretch sm:mb-10">
                <NavLink to={'/'} className={(
                    {isActive, isPending}) => isPending
                    ? "pending"
                    : isActive
                      ? "nav-link border-b-2 border-b-white px-5 -mb-0.5 text-white px-5 active"
                      : "nav-link px-5 -mb-0.5 text-white px-5"}>Assumptions</NavLink>
                <NavLink to={'/Emissions'} className={(
                    {isActive, isPending}) => isPending
                    ? "pending"
                    : isActive
                      ? "nav-link border-b-2 border-b-white px-5 -mb-0.5 text-white px-5 active"
                      : "nav-link px-5 -mb-0.5 text-white px-5"}>Emissions</NavLink>
                <NavLink to={'/Apy'} className={(
                    {isActive, isPending}) => isPending
                    ? "pending"
                    : isActive
                      ? "nav-link border-b-2 border-b-white px-5 -mb-0.5 text-white px-5 active"
                      : "nav-link px-5 -mb-0.5 text-white px-5"}>APY</NavLink>
                <NavLink to={'/Parameters'} className={(
                    {isActive, isPending}) => isPending
                    ? "pending"
                    : isActive
                      ? "nav-link border-b-2 border-b-white px-5 -mb-0.5 text-white px-5 active"
                      : "nav-link px-5 -mb-0.5 text-white px-5"}>Parameters</NavLink>
                <NavLink to={'/Simulations'} className={(
                    {isActive, isPending}) => isPending
                    ? "pending"
                    : isActive
                      ? "nav-link border-b-2 border-b-white px-5 -mb-0.5 text-white px-5 active"
                      : "nav-link px-5 -mb-0.5 text-white px-5"}>Simulations</NavLink>
              </ul>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => {
                setIsOpen(!isOpen);
                lockScroll()
              }} type="button" className="burger inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {
                !isOpen
                  ? (<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>)
                  : (<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>)
              }
            </button>
          </div>
        </div>
      </div>

      <Transition show={isOpen} enter="transition ease-out duration-100 transform" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-75 transform" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">

        <div className="md:hidden" id="mobile-menu">
          <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to={'/'} onClick={() => {
                setIsOpen(!isOpen);
                lockScroll()
              }} className={(
                {isActive, isPending}) => isPending
                ? "pending"
                : isActive
                  ? "text-gray-300   hover:text-white block px-3 py-2 text-base font-medium active"
                  : "text-gray-300   hover:text-white block px-3 py-2  text-base font-medium"}>Assumptions</NavLink>
            <NavLink to={'/Emissions'} onClick={() => {
                setIsOpen(!isOpen);
                lockScroll()
              }} className={(
                {isActive, isPending}) => isPending
                ? "pending"
                : isActive
                  ? "text-gray-300   hover:text-white block px-3 py-2  text-base font-medium active"
                  : "text-gray-300   hover:text-white block px-3 py-2  text-base font-medium"}>Emissions</NavLink>
            <NavLink to={'/Apy'} onClick={() => {
                setIsOpen(!isOpen);
                lockScroll()
              }} className={(
                {isActive, isPending}) => isPending
                ? "pending"
                : isActive
                  ? "text-gray-300   hover:text-white block px-3 py-2  text-base font-medium active"
                  : "text-gray-300   hover:text-white block px-3 py-2  text-base font-medium"}>APY</NavLink>
            <NavLink to={'/Parameters'} onClick={() => {
                setIsOpen(!isOpen);
                lockScroll()
              }} className={(
                {isActive, isPending}) => isPending
                ? "pending"
                : isActive
                  ? "text-gray-300   hover:text-white block px-3 py-2  text-base font-medium active"
                  : "text-gray-300   hover:text-white block px-3 py-2  text-base font-medium"}>Parameters</NavLink>
            <NavLink to={'/Simulations'} onClick={() => {
                setIsOpen(!isOpen);
                lockScroll()
              }} className={(
                {isActive, isPending}) => isPending
                ? "pending"
                : isActive
                  ? "text-gray-300 hover:text-white block px-3 py-2 text-base font-medium active"
                  : "text-gray-300  hover:text-white block px-3 py-2  text-base font-medium"}>Simulations</NavLink>
          </div>
        </div>

      </Transition>
    </nav>

  </div>);
}

export default Nav;
