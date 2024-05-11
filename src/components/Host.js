import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({ host, onHostSelect, selectedHost }) {
  /* NOTE: The className "host selected" renders a different style than simply "host". */

  function handleClick() {  
    onHostSelect(host)
  }

  return (
    <Card
      className={host.authorized ? 'host selected' : 'host'}
      onClick={handleClick}
      image={host.imageUrl}
      raised
      link
    />
  );
}

export default Host;
