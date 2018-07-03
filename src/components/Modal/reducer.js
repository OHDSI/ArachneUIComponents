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

import actionTypes from './actionTypes';

function register(state, action) {
  const data = { isOpened: false };
  let newState;

  if (state[action.payload.name]) {
    newState = state;
  } else {
    newState = {
      ...state,
      [action.payload.name]: data,
    };
  }

  return newState;
}

function destroy(state, action) {
  const newState = { ...state };
  delete newState[action.payload.name];
  return newState;
}

function toggle(state, action) {
  return {
    ...state,
    [action.payload.name]: action.payload.state,
  };
}

export default function (state = {}, action) {
  switch (action.type) {
    case actionTypes.REGISTER_MODAL:
      return register(state, action);
    case actionTypes.DESTROY_MODAL:
      return destroy(state, action);
    case actionTypes.TOGGLE_MODAL:
      return toggle(state, action);
    default:
      return state;
  }
}
