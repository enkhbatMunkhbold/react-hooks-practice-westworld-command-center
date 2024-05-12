import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";

function App() {

  const initialValues = {
    firstName: '',
    lastName: '',
    area: '',
    gender: '',
    imageUrl: '',
    active: false,
    authorized: false
  }
  
  const [ hosts, setHosts ] = useState([])
  const [ areas, setAreas ] = useState([])
  const [ selectedHost, setSelectedHost ] = useState(initialValues)
  
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
    setSelectedHost(pickedHost)
    hosts.forEach(host => host.id === pickedHost.id ? host.authorized = true : host.authorized = false)
  }

  function handleUpdateHost(pickedHost) {
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
        onUpdateHost={handleUpdateHost}
      />
    </Segment>
  );
}

export default App;
