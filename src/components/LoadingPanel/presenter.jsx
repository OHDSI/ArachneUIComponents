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

const loadingImg = 'data:image/png;base64,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';

function LoadingPanel({ isActive, label }) {
  const classes = new BEMHelper('loading-panel');

  return (
    <div {...classes({ modifiers: { active: isActive } })}>
      <img {...classes('ico')} src={loadingImg} />
      {label &&
        <span {...classes('label')}>
          {label}
        </span>
      }
    </div>
  );
}

LoadingPanel.propTypes = {
  isActive: PropTypes.bool,
  timeout: PropTypes.number,
  label: PropTypes.string,
}

export default LoadingPanel;
