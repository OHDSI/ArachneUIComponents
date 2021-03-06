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
 * Created: January 10, 2018
 *
 */

import { Component } from 'react';
import presenter from './presenter';

class LoadingPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
    this.setActive = this.setActive.bind(this);
    this.activityTimer = null;
    this.activityTimeout = 30000;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timeout) {
      this.activityTimeout = nextProps.timeout;
    }
    if (nextProps.active === true) {
      this.activateTimer();
    } else {
      this.deactivateTimer();
    }
    this.setActive(nextProps.active);
  }

  setActive(isActive) {
    this.setState({
      isActive,
    });
  }

  activateTimer() {
    if (this.activityTimer) {
      this.deactivateTimer();
    }
    this.activityTimer = setTimeout(() => {
      this.setActive(false);
    }, this.activityTimeout);
  }

  deactivateTimer() {
    clearTimeout(this.activityTimer);
  }

  render() {
    return presenter({
      ...this.props,
      ...this.state,
    });
  }
}

export default LoadingPanel;
