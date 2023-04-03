import React from "react";
import Layout from "./components/Layout";
import './App.css'

function App({children}) {
  return (
      <Layout>
      {children}
      </Layout>
  );
}

export default App;
