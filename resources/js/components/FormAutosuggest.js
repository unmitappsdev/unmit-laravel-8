/**
 * FormSuggest.js
 *
 * @file Autosuggest field component
 *
 * @version 0.1.0 2020-04-08 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React,{ useRef, useState, useCallback } from "react";
import { useAsyncCombineSeq, useAsyncRun, useAsyncTaskDelay, useAsyncTaskFetch } from "react-hooks-async";

export default function FormAutosuggest({field,displayValue,value,onModify = v => v}) {
  const [activeSelection, setActiveSelection] = useState(0);
  const [filteredSelections, setFilteredSelections] = useState([]);
  const [showSelections, setShowSelections] = useState(false);
  const [userInput, setUserInput] = useState(displayValue);
  const [userInputKey, setUserInputKey] = useState(value);
  const [userValueSet, setUserValueSet] = useState(false);
  const [groupHidden, setGroupHidden] = useState(field.view.hidden);

  const delayTask = useAsyncTaskDelay(useCallback(() => 1200, []));
  const fetchTask = useAsyncTaskFetch(field.values.url);
  const combinedTask = useAsyncCombineSeq(delayTask, fetchTask);

  const currentStyle = groupHidden ? {display:'none'}:{};

  let oldValue = null, oldValueKey = null;

  const elem = document.getElementById(field.identifier);

  useAsyncRun(combinedTask);

  if (delayTask.pending) return <div className="alert alert-info" role="alert">Waiting...</div>;
  if (fetchTask.error) return <div className="alert alert-danger" role="alert">Error found: {fetchTask.error.name} - {fetchTask.error.message}</div>;
  if (fetchTask.pending) return <div className="alert alert-primary" role="alert">Loading... <button onClick={fetchTask.abort}>Stop</button></div>;
  if (fetchTask.result != null) {
    if (typeof _old != "undefined" && _old.hasOwnProperty(field.identifier) && (typeof(elem)!='undefined' && elem != null)) {
      oldValue = _old[field.identifier]; 
      oldValueKey = _old[field.identifier+'_key']; 
      delete _old[field.identifier];
      delete _old[field.identifier+'_key'];
	  setUserInput(oldValue);
	  setUserInputKey(oldValueKey);
    }
  }

  var selections = fetchTask.result.data;

  var searchfields = field.values.search.split(',').map(function(item) {
    return item.trim();
  });

  const updateKeyValue = txt => {
    var newKeyValue = false;
    selections.forEach((item, index) => {
      if (item[field.values.display] === txt) {

        newKeyValue = item[field.values.key];
      }
    });

    if (newKeyValue === false) {
      setUserInputKey('');
      setUserValueSet(true);
      if (field.values.trigger) {
        // onModify(field.values.trigger.target,'');
        onModify('');
      }
    } else {
	  if (field.values.key_only == true) {
		  setUserInput(newKeyValue);
	  } else {
		  setUserInput(newKeyValue + ' - ' + userInput);
	  }
      setUserInputKey(newKeyValue);
      setUserValueSet(true);
      if (field.values.trigger) {
        // onModify(field.values.trigger.target,filteredSelections.filter(o => o[field.values.key] == newKeyValue)[0][field.values.trigger.value]);
        onModify(filteredSelections.filter(o => o[field.values.key] == newKeyValue)[0][field.values.trigger.value]);
      }
    }

  };

  const handleInputChange = e => {
    setUserInput(e.currentTarget.value);

    const filteredSelections = selections.filter(
      selection => {
        let current;
        for (var key in selection) {
          if (searchfields.indexOf(key) != -1) {
            if (selection.hasOwnProperty(key)) {
              if (typeof selection[key] === 'number') {
                current = selection[key].toString();
              } else {
                current = selection[key];
              }
		          if (current != null) {
                if (current.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) !== -1)
                  return true;
              }
            }
          }
        }
      }
    );
    setActiveSelection(0);
    setFilteredSelections(filteredSelections);
    setShowSelections(true);
    setUserInput(e.currentTarget.value);
    updateKeyValue(e.currentTarget.value);
  };

  const handleClick = (e,keyVal) => {
    var clickedText = e.currentTarget.innerText;

    setActiveSelection(0);
    setFilteredSelections([]);
    setShowSelections(false);
    setUserInput(clickedText);
    setUserInputKey(keyVal);
    setUserValueSet(true);
    if (field.values.trigger) {
      // onModify(field.values.trigger.target,filteredSelections.filter(o => o[field.values.key] == keyVal)[0][field.values.trigger.value]);
      onModify(filteredSelections.filter(o => o[field.values.key] == keyVal)[0][field.values.trigger.value]);
    }
  };

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      setActiveSelection(0);
      setShowSelections(false);
	  if (field.values.key_only == true) {
		  setUserInput(filteredSelections[activeSelection][field.values.key]);
	  } else {
		  setUserInput(filteredSelections[activeSelection][field.values.key]+' - '+filteredSelections[activeSelection][field.values.display]);
	  }
      setUserInputKey(filteredSelections[activeSelection][field.values.key]);
      setUserValueSet(true);
      if (field.values.trigger) {
        // onModify(field.values.trigger.target,filteredSelections.filter(o => o[field.values.key] == filteredSelections[activeSelection][field.values.key])[0][field.values.trigger.value]);
        onModify(filteredSelections.filter(o => o[field.values.key] == filteredSelections[activeSelection][field.values.key])[0][field.values.trigger.value]);
      }
      return;
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
  };

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
			if (field.values.key_only == true) {
			  return <li className={className} key={index} onMouseDown={e=>handleClick(e,selection[field.values.key])}>{selection[field.values.key]}</li>;
			} else {
			  return <li className={className} key={index} onMouseDown={e=>handleClick(e,selection[field.values.key])}>{selection[field.values.key]} - {selection[field.values.display]}</li>;
			}
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

  function findMatch(v) {
    if (field.values.key in v) {
      return v[field.values.key] == value;
    } else {
      return false;
    }
  }

  // <input type={field.type} className="form-control" onBlur={() => setShowSelections(false)} onChange={e => handleInputChange(e)} onKeyDown={e => handleKeyDown(e)} name={field.identifier} id={field.identifier} {...field.attributes} placeholder={field.placeholder===null ? '':field.placeholder} defaultValue={oldValue!=null ? oldValue:((typeof init_value[field.identifier] != 'undefined') ? init_value[field.identifier]:value)} value={oldValue!=null ? oldValue:userInput} />
  // <input type="hidden" id={field.identifier + "_key"} name={field.identifier + "_key"} defaultValue={oldValueKey!=null ? oldValueKey:((typeof init_value[field.identifier+'_key'] != 'undefined') ? init_value[field.identifier+'_key']:value)} value={oldValueKey!=null ? oldValueKey:userInputKey} />
  if (field.values.trigger && (userValueSet == false) && (value!=null)) {
    let matchResult = selections.filter(findMatch);
	if (matchResult[0] !== undefined) {
		onModify(matchResult[0][field.values.trigger.value] ?? null);
		setUserValueSet(true);
	}
  }

  return (
<div className="form-group" id={field.identifier + "-group"} style={currentStyle}>
{field.view ? (
<>
  <label htmlFor={field.identifier} className={"col-md-" + field.view.label + " control-label"}>{field.label}</label>
  <div className={"col-md-" + field.view.data}>
    <input type={field.type} className="form-control" onBlur={() => setShowSelections(false)} onChange={e => handleInputChange(e)} onKeyDown={e => handleKeyDown(e)} name={field.identifier} id={field.identifier} {...field.attributes} placeholder={field.placeholder===null ? '':field.placeholder} value={userInput} />
    <input type="hidden" id={field.identifier + "_key"} name={field.identifier + "_key"} value={userInputKey} />
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
  <input type={field.type} className="form-control" onBlur={() => setShowSelections(false)} onChange={e => handleInputChange(e)} onKeyDown={e => handleKeyDown(e)} name={field.identifier} id={field.identifier} {...field.attributes} placeholder={field.placeholder===null ? '':field.placeholder} value={userInput} />
  <input type="hidden" id={field.identifier + "_key"} name={field.identifier + "_key"} value={userInputKey} />
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
