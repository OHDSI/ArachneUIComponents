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

import React from 'react';
import BEMHelper from 'services/BemHelper';
import classNames from 'classnames';
import flatten from 'lodash/flatten';

require('./style.scss');

/**
 * Returns result value of component after selecting new value.
 * @param  {Array}   currentValue
 * @param  {any}     newSelected
 * @param  {Boolean} isMulti
 * @return {any}
 */
function getSelectValue(currentValue, newSelected, isMulti) {
  let value;
  let index;

  if (isMulti) {
    value = [...currentValue];
    index = value.indexOf(newSelected);
    if (index === -1) {
      value.push(newSelected);
    } else {
      value.splice(index, 1);
    }
    value = value.filter(el => el);
  } else {
    value = newSelected instanceof Array ? newSelected[0] : newSelected;
  }
  return value;
}

function SelectControl({ mods, placeholder, labels, expanded }) {
  const classes = new BEMHelper('select-control');
  const isLabelSet = Array.isArray(labels) && labels.length !== 0;

  const getLabel = () => {
    return (
      <span {...classes('label')}>
        {typeof labels[0] === 'string'
          ? labels.join(', ')
          : flatten(labels.map((el, i) => (i + 1) < labels.length ? [el, <span {...classes('comma')}>,</span>] : [el]))
        }
      </span>
    );
  }

  return (
    <div {...classes({ modifiers: { ...mods, expanded } })}>
      {isLabelSet
        ? getLabel()
        : <span {...classes('label', 'empty')}>{placeholder}</span>
      }
      <div {...classes('arrow-wrapper')}>
        <i {...classes('arrow')} />
      </div>
    </div>
  );
}

function Option({ label, value, selected, onSelect }) {
  const classes = new BEMHelper('select-option');

  return (
    <li {...classes({ modifiers: { selected } })} onClick={() => onSelect(value)}>
      {typeof label === 'string'
        ? <span {...classes('label')}>{label}</span>
        : React.cloneElement(label, { selected: selected, isOption: true })
      }
    </li>
  );
}

function getNextOption(options, index) {
  const nextIndex = index === options.length-1 ? 0 : index + 1;
  return options[nextIndex].value;
}

function getPrevOption(options, index) {
  const prevIndex = index === 0 ? options.length-1 : index - 1;
  return options[prevIndex].value;
}

function Select(props) {
  const {
    className,
    expanded,
    disabled,
    isMulti,
    onBlur,
    onFocus,
    onChange,
    options,
    placeholder,
  } = props;
  let {
    mods,
    value,
  } = props;

  mods = mods || {};
  value = value instanceof Array ? value : [value];

  const classes = new BEMHelper('select');
  const selectControlMods = {
    bordered: !!~classNames(mods).split(' ').indexOf('bordered'),
  };

  //   NOTE: do NOT use strict comparison as values passed from url are strings
  let selectedOptionIndex = -1;
  const selectedOptions = options.filter((option, i) => {
    const isOptionSelected = value.indexOf(option.value) !== -1;
    if (isOptionSelected){
      selectedOptionIndex = i;
    }

    return isOptionSelected;
  });
  const label = selectedOptions.map(option => option.label);
  const getVal = newSelected => getSelectValue(value, newSelected, isMulti);

  return (
    <div
      {...classes({ modifiers: classNames({ disabled, expanded }, mods), extra: className })}
      onFocus={onFocus}
      onKeyDown={(e) => {
        if (!expanded) {
          return false;
        }
        switch (e.nativeEvent.key) {
          case 'ArrowUp':
            e.preventDefault();
            onChange(getPrevOption(options, selectedOptionIndex));
            break;
          case 'ArrowDown':
            e.preventDefault();
            onChange(getNextOption(options, selectedOptionIndex));
            break;
          case 'Enter':
            onBlur(getVal(value));
            break;
          case 'Tab':
            onBlur(getVal(value));
            break;
          default:
            break;
        }
      }}
      tabIndex={isMulti ? null : '0'}
    >
      <div {...classes('outer')} onClick={() => onBlur(getVal(value))} />
      <input {...classes('input')} type="hidden" value={getVal(value)} />
      <div {...classes('control')} onMouseDown={(e) => expanded ? onBlur(getVal(value)) : onFocus()}>
        <SelectControl
          mods={selectControlMods}
          placeholder={placeholder}
          labels={label}
          expanded={expanded}
        />
      </div>
      <ul {...classes('options')}>
        {options.map((option, key) => {
          const selected = selectedOptions.indexOf(option) !== -1;
          return <Option
            {...option}
            selected={selected}
            onSelect={(selectedValue) => {
              let nextValue = selectedValue;
              if (!isMulti && selected) {
                nextValue = null;
              }
              onChange(getVal(nextValue));
              onBlur(getVal(nextValue));
            }} key={key}
          />
        }
        )}
      </ul>
    </div>
  );
}

export default Select;
