import React from "react";
import { Segment } from "semantic-ui-react";
import Area from '../components/Area';

function WestworldMap({ areas, activeHosts, onHostSelect }) {

  const renderAreas = areas.map(area => {
    const hostsInArea = activeHosts.filter(host => host.area === area.name)

    return <Area key={area.id} area={area} hosts={hostsInArea} onHostSelect={onHostSelect}/>
  })

  return <Segment id="map">{renderAreas}</Segment>;
}

export default WestworldMap;
