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
import BEMHelper from 'services/BemHelper';

require('./style.scss');

// @param {React.Component} headerBtns Component to add into header of panel.

function Panel({ id, className, mods, title, headerBtns, children, onWheel }) {
  const classes = new BEMHelper('panel');
  let extraClasses = () => ({ className: '' });
  if (className) {
    extraClasses = new BEMHelper(className, false);
  }

  return (
    <div
      {...classes({ modifiers: mods, extra: className })}
      id={id}
      onWheel={onWheel}
    >
      <div {...classes('header', null, extraClasses('panel-header').className)}>
        <h3 {...classes('title', null, extraClasses('panel-title').className)}>
          {title}
        </h3>
        {headerBtns &&
          <div {...classes('btns')}>
            {headerBtns()}
          </div>
        }
      </div>
      <div {...classes('content', null, extraClasses('panel-content').className)}>
        {children}
      </div>
    </div>
  );
}

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.any,
  // TODO
  headerBtns: PropTypes.func,
  mods: PropTypes.any,
  title: PropTypes.string.isRequired,
}

export default Panel;
