/*
 *
 * Copyright 2018 Observational Health Data Sciences and Informatics
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

import React from 'react';
import BEMHelper from 'services/BemHelper';
import get from 'lodash/get';
import flatten from 'lodash/flatten';

require('./style.scss');

const getFieldSorting = function (field, currentSorting, setSorting) {
  let direction = 'desc';
  let isActive = false;

  if (field === currentSorting.sortBy) {
    isActive = true;
    direction = currentSorting.sortAsc ? 'asc' : 'desc';
  }

  return {
    direction,
    active: isActive,
    setSorting: () => setSorting({
      sortBy: field,
      sortAsc: isActive ? !currentSorting.sortAsc : currentSorting.sortAsc,
    }),
  };
};

function TableHeaderCell({ className, label, sorting }) {
  const classes = new BEMHelper('table-header-cell');
  let sortIco;

  if (label && sorting) {
    const sortingMod = sorting.direction + (sorting.active ? '-active' : '');
    sortIco = (
      <i {...classes('sorting', sortingMod)} />
    );
  }

  return (
    <th
      {...classes({ modifiers: { sortable: !!sorting }, extra: className })}
      onClick={sorting ? sorting.setSorting : null}
    >
      {
        typeof label === 'string' ?  
          [<span {...classes('label')}>{label}</span>, sortIco] 
           :
          label
      }
    </th>
  );
}

function Table(props) {
  const classes = new BEMHelper('table');
  const emptyFormatter = data => data;
  const sorting = props.sorting;

  const {
    onRowClick,
    reference,
  } = props;

  let tableContent;
  if (props.data && props.data.length) {
    tableContent = (
      <tbody>
        {props.data.map((entity, key) =>
          <tr
            {...classes({ element: 'row', extra: entity.tableRowClass })}
            onClick={onRowClick ? () => onRowClick(entity) : null}
            key={key}
          >
            {React.Children.map(props.children, child =>
              <td
                {
                ...classes({
                  element: 'cell',
                  extra: child.props.className ? `${child.props.className}-td` : null,
                })
              }
              >
                {React.cloneElement(
                  child,
                  {
                    value: (child.props.format || emptyFormatter)(get(entity, child.props.field)),
                    ...(child.props.props ? child.props.props(entity) : {}),
                  }
                )}
              </td>
            )}
          </tr>
        )}
      </tbody>
    );
  } else {
    tableContent = (
      <tbody>
        <tr {...classes('row')}>
          <td {...classes('cell', 'centered')} colSpan={flatten(props.children).length}>
            No data available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <table {...classes({ modifiers: props.mods, extra: props.className })} ref={reference}>
      <thead>
        <tr {...classes('header-row')}>
          {React.Children.map(props.children, child =>
            <TableHeaderCell
              {
                ...classes({
                  element: 'header-cell',
                  extra: child.props.className ? `${child.props.className}-th` : null,
                })
              }
              label={child.props.header}
              sorting={
                (sorting && child.props.isSortable !== false) ? getFieldSorting(child.props.field, sorting, props.setSorting) : null
              }
            />
          )}
        </tr>
      </thead>
      {tableContent}
    </table>
  );
}

export default Table;
