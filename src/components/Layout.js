import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Helmet} from "react-helmet";
import Assumptions from './pages/Assumptions';
import Apr from './pages/Apr';
import Emissions from './pages/Emissions';
import Simulations from './pages/Simulations';
import Parameters from './pages/Parameters';
import { NavLink } from "react-router-dom";

export default function Layout({children}) {
  return (
    <Router>

      <Helmet>
        <title>Shardeum Issuance</title>
        <meta name="description" content="Shardeum Issuance"/>
        <link rel="icon" href="/favicon.ico"/>
      </Helmet>

      <main className="py-10 px-20 ml-auto mr-auto max-w-[75rem]">

        {/* Navigation bar */}
        <nav className="text-gray-400 py-2">
          {/* Logo */}
          <div className="flex">
            <img src="logo.png" alt="Logo" className="w-40"/>
            <span className="flex-grow"></span>
          </div>

          {/* Navigation links */}
          <div className="flex flex-direction-column">

            <ul className="flex-grow flex mb-3 mt-10 border-b-2 border-b-gray-500 h-10 items-stretch">


                  <NavLink to={'/Assumptions'} className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "nav-link border-b-2 border-b-white px-5 -mb-0.5 text-white px-5 active" : "nav-link px-5 -mb-0.5 text-white px-5"}>Assumptions</NavLink>


                      <NavLink to={'/Emissions'} className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "nav-link border-b-2 border-b-white px-5 -mb-0.5 text-white px-5 active" : "nav-link px-5 -mb-0.5 text-white px-5"}>Emissions</NavLink>


        <NavLink to={'/Apr'} className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "nav-link border-b-2 border-b-white px-5 -mb-0.5 text-white px-5 active" : "nav-link px-5 -mb-0.5 text-white px-5"}>APR</NavLink>



                        <NavLink to={'/Parameters'} className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "nav-link border-b-2 border-b-white px-5 -mb-0.5 text-white px-5 active" : "nav-link px-5 -mb-0.5 text-white px-5"}>Parameters</NavLink>


                <NavLink to={'/Simulations'} className={({ isActive, isPending }) =>
  isPending ? "pending" : isActive ? "nav-link border-b-2 border-b-white px-5 -mb-0.5 text-white px-5 active" : "nav-link px-5 -mb-0.5 text-white px-5"}>Simulations</NavLink>




            </ul>
          </div>
          <Routes>
              <Route exact path='/' element={<Assumptions/>}/>
              <Route exact path='/Assumptions' element={<Assumptions/>}/>
              <Route path='/Emissions' element={<Emissions/>}/>
              <Route path='/Apr' element={<Apr/>}/>
              <Route path='/Parameters' element={<Parameters/>}/>
              <Route path='/Simulations' element={<Simulations/>}/>
          </Routes>
        </nav>

        {/* Dynamic content */}
        <div className="p-4">


          <main>{children}</main>
          </div>




      </main>
      <div className="w-[26rem] h-[28rem] absolute top-32 right-0 -z-10" style={{
              'background':
                'radial-gradient(circle at right 20% bottom 40%, purple, transparent 50%),' +
                'radial-gradient(circle at right 20% top 40%, blue, transparent 50%)',
              opacity: 0.7
            }}></div>

          <div className="background-flip w-[26rem] h-[28rem] absolute bottom-0 left-0 -z-10" style={{
                    'background':
                      'radial-gradient(circle at right 20% bottom 40%, purple, transparent 50%),' +
                      'radial-gradient(circle at right 20% top 40%, blue, transparent 50%)',
                    opacity: 0.7
                  }}></div>


      </Router>
  )
}
