import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Helmet} from "react-helmet";
import Assumptions from './pages/Assumptions';
import Apr from './pages/Apr';
import Emissions from './pages/Emissions';
import Simulations from './pages/Simulations';
import Parameters from './pages/Parameters';

import DrawerLayout from "./components/DrawerLayout";

export default function Layout({children}) {
  return (
    <Router>

      <Helmet>
        <title>Shardeum Issuance</title>
        <meta name="description" content="Shardeum Issuance"/>
        <link rel="icon" href="/favicon.ico"/>
      </Helmet>


      <main className="main py-5 px-5 md:px-20 ml-auto mr-auto  md:max-w-[75rem]">
<DrawerLayout/>

        {/* Navigation bar */}

          {/* Logo */}




          <Routes>
              <Route exact path='/' element={<Assumptions/>}/>
              <Route exact path='/Assumptions' element={<Assumptions/>}/>
              <Route path='/Emissions' element={<Emissions/>}/>
              <Route path='/Apr' element={<Apr/>}/>
              <Route path='/Parameters' element={<Parameters/>}/>
              <Route path='/Simulations' element={<Simulations/>}/>
          </Routes>


        {/* Dynamic content */}
        <div className="p-4">


          <main>{children}</main>
          </div>




      </main>
      <div className="w-[13rem] h-[14rem] sm:w-[26rem] sm:h-[28rem] absolute top-32 right-0 -z-10" style={{
              'background':
                'radial-gradient(circle at right 20% bottom 40%, purple, transparent 50%),' +
                'radial-gradient(circle at right 20% top 40%, blue, transparent 50%)',
              opacity: 0.7
            }}></div>

          <div className="background-flip  w-[13rem] h-[14rem] sm:w-[26rem] sm:h-[28rem] absolute bottom-0 left-0 -z-10" style={{
                    'background':
                      'radial-gradient(circle at right 20% bottom 40%, purple, transparent 50%),' +
                      'radial-gradient(circle at right 20% top 40%, blue, transparent 50%)',
                    opacity: 0.7
                  }}></div>


      </Router>
  )
}
