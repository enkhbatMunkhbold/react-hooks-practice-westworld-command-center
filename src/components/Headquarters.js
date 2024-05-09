import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from "./ColdStorage";

function Headquarters({ hosts, setHosts, areas, setHostsInArea }) {

  const [ selectedHost, setSelectedHost ] = useState({})

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

  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage hosts={hosts} onHostSelect={handleHostSelect}/>
      </Grid.Column>
      <Grid.Column width={5}>
        <Details 
          selectedHost={selectedHost} 
          areas={areas} 
          setHostsInArea={setHostsInArea}
        />
      </Grid.Column>
      <Grid.Column width={3}>
        {/* and here. Take visual cues from the screenshot/video in the Readme. */}
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
