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

  const activeHosts = []
  const nonActiveHosts = []

  hosts.forEach(host => host.active ? activeHosts.push(host) : nonActiveHosts.push(host))
  
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

  function handleControlAll(text) {
    const alreadyActiveHosts = hosts.filter(host => host.active)
    if(alreadyActiveHosts.length > 0) {

    }
    const updatedPeople = []
    if(text === 'ACTIVATE ALL') {      
      hosts.forEach(host => {
        updateHostActiveInBackEnd(host, true, updatedPeople)
      })
    } else {
      hosts.forEach(host => {
        updateHostActiveInBackEnd(host, false, updatedPeople)
      })
    }
    console.log('updatedPeople:', updatedPeople)
    setHosts(updatedPeople)
  }

  function updateHostActiveInBackEnd(currentHost, booleanValue, people) {
    fetch(`http://localhost:3001/hosts/${currentHost.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({active: booleanValue})
    }).then(res => res.json())
    .then(updatedHost => people.push(updatedHost))
    return people
  }

  return (
    <Segment id="app">
      <WestworldMap areas={areas} activeHosts={activeHosts} onHostSelect={handleHostSelect}/>
      <Headquarters 
        nonActiveHosts={nonActiveHosts} 
        areas={areas}
        selectedHost={selectedHost}
        onHostSelect={handleHostSelect}
        onUpdateHost={handleUpdateHost}
        onControlAll={handleControlAll}
      />
    </Segment>
  );
}

export default App;
