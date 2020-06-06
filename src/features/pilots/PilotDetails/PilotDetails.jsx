import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Form,
  Dropdown,
  Grid,
  Button,
} from 'semantic-ui-react';

import { getEntitiesSession } from '../../entities/entitySelectors';
import { getEditingEntitiesSession } from '../../editing/editingSelectors';

import { selectCurrentPilot, selectIsEditingPilot } from '../pilotsSelector';

import { 
  startEditingPilot,
  stopEditingPilot,
} from '../pilotsActions';

import {
  editItemAttributes,
} from '../../../features/editing/editingActions'


import { getValueFromEvent } from '../../../common/utils/clientUtils';

const RANKS = [
  {value: "Private", text : "Private"},
  {value: "Corporal", text : "Corporal"},
  {value: "Sergeant", text : "Sergeant"},
  {value: "Lieutenant", text : "Lieutenant"},
  {value: "Captain", text : "Captain"},
  {value: "Major", text : "Major"},
  {value: "Colonel", text : "Colonel"},
];

const SKILL_VALUES = [
  {value : 0, text : 0},
  {value : 1, text : 1},
  {value : 2, text : 2},
  {value : 3, text : 3},
  {value : 4, text : 4},
  {value : 5, text : 5},
  {value : 6, text : 6},
  {value : 7, text : 7},
  {value : 8, text : 8},
]

const MECHS = [
  {value: 'WHM-6R', text : 'Warhammer WHM-6R'}
];


const mapState = state => {
  let pilot;

  const currentPilot = selectCurrentPilot(state);
  
  const pilotIsSelected = Boolean(currentPilot);
  const isEditingPilot = selectIsEditingPilot(state);

  if(pilotIsSelected) {
    const session = isEditingPilot ? 
      getEditingEntitiesSession(state) :
      getEntitiesSession(state);

    const {Pilot} = session;

    if(Pilot.idExists(currentPilot)) {
      pilot = Pilot.withId(currentPilot).ref;
    }
  }

  return {pilot, pilotIsSelected, isEditingPilot}
}

const actions = {
  startEditingPilot,
  stopEditingPilot,
  editItemAttributes
}


export class PilotDetails extends Component {
  constructor(props) {
    super(props)
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onDropdownChanged = this.onDropdownChanged.bind(this);
    this.onStartEditingClicked = this.onStartEditingClicked.bind(this);
    this.onStopEditingClicked = this.onStopEditingClicked.bind(this);
  }

  onStartEditingClicked () {
    const {id} = this.props.pilot;
    this.props.startEditingPilot()
  }

  onStopEditingClicked () {
    const {id} = this.props.pilot;
    this.props.stopEditingPilot()
  }

  onInputChanged (e) {
    const newValues = getValueFromEvent(e);
    const {id} = this.props.pilot;

    this.props.editItemAttributes('Pilot', id, newValues);
  }
  
  onDropdownChanged (e, result) {
    const {name, value} = result;
    const newValues = {[name] : value};
    const {id} = this.props.pilot;
    
    this.props.editItemAttributes('Pilot', id, newValues);
  }
  
  render() {  
    const { pilot={}, pilotIsSelected=false, isEditingPilot=false } = this.props

    const {
      name = "",
      rank = "",
      age = "",
      gunnery = "",
      piloting = "",
      mechType = "",
    } = pilot;
  
    const canStartEditing = pilotIsSelected && !isEditingPilot;
    const canStopEditing = pilotIsSelected && isEditingPilot;
  
  
    return (
      <Form size="large">
        <Form.Field
            name="name"
            label="Name"
            width={16}
            control="input"
              placeholder="Name"
              value={name}
              disabled={!canStopEditing}
              onChange={this.onInputChanged}
              />
        <Form.Field
            name="rank"
            label="Rank"
            width={16}
            control={Dropdown}
              fluid
              selection
              options={RANKS}
              value={rank}
              disabled={!canStopEditing}
              onChange={this.onDropdownChanged}
              />
        <Form.Field
            name="age"
            label="Age"
            width={6}
            control="input"
            placeholder="Age"
            value={age}
            disabled={!canStopEditing}
            onChange={this.onInputChanged}
            />
        <Form.Field
            name="gunnery"
            label="Gunnery"
            width={6}
            control={Dropdown}
            fluid
            selection
            options={SKILL_VALUES}
            value={gunnery}
            disabled={!canStopEditing}
            onChange={this.onDropdownChanged}
            />
        <Form.Field
            name="piloting"
            label="Piloting"
            width={6}
            control={Dropdown}
            fluid
              selection
              options={SKILL_VALUES}
              value={piloting}
              disabled={!canStopEditing}
              onChange={this.onDropdownChanged}
              />
        <Form.Field
            name="mech"
            label="Mech"
            width={16}
            control={Dropdown}
              fluid
              selection
              options={MECHS}
              value={mechType}
              disabled={!canStopEditing}
              onChange={this.onDropdownChanged}
              />
        <Grid.Row width={16}>
          <Button
            primary
            disabled={!canStartEditing}
            type="button"
            onClick={this.onStartEditingClicked} 
            >
              Start Editing
          </Button>
          <Button
            primary
            disabled={!canStopEditing}
            type="button"
            onClick={this.onStopEditingClicked}
            >
              Stop Editing
          </Button>
  
        </Grid.Row>
      </Form>       
    )
  }
}


export default connect(mapState, actions)(PilotDetails);
