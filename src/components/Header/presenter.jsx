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
import Link from 'components/Link';
import BEMHelper from 'services/BemHelper';

require('./style.scss');

function Header({ isUserAuthed, logo, navItems, className }) {
  const classes = new BEMHelper('header');

  return (
    <header {...classes({ modifiers: {'guest': !isUserAuthed}, extra: className })}>
      <Link to="/" {...classes('logo')}>
        <img src={logo}/>
      </Link>
      <nav {...classes('nav')}>
        {navItems.map((item, key) => 
          <div key={key} {...classes('menu-item')}>{item}</div>
        )}
      </nav>
    </header>
  )
}

Header.propTypes = {
  isUserAuthed: PropTypes.bool.isRequired,
  navItems: PropTypes.array.isRequired,
}

export default Header;