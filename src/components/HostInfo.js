import React, { useState } from "react";
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

function HostInfo({ selectedHost, areas, onChangeHostsInArea }) {
  // This state is just to show how the dropdown component works.
  // Options have to be formatted in this way (array of objects with keys of: key, text, value)
  // Value has to match the value in the object to render the right text.
  const areaProperties = areas.map(area => {
    const areaName = area.name.split('_').map(str => str[0].toUpperCase() + str.slice(1).toLowerCase()).join(' ')

    return {key: area.name, text: areaName, value: area.name}
  } ) 
 
  // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  const [options] = useState(areaProperties);

  const [value, setValue] = useState(selectedHost.area);

  function handleOptionChange(e, { value }) {
    console.log(e.target)
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger or console.log in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
    fetch(`http://localhost:3001/hosts/${selectedHost.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({area: value, active: true})
    }).then(res => res.json())
    .then(updatedHost => {
      onChangeHostsInArea(updatedHost)
    })
    setValue(value)
  }

  function handleRadioChange() {
    console.log("The radio button fired");
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={selectedHost.imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {selectedHost.firtsName} | {selectedHost.gender === 'Male' ? <Icon name="man" /> : <Icon name="woman" />}
              {/* Think about how the above should work to conditionally render the right First Name and the right gender Icon */}
            </Card.Header>
            <Card.Meta>
              {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
              {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
              <Radio
                onChange={handleRadioChange}
                label={"Active"}
                checked={true}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={value}
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
