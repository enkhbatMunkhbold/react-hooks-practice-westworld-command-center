import React from "react";
import { Card } from "semantic-ui-react";
import Host from "./Host";

function HostList({ nonActiveHosts, onHostSelect }) {

  const renderHosts = nonActiveHosts.map(host => <Host key={host.id} host={host} onHostSelect={onHostSelect}/>)
  
  return (
    <Card.Group itemsPerRow={6}>{renderHosts}</Card.Group>
  );
}

export default HostList;
