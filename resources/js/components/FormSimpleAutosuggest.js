/**
 * FormSimpleAutosuggest.js
 *
 * @file SimpleAutosuggest field component
 *
 * @version 0.1.0 2020-04-08 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React,{ useState } from "react";

export default function FormSimpleAutosuggest({field,value}) {

  const [activeSelection, setActiveSelection] = useState(0);
  const [filteredSelections, setFilteredSelections] = useState([]);
  const [showSelections, setShowSelections] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [groupHidden, setGroupHidden] = useState(field.view.hidden);
  const currentStyle = groupHidden ? {display:'none'}:{};

  var selections = TestSimpleDataSet();

  let oldValue = null;

  const elem = document.getElementById(field.identifier);

  const handleInputChange = e => {
    setUserInput(e.currentTarget.value);

    const filteredSelections = selections.filter(
      /*
      selection => {
        var retval = {};
        for (var key in selection) {
          if (selection.hasOwnProperty(key)) {
            retval[key] = selection[key].toLowerCase().indexOf(userInput.toLowerCase());
          }
        }
        return retval;
      }
      */
      selection => selection.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) !== -1
    );
    setActiveSelection(0);
    setFilteredSelections(filteredSelections);
    setShowSelections(true);
    setUserInput(e.currentTarget.value);
  };

  const handleClick = e => {
    setActiveSelection(0);
    setFilteredSelections([]);
    setShowSelections(false);
    setUserInput(e.currentTarget.innerText);
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      setActiveSelection(0);
      setShowSelections(false);
      setUserInput(filteredSelections[activeSelection]);
    } else if (e.keyCode === 38) {
      if (activeSelection === 0) {
        return;
      }
      setActiveSelection(activeSelection-1);
    } else if (e.keyCode === 40) {
      if (activeSelection - 1 === filteredSelections.length) {
        return;
      }
      setActiveSelection(activeSelection+1);
    }
  }

  let selectionsListComponent;

  if (showSelections && userInput) {
    if (filteredSelections.length) {
      selectionsListComponent = (
        <ul className="selections">
          {filteredSelections.map((selection, index) => {
            let className;

            if (index === activeSelection) {
              className = "selection-active";
            }

            return (
              <li className={className} key={index} onClick={e=>handleClick(e)}>
                {selection}
              </li>
            );
          })}
        </ul>
      );
    } else {
      selectionsListComponent = (
        <ul className="selections">
          <li>None found</li>
        </ul>
      );
    }
  }

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
    <input type={field.type} className="form-control" onChange={e => handleInputChange(e)} onKeyDown={e => handleKeyDown(e)} name={field.identifier} id={field.identifier} {...field.attributes} placeholder={field.placeholder===null ? '':field.placeholder} defaultValue={oldValue!=null ? oldValue:userInput} />
    { selectionsListComponent }
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
  <input type={field.type} className="form-control" onChange={e => handleInputChange(e)} onKeyDown={e => handleKeyDown(e)} name={field.identifier} id={field.identifier} {...field.attributes} placeholder={field.placeholder===null ? '':field.placeholder} defaultValue={oldValue!=null ? oldValue:userInput} />
    { selectionsListComponent }
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
