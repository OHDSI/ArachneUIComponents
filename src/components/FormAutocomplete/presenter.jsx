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

import React, { PropTypes } from 'react';
import Autocomplete from 'components/Autocomplete/index';
import BEMHelper from 'services/BemHelper';

require('./style.scss');

function FormAutocomplete(props) {
  const {
    clearable,
    fetchOptions,
    mods,
    multi,
    options,
    placeholder,
    canCreateNewOptions,
    promptTextCreator,
    onNewOptionClick,
    optionRenderer,
    filterOptions,
    disabled,
    wrapperClassName,
    ariaLabel,
    dataTooltipConf,
    onBlurResetsInput = false,
    onSelectResetsInput = false,
    tabindex,
    // redux-form props
    input,
    meta,
    required,
  } = props;

  return (
    <Autocomplete
      mods={mods}
      multi={multi}
      options={options}
      clearable={clearable}
      placeholder={placeholder}
      fetchOptions={fetchOptions}
      canCreateNewOptions={canCreateNewOptions}
      promptTextCreator={promptTextCreator}
      onNewOptionClick={onNewOptionClick}
      optionRenderer={optionRenderer}
      filterOptions={filterOptions}
      disabled={disabled}
      wrapperClassName={wrapperClassName}
      ariaLabel={ariaLabel}
      dataTooltipConf={dataTooltipConf}
      onBlurResetsInput={onBlurResetsInput}
      onSelectResetsInput={onSelectResetsInput}
      tabindex={tabindex}
      isRequired={required}
      {...input}
    />
  );
}

FormAutocomplete.propTypes = {
  clearable: PropTypes.bool,
  fetchOptions: PropTypes.func.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  mods: PropTypes.any,
  multi: PropTypes.bool,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  canCreateNewOptions: PropTypes.bool,
  promptTextCreator: PropTypes.func,
  onNewOptionClick: PropTypes.func,
  optionRenderer: PropTypes.func,
  filterOptions: PropTypes.func,
  disabled: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  ariaLabel: PropTypes.string,
  dataTooltipConf: PropTypes.string,
  onSelectResetsInput: PropTypes.bool,
  onBlurResetsInput: PropTypes.bool,
  required: PropTypes.bool,
}

export default FormAutocomplete;
