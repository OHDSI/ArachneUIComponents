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
import Checkbox from 'components/Checkbox';
import BEMHelper from 'services/BemHelper';

require('./style.scss');

function FormCheckbox(props) {
  const classes = new BEMHelper('form-checkbox');
  const {
    className,
    mods,
    options,
    tabindex,
    /* redux-form props */
    input,
    meta,
  } = props;

  return (
    <div {...classes()} tabIndex={tabindex}>
      <Checkbox
        {...classes({ extra: className, mods: mods })}
        {...input}
        isChecked={input.value === true}
        onChange={val => input.onChange(val)}
        label={options.label}
      />
    </div>
  );
}

FormCheckbox.propTypes = {
  className: PropTypes.string,
  mods: PropTypes.array,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  tabindex: PropTypes.number,
}

export default FormCheckbox;
