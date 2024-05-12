import React from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from "./ColdStorage";

function Headquarters({ hosts, areas, selectedHost, onHostSelect, onUpdateHost }) {

  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage hosts={hosts} onHostSelect={onHostSelect}/>
      </Grid.Column>
      <Grid.Column width={5}>
        <Details 
          selectedHost={selectedHost}
          areas={areas} 
          onUpdateHost={onUpdateHost}
        />
      </Grid.Column>
      <Grid.Column width={3}>
        {/* and here. Take visual cues from the screenshot/video in the Readme. */}
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
