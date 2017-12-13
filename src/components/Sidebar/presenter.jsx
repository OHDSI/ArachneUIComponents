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
import Link from 'components/Link/index';
import BEMHelper from 'services/BemHelper';

require('./style.scss');

function SidebarTab({ ico, name, path, isSelected }) {
  const classes = new BEMHelper('sidebar-tab');

  return (
    <Link to={path} {...classes({ selected: isSelected })}>
      <img {...classes('ico')} src={ico} />
      <span {...classes('name')}>
        {name}
      </span>
    </Link>
  );
}

function Sidebar({ className, showAboutInfo, tabList, colorScheme }) {
  const mods = [];
  if (colorScheme) {
    mods.push('colors-'+colorScheme);
  }
  if (!tabList.length) {
    mods.push('hidden');
  }
  const classes = new BEMHelper('sidebar');

  return (
    <div {...classes({ modifiers: mods, extra: className })}>
      <ul {...classes('tab-list')}>
        {tabList.map((tab, key) =>
          <li {...classes('tab', { selected: tab.isSelected })} key={key}>
            <SidebarTab ico={tab.ico} name={tab.name} path={tab.path} />
          </li>
        )}
      </ul>
      <div {...classes('copyright')}>
        <i {...classes('copyright-details-ico')} onClick={showAboutInfo}>
          info_outline
        </i>
        <span {...classes('copyright-label')}>
          © 2015-2017
          Odysseus Data Services, Inc.
        </span>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  colorScheme: PropTypes.oneOf(['default', 'node', 'athena']).isRequired,
  showAboutInfo: PropTypes.func,
  tabList: PropTypes.arrayOf(PropTypes.shape({
    isSelected: PropTypes.boolean,
    ico: PropTypes.string,
    name: PropTypes.string,
    path: PropTypes.string,
  })),
};

export default Sidebar;
