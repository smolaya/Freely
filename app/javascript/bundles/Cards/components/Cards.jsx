import React from 'react';
import axios from 'axios';
import { Grid, Card } from 'semantic-ui-react';
import CardsList from '../bundles/Cards/components/CardsList';

const Cards = props => {
  return (
    <div>
      <Grid.Column>
        <Grid.Row>
          <Card>
            <Card.Content>
              <Card.Header>Card</Card.Header>
              <Card.Meta>
                <span>{this.props.name}</span><br/>
              </Card.Meta>
              <Card.Description>{this.props.cards}</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Row>
      </Grid.Column>
    </div>   
  )
}  
export default Cards