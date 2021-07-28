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

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

import actions from './actions';

const ESC_KEY = 27;

export function connectModal({ name, persistant = false }) {
  return (WrappedComponent) => {
    class ReduxModal extends Component {
      componentWillMount() {
        this.props.registerModal(name);
      }

      componentWillReceiveProps(nextProps) {
        if (this.props.modalState.isOpened === false && nextProps.modalState.isOpened === true) {
          this.focusAfterRender = true;
        }
      }

      componentDidUpdate() {
        if (this.focusAfterRender) {
          this.focusContent();
          this.focusAfterRender = false;
        }
      }

      componentWillUnmount() {
        if (!persistant) {
          this.props.destroyModal(name);
        }
      }

      close = () => {
        this.props.toggleModal(name, false);
      }

      focusContent = () => {
        if (this.content) this.content.focus();
      }

      setContentRef = content => {
        this.content = content;
      }

      handleKeyDown = event => {
        if (event.keyCode === ESC_KEY) {
          this.close();
        }
      }

      render() {
        const modal = {
          name,
          isActive: this.props.modalState.isOpened,
          close: this.close,
          setContentRef: this.setContentRef,
          handleKeyDown: this.handleKeyDown,
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
