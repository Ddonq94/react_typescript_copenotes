import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import Textfield from './Textfield'

import {Link} from 'react-router-dom'

import 'antd/dist/antd.css';

import { Row, Col } from 'antd';


function Home() {

  const [allItems, setAllItems] = useState([])

  useEffect(()=>{
    items();
  }, [])

  const items = async () => {
    const data = await fetch('https://fortnite-api.theapinetwork.com/store/get')
    const res = await data.json()
    console.log(res.data)
    setAllItems(res.data)
  }
  
  return (
    <div className="App">
      Home

      <Row>
      {allItems.map(it=>(

      <Col span={4}>
        <Link to={`/home/${it['itemId']}`}>

          <Textfield text={1} key={it['itemId']} name={it['item']['name']} boo={true} />
        </Link>
      </Col>
      
      ))}
      </Row>
    </div>
  );
}

export default Home;
