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

import Autocomplete from 'components/Autocomplete';
import Avatar from 'components/Avatar';
import BadgedIcon from 'components/BadgedIcon';
import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Datepicker from 'components/Datepicker';
import ExpandableText from 'components/ExpandableText';
import FacetedSearchPanel from 'components/FacetedSearchPanel';
import Fieldset from 'components/Fieldset';
import FileInput from 'components/FileInput';
import Form from 'components/Form';
import FormAutocomplete from 'components/FormAutocomplete';
import FormCheckbox from 'components/FormCheckbox';
import FormCheckboxList from 'components/FormCheckboxList';
import FormDatepicker from 'components/FormDatepicker';
import FormExpansible from 'components/FormExpansible';
import FormFileInput from 'components/FormFileInput';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import FormSlider from 'components/FormSlider';
import FormTabs from 'components/FormTabs';
import FormTextarea from 'components/FormTextarea';
import Header from 'components/Header';
import Link from 'components/Link';
import ListItem from 'components/ListItem';
import LoadingPanel from 'components/LoadingPanel';

import
  Modal,
  {
    connectModal as modalConnect,
    actions as modalActions,
    reducer as modalReducer,
  }
  from 'components/Modal';

import PageContent from 'components/PageContent';
import Pagination from 'components/Pagination';
import Panel from 'components/Panel';
import PanelEditable from 'components/PanelEditable';
import RadioButton from 'components/RadioButton';
import Select from 'components/Select/stateful';
import Sidebar from 'components/Sidebar';
import TabbedPane from 'components/TabbedPane';
import Table from 'components/Table';
import TableCellLink from 'components/TableCellLink';
import TableCellStatus from 'components/TableCellStatus';
import TableCellText from 'components/TableCellText';
import Tabs from 'components/Tabs';
import Toggle from 'components/Toggle';
import FormToggle from 'components/FormToggle';
import Toolbar from 'components/Toolbar';
import FormCheckboxListFilterable from 'components/FormCheckboxListFilterable';

const ModalUtils = {
  connect: modalConnect,
  actions: modalActions,
  reducer: modalReducer,
};

export {
  Autocomplete,
  Avatar,
  BadgedIcon,
  Button,
  Breadcrumbs,
  Checkbox,
  Datepicker,
  ExpandableText,
  FacetedSearchPanel,
  Fieldset,
  FileInput,
  Form,
  FormAutocomplete,
  FormCheckbox,
  FormCheckboxList,
  FormDatepicker,
  FormExpansible,
  FormFileInput,
  FormInput,
  FormSelect,
  FormSlider,
  FormTabs,
  FormTextarea,
  Header,
  Link,
  ListItem,
  LoadingPanel,
  Modal,
  ModalUtils,
  PageContent,
  Pagination,
  Panel,
  PanelEditable,
  RadioButton,
  Select,
  Sidebar,
  TabbedPane,
  Table,
  TableCellLink,
  TableCellStatus,
  TableCellText,
  Tabs,
  Toggle,
  FormToggle,
  Toolbar,
  FormCheckboxListFilterable,  
};
