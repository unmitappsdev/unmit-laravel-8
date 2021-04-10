/**
 * FormLoadfrom.js
 *
 * @file Loadfrom field component
 *
 * @version 0.1.0 2021-04-06 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React,{ useState } from "react";


export default function FormLoadfrom({field,value,onUpdate = v => v}) {
  const [groupHidden, setGroupHidden] = useState(field.view.hidden);
  const [inputVal,setInputVal] = useState(value);
  const currentStyle = groupHidden ? {display:'none'}:{};

  const handleChange = e => {
    setInputVal(e.target.value);
  };

  const handleClick = e => {
    onUpdate(inputVal);
  };

  const ColoredLine = ({ color }) => (
      <hr
          style={{
              color: color,
              backgroundColor: color,
              height: 1
          }}
      />
  );

  return (
<div className="form-group" id={field.identifier + "-group"} style={currentStyle}>
{field.view ? (
<>
  <label htmlFor={field.identifier} className={"col-md-" + field.view.label + " control-label"}>{field.label}</label>
  <div className={"col-md-2"}>
      <input type="text" className="form-control" name={field.identifier} id={field.identifier} {...field.attributes} placeholder={field.placeholder===null ? '':field.placeholder} onChange={e => handleChange(e)}/>
    { field.desc ? (
      <>
        <span id="helpBlock" className="help-block">{field.desc}</span>
      </>
    ):(
      <>
      </>
    )}
  </div>
  <div className={"col-md-" +(field.view.data-2)}>
      <button id="load" onClick={e => handleClick(e)}>Load</button>
  </div>
	<div className={"row"}>
		<div className={"col-md-12"}>
		<ColoredLine color="black" />
		</div>
	</div>
</>
):(
<>
<div id={field.identifier + "-group"} style={currentStyle}>
  <label htmlFor={field.identifier} className="control-label">{field.label}</label>
    <input type="text" className="form-control" name={field.identifier} id={field.identifier} {...field.attributes} placeholder={field.placeholder===null ? '':field.placeholder} />
    { field.desc ? (
      <>
        <span id="helpBlock" className="help-block">{field.desc}</span>
      </>
    ):(
      <>
      </>
    )}
    <button id="load">Load</button>
    <hr/>
</div>
<ColoredLine color="black" />
</>
)}
</div>);
}
