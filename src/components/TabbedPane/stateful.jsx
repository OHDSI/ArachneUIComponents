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

import React, { Component } from 'react';
import BEMHelper from 'services/BemHelper';
import Tabs from 'components/Tabs/index';
import get from 'lodash/get';

require('./style.scss');

class TabbedPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: get(props, 'value') || get(props.sections, '[0].label'),
    };
    this.setSelectedTab = this.setSelectedTab.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sections.length !== nextProps.sections.length) {
      this.setState({
        selectedTab: get(nextProps.sections, '[0].label'),
      });
    }
    if (this.props.value !== nextProps.value) {
      this.setState({
        selectedTab: nextProps.value,
      });
    }
  }

  setSelectedTab(name) {
    this.setState({
      selectedTab: name,
    });
  }

  render() {
    const classes = new BEMHelper('tabbed-pane');

    const selectedTab = this.state.selectedTab;
    const tabsOptions = this.props.sections.map(
      item => ({ ...item, label: item.label, value: item.label, customLabel: item.customLabel })
    );
    const content = get(
      this.props.sections.filter(item => item.label === selectedTab),
      '[0].content'
    );
    const onChange = this.props.onChange;

    return (
      <div {...classes()}>
        <Tabs
          {...classes('tabs')}
          mods={['big', 'grey', 'no-border']}
          options={tabsOptions}
          value={selectedTab}
          onChange={(name) => {
            if (onChange) {
              onChange(name);
            }
            this.setSelectedTab(name);
          }}
        />
        <div {...classes('content', this.props.modsContent)}>
          {content}
        </div>
      </div>
    );
  }
}

export default TabbedPane;
