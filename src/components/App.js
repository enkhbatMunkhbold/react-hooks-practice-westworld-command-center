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

  function onChangeHostsInArea(pickedHost) {
    const updatedHosts = hosts.map(host => host.id === pickedHost.id ? pickedHost : host)
    setHosts(updatedHosts)
  }

  return (
    <Segment id="app">
      <WestworldMap areas={areas} hosts={hosts} onHostSelect={handleHostSelect}/>
      <Headquarters 
        hosts={hosts} 
        areas={areas}
        selectedHost={selectedHost}
        onHostSelect={handleHostSelect}
        onChangeHostsInArea={onChangeHostsInArea}
      />
    </Segment>
  );
}

export default App;
