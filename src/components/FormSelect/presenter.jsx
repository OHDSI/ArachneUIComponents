/*
 *
 * Copyright 2017 Observational Health Data Sciences and Informatics
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
import Select from 'components/Select/index';
import BEMHelper from 'services/BemHelper';

require('./style.scss');

function FormSelect(props) {
  const classes = new BEMHelper('form-select');
  const {
    className,
    disabled,
    isMulti,
    mods,
    options,
    placeholder,
    unselectable = true,
    required,
    /* redux-form props */
    input,
    meta,
  } = props;

  return (
    <Select
      {...classes({ extra: className })}
      isMulti={isMulti}
      mods={mods}
      placeholder={placeholder}
      options={options}
      value={input.value}
      expanded={meta.active}
      disabled={meta.submitting || disabled}
      onFocus={() => input.onFocus()}
      onBlur={() => input.onBlur()}
      onChange={val => input.onChange(val)}
      unselectable={unselectable}
      required={required}
    />
  );
}

FormSelect.propTypes = {
  className: PropTypes.any,
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  isMulti: PropTypes.bool,
  meta: PropTypes.object.isRequired,
  mods: PropTypes.any,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  unselectable: PropTypes.bool,
}

export default FormSelect;