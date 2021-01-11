/**
 * DisplayRecord.js
 *
 * @file A display file for Show
 *
 * @version 0.1.0 2019-10-18 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React,{ useRef, useState, useCallback } from "react";
import { useAsyncCombineSeq, useAsyncRun, useAsyncTaskDelay, useAsyncTaskFetch } from "react-hooks-async";
import DisplayText from './DisplayText';


const DisplayButton = () => {
  if (_display_delete_confirm) {
    return <a href={_buttonLink}><button className="btn btn-danger">Confirm Delete</button></a>;
  } else {
    return <a href={_buttonLink}><button className="btn btn-primary">OK</button></a>;
  }
}


const handleBack = () => {
  history.back();
};


const GoBackButton = () => <button className="btn btn-secondary" onClick={handleBack}>Back</button>;


const initparam = {
  headers: {
    Credentials: 'include',
    Authorization: _oauth_token_type + ' ' + _oauth_access_token,
    'user-agent': 'UNMReactJSRuntime/0.1.0',
    Accept: 'application/json',
  }
};


export default function DisplayRecord({ displayAttributes })
{
  const apiurl = _apiurl + '/' + (_record_id || null);

  const delayTask = useAsyncTaskDelay(useCallback(() => 1200, [_record_id]));
  const fetchTask = useAsyncTaskFetch(apiurl,initparam);
  const combinedTask = useAsyncCombineSeq(delayTask, fetchTask);

  useAsyncRun(combinedTask);

  if (delayTask.pending) return <div className="alert alert-info" role="alert">Waiting...</div>;
  if (fetchTask.error) return <div className="alert alert-danger" role="alert">Error found: {fetchTask.error.name} - {fetchTask.error.message}</div>;
  if (fetchTask.pending) return <div className="alert alert-primary" role="alert">Loading... <button onClick={fetchTask.abort}>Stop</button></div>;

  return (
    <>
      <dl className="dl-horizontal">
        {displayAttributes.fieldData.map( (field,i) => {
          // const value = fetchTask.result.data
          switch (field.type) {
            case 'text':
            case 'number':
            case 'dropdown':
              return <DisplayText key={i} field={field} value={eval('fetchTask.result.data.'+field.identifier)}/>;
              break;
            default:
              console.error('Unknown form field type');
          }
        })}
      </dl>
      <div className="row">
        <div className="col pb-3">
          <DisplayButton /> <GoBackButton />
        </div>
      </div>
    </>
  );
};
