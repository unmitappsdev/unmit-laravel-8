/**
 * FormEdit.js
 *
 * @file An edit form generator
 *
 * @version 0.1.1 2020-04-30 MH add Autofill
 *	        0.1.0 2019-10-18 MH
 *
 * @author Michael Han <mhan1@unm.edu>
 */
import React,{ useRef, useState, useCallback } from "react";
import { useAsyncCombineSeq, useAsyncRun, useAsyncTaskDelay, useAsyncTaskFetch } from "react-hooks-async";
import FormText from './FormText';
import FormNumber from './FormNumber';
import FormRadio from './FormRadio';
import FormTextarea from './FormTextarea';
import FormDropdown from './FormDropdown';
import FormAutosuggest from './FormAutosuggest';
import FormAutosuggest2 from './FormAutosuggest2';
import FormSimpleAutosuggest from './FormSimpleAutosuggest';

const initparam = {
  headers: {
    Credentials: 'include',
    Authorization: _oauth_token_type + ' ' + _oauth_access_token,
    'user-agent': 'UNMReactJSRuntime/0.1.0',
    Accept: 'application/json',
  }
};

export default function FormEdit({ formAttributes })
{
  const [triggeredValue, setTriggeredValue] = useState('');

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
      <form method="POST" action={_saveformCallback} className="form-horizontal" autoComplete="off">
      <input type="hidden" name="_token" value={_csrf_token} />
      <input type="hidden" name="id" value={_record_id} />

      {formAttributes.fieldData.map( (field,i) => {
        switch (field.type) {
          case 'text':
            return <FormText key={i} field={field} value={eval('fetchTask.result.data.'+field.identifier)} />;
            break;
          case 'number':
            return <FormNumber key={i} field={field} value={eval('fetchTask.result.data.'+field.identifier)} />;
            break;
          case 'radio':
            return <FormRadio key={i} field={field} value={eval('fetchTask.result.data.'+field.identifier)} />;
            break;
          case 'textarea':
            return <FormTextarea key={i} field={field} value={eval('fetchTask.result.data.'+field.identifier)} />;
            break;
          case 'autosuggest':
            return <FormAutosuggest key={i} field={field} displayValue={eval('fetchTask.result.data.'+field.identifier+'_display')} value={eval('fetchTask.result.data.'+field.identifier)} onModify={v => setTriggeredValue(v)} />;
            break;
          case 'autosuggest2':
            if (eval('fetchTask.result.data.'+field.identifier) !== undefined && eval('fetchTask.result.data.'+field.identifier) !== '' && eval('fetchTask.result.data.'+field.identifier) !== null) {
              field.view.hidden = false;
            }
            return <FormAutosuggest2 key={i} field={field} displayValue={eval('fetchTask.result.data.'+field.identifier+'_display')} value={eval('fetchTask.result.data.'+field.identifier)} onModify={v => setTriggeredValue(v)} />;
            break;
          case 'simple-autosuggest':
            return <FormSimpleAutosuggest key={i} field={field} value={eval('fetchTask.result.data.'+field.identifier)} />;
            break;
          case 'dropdown':
            return <FormDropdown key={i} field={field} value={eval('fetchTask.result.data.'+field.identifier)} />;
            break;
          case 'autofill-text':
            if (triggeredValue == '')
              setTriggeredValue(eval('fetchTask.result.data.'+field.identifier));
            return <FormText key={i} field={field} value={triggeredValue} />;
            break;
          default:
            console.error('Unknown form field type');
        }
      })}

      {formAttributes.button_indent ? (
      <>
        <div className={"col-md-" + formAttributes.button_indent}></div>
      </>
      ):(
        <>
        </>
      )}

      {formAttributes.buttons ? (
      <>
        {formAttributes.button_indent ? (
          <>
        <div className={"col-md-" + (12-formAttributes.button_indent)}>
        {formAttributes.buttons.map( (field,i) => {
          if (field.type) {
            if (field.type=='a') {
              return (
                <>
                <a key={i} className="btn btn-default" {...field.attributes}>{field.label}</a>&nbsp;&nbsp;
                </>
              );
            } else {
              return (
                <>
                <button key={i} type={field.type} className="btn btn-default" {...field.attributes}>{field.label}</button>&nbsp;&nbsp;
                </>
              );
            }
          } else {
            return (
              <>
              <button key={i} className="btn btn-default" {...field.attributes}>{field.label}</button>&nbsp;&nbsp;
              </>
            );
          }
        })}
        </div>
          </>
        ):(
          <>
        {formAttributes.buttons.map( (field,i) => {
          if (field.type) {
            if (field.type=='a') {
              return (
                <>
                <a key={i} className="btn btn-default" {...field.attributes}>{field.label}</a>&nbsp;&nbsp;
                </>
              );
            } else {
              return (
                <>
                <button key={i} type={field.type} className="btn btn-default" {...field.attributes}>{field.label}</button>&nbsp;&nbsp;
                </>
              );
            }
          } else {
            return (
              <>
              <button key={i} className="btn btn-default" {...field.attributes}>{field.label}</button>&nbsp;&nbsp;
              </>
            );
          }
        })}
          </>
        )}
      {formAttributes.button_indent ? (
      <>
      </>
      ):(
        <>
        </>
      )}
      </>
      ):(
      <>
      <div className="row">
        <div className="col pb-3">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>
      </>
      )}
    </form>
    </>
  );
};
