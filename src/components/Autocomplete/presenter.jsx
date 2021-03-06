/*
 *
 * Copyright 2018 Odysseus Data Services, inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Company: Odysseus Data Services, Inc.
 * Product Owner/Architecture: Gregory Klebanov
 * Authors: Pavel Grafkin, Alexander Saltykov
 * Created: March 01, 2017
 *
 */

import React, { Component, PropTypes } from 'react';
import BEMHelper from 'services/BemHelper';
import Select, { Creatable } from 'react-select';
import { TetheredSelect } from './TetherComponent';

require('./style.scss');

class Autocomplete extends Component {

  componentWillMount() {
    this.props.fetchOptions({ query: null });
  }

  render() {
    const classes = new BEMHelper('autocomplete');
    const materialClasses = new BEMHelper('material-icons');
    let refSelect;
    const {
      useSearchIcon = true,
      placeholder,
      isRequired,
      tethered = false,
    } = this.props;

    const commonSettings = {
      autoBlur: true,
      onInputChange: (inputValue) => {
        this.props.onChange(null);
        this.props.fetchOptions({ query: inputValue });
        return inputValue;
      },
      onBlur: () => this.props.onBlur(this.props.value || null),
      onSelectResetsInput: false,
      onBlurResetsInput: false,
      disabled: this.props.disabled,
    };

    return (
      <div
        {...classes({
          modifiers: this.props.mods,
          extra: this.props.wrapperClassName,
        })}
        aria-label={this.props.ariaLabel}
        data-tooltip-conf={this.props.dataTooltipConf}
        tabIndex={this.props.tabindex}
      >
        {this.props.canCreateNewOptions ?
          <Creatable
            ref={(element) => { if (element !== null) refSelect = element.select; }}
            {...classes('select')}
            simpleValue
            {...commonSettings}
            {...this.props}
            onNewOptionClick={(opt) => {
              this.props.onNewOptionClick(opt).then((val) => {
                refSelect.blurInput();
                this.props.onChange(val);
              });
            }}
            promptTextCreator={this.props.promptTextCreator}
            scrollMenuIntoView={false}
          />
          :
          tethered ? (
            <TetheredSelect
              simpleValue
              {...commonSettings}
              {...this.props}
              ref={this.props.reference}
              placeholder={placeholder + (isRequired ? '*' : '')}
              filterOptions={this.props.filterOptions}
            />
          ) : (
            <Select
              {...classes('select')}            
              simpleValue
              {...commonSettings}
              {...this.props}
              ref={this.props.reference}
              placeholder={placeholder + (isRequired ? '*' : '')}
              filterOptions={this.props.filterOptions}
              menuPortalTarget={<div></div>}
            />
          )}
        {useSearchIcon &&
          <div {...classes('search')}>
            <i {...classes({ element: 'search-ico', extra: materialClasses({ modifiers: 'medium' }).className })}>
              search
            </i>
          </div>
        }
      </div>
    );
  }

}

Autocomplete.propTypes = {
  fetchOptions: PropTypes.func.isRequired,
  mods: PropTypes.any,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  canCreateNewOptions: PropTypes.bool,
  promptTextCreator: PropTypes.func,
  onNewOptionClick: PropTypes.func,
  filterOptions: PropTypes.func,
  tabindex: PropTypes.number,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  tethered: PropTypes.bool,
};

export default Autocomplete;
