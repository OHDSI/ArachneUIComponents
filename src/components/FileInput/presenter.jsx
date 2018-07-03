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
import Dropzone from 'react-dropzone';
import Button from 'components/Button/index';
import ListItem from 'components/ListItem';
import Link from 'components/Link';

require('./style.scss');

function FileInput(props) {
  const classes = new BEMHelper('file-input');
  const tooltipClasses = new BEMHelper('tooltip');
  const {
    dropzonePlaceholder,
    placeholder,
    filePlaceholder,
    multiple,

    value,
    onChange,
  } = props;

  let dropzone;
  const mode = multiple ? 'add' : 'set'; // or 'set'
  const openDropzone = () => {
    dropzone.open();
  }
  let values = Array.isArray(props.input.value) ? Array.from(props.input.value) : [];
  values = values.map((value) => {
    if ('undefined' == typeof value.label) {
      value.label = value.name;
      value.originalName = value.name;
    }
    return value;
  });
  const label = values.length > 1 ? `Multiple files (${values.length})` : value;

  return (
    <div {...classes()}>
      <div {...classes('input-wrapper')}>
        <input
          {...classes('input')}
          type="text"
          value={label}
          placeholder={placeholder}
          onChange={onChange}
          disabled='disabled'
        />
        <Button
          {...classes('btn')}
          mods={['submit', 'rounded']}
          label="Browse"
          onClick={openDropzone}
        />
      </div>
      <div {...classes('multiple-note-wrapper')}>
        <span {...classes('multiple-note')}>OR</span>
      </div>
      <Dropzone
        {...classes('dropzone')}
        ref={dz => dropzone = dz}
        multiple={multiple}
        onDrop={(val) => {
          if(mode === 'add') {
            return onChange(val.concat(values));
          }
          return onChange(val);
        }}
      >
        {dropzonePlaceholder}
      </Dropzone>
      <ul {...classes('files-list')}>
        {values.map((value, index) => {
          return value instanceof File
          ? <ListItem mods={['removable', 'borderless']} key={index} onRemove={() => {
                values.splice(index, 1);
                onChange(values);
              }}
            >
            <div
              {...classes({ element: 'input-wrapper', extra: tooltipClasses().className })}
              aria-label={filePlaceholder}
            >
              <input
                {...classes('input')}
                value={value.label}
                placeholder={filePlaceholder}
                onChange={(evt) => {
                  const changedFile = new File([value], evt.target.value);
                  changedFile.label = evt.target.value;
                  values[index] = changedFile;
                  onChange(values);
                }}
              />
            </div>
            <div
              {...classes({ element: 'input-wrapper', extra: tooltipClasses().className })}
              aria-label='File name'
            >
              <input
                {...classes('input')}
                value={value.originalName}
                disabled='disabled'
              />
            </div>
          </ListItem>
        : null
        }
        )}
      </ul>
    </div>
  );
}

FileInput.propTypes = {
  dropzonePlaceholder: PropTypes.string,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any.isRequired,
};

export default FileInput;
