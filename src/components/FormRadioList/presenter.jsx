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
 * Created: September 14, 2017
 *
 */

import React, { PropTypes } from 'react';
import RadioButton from 'components/RadioButton';
import BEMHelper from 'services/BemHelper';

require('./style.scss');

function FormRadioList(props) {
  const classes = new BEMHelper('form-radio-list');
  const {
    className,
    options,
    emptyOptionsDisabled = true,
    /* redux-form props */
    input,
    meta,
  } = props;

  return (
    <div {...classes({ extra: className })}>
      {options.map((option, key) =>
        <RadioButton
          {...classes('item', { inactive: emptyOptionsDisabled && option.facetCount === 0 })}
          {...input}
          key={key}
          isChecked={input.value === option.value}
          onChange={e => input.onChange(e.target.value)}
          label={option.label}
          name={input.name}
          value={option.value}
        />
      )}
    </div>
  );
}

FormRadioList.propTypes = {

}

export default FormRadioList;
