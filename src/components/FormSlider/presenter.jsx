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
import ReactDOM from 'react-dom';
import BEMHelper from 'services/BemHelper';
import { numberFormatter, canUseDom } from 'services/Utils';
import FormInput from 'components/FormInput';
require('./style.scss');

function FormSlider(props) {
  const classes = new BEMHelper('form-slider');
  const {
    className,
    input,
    max,
    meta,
    min,
  } = props;

  let from = min;
  let to = max;

  if (input.value.from) {
    from = input.value.from;
  }
  if (input.value.to) {
    to = input.value.to;
  }

  let SliderElement = <div ref={() => {}} />;
  if (canUseDom()) {
    const Slider = require('rc-slider');
    SliderElement = (<Slider
      {...classes('slider')}
      range={true}
      min={min}
      max={max}
      value={[from, to]}
      onChange={val => input.onChange({ from: val[0], to: val[1] })}
      ref={(sliderRef) => {
        if(sliderRef === null) {
          return;
        }
        const handleLower = ReactDOM.findDOMNode(sliderRef.refs['handle-0']);
        const handleUpper = ReactDOM.findDOMNode(sliderRef.refs['handle-1']);
        handleLower.setAttribute('data-value', numberFormatter.format(from, 'short'));
        handleUpper.setAttribute('data-value', numberFormatter.format(to, 'short'));
      }}
    />);
  }
  return (
    <div {...classes()}>
      <div {...classes('inputs')}>
        <FormInput
          {...classes('input')}
          mods={['bordered']}
          meta={meta}
          input={{
            onChange: e => input.onChange({
              from: parseInt(e.target.value),
              to: to
            }),
            value: from,
          }}
          type="number"
          placeholder="from"
        />
        <span {...classes('dash')}>-</span>
        <FormInput
          {...classes('input')}
          mods={['bordered']}
          meta={meta}
          input={{
            onChange: e => input.onChange({
              from: from,
              to: parseInt(e.target.value),
            }),
            value: to,
          }}
          type="number"
          placeholder="to"
        />
      </div>
      {SliderElement}
    </div>
  );
}

FormSlider.propTypes = {};

export default FormSlider;
