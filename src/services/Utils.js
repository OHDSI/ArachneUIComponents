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

import numeral from 'numeral';
import keyMirror from 'keymirror';

numeral.register('locale', 'arachne', {
  delimiters: {
    thousands: ' ',
    decimal: '.',
  },
  abbreviations: keyMirror({
    thousand: null,
    million: null,
    billion: null,
    trillion: null,
  }),
});

numeral.register('locale', 'arachne-short', {
  delimiters: {
    thousands: ' ',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'k',
    million: 'mil',
    billion: 'bn',
    trillion: 'tn',
  },
});

const numberFormatter = {
  format: (value, form = 'full') => {
    if (form === 'short') {
      numeral.locale('arachne-short');
    } else {
      numeral.locale('arachne');
    }
    return numeral(value).format('0[.]0 a');
  },
};

function canUseDom() {
  return (typeof window !== 'undefined' && typeof document !== 'undefined' && document.documentElement);
}

export default {
  numberFormatter,
  canUseDom,
};
