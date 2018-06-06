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

import BEMHelper from 'services/BemHelper';
import React, { PropTypes } from 'react';
import Form from 'components/Form';
import Button from 'components/Button';
import { Accordion, AccordionItem } from 'react-sanfona';

require('./style.scss');

function ExpansibleForm(props) {
  const {
    addButtonTitle,
    fields,
    formTitle,
    isCreateMode,
    onSubmit,
    setCreateMode,
    setViewMode,
    submitBtnConfig,
    cancelBtnConfig,
    error,
  } = props;
  const classes = new BEMHelper('expansible-form');
  const openerButton = <Button
      {...classes('toggle')}
      onClick={setCreateMode}
      >
      {addButtonTitle}
    </Button>;
  let title = openerButton;
  let accordionProps = {};
  if(isCreateMode === true) {
    title = "";
  } else {  
    accordionProps.activeItems = [];
  }

  return (
    <div {...classes()}>
      {title}
      <Accordion
        {...accordionProps}>
        <AccordionItem 
          key={1}
          >
            <div {...classes('form-wrapper')}>
              {formTitle &&
                <span {...classes('form-title')}>{formTitle}</span>
              }
              <Form
                {...classes('form')}
                {...props}
                cancelBtn={cancelBtnConfig}
                fields={fields}
                mods={['actions-inline']}
                onCancel={setViewMode}
                onSubmit={(data) => { return onSubmit(data).then(() => setViewMode()); } }
                submitBtn={submitBtnConfig}
                handleSubmit={props.handleSubmit}
                submitting={props.submitting}
                error={props.error}
              />
            </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

ExpansibleForm.propTypes = {
    addButtonTitle: PropTypes.string,
    fields: PropTypes.array.isRequired,
    formTitle: PropTypes.string,
    isCreateMode: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    setCreateMode: PropTypes.func.isRequired,
    setViewMode: PropTypes.func.isRequired,
};
export default ExpansibleForm;
