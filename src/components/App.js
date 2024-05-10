import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";

function App() {

  const [ hosts, setHosts ] = useState([])
  const [ areas, setAreas ] = useState([])
  const [ selectedHost, setSelectedHost ] = useState({})
  
  useEffect(() => {
    fetch('http://localhost:3001/areas')
    .then(res => res.json())
    .then(data => setAreas(data))
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/hosts')
    .then(res => res.json())
    .then(data => setHosts(data))
  }, [])

  

  function handleHostSelect(pickedHost) {
    updatedBackEnd(pickedHost)
    const updatedHosts = hosts.map(host => {
      if(host.id === pickedHost.id ) {
        const newHost = {...host, authorized: true}
        setSelectedHost(newHost)
        return newHost
      } else {
        return {...host, authorized: false}
      }
    })
    setHosts(updatedHosts)    
  }

  function handleChangeHostsInArea(changeHost) {
    const updatedHosts = hosts.map(host => host.id === changeHost.id ? changeHost : host)
    setHosts(updatedHosts)
  }

  function updatedBackEnd(host) {
    fetch(`http://localhost:3001/hosts/${host.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({authorized: true})
    }).then(res => res.json())
    .then(updatedHost => handleChangeHostsInArea(updatedHost))
  }

  return (
    <Segment id="app">
      <WestworldMap areas={areas} hosts={hosts} onHostSelect={handleHostSelect}/>
      <Headquarters 
        hosts={hosts} 
        areas={areas}
        selectedHost={selectedHost}
        onHostSelect={handleHostSelect}
      />
    </Segment>
  );
}

export default App;
