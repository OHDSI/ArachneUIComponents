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

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

import actions from './actions';

export default function connectModal({ name, persistant = false }) {
  return (WrappedComponent) => {
    class ReduxModal extends Component {
      componentWillMount() {
        this.props.registerModal(name);
      }

      componentWillUnmount() {
        if (!persistant) {
          this.props.destroyModal(name);
        }
      }

      render() {
        const modal = {
          name,
          isActive: this.props.modalState.isOpened,
          close: () => this.props.toggleModal(name, false),
        };

        return (
          <WrappedComponent
            {...this.props.ownProps}
            modal={modal}
          />
        );
      }
    }

    ReduxModal.propTypes = {
      destroyModal: PropTypes.func.isRequired,
      modalState: PropTypes.object.isRequired,
      ownProps: PropTypes.object.isRequired,
      registerModal: PropTypes.func.isRequired,
      toggleModal: PropTypes.func.isRequired,
    };

    function mapStateToProps(state, ownProps) {
      return {
        modalState: get(state, `modal.${name}`) || {},
        ownProps,
      };
    }

    const mapDispatchToProps = {
      registerModal: actions.register,
      destroyModal: actions.destroy,
      toggleModal: actions.toggle,
    };

    return connect(mapStateToProps, mapDispatchToProps)(ReduxModal);
  };
}
