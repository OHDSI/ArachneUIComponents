/*
 *
 * Copyright 2018 Observational Health Data Sciences and Informatics
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
import BEMHelper from 'services/BemHelper';

require('./style.scss');

function FormInput(props) {
  const classes = new BEMHelper('form-input');
  const {
    className,
    mods,
    placeholder,
    required,
    type,
    /* redux-form props */
    input,
    meta,
    disabled,
  } = props;

  return (
    <input
      {...classes({ modifiers: mods, extra: className })}
      disabled={meta.submitting || disabled}
      type={type}
      placeholder={placeholder + (required ? '*' : '')}
      {...input}
    />
  );
}

FormInput.propTypes = {
  className: PropTypes.any,
  mods: PropTypes.any,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

export default FormInput;
