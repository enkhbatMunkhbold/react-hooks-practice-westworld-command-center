import React from "react";
import "../stylesheets/Area.css";
// import Host from "./Host";
import HostList from "./HostList";

function Area({ area, hosts, onHostSelect }) {

  const areaName = area.name.split('_').map(str => str[0].toUpperCase() + str.slice(1).toLowerCase()).join(' ')

  return (
    <div className="area" id={area.name}  >
      <h3 className="labels">{areaName}</h3>
      <HostList hosts={hosts} onHostSelect={onHostSelect}/>
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
