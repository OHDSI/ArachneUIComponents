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
import { Field } from 'redux-form';
import BEMHelper from 'services/BemHelper';

import Button from 'components/Button';
import Fieldset from 'components/Fieldset';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';

import FacetedSearchSection from './FacetedSearchSection';

require('./style.scss');

function FacetedSearch(props) {
  const {
    doClear,
    doSubmit,
    dynamicFields,
    fullTextSearchEnabled,
    handleSubmit,
    sortingEnabled,
    showRefineSearch = true,
    submitBtnConfig,
    emptyOptionsDisabled,

    isAccordion,
    openedSectionId,
    onSectionTitleClick,
    maxSectionHeight,
    setMaxSectionHeight,

    mods = [],
  } = props;

  const classes = new BEMHelper('faceted-search');
  const submitBtn = {
    label: 'Update',
    loadingLabel: 'Updating',
    mods: ['submit', 'rounded'],
    ...submitBtnConfig
  };

  const formFields = {
    query: {
      name: 'query',
      InputComponent: {
        component: FormInput,
        props: {
          placeholder: 'keywords',
          type: 'search',
          mods: ['bordered'],
        },
      },
    },
    sorting: {
      name: 'sorting',
      InputComponent: {
        component: FormSelect,
        props: {
          mods: ['bordered'],
          isMulti: false,
          placeholder: 'sort by',
          options: [], // props.sortingOptions
        },
      },
    },
  };
  return (
    <div {...classes({ modifiers: { accordion: isAccordion } })}>
      <form onSubmit={handleSubmit(doSubmit)} {...classes('form')}>
        <div
          {...classes('form-fields')}
          ref={element => {
            if (element && maxSectionHeight === null) {
              const headerElList = document.querySelectorAll('[id^=react-safona-item-title]');
              let maxHeight = element.getBoundingClientRect().height;
              if (headerElList.length > 0) {
                const headerHeight = headerElList[0].getBoundingClientRect().height;
                maxHeight -= (headerHeight+1) * headerElList.length;
              }
              if (maxHeight && dynamicFields.length) {
                setMaxSectionHeight(maxHeight)
              }
            }
          }}
        >
          {fullTextSearchEnabled &&
            <div {...classes('static-section')}>
              <Field component={Fieldset} {...formFields.query} />
            </div>
          }
          {/*sortingEnabled &&
            <div {...classes('static-section')}>
              <Field component={Fieldset} {...formFields.sorting} />
            </div>
          */}
          {showRefineSearch &&
            <div {...classes('refine-search-title')}>
              Refine Search
            </div>
          }
          {dynamicFields.map((section, key) => 
            isAccordion
            ? <FacetedSearchSection
                forceOpened={openedSectionId === key}
                {...section}
                emptyOptionsDisabled={emptyOptionsDisabled}
                isAccordion={true}
                key={key}
                toggle={() => onSectionTitleClick(key)}
                maxHeight={maxSectionHeight}
                isClosable={!section.forceOpened}
              />
            : <FacetedSearchSection
                {...section}
                emptyOptionsDisabled={emptyOptionsDisabled}
                isAccordion={false}
                key={key}
              />
          )}
        </div>
        <div {...classes('submit-wrapper')}>
          {!mods.includes('no-submit') &&
            <Button type="submit" {...submitBtn} {...classes('submit-button')} />
          }
          <Button
            {...classes('clear')}
            mods={['cancel', 'rounded']}
            type='button'
            label='Clear'
            onClick={doClear}
          />
        </div>
      </form>
    </div>
  );
}

FacetedSearch.propTypes = {
  doSubmit: PropTypes.func,
  dynamicFields: PropTypes.array.isRequired,
  fullTextSearchEnabled: PropTypes.bool.isRequired,
  sortingEnabled: PropTypes.bool.isRequired,
  showRefineSearch: PropTypes.bool,
  isAccordion: PropTypes.bool,
  openedSectionId: PropTypes.number,
  onSectionTitleClick: PropTypes.func,
  maxSectionHeight: PropTypes.nuber,
  setMaxSectionHeight: PropTypes.func,
  mods: PropTypes.arrayOf('no-submit'),
};

export default FacetedSearch;
