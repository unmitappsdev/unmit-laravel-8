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
import FormLoadfrom from './FormLoadfrom';
import FormText from './FormText';
import FormNumber from './FormNumber';
import FormRadio from './FormRadio';
import FormTextarea from './FormTextarea';
import FormDropdown from './FormDropdown';
import FormAutosuggest from './FormAutosuggest';
import FormAutosuggest2 from './FormAutosuggest2';
import FormSimpleAutosuggest from './FormSimpleAutosuggest';

function getData(dataUrl) {
  const response = fetch(dataUrl)
    .then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            return response.json()
        }
    })
    .catch(error => {
      console.log("Error fetching and parsing data",error);
    });

  return response;
}

export default function FormAdd({ formAttributes }) {
  var triggeredValue = {};
  const setTriggeredValue = v => {
    triggeredValue = v;
  };

  const [vals,setVals] = useState({});

  const handleLoadfrom = (field,v) => {
    getData(field.values.url+v).then(d => {
      if (typeof d != 'undefined') {

        const keys = Object.keys(field.values.load);
        keys.forEach((key, i) => {
          if (field.values.load[key].length==1) {
            if (d.data[field.values.load[key]]!=null) {
              setTriggeredValue({...triggeredValue,[key]: d.data[field.values.load[key]]});
            }
          } else {
            if (d.data[field.values.load[key][0]]!=null) {
              setTriggeredValue({...triggeredValue,[key+'_key']: d.data[field.values.load[key][0]]});
              setTriggeredValue({...triggeredValue,[key]: d.data[field.values.load[key][0]] + ' - ' + d.data[field.values.load[key][1]]});
            }
          }
        });
      }
      setVals(triggeredValue);
    });
  };

  return (
    <>
      <form method="POST" action={_saveformCallback} className="form-horizontal" autoComplete="off">
      <input type="hidden" name="_token" value={_csrf_token}/>
      {formAttributes.fieldData.map( (field,i) => {
        switch (field.type) {
          case 'loadfrom':
            return <FormLoadfrom key={i} field={field} onUpdate={ v => handleLoadfrom(field,v) } />;
            break;
          case 'text':
            return <FormText key={i} field={field} value={vals.hasOwnProperty(field.identifier) ? vals[field.identifier]:''} />;
            break;
          case 'number':
            return <FormNumber key={i} field={field} value={vals.hasOwnProperty(field.identifier) ? vals[field.identifier]:''}/>;
            break;
          case 'radio':
            return <FormRadio key={i} field={field} value={vals.hasOwnProperty(field.identifier) ? vals[field.identifier]:''} />;
            break;
          case 'textarea':
            return <FormTextarea key={i} field={field} value={vals.hasOwnProperty(field.identifier) ? vals[field.identifier]:''} />;
            break;
          case 'autosuggest':
            return <FormAutosuggest key={i} field={field} displayValue={vals.hasOwnProperty(field.identifier) ? vals[field.identifier]:''} value={vals.hasOwnProperty(field.identifier+'_key') ? vals[field.identifier+'_key']:''} onModify={ v => setVals({...vals,[field.values.trigger.target]: v}) } />;
            break;
          case 'autosuggest2':
            return <FormAutosuggest2 key={i} field={field} displayValue={vals.hasOwnProperty(field.identifier) ? vals[field.identifier]:''} value={vals.hasOwnProperty(field.identifier+'_key') ? vals[field.identifier+'_key']:''} onModify={ v => setVals({...vals,[field.values.trigger.target]: v}) } />;
            break;
          case 'simple-autosuggest':
            return <FormSimpleAutosuggest key={i} field={field} displayValue={vals.hasOwnProperty(field.identifier) ? vals[field.identifier]:''} value={vals.hasOwnProperty(field.identifier) ? vals[field.identifier]:''} />;
            break;
          case 'dropdown':
            return <FormDropdown key={i} field={field} value={vals.hasOwnProperty(field.identifier) ? vals[field.identifier]:''} />;
            break;
          case 'autofill-text':
            return <FormText key={i} field={field} value={vals.hasOwnProperty(field.identifier) ? vals[field.identifier]:''} />;
            break;
          default:
            console.error('Unknown form field type');
            break;
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
