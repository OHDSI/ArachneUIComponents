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
 * Created: May 22, 2017
 *
 */

import { Component, PropTypes } from 'react';
import presenter from './presenter';

class FacetedSearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedSectionId: -1,
      maxSectionHeight: null,
    };
    this.onSectionTitleClick = this.props.isAccordion
      ? this.onSectionTitleClick.bind(this)
      : () => {};
    this.setMaxSectionHeight = this.setMaxSectionHeight.bind(this);
  }

  onSectionTitleClick(openedSection) {
    let sectionIndex = openedSection;
    if (this.state.openedSectionId === openedSection) {
      sectionIndex = -1;
    }
    this.setState({
      openedSectionId: sectionIndex,
    });
  }

  setMaxSectionHeight(height) {
    this.setState({
      maxSectionHeight: height,
    });
  }

  render() {
    return presenter({
      ...this.props,
      openedSectionId: this.state.openedSectionId,
      maxSectionHeight: this.state.maxSectionHeight,
      setMaxSectionHeight: this.setMaxSectionHeight,
      onSectionTitleClick: this.onSectionTitleClick,
    });
  }
}

FacetedSearchPanel.propTypes = {
  isAccordion: PropTypes.bool,
};

export default FacetedSearchPanel;
