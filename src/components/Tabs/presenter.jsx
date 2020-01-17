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

import React from 'react';
import BEMHelper from 'services/BemHelper';

require('./style.scss');

function Tabs({ className, mods, options, value, onChange }) {
  const classes = new BEMHelper('tabs');
  const tooltipClasses = new BEMHelper('tooltip');

  return (
    <ul {...classes({ modifiers: mods, extra: className })}>
      {options.map((option, key) =>
        <li
          id={option.id}
          {...classes(
            'item',
            { selected: option.value === value },
            [
              (option.mods ? classes('item', option.mods).className : null),
              option.tooltip ? tooltipClasses().className : null,
            ]
          )}
          onClick={() => onChange(option.value)}
          key={key}
          aria-label={option.tooltip}
          data-tootik-conf={ option.tooltipConf || 'bottom' }
        >
          {option.customLabel || option.label}
        </li>
			)}
    </ul>
  );
}

export default Tabs;
