import React, { useEffect, useState } from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";

function HostInfo({ selectedHost, areas, onUpdateHost }) {
  // This state is just to show how the dropdown component works.
  // Options have to be formatted in this way (array of objects with keys of: key, text, value)
  // Value has to match the value in the object to render the right text.

  const areaProperties = areas.map(area => {
    const areaName = area.name.split('_').map(str => str[0].toUpperCase() + str.slice(1).toLowerCase()).join(' ')
    return {key: area.name, text: areaName, value: area.name}
  } ) 
 
  const { id, firtsName, imageUrl, gender, area, active } = selectedHost
  // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  const [options] = useState(areaProperties);
  const [pickArea, setPickArea] = useState(null);
  const [isActive, setIsActive] = useState(null)

  useEffect(() => {
    setIsActive(active)
    setPickArea(area)
  }, [active, area])

  function handleOptionChange(e, { value }) {
   
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger or console.log in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled

    fetch(`http://localhost:3001/hosts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({area: value})
    }).then(res => res.json())
    .then(updatedHost => onUpdateHost(updatedHost))
    setPickArea(value)
  }

  function handleRadioChange() {
    
    fetch(`http://localhost:3001/hosts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({active: !isActive})
    }).then(res => res.json())
    .then(updatedHost => {
      onUpdateHost(updatedHost)
      setIsActive(updatedHost.active)
    })
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {firtsName} | {gender === 'Male' ? <Icon name="man" /> : <Icon name="woman" />}
              {/* Think about how the above should work to conditionally render the right First Name and the right gender Icon */}
            </Card.Header>
            <Card.Meta>
              {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
              {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
              <Radio
                onChange={handleRadioChange}
                label={isActive ? "Active" : 'Decommissioned'}
                checked={isActive}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={pickArea}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
