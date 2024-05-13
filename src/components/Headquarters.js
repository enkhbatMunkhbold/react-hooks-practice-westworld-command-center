import React from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel";

function Headquarters({ nonActiveHosts, areas, selectedHost, onHostSelect, onUpdateHost, onControlAll }) {

  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage nonActiveHosts={nonActiveHosts} onHostSelect={onHostSelect}/>
      </Grid.Column>
      <Grid.Column width={5}>
        <Details 
          selectedHost={selectedHost}
          areas={areas} 
          onUpdateHost={onUpdateHost}
        />
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel onControlAll={onControlAll}/>
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
