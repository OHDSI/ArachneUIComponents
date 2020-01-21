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

import React, { PropTypes } from 'react';
import BEMHelper from 'services/BemHelper';
import classNames from 'classnames';

require('./style.scss');

const closeIco = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTCtCgrAAAADLUlEQVQ4T02UyUvbURDHX+JGSwVt6aG0lbb0XEqhl/bUW/8vwTXuO+4aAyIeYjDgSdAIQsCDqCiI4oK4gIribpzOZ+gEA5N5vzcz3/nOvHkv3N/fvxGRQpX3d3d371SXX1xc/NrZ2ZHp6WkZGBiQlpYW6evrk9HRUZmampLt7W3J5XLfVL6qPzFRlRcqBUH/IqenpwVolQ8bGxsSj8elrq5OWltbpaGhQdra2qS6ulqqqqqkq6tLOjo6zAffx8fH3wpcprGlqisANHQ1vJyfnzeQ5uZmaWpqsmDW9fX1tt/T0yOxWEwqKyvziTKZDKA/FQymn4IuKPnv3NycZa6trZXGxkYDQFNud3e3acBI0N7eLp2dnWZnDRH9fVf5AsOKtbU1YwQYjqwRgtkjCOEbEIAR1jCFyPLyMqA/wuXl5dvh4WFzhhVMcHJAyvJvB2GPb6+CZL29vfL09PQncJo1NTX5UnBgvbi4KEdHR3bKfNPHRCIhW1tbks1mjTn73gr6TaUhmUzaBmAEwYb1+fk5JYiOkLWhv79fDg8Pbe/g4MD66q0BlAQzMzMShoaGDBD6GL0kZu76+lp0Tg30+PjYwNDj4+N5di7EDQ4OSvANmAEKO2YQUJidnJwYkA697O/vG1OCvSo0fsSjAzeAHnJSDoQRodFnZ2dyc3NjoHqAlhwfZtKHnwTeqjAyMmKA0EU7/YmJCesVP5hR+tXVlYEyFYABwGGwJg5yYXJy0jbJ5GVj3NvbMzAOh37S9NvbW9tDE8Mh+viguedhfX3dALinNBoDmZeWlmR3d9d6hp1kHAasZ2dn7W7TM6rBn4Sbm5sStNmFnDSG5/3Agb6SxG3eY0/s7LCPjY3Jw8NDCVevCJZk48S8hzh6ICDsYcOHb+xoB2ao9aaU2vOlDS9bWFjIl4bzc+1z6mPiSbCx5sVRsOLATxdFChrVIS7BwA2g2TByxv6M+ZhQDfsIMVSpTxjvaRSGxfqE8WJHybK6ump3FjZeEkwQvgEBGB8eWI0pB0wxACwM+vFRF59hq+tiXUf0oEpWVlYknU7bfMIKIE48lUoZkPq8wve/8Ei/FpHIP7+rinEmgx3HAAAAAElFTkSuQmCC';

function Modal(props) {
  const {
    children,
    modal,
    title,
    onBeforeClose,
    closeOnClickOutside = false,
  } = props;
  const {
    mods,
  } = props;

  const modifiers = classNames({ active: modal.isActive }, mods);
  const classes = new BEMHelper('modal');

  function handleClick() {
    if(typeof onBeforeClose === 'function') {
      onBeforeClose() === true
        ? modal.close()
        : null;
    } else {
      modal.close();
    }
  }

  return (
    <div {...classes({ modifiers })}>
      <div {...classes('backdrop')} onClick={closeOnClickOutside && handleClick} />
      <div
        {...classes('content-wrapper')}
        ref={modal.setContentRef}
        tabIndex="0"
        onKeyDown={modal.handleKeyDown}
        onClick={e => e.stopPropagation()}
      >
        <img
          {...classes('close-ico')}
          alt="close modal"
          onClick={modal.close}
          src={closeIco}
        />
        <div {...classes('content')}>
          <div {...classes('content-header')}>
            <h3 {...classes('content-title')}>
              {title}
            </h3>
          </div>
          <div {...classes('content-body')}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  modal: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  mods: PropTypes.any,
  onBeforeClose: PropTypes.func,
  closeOnClickOutside: PropTypes.bool,
};

export default Modal;
