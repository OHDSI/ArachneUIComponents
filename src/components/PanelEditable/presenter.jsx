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
import BEMHelper from 'services/BemHelper';
import Panel from 'components/Panel/index';
import Button from 'components/Button/index';

require('./style.scss');

function PanelEditable(props) {
  const classes = new BEMHelper('panel-editable');
  const materialClasses = new BEMHelper('material-icons');

  const {
    id,
    className,
    title,
    viewContent,
    editContent,
    isEditMode,
    setViewMode,
    setEditMode,
  } = props;

  let { isEditable } = props;
  if (typeof isEditable === 'undefined') {
    isEditable = true;
  }

  const modifiers = {
    editable: isEditable && !isEditMode,
  };

  const editBtns = () => (
    <ul>
      <li {...classes('edit')} onClick={setEditMode}>
        <i {...materialClasses()}>edit</i>
      </li>
    </ul>
    );

  return (
    <Panel
      {...classes({ modifiers, extra: className })}
      id={id}
      title={title}
      headerBtns={editBtns}
    >
      <div onDoubleClick={() => { if (isEditable) setEditMode(); } }>
        {
          React.cloneElement(
            isEditMode ? editContent : viewContent,
            { setViewMode, setEditMode },
          )
        }
      </div>
    </Panel>
  );
}

PanelEditable.propTypes = {
  className: PropTypes.any,
  editContent: PropTypes.node.isRequired,
  isEditable: PropTypes.bool,
  isEditMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func,
  setViewMode: PropTypes.func,
  title: PropTypes.string.isRequired,
  viewContent: PropTypes.node.isRequired,
}

export default PanelEditable;
