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

import { Component } from 'react';
import presenter from './presenter';

class FacetedSearchSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
    };
    this.toggle = this.toggle.bind(this);
    if (this.props.isAccordion) {
      this.toggle = this.props.toggle;
    }
  }

  toggle(isOpened) {
    this.setState({
      isOpened,
    });
  }

  render() {
    return presenter({
      ...this.props,
      isOpened: this.state.isOpened,
      toggle: this.toggle,
    });
  }
}

export default FacetedSearchSection;
