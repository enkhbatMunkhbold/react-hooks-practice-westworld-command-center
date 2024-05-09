import React from "react";
import { Segment } from "semantic-ui-react";
import Area from '../components/Area';

function WestworldMap({ areas, hosts }) {

  const activeHosts = hosts.filter(host => host.active)

  const renderAreas = areas.map(area => {
    const hostsInArea = activeHosts.filter(host => host.area === area.name)

    return <Area key={area.id} area={area} hosts={hostsInArea}/>
  })

  return <Segment id="map">{renderAreas}</Segment>;
}

export default WestworldMap;
