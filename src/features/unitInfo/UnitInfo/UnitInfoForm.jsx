import React, { Component} from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Dropdown,
  Segment,
} from 'semantic-ui-react';

import { selectUnitInfo } from '../unitInfoSelector';
import { updateUnitInfo, setUnitColor } from '../unitInfoActions';
import { showColorPicker } from '../../../common/components/ColorPicker/colorPickerAction';

import { getValueFromEvent } from '../../../common/utils/clientUtils';

import ColorPickerButton from '../../../common/components/ColorPicker/ColorPickerButton';


const FACTIONS = [
  {value : "cc", text : "Capellan Confederation"},
  {value : "dc", text : "Draconis Combine"},
  {value : "elh", text : "Eridani Light Horse"},
  {value : "fs", text : "Federated Suns"},
  {value : "fwl", text : "Free Worlds League"},
  {value : "hr", text : "Hansen's Roughriders"},
  {value : "lc", text : "Lyran Commonwealth"},
  {value : "wd", text : "Wolf's Dragoons"},
];


const mapState = state => ({
  unitInfo : selectUnitInfo(state)
});

const actions = {
  updateUnitInfo,
  showColorPicker,
  setUnitColor
}

class UnitInfoForm extends Component {
  onAffiliationChanged = (e, result) => {
    const {name, value} = result;

    const newValues = { [name] : value};
    this.props.updateUnitInfo(newValues);
  }

  onNameChanged = (e) => {
    const newValues = getValueFromEvent(e)
    this.props.updateUnitInfo(newValues);
  }

  
  // Handler to display the color picker dialog
  onColorClicked = () => {
    const onColorPickedAction = setUnitColor();
    
    this.props.showColorPicker(this.props.unitInfo.color, onColorPickedAction);
  }

  render() {
    const {unitInfo} = this.props;
    const {name, affiliation, color} = unitInfo;

    return(
        <Segment attached="bottom">
            <Form sizee="large">
              <Form.Group>
                <Form.Field name="name" >
                    <label>Unit Name</label>
                    <input
                      name="name"
                      placeholder="Name"
                      value={name}
                      onChange={this.onNameChanged}
                      />
                </Form.Field>
                <Form.Field name="Affiliation" width={14} >
                    <label>Affiliation</label>
                    <Dropdown 
                        name="affiliation"
                        selection 
                        options={FACTIONS}
                        value={affiliation}
                        onChange={this.onAffiliationChanged}
                    />
                </Form.Field>
                <Form.Field name="color">
                  <label>Color</label>
                  <ColorPickerButton
                    value={color}
                    onClick={this.onColorClicked}
                  />
                </Form.Field>

              </Form.Group>
            </Form>
        </Segment>
    )
  }
}

export default connect(mapState, actions)(UnitInfoForm);
