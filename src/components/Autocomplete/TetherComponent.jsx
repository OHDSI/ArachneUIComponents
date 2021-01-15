import React from 'react';
import Select from 'react-select';
import TetherComponent from 'react-tether';


export class TetheredSelect extends Select {
  constructor(props) {
    super(props);
    this.renderOuter = this._renderOuter;
  }

  componentDidMount() {
    super.componentDidMount.call(this);
  }

  _renderOuter() {
    const menu = super.renderOuter.apply(this, arguments);
    if (!menu) return;

    return (
      <TetherComponent
        renderElementTo={this.d}
        ref="tethered-component"
        attachment="top left"
        targetAttachment="top left"
        constraints={[{
            to: 'window',
            attachment: 'together',
            pin: ['top'],
        }]}
      >
        <div></div>
        {React.cloneElement(menu, { style: { position: 'static' }})}
      </TetherComponent>
    );
  }
}