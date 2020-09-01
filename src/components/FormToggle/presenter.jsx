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
 * Created: September 14, 2017
 *
 */

import React, { PropTypes } from 'react';
import BEMHelper from 'services/BemHelper';
import ToggleButton from 'components/Toggle';

require('./style.scss');

function FormToggle(props) {
  const { input, className, label, isManaged } = props;
  const classes = new BEMHelper('form-toggle');
  return (
    <div {...classes({ extra: className })}>
      <div {...classes('label')}>{label}</div>
      <ToggleButton
        {...classes('toggle')}
        onChange={(e) => input.onChange(e.target.checked)}
        value={input.value}
        isManaged={isManaged}
      />
    </div>
  );
}

FormToggle.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.bool,
    onChange: PropTypes.func,
  }),
  className: PropTypes.string,
  label: PropTypes.string,
  isManaged: PropTypes.bool,
};

export default FormToggle;
