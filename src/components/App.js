import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";

function App() {

  const [ hosts, setHosts ] = useState([])
  const [ areas, setAreas ] = useState([])
  
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

  function handleChangeHostsInArea(changeHost) {
    const updatedHosts = hosts.map(host => host.id === changeHost.id ? changeHost : host)
    setHosts(updatedHosts)
  }

  return (
    <Segment id="app">
      <WestworldMap areas={areas} hosts={hosts}/>
      <Headquarters 
        hosts={hosts} 
        setHosts={setHosts}
        areas={areas}
        onChangeHostsInArea={handleChangeHostsInArea}
      />
    </Segment>
  );
}

export default App;
