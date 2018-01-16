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
import { findDOMNode } from 'react-dom';
import BEMHelper from 'services/BemHelper';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-sanfona';
import { Field } from 'redux-form';
import Fieldset from 'components/Fieldset';
import FormCheckboxListFilterable from 'components/FormCheckboxListFilterable';
import FormSlider from 'components/FormSlider';
import FormToggle from 'components/FormToggle';
import FormRadioList from 'components/FormRadioList';
import className from 'classnames';

require('./style.scss');

class CustomAccordionItem extends AccordionItem {
  constructor(props) {
    super(props);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  onTransitionEnd() {
    this.setState({
      overflow: this.props.expanded && this.props.isClosable ? 'auto' : 'hidden',
    });
  }

  componentDidMount() {
    const body = findDOMNode(this.refs.body);
    body.addEventListener('transitionend', this.onTransitionEnd);
  }

  componentWillUnmount() {
    const body = findDOMNode(this.refs.body);
    body.removeEventListener('transitionend', this.onTransitionEnd);
  }

  setMaxHeight() {
    const bodyNode = findDOMNode(this.refs.body);    
    const maxHeight = this.props.isAccordion ? this.props.maxHeight : bodyNode.scrollHeight;
    const images = bodyNode.querySelectorAll('img');

    if (images.length > 0) {
      return this.preloadImages(bodyNode, images);
    }

    const hasFilter = this.props.maxHeight !== null && this.props.maxHeight < bodyNode.scrollHeight;
    let overflow = 'hidden';
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      overflow = this.props.expanded ? 'auto' : 'hidden';
    }

    this.setState({
      maxHeight: this.props.expanded ? `${maxHeight}px` : '0px',
      overflow,
      hasFilter,
    });

    if (hasFilter) {
      bodyNode.style.height = `${maxHeight}px`;
    }
  }

  render() {
    const {
      type,
      name,
      min,
      max,
      value,
      options,
      emptyOptionsDisabled,
      label,
      hasTitle,
      isMulti = true,
    } = this.props;
    return (
      <div {...this.getProps()} ref="item">
        {hasTitle &&
          <AccordionItemTitle
            className={this.props.titleClassName}
            title={this.props.title}
            onClick={this.props.disabled ? null : this.props.toggle}
            titleColor= {this.props.titleColor}
            uuid={this.uuid} />
        }
        <AccordionItemBody
          maxHeight={this.state.maxHeight}
          duration={this.state.duration}
          className={this.props.bodyClassName}
          overflow={this.state.overflow}
          ref="body"
          uuid={this.uuid}>
          {type === 'INTEGER' &&
            <Field
              component={Fieldset}
              name={name}
              InputComponent={
                {
                  component: FormSlider,
                  props: {
                    min,
                    max,
                    value,
                  },
                }
              }
            />
          }
          {type === 'ENUM' || type === 'ENUM_MULTI' ?
            <Field
              component={Fieldset}
              name={name}
              InputComponent={
                {
                  component: isMulti ? FormCheckboxListFilterable : FormRadioList,
                  props: {
                    options,
                    emptyOptionsDisabled,
                    hasFilter: this.state.hasFilter,
                  }
                }
              }
            />
            : null
          }
          {type === 'TOGGLE' &&
            <Field
              component={Fieldset}
              name={name}
              InputComponent={
                {
                  component: FormToggle,
                  props: {
                    label,
                    isManaged: true,
                  }
                }
              }
            />
          }
        </AccordionItemBody>
      </div>
    );
  }
}

function FacetedSearchSection(props) {
  const {
    label,
    facetCount,
    max, // for slider
    min, // for slider
    options, // for checkbox list / radio list
    toggle,
    type,
    value,
    emptyOptionsDisabled,
    /* for accordion */
    isAccordion,
    maxHeight,
    forceOpened, // overrides isOpened
    isClosable = true,
    hasTitle = true,
    isMulti = true,
  } = props;

  let {
    name,
    isOpened,
  } = props;

  if (isAccordion) {
    isOpened = forceOpened;
    if (!hasTitle) {
      isOpened = true;
    }
  }

  name = `filter[${name}]`;

  const classes = new BEMHelper('faceted-search-section');
  const title = (
    <div {...classes('title-wrapper')}>
      <span {...classes('title')}>{label}</span>
      <span {...classes('title-arrow', isClosable ? '' : 'hidden')}>play_arrow</span>
    </div>
    );
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
  return (
    <Accordion
      activeItems={isOpened ? [0] : []}
      {...classes({ modifiers: {
        opened: isOpened,
        flexed: isAccordion && isOpened,
        safari: isSafari,
        select: type === 'SELECT',
      } })}
    >
      <CustomAccordionItem
        title={title}
        {...classes('header')}
        toggle={() => toggle(!isOpened)}
        isAccordion={isAccordion}
        maxHeight={maxHeight}
        type={type}
        name={name}
        min={min}
        max={max}
        value={value}
        options={options}
        label={label}
        hasTitle={hasTitle}
        isMulti={isMulti}
        isClosable={isClosable}
      />
    </Accordion>
  );
}

FacetedSearchSection.propTypes = {
  name: PropTypes.string,
  options: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.string,
  isAccordion: PropTypes.bool,
  maxHeight: PropTypes.number,
  isClosable: PropTypes.bool,
  isMulti: PropTypes.bool,
};

export default FacetedSearchSection;
