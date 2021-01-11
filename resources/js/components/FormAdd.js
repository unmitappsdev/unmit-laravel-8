/**
 * FormAdd.js
 *
 * @file For a creation of a form
 *
 * @version 0.1.1 2020-04-30 MH add Autofill
 *			0.1.0 2019-10-17 MH
 *
 * @author Michael Han <mhan1@unm.edu>
 */
import React,{ useState } from "react";
import FormText from './FormText';
import FormNumber from './FormNumber';
import FormRadio from './FormRadio';
import FormTextarea from './FormTextarea';
import FormDropdown from './FormDropdown';
import FormAutosuggest from './FormAutosuggest';
import FormAutosuggest2 from './FormAutosuggest2';
import FormSimpleAutosuggest from './FormSimpleAutosuggest';

      // <form method="POST" action={_saveformCallback} className="form-horizontal" onSubmit={e => { e.preventDefault(); }} autoComplete="off">

export default function FormAdd({ formAttributes }) {
	const [triggeredValue, setTriggeredValue] = useState('');

  return (
    <>
      <form method="POST" action={_saveformCallback} className="form-horizontal" autoComplete="off">
      <input type="hidden" name="_token" value={_csrf_token}/>
      {formAttributes.fieldData.map( (field,i) => {
        switch (field.type) {
          case 'text':
            return <FormText key={i} field={field} />;
            break;
          case 'number':
            return <FormNumber key={i} field={field} />;
            break;
          case 'radio':
            return <FormRadio key={i} field={field} />;
            break;
          case 'textarea':
            return <FormTextarea key={i} field={field} />;
            break;
          case 'autosuggest':
            return <FormAutosuggest key={i} field={field} onModify={ v => setTriggeredValue(v) } />;
            break;
          case 'autosuggest2':
            return <FormAutosuggest2 key={i} field={field} onModify={ v => setTriggeredValue(v) } />;
            break;
          case 'simple-autosuggest':
            return <FormSimpleAutosuggest key={i} field={field} />;
            break;
          case 'dropdown':
            return <FormDropdown key={i} field={field} />;
            break;
          case 'autofill-text':
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
              return <a key={i} className="btn btn-default" {...field.attributes}>{field.label}</a>;
            } else {
              return <button key={i} type={field.type} className="btn btn-default" {...field.attributes}>{field.label}</button>;
            }
          } else {
            return <button key={i} className="btn btn-default" {...field.attributes}>{field.label}</button>;
          }
        })}
        </div>
          </>
        ):(
          <>
        {formAttributes.buttons.map( (field,i) => {
          if (field.type) {
            if (field.type=='a') {
              return <a key={i} className="btn btn-default" {...field.attributes}>{field.label}</a>;
            } else {
              return <button key={i} type={field.type} className="btn btn-default" {...field.attributes}>{field.label}</button>;
            }
          } else {
            return <button key={i} className="btn btn-default" {...field.attributes}>{field.label}</button>;
          }
        })}
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
