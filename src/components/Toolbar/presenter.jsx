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
import Link from 'components/Link/index';
import Breadcrumbs from 'components/Breadcrumbs';
import BEMHelper from 'services/BemHelper';

require('./style.scss');

function Toolbar({ caption, breadcrumbList, backUrl, onEdit, children, mods, isEditable = false, icon }) {
  const classes = new BEMHelper('toolbar');

  children = children instanceof Array ? children : [children];
  let blocks;

  if (children) {
    blocks = (
      <ul {...classes('block-list')}>
        {children.map((child, key) =>
          <li {...classes('block')} key={key}>
            {child}
          </li>
        )}
      </ul>
    );
  }

  return (
    <div {...classes({ modifiers: mods })}>
      {backUrl &&
        <Link to={backUrl} {...classes('back')}>
          <i {...classes('back-icon')}>
            arrow_back
          </i>
        </Link>
      }
      {icon}
      <div {...classes('content')}>
        <div {...classes('header-wrapper')}>
          <h1 {...classes('header')}>
            {caption}
          </h1>
          {onEdit && isEditable &&
            <i {...classes('edit-ico')} onClick={onEdit}>
              edit
            </i>
          }
        </div>
        {breadcrumbList &&
          <Breadcrumbs data={breadcrumbList} />
        }
      </div>
      {blocks}
    </div>
  );
}

export default Toolbar;
