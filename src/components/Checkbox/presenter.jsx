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

function Checkbox({ className, isChecked, onChange, name, label, children }) {
  const classes = new BEMHelper('checkbox');
  const materialClasses = new BEMHelper('material-icons');

  return (
    <label {...classes({ modifiers: { checked: isChecked }, extra: className })}>
      <input
        onChange={onChange}
        name={name}
        {...classes('input')}
        type="checkbox"
        checked={isChecked}
      />
      <span {...classes('box')}>
        <i {...materialClasses({ extra: classes('check').className })}>check</i>
      </span>
      {label
        ? <span {...classes('checkbox-label')}>{label}</span>
        : children
      }
    </label>
  );
}

Checkbox.propTypes = {
  className: PropTypes.any,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
};

export default Checkbox;
