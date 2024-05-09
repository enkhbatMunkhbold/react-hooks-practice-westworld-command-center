import React from "react";
import { Segment } from "semantic-ui-react";
import Area from '../components/Area';

function WestworldMap({ areas, hosts }) {

  console.log('hosts active:', hosts)

  const renderAreas = areas.map(area => {
    const hostsInArea = hosts.filter(host => host.area === area.name)

    return <Area key={area.id} area={area} hosts={hostsInArea}/>
  })
  return <Segment id="map">{renderAreas}</Segment>;
}

export default WestworldMap;
