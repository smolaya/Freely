import React from 'react';
import axios from 'axios';
import { Grid, Card } from 'semantic-ui-react';
import CardsList from './CardsList';

const Cards = props => {
  console.log(props)
  return (
    <div>
      <Grid.Column>
        <Grid.Row>
          <Card>
            <Card.Content>
              <Card.Header>Card</Card.Header>
              <Card.Meta>
                {props.eventcard.name.text}
              </Card.Meta>
              <Card.Description>{props.eventcard.description.text}</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Row>
      </Grid.Column>
    </div>   
  )
}  
export default Cards
