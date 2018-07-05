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

require('./style.scss');

function Avatar(props) {
	const {
		img,
		mods,
	} = props;

  const classes = new BEMHelper('avatar');
  const image = img || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAeFBMVEUAAADFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcUEoIEHAAAAJ3RSTlMAuPNOFAXc+W+pWPbPjjCuKycaDgnsfXpnR9fLwpWGdVzgPzec4yFGCPW3AAAB50lEQVRIx43V2XKDMAwFUNlg9n0JgZC97f3/P+xMyrRYMqTnKQ8x2Ei+IsFPcjX1YdhPKk98esOPTrCcor01Ta6BVA1e5RvjV96gUiA9N+RmrhpQSUcrXaIAfTXkUGdAWZBQlEBWkeBpBCM5jQG0R8wxRNzShjZGeGT/Bw604wBYK7wQEe2KEK52VWn5fPkO/XtykyGmt2JkZvl5RdDSW22A61JfjZH+YYT+qfkZJf1LifOr31Lw+j4v8/0+5w9ec6T+64Mp1iMKC8WepF4f/4SEWE3+3GgtwYnIR2r15wMWz+rdFA0l9o6Mhq2193SjHAOtXMB80MqAnJT1VpMCO6/woChAzU+wfYoaAWn4VlMKl3VGQBNg2BF2DmGA9wvO1oKQbekGIbK21LNDf0Eo2KGVXcwMzCexz8oKN4JJWOF4a1AJy0ysNUTzkZXGk7GaT6OR7U0f+BWTbG95gagqrfvDLpC4oof5QV01jlVHzznnV1SGQAngnntF4V0CAKpjIcBixhd1CL6smGFB1t0h9P5fkImojOGgRFRSvYRxDafnEsa1iPsBTvkS93KglHCal4EiR1YGp2kZWXIo9nDql6Eox+6mrCIHM2DDYMit+nTu6EnbjpNojYj2NUk89SEAhP0U3xpivgHI2XUiCj2sqwAAAABJRU5ErkJggg==';

  return (
    <div 
    	{...classes({ modifiers: mods })}
    	style={{ backgroundImage: `url('${image}')` }}
    />
  );
}

Avatar.propTypes = {
  img: PropTypes.string.isRequired,
};

export default Avatar;
