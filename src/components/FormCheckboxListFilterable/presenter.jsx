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
 * Created: May 22, 2017
 *
 */

import React, { PropTypes } from 'react';
import BEMHelper from 'services/BemHelper';
import FormCheckboxList from 'components/FormCheckboxList';
import Button from 'components/Button';
import Fuse from 'fuse.js';

require('./style.scss');

function FormCheckboxListFilterable(props) {
  const classes = new BEMHelper('form-checkbox-list-filterable');
  const {
    expand,
    collapse,
    isExpanded,
    options,
    filter,
    filterText,
    listHeight,
    hasFilter,
    searchField = 'value',
    tabindex,
  } = props;
  const fuseSearch = new Fuse(options, {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    threshold: 0.2,
    location: 0,
    distance: 10,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [searchField]
  });
  const filteredOptions = filterText ? fuseSearch.search(filterText) : options;

  return (
    <div {...classes()} tabIndex={tabindex}>
      {hasFilter === true
        ? <div>
            <input {...classes('filter-input')} onChange={(evt) => filter(evt.target.value)} placeholder='filter'/>
            {filteredOptions.length
              ? <div {...classes('list-wrapper')}>
                  <FormCheckboxList
                    {...props}
                    options={filteredOptions}
                  />
                </div>
              : <span {...classes('empty-state')}>No results</span>
            }
          </div>
        :
          <FormCheckboxList
            {...props}
            options={options}
          />
      }
    </div>
  );
}

FormCheckboxListFilterable.propTypes = {
  expand: PropTypes.func,
  collapse: PropTypes.func,
  isExpanded: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  filter: PropTypes.func,
  filterText: PropTypes.string,
  listHeight: PropTypes.number,
  hasFilter: PropTypes.bool,
  searchField: PropTypes.string,
  tabindex: PropTypes.number,
}

export default FormCheckboxListFilterable;
