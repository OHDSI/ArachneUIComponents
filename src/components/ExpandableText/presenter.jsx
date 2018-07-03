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
 * Authors: Pavel Grafkin
 * Created: October 19, 2017
 *
 */

import React, { Component, PropTypes } from 'react';
import Truncate from 'react-truncate';
import Link from '../Link';
import BEMHelper from 'services/BemHelper';

require('./style.scss');

class ExpandableText extends Component {
  
  constructor(...args) {
    super(...args);

    this.state = {
      expanded: false,
      truncated: false,
    };

    this.handleTruncate = this.handleTruncate.bind(this);
    this.toggleLines = this.toggleLines.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.text !== nextProps.text) {
      this.truncateRef.onResize();
    }
  }

  handleTruncate(truncated) {
    if (this.state.truncated !== truncated) {
      this.setState({
        truncated,
      });
    }
  }

  toggleLines() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const classes = BEMHelper('expandable-text');
    let {
      text = '',
      more = 'Read more',
      less = 'Show less',
      lines = 5,
      emptyLabel = 'No description',
    } = this.props;

    const {
      expanded,
      truncated,
    } = this.state;

    let modifiers;
    if (!text) {
      text = emptyLabel;
      modifiers = ['empty'];
    }

    return (
      <div {...classes({ modifiers })}>
        <Truncate
          ref={ref => this.truncateRef = ref}
          lines={!expanded && lines}
          ellipsis={(
            <span>... <Link onClick={this.toggleLines}>{more}</Link></span>
          )}
          onTruncate={this.handleTruncate}
        >
          {text.split('\n').map((rawLine, i, arr) => {
            const line = <span key={i}>{rawLine}</span>;
            return (i === arr.length - 1) ? line : [line, <br key={i + 'br'} />];
          })}
        </Truncate>
        {!truncated && expanded && (
          <span> <Link onClick={this.toggleLines}>{less}</Link></span>
        )}
      </div>
    );
  }
}

export default ExpandableText;
