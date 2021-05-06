import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Textfield from './Textfield'



interface Props {
  text?: number,
  match?: any,
  
}

// function Abt(props) {
  const Abt: React.FC<Props> = ({ match }) => {

  const [node, setNode] = useState({
    item:{
      name:"Placeholder",
      images:{
        featured:'niet',
        background:""
      }
    }
  })

  const fetchItem = async () => {
    const item = await fetch(`https://fortnite-api.theapinetwork.com/item/get?id=${match.params.uuid}`)
    const res = await item.json()

    console.log(res)
    setNode(res.data)
  }

  useEffect(()=>{
    fetchItem()
    console.log(match.params.uuid)

  },[])

  return (
    <div className="App">
      detail
      <Textfield text={1} name={node.item.name} boo={true} />
      <img src={node.item.images.featured ? node.item.images.featured : node.item.images.background} alt="stew"/>
    </div>
  );
}

export default Abt;
