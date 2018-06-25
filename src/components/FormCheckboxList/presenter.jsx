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
import Checkbox from 'components/Checkbox';
import BEMHelper from 'services/BemHelper';
import { toString } from 'services/Utils';

require('./style.scss');

function toggle(collection = [], item) {
  var idx = collection.indexOf(item);
  if(idx !== -1) {
    collection.splice(idx, 1);
  } else {
    collection.push(item);
  }
}

function FormCheckboxList(props) {
  const classes = new BEMHelper('form-checkbox-list');
  const {
    className,
    options,
    emptyOptionsDisabled = true,
    /* redux-form props */
    input,
    meta,
  } = props;

  let valueList = [];
  if (typeof input.value !== 'undefined' && input.value !== null && (typeof input.value !== 'string' || input.value.length !== 0)) {
    valueList = Array.isArray(input.value) ? input.value : [input.value];
  }
  valueList = (valueList).slice().map(item => item.toString());

  return (
    <div {...classes({ extra: className })}>
      {options.map((option, key) =>
        <Checkbox
          {...classes('item', { inactive: emptyOptionsDisabled && option.facetCount === 0 })}
          key={key}
          isChecked={valueList.includes(option.value.toString())}
          onChange={
            (val) => {
              const newValue = valueList.slice();
              toggle(newValue, option.value.toString());
              input.onChange(newValue);
            }
          }
          label={option.label}
          name={`${input.name}[${toString(option.value)}]`}
        />
      )}
    </div>
  );
}

FormCheckboxList.propTypes = {
}

export default FormCheckboxList;
