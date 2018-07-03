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

class PanelEditable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
    };
    this.setViewMode = this.setViewMode.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
  }

  setViewMode() {
    this.setState({
      isEditMode: false,
    });
  }

  setEditMode() {
    this.setState({
      isEditMode: true,
    });
  }

  render() {
    return presenter({
      ...this.props,
      isEditMode: this.state.isEditMode,
      setViewMode: this.setViewMode,
      setEditMode: this.setEditMode,
    });
  }
}

export default PanelEditable;
