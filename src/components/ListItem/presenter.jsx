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

import React, { PropTypes } from 'react';
import Link from 'components/Link/index';
import BEMHelper from 'services/BemHelper';
  
require('./style.scss');

function ListItem(props) {
  let {
    actions,
    children,
    className,
    dragHandle,
    label,
    mods,
    onClick,
    onRemove,
  } = props;

  const classes = new BEMHelper('list-item');
  const materialClasses = new BEMHelper('material-icons');

  dragHandle = dragHandle || (proxy => proxy);

  return (
    <li {...classes({ modifiers: mods, extra: className })} onClick={onClick}>
      {dragHandle(
        <span {...classes('drag')}>
          <i {...classes({ element: 'drag-ico', extra: materialClasses().className })}>
            menu
          </i>
        </span>
      )}
      <span {...classes('add')}>
        <i {...classes({ element: 'add-ico', extra: materialClasses({ modifiers: 'medium' }).className })}>
          add_circle_outline
        </i>
      </span>
      <span {...classes('content')}>
        {label || children}
      </span>
      <span {...classes('remove')} onClick={(e) => { e.stopPropagation(); onRemove(); }}>
        <i {...classes({ element: 'remove-ico', extra: materialClasses({ modifiers: 'bold' }).className })}>
          close
        </i>
      </span>
      <div {...classes('actions')}>
        {actions}
      </div>
    </li>
  );
}

ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
  dragHandle: PropTypes.func,
  label: PropTypes.string,
  mods: PropTypes.any,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
}

export default ListItem;
