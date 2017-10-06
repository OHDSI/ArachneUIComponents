import React from 'react';
import BEMHelper from 'services/BemHelper';

require('./style.scss');

function Component({  }) {
  const classes = new BEMHelper('component');

	return (
		<div {...classes()}>
		</div>
	)
}

export default Component;