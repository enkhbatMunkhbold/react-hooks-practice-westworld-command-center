import React from "react";
import { Segment, Image } from "semantic-ui-react";
import * as Images from "../services/Images";
import HostInfo from "./HostInfo";

function Details({ selectedHost, areas, setHostsInArea }) {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.

  return (
    <Segment id="details" className="HQComps">
      {selectedHost.authorized ? <HostInfo selectedHost={selectedHost} areas={areas} setHostsInArea={setHostsInArea}/> : <Image size="medium" src={Images.westworldLogo} /> }
    </Segment>
  );
}

export default Details;
