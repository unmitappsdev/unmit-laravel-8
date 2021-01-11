/**
 * FormText.js
 *
 * @file Text field component
 *
 * @version 0.1.0 2019-10-17 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React,{ useState } from "react";

export default function FormText({field,value}) {
  const [groupHidden, setGroupHidden] = useState(field.view.hidden);
  const currentStyle = groupHidden ? {display:'none'}:{};

	const handleInputChange = e => {

    // validation
    let obj = e.target;

    // via pattern attribute
    if (obj.validity.patternMismatch) {
      obj.setCustomValidity('Please only use valid characters');
    } else {
      obj.setCustomValidity('');
    }
    obj.checkValidity();

    var pattern = obj.pattern.replace('^','');
    var re = new RegExp(pattern,'');
    obj.value = obj.value.replace(re,"");
  };

  return (
<div className="form-group" id={field.identifier + "-group"} style={currentStyle}>
{field.view ? (
<>
  <label htmlFor={field.identifier} className={"col-md-" + field.view.label + " control-label"}>{field.label}</label>
  <div className={"col-md-" + field.view.data}>
    <input type="text" className="form-control" name={field.identifier} id={field.identifier} {...field.attributes} placeholder={field.placeholder===null ? '':field.placeholder} defaultValue={(typeof _old!='undefined' && _old.hasOwnProperty(field.identifier)) ? _old[field.identifier]:((typeof init_value != 'undefined' && typeof init_value[field.identifier] != 'undefined') ? init_value[field.identifier]:value)} onKeyUp={e => handleInputChange(e)} />
    { field.desc ? (
      <>
        <span id="helpBlock" className="help-block">{field.desc}</span>
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
  <input type="text" className="form-control" name={field.identifier} id={field.identifier} {...field.attributes} placeholder={field.placeholder===null ? '':field.placeholder} defaultValue={(typeof _old!='undefined' && _old.hasOwnProperty(field.identifier)) ? _old[field.identifier]:((typeof init_value != 'undefined' && typeof init_value[field.identifier] != 'undefined') ? init_value[field.identifier]:value)} onChange={e => handleInputChange(e)}/>
    { field.desc ? (
      <>
        <span id="helpBlock" className="help-block">{field.desc}</span>
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
