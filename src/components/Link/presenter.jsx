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
import { Link } from 'react-router';
import BEMHelper from 'services/BemHelper';
import URI from 'urijs';

require('./style.scss');

function AppLink(props) {
  const classes = new BEMHelper('link');
  let isExternal = false;
  if (props.to) {
    const url = new URI(props.to);
    isExternal = url.is("absolute");
  }

  return (
    isExternal ?
    <a
      {...props}
      {...classes({ extra: props.className })}
      target='_blank'
      href={props.to}
    >
      {props.children}
    </a>
    :
    <Link
      {...props}
      {...classes({
        extra: props.className,
        modifiers: {
          disabled: props.disabled,
        }
      })}
      onClick={(e) => { e.stopPropagation(); props.onClick && props.onClick(e); }}
    >
      {props.children}
    </Link>
  );
}

AppLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

export default AppLink;
