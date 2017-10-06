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

require('./style.scss');

function BadgedIcon(props) {
  const { className, count, icon, onClick } = props; // + maybe tooltip settings
  const classes = new BEMHelper('badged-icon');

  return (
    <div {...classes({ extra: className })} onClick={onClick} {...props}>
      <i {...classes('icon')}>
        {icon}
      </i>
      {count > 0 &&
        <span {...classes('count')}>{count}</span>
      }
    </div>
  );
}

BadgedIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  count: PropTypes.number,
  onClick: PropTypes.func,
};

export default BadgedIcon;
