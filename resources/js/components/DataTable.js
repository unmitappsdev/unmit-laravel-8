/**
 * DataTable.js
 *
 * @file A component for displaying a table of records using async fetch
 *
 * @version 0.1.0 2019-10-17 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React,{ useEffect, useState, useCallback } from 'react';
import { useCallbackOne } from 'use-memo-one';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { useAsyncCombineSeq, useAsyncRun, useAsyncTask, useAsyncTaskDelay, useAsyncTaskFetch } from "react-hooks-async";
import DataRow from './DataRow';


const DataTableHeaderCell = ({text, sortEnabled = false, sortAscending = true, onSortSelect = f => f}) => {
  let sortColor;
  let sortIcon;

  if (sortEnabled)
    sortColor = 'red';
  else
    sortColor = 'grey';

  if (sortAscending)
    sortIcon = <FaSortAlphaDown color={sortColor} onClick={() => onSortSelect(text,sortEnabled,!sortAscending)} />;
  else
    sortIcon = <FaSortAlphaUp color={sortColor} onClick={() => onSortSelect(text,sortEnabled,!sortAscending)} />;
  return (
  <th className="align-top">
      {text}
  </th>
  );
    /*
  return (
  <th className="align-top">
    <div className="row">
      <div className="col">{text}</div>
      <div className="col text-right">
        {sortIcon}
      </div>
    </div>
  </th>
  );
    // */
}

const DataTableHeader = ({ columnData, darkHeader, onSortSelected = f => f }) => {
  return (
    <thead className={darkHeader===true ? 'thead-dark':''}>
      <tr>
        { Object.entries(columnData).map(([key,value],i) => (
          <DataTableHeaderCell key={i} text={value.label} sortenabled={value.sortEnabled || false} sortascending={value.sortAscending || false} onSortSelect={onSortSelected}/>
        ))}
      </tr>
    </thead>
  );
};


const initparam = {
  headers: {
    Credentials: 'include',
    Authorization: _oauth_token_type + ' ' + _oauth_access_token,
    'user-agent': 'UNMReactJSRuntime/0.1.0',
    Accept: 'application/json',
  }
};


export default function DataTable({tableAttributes, query, limit, offset, updateTotal = f => f})
{
  const [ sortData, setSortData ] = useState([]);

  const apiurl = _apiurl + '?' + (query ? `query=${query}`:'') + (limit ? `&limit=${limit}`:'') + (offset ? `&offset=${offset}`:'');

  const delayTask = useAsyncTaskDelay(useCallback(() => 1200, [query]));
  const fetchTask = useAsyncTaskFetch(apiurl,initparam);
  const combinedTask = useAsyncCombineSeq(delayTask, fetchTask);

  useAsyncRun(combinedTask);

  if (delayTask.pending) return <div className="alert alert-info" role="alert">Waiting...</div>;
  if (fetchTask.error) return <div className="alert alert-danger" role="alert">Error found: {fetchTask.error.name} - {fetchTask.error.message}</div>;
  if (fetchTask.pending) return <div className="alert alert-primary" role="alert">Loading... <button onClick={fetchTask.abort}>Stop</button></div>;
  if (fetchTask.result) updateTotal(fetchTask.result.total);

  return (
    <table className={'table' + (tableAttributes.table.striped===true ? ' table-striped':'')
      + (tableAttributes.table.dark===true ? ' table-dark':'')
      + (tableAttributes.table.bordered===true ? ' table-bordered':'')}>
        <DataTableHeader
          columnData={tableAttributes.columnData}
          darkHeader={tableAttributes.table.darkHeader}
          onSortSelected={ (id) => {
            const newSortData = sortData.map(sortDatum => {
              let sortEnabled =  sortDatum.sort || sortDatum.sort.enabled || false;
              let sortAscending = sortDatum.sort || !sortDatum.sort.ascending || false;
              sortDatum.id === id ? { ...sortDatum, sortEnabled,  sortAscending } : sortDatum
            });
            setSortData(newSortData);
          }}
        />
      <tbody>
      {fetchTask.result.data.map((r,i) => <DataRow key={i} columnData={tableAttributes.columnData} { ...r } /> )}
      </tbody>
    </table>
  );
}
