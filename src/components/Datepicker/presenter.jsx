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
import moment from 'moment';
import { canUseDom } from 'services/Utils';

require('./style.scss');

function Datepicker({ className, selected, customInput, minDate, maxDate, onChange }) {
  let DatePicker = <span>{customInput}</span>;
  if (canUseDom()) {
    const ReactDatePickerModule = require('react-datepicker');
    let ReactDatePicker = ReactDatePickerModule.default; // webpack 1
    if (!ReactDatePicker) {
      ReactDatePicker = ReactDatePickerModule; // webpack 2+
    }
    DatePicker = (<ReactDatePicker
      className={className}
      selected={moment(selected)}
      minDate={minDate}
      maxDate={maxDate}
      customInput={customInput}
      onChange={onChange}
    />);
  }
  return DatePicker;
}

Datepicker.propTypes = {
  className: PropTypes.any,
  customInput: PropTypes.any,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  onChange: PropTypes.func,
  // selected date
  selected: PropTypes.oneOfType([
    React.PropTypes.number, // timestamp
    React.PropTypes.string, // e.g. '2016-12-28'
    React.PropTypes.instanceOf(Date),
    React.PropTypes.instanceOf(moment)
  ]),
};

export default Datepicker;
