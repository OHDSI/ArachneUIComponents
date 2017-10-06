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
import Toggle from 'react-toggle';
import BEMHelper from 'services/BemHelper';

require('./style.scss');

function ToggleButton(props) {
  const {
    value,
    onChange,
    isManaged = false,
  } = props;
  const classes = new BEMHelper('toggle');
  let additionalProps = {
    defaultChecked: !!value,
  };
  if (isManaged) {
    additionalProps = {
      checked: !!value,
    };
  }

  return (
    <div
      {...classes({ extra: props.className })}
    >
      <Toggle
        icons={false}
        onChange={onChange}
        {...additionalProps}
      />
    </div>
  );
}

ToggleButton.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  isManaged: PropTypes.bool,
};

export default ToggleButton;
