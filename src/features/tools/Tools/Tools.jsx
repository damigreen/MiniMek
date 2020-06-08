import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Button,
} from 'semantic-ui-react';

import { loadUnitData } from '../toolActions';
import { openModal } from '../../modals/modalActions';

const actions = {loadUnitData, openModal}

class Tools extends Component {
  constructor(props) {
    super(props)
    this.onOpenModalClicked = this.onOpenModalClicked.bind(this);
  }

  onOpenModalClicked () {
    this.props.openModal('TestModal', {a : 42});
  }

  render() {
    const { loadUnitData } = this.props;
  
    return (
      <Segment attached="bottom">
        <Button onClick={loadUnitData}>Reload Unit Data</Button>
        <Button primary onClick={this.onOpenModalClicked}>Show Test Modal</Button>
      </Segment>
    )
  }
}

export default connect(null, actions)(Tools);
