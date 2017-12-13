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
import Fieldset from 'components/Fieldset/index';
import Button from 'components/Button/index';

require('./style.scss');

const Form = (props) => {
  const {
    actionsClassName,
    cancelBtn,
    className,
    fields,
    mods,
    onSubmit,
    onCancel,
    submitBtn,
    /* redux-form props */
    error,
    handleSubmit,
    submitting,
  } = props;
  const classes = new BEMHelper('form');
  const hasRequiredFields = fields.filter(field => field.required).length > 0;

  return (
  	<form
      {...classes({ modifiers: mods, extra: className })}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && e.ctrlKey === true) {
          handleSubmit(onSubmit)();
        };
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields.map((field, key) => [
        field.InputComponent.props && field.InputComponent.props.title
          ? <span {...classes('group-title')}>{field.InputComponent.props.title}</span>
          : null,
        <Field {...field} {...classes('group', field.mods, field.className)} component={Fieldset} key={key}/>
      ]
      )}
      {hasRequiredFields &&
        <span {...classes('required-caption')}>
          *Required information
        </span>
      }
      {error && 
        <span {...classes('error')}>{error}</span>
      }
      {(submitBtn || cancelBtn) &&
        <div {...classes({ element: 'actions', extra: actionsClassName })}>
          {submitBtn &&
            <Button
              {...classes({ element: 'submit', extra: submitBtn.className })}
              mods={submitBtn.mods || ['submit', 'rounded']}
              type="submit"
              disabled={submitBtn.disabled || submitting}
              label={submitting ? submitBtn.loadingLabel : submitBtn.label}
            />
          }
          {cancelBtn &&
            <Button
              {...classes({ element: 'cancel', extra: cancelBtn.className })}
              mods={cancelBtn.mods || ['cancel', 'rounded']}
              type="button"
              onClick={onCancel}
              disabled={submitting}
              label={cancelBtn.label}
            />
          }
        </div>
      }
    </form>
  )
}

Form.propTypes = {
  mods: PropTypes.any,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      component: PropTypes.any,
    })
  ),
  submitBtn: PropTypes.shape({
    label: PropTypes.string.isRequired,
    loadingLabel: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

export default Form;