import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import Assumptions from './pages/Assumptions';
import Apr from './pages/Apr';
import Emissions from './pages/Emissions';
import Simulations from './pages/Simulations';
import Parameters from './pages/Parameters';

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

                <li className={"border-b-2 border-b-white px-5 -mb-0.5 text-white px-5"}>
                  <Link to={'/Assumptions'} className="nav-link"> Assumptions </Link></li>

                <li className={"border-b-2 border-b-white px-5 -mb-0.5 text-white px-5"}>
                    <Link to={'/Apr'} className="nav-link"> APR </Link></li>

                <li className={"border-b-2 border-b-white px-5 -mb-0.5 text-white px-5"}>
                      <Link to={'/Emissions'} className="nav-link"> Emissions (vesting) </Link></li>


                        <li className={"border-b-2 border-b-white px-5 -mb-0.5 text-white px-5"}>
                        <Link to={'/Parameters'} className="nav-link"> Parameters </Link></li>

                <li className={"border-b-2 border-b-white px-5 -mb-0.5 text-white px-5"}>
                <Link to={'/Simulations'} className="nav-link"> Simulations </Link></li>




            </ul>
          </div>
          <Routes>
              <Route exact path='/' element={<Assumptions/>}/>
              <Route exact path='/Assumptions' element={<Assumptions/>}/>
              <Route path='/Apr' element={<Apr/>}/>
              <Route path='/Emissions' element={<Emissions/>}/>
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

      </Router>
  )
}
