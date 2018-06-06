/*
 *
 * Copyright 2018 Observational Health Data Sciences and Informatics
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
 * Created: May 22, 2017
 *
 */

import { Component } from 'react';
import debounce from 'lodash/debounce';
import presenter from './presenter';

class FormCheckboxListFilterable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      filterText: '',
    };
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);
    this.filter = debounce(this.filter.bind(this), 300);
  }

  expand() {
    this.setState({
      isExpanded: true,
    });
  }
  
  collapse() {
    this.setState({
      isExpanded: false,
      filterText: '',
    });
  }

  filter(value) {
    this.setState({
      filterText: value.trim().toLowerCase(),
    });
  }

  render() {
    return presenter({
      ...this.props,
      expand: this.expand,
      collapse: this.collapse,
      isExpanded: this.state.isExpanded,
      filterText: this.state.filterText,
      filter: this.filter,
    });
  }
}

export default FormCheckboxListFilterable;
