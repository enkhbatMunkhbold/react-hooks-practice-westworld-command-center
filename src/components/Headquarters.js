import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from "./ColdStorage";

function Headquarters({ hosts, setHosts, areas, onChangeHostsInArea }) {

  const [ selectedHost, setSelectedHost ] = useState({})

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

  function updatedBackEnd(host) {
    fetch(`http://localhost:3001/hosts/${host.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({authorized: true})
    }).then(res => res.json())
    .then(updatedHost => onChangeHostsInArea(updatedHost))
  }

  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage hosts={hosts} onHostSelect={handleHostSelect}/>
      </Grid.Column>
      <Grid.Column width={5}>
        <Details 
          selectedHost={selectedHost} 
          areas={areas} 
          onChangeHostsInArea={onChangeHostsInArea}
        />
      </Grid.Column>
      <Grid.Column width={3}>
        {/* and here. Take visual cues from the screenshot/video in the Readme. */}
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
