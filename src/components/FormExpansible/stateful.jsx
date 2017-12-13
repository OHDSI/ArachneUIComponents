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

import { PropTypes, Component } from 'react';
import presenter from './presenter';

class ExpansibleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateMode: props.isCreateMode ? props.isCreateMode : false,
    };
    this.setViewMode = this.setViewMode.bind(this);
    this.setCreateMode = this.setCreateMode.bind(this);
  }

  setViewMode() {
    this.setState({
      isCreateMode: false,
    });
  }

  setCreateMode() {
    this.setState({
      isCreateMode: true,
    });
  }

  render() {
    return presenter({
      ...this.props,
      isCreateMode: this.state.isCreateMode,
      setViewMode: this.setViewMode,
      setCreateMode: this.setCreateMode,
      onSubmit: this.props.onSubmit,
    });
  }
}

ExpansibleForm.propTypes = {
  isCreateMode: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

export default ExpansibleForm;
