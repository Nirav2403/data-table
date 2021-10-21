import React,{useEffect} from "react";
import { connect } from 'react-redux';
import FetchApi from './components/FetchApi';
import { fetchImage} from './actions/ApiAction';
import './App.css'

function App({fetchImage}) {
  useEffect(()=>{
    fetchImage();
},[])
  return (
    <div className="app-container">
      <FetchApi/>
    </div>
  );
}

export default connect(null,{fetchImage})(App);
