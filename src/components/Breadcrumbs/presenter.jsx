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
  * Authors: Pavel Grafkin, Alexander Saltykov, Vitaly Koulakov, Anton Gackovka, Alexandr Ryabokon, Mikhail Mironov
  * Created: Wednesday, March 7, 2018 3:33 PM
  *
  */

import React from 'react';
import Link from 'components/Link';
import BEMHelper from 'services/BemHelper';

import './style.scss';

function Breadcrumbs({ data, className }) {
  const classes = new BEMHelper('breadcrumbs');

  return (
    <ul {...classes({ extra: className })}>
      {data.map((breadcrumb, key) =>
        <li {...classes('breadcrumb')} key={key}>
          <Link to={breadcrumb.link}>{breadcrumb.label}</Link>
        </li>
      )}
    </ul>
  );
}

export default Breadcrumbs;
