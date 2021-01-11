/**
 * FormTextarea.js
 *
 * @file Textarea field component
 *
 * @version 0.1.0 2020-03-25 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React,{ useState } from "react";

export default function FormTextarea({field,value}) {
  const [groupHidden, setGroupHidden] = useState(field.view.hidden);

  const currentStyle = groupHidden ? {display:'none'}:{};

  if ('attributes' in field)
    var tmp = field.attributes;

  if ((tmp==null) || (!("rows" in tmp))) {
    field.attributes = {
      rows: 1
    };
  }

  return (
<div className="form-group" id={field.identifier + "-group"} style={currentStyle}>
{field.view ? (
<>
  <label htmlFor={field.identifier} className={"col-md-" + field.view.label + " control-label"}>{field.label}</label>
  <div className={"col-md-" + field.view.data}>
    <textarea className="form-control" name={field.identifier} id={field.identifier} {...field.attributes} defaultValue={(typeof _old!='undefined' && _old.hasOwnProperty(field.identifier)) ? _old[field.identifier]:value } />
    { field.desc ? (
      <>
        <span id="helpBlock" class="help-block">{field.desc}</span>
      </>
    ):(
      <>
      </>
    )}
  </div>
</>
):(
<>
  <div className="col-md-12 input-group" id={field.identifier + "-group"} style={currentStyle}>
  <label htmlFor={field.identifier} className="control-label">{field.label}</label>
  <textarea className="form-control" name={field.identifier} id={field.identifier} {...field.attributes} defaultValue={(typeof _old!='undefined' && _old.hasOwnProperty(field.identifier)) ? _old[field.identifier]:value } />
    { field.desc ? (
      <>
        <span id="helpBlock" class="help-block">{field.desc}</span>
      </>
    ):(
      <>
      </>
    )}
  </div>
</>
)}
</div>);
}
