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
import Link from '../Link';

require('./style.scss');

function Element(props) {
  if (props.href) {
    return <Link {...props} to={props.href} type={null} onClick={null}>{props.children}</Link>;
  } else {
    return <button {...props}>{props.children}</button>;
  }
}

function Button(props) {
  const classes = new BEMHelper('button');
  const {
    className,
    link,
    mods,
    type,
    disabled,
    label,
    children,
    onClick,
    target,
  } = props;

  return (
    <Element
      {...classes({ modifiers: mods, extra: className })}
      disabled={disabled}
      href={link}
      onClick={onClick}
      target={target}
      type={type || 'button'}
    >
      {label || children}
    </Element>
  );
}

Button.propTypes = {
  className: PropTypes.any,
  link: PropTypes.string,
  mods: PropTypes.any,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  target: PropTypes.string,
};

export default Button;
