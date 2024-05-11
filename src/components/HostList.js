import React from "react";
import { Card } from "semantic-ui-react";
import Host from "./Host";

function HostList({ hosts, onHostSelect, selectedHost }) {

  const renderHosts = hosts.map(host => <Host key={host.id} host={host} onHostSelect={onHostSelect} selectedHost={selectedHost}/>)
  
  return (
    <Card.Group itemsPerRow={6}>{renderHosts}</Card.Group>
  );
}

export default HostList;
