/**
 * FormRadio.js
 *
 * @file Radio field component
 *
 * @version 0.1.0 2020-07-14 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React,{ useState } from "react";

export default function FormRadio({field,value}) {
  // const [defaultKey,setDefaultKey] = useState(field.default);
	/*
  const keys = Object.keys(field.values[0]);
  const vals = Object.values(field.values[0]);
  */

  const [groupHidden, setGroupHidden] = useState(field.view.hidden);

  const currentStyle = groupHidden ? {display:'none'}:{};

  let oldValue = null;

  const elem = document.getElementById(field.identifier);

  if (typeof _old != "undefined" && _old.hasOwnProperty(field.identifier) && (typeof(elem)!='undefined' && elem != null)) {
    oldValue = _old[field.identifier]; 
    delete _old[field.identifier];
  }

  const handleChange = (e) => {
    if (field.hasOwnProperty("trigger") && field.trigger.hasOwnProperty("target")) {
      let obj = document.getElementById(field.trigger.target + '-group');
      if ((Object.values(field.trigger.values).includes(e.target.value)) && (field.trigger.action=='visible')) {
        obj.style.display = "block";
      } else {
        obj.style.display = "none";
      }
    }
  };

  return (
<div className="form-group controls-row" id={field.identifier + "-group"} style={currentStyle}>
{field.view ? (
<>
  <label htmlFor={field.identifier} className={"col-md-" + field.view.label + " control-label"}>{field.label}</label>
  <div className={"radio col-md-" + field.view.data}>
{Object.entries(field.values).map(([key,val]) => {
  return (
      <label key={key} htmlFor={field.identifier + '_' + key} className="radio-inline">
        <input type="radio" name={field.identifier} id={field.identifier + '_' + key} {...field.attributes} value={key} defaultChecked={oldValue!=null ? (oldValue==key):(value ? (value==key):(field.default==key))} onChange={handleChange}/>
        {val}
      </label>
  );
})}
  </div>
</>
):(
<>
<div className="radio" id={field.identifier + "-group"} style={currentStyle}>
{Object.entries(field.values).map(([key,val]) => {
  return (
    <label key={key} htmlFor={field.identifier + '_' + key} className="radio-inline control-label">
      <input type="radio" name={field.identifier} id={field.identifier + '_' + key} {...field.attributes} value={key} defaultChecked={oldValue!=null ? (oldValue==key):(value ? (value==key):(field.default==key))} onChange={handleChange}/>
      {val}
    </label>
  );
})}
  </div>
</>
)}
</div>
  );
}
