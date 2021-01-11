/**
 * FormDropdown.js
 *
 * @file Dropdown field component
 *
 * @version 0.1.0 2019-10-17 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React from "react";

export default function FormDropdown({field,value}) {
  const keys = Object.keys(field.values[0]);
  const vals = Object.values(field.values[0]);
  const [groupHidden, setGroupHidden] = useState(field.view.hidden);

  const currentStyle = groupHidden ? {display:'none'}:{};

  let oldValue = null;

  const elem = document.getElementById(field.identifier);

  if (typeof _old != "undefined" && _old.hasOwnProperty(field.identifier) && (typeof(elem)!='undefined' && elem != null)) {
    oldValue = _old[field.identifier]; 
    delete _old[field.identifier];
  }

  return (
<div className="form-group" id={field.identifier + "-group"} style={currentStyle}>
{field.view ? (
<>
  <label htmlFor={field.identifier} className={"col-md-" + field.view.label + " control-label"}>{field.label}</label>
  <div className={"col-md-" + field.view.data}>
    <select className="form-control" name={field.identifier} id={field.identifier} defaultValue={oldValue!=null ? oldValue:value}>
      {keys.map((val,i) => {
        return <option key={i} value={val}>{vals[i]}</option>;
      })}
    </select>
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
<div id={field.identifier + "-group"} style={currentStyle}>
  <label htmlFor={field.identifier} className="control-label">{field.label}</label>
  <select className="form-control" name={field.identifier} id={field.identifier} defaultValue={oldValue!=null ? oldValue:value}>
      {keys.map((val,i) => {
        return <option key={i} value={val}>{vals[i]}</option>;
      })}
  </select>
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
