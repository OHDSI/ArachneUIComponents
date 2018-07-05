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
import BEMHelper from 'services/BemHelper';
import FileInput from 'components/FileInput/index';
import get from 'lodash/get';

function FormFileInput(props) {
  const {
    input,
    onChangeCustom,
  } = props;

  let onChange;
  if (onChangeCustom) {
    onChange = val => onChangeCustom(val, input.onChange);
  } else {
    onChange = input.onChange;
  }

  return (
    <FileInput
      {...props}
      onChange={onChange}
      value={
        Array.isArray(input.value)
        ? get(input.value, '[0].name', '')
        : input.value
      }
    />
  );
}

FormFileInput.propTypes = {
  input: PropTypes.object.isRequired,
  onChangeCustom: PropTypes.func,
}

export default FormFileInput;
