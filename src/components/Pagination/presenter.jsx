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
import URI from 'urijs';
import BEMHelper from 'services/BemHelper';
import Link from 'components/Link';

require('./style.scss');

function Pagination(props) {
  const classes = new BEMHelper('pagination');
  const {
    pages,
    path,
    isFromZero = false,
    pageKey = 'page',
    showArrows = true,
  } = props;
  let {
    currentPage = 1,
  } = props;

  let startPage = 1;
  let endPage = 5;
  const size = pages >= 10000 ? 3 : 5;

  if (currentPage > pages) {
    currentPage = pages;
  }

  if (isFromZero) {
    currentPage = currentPage + 1;
  }

  function getPath(basePath, page) {
    const uri = new URI(basePath);
    uri.setSearch({
      ...uri.search(true),
      [pageKey]: page + (isFromZero ? -1 : 0),
    });

    return uri.toString();
  }

  const items = [];
  if(pages > 1) {
    if (currentPage >= size) {
      startPage = currentPage - (pages >= 10000 ? 1 : 2);
      endPage = currentPage + (pages >= 10000 ? 1 : 2);  
    }
    if (currentPage > pages - size && currentPage > size) {
      startPage = pages - size + 1;
      endPage = pages;
    }
    items.push(
      <Link {...classes('page', { hidden: currentPage < size })} to={getPath(path, 1)}>1</Link>
    );
    items.push(
      <span {...classes('spacer', { hidden: currentPage < size })}>more_horiz</span>
    );

    for (let i=startPage; i<=endPage && i<=pages; i++) {
      if (i === currentPage) {
        items.push(
          <span {...classes('page', 'active')}>{i}</span>
        );
        continue;
      }
      items.push(
        <Link
          {...classes('page')}
          to={getPath(path, i)}>
            {i}
          </Link>
      );
    }

    if (showArrows) {
      items.unshift(
        <Link
          {...classes('page', { arrow: true, hidden: currentPage <= 1 })}
          to={getPath(path, currentPage-1)}>
          keyboard_arrow_left
        </Link>
      );
    }

    items.push(
      <span {...classes('spacer', { hidden: currentPage > pages - size })}>more_horiz</span>
    );
    items.push(
      <Link
        {...classes('page', { hidden: currentPage > pages - size })}
        to={getPath(path, pages)}>
        {pages}
      </Link>
    );

    if (showArrows) {
      items.push(
        <Link
          {...classes('page', { arrow: true, hidden: currentPage >= pages })}
          to={getPath(path, currentPage+1)}>
          keyboard_arrow_right
        </Link>
      );
    }
  }

  return (
    <div {...classes()} children={items}>
    </div>
  )
}

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  path: PropTypes.string,
};

export default Pagination;
