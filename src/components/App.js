import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";

function App() {

  // const [ hosts, setHosts ] = useState([])
  const [ areas, setAreas ] = useState([])
  
  const [ hostsInArea, setHostsInArea ] = useState([])
  const [ hostsInCS, setHostsInCS ] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/areas')
    .then(res => res.json())
    .then(data => setAreas(data))
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/hosts')
    .then(res => res.json())
    .then(hosts => {
      const csHosts = []
      const areaHosts = []
      hosts.forEach(host => host.active ? areaHosts.push(host) : csHosts.push(host))
      setHostsInCS(csHosts)
      setHostsInArea(areaHosts)
    })
  }, [])
  // console.log(hostsInArea)
  return (
    <Segment id="app">
      <WestworldMap areas={areas} hosts={hostsInArea}/>
      <Headquarters 
        hosts={hostsInCS} 
        setHosts={setHostsInCS} 
        areas={areas}
        setHostsInArea={setHostsInArea}
      />
    </Segment>
  );
}

export default App;
