/**
 * FormSuggest2.js
 *
 * @file Autosuggest field component that loads data on as-needed basis
 *
 * @version 0.1.0 2020-07-16 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React,{ useRef, useEffect, useState, useCallback } from "react";

async function getData(dataUrl) {
  let sels;
  const response = await fetch(dataUrl)
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

function getData2(dataUrl) {
  let sels;
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

export default function FormAutosuggest2({field,displayValue,value,onModify = v => v}) {
  var fieldValues = {};
  const setFieldValues = v => {
    fieldValues = v;
  };
  Array.from(document.querySelectorAll("input,select")).forEach(
    input => (setFieldValues({...fieldValues,[input.id]: input.value}))
  );

  const [activeSelection, setActiveSelection] = useState(0);
  const [filteredSelections, setFilteredSelections] = useState([]);
  const [showSelections, setShowSelections] = useState(false);
  const [userInput, setUserInput] = useState(displayValue);
  const [userInputKey, setUserInputKey] = useState(value);
  const [groupHidden, setGroupHidden] = useState(field.view.hidden);

  let urlParams = '';
  let numParams = 0;

  if (field.values.hasOwnProperty('url_param_fields')) {
    let arrstr = field.values.url_param_fields.split(",");
    arrstr.forEach((elem) => {
      if (fieldValues[elem.trim()]!==undefined) {
        if (urlParams == '')
          urlParams = '?';
        numParams = numParams + 1;
        if (numParams > 1)
          urlParams = urlParams + '&';
        urlParams = urlParams + elem + '=' + fieldValues[elem.trim()];
      }
    });
  }


  const dataFetchUrl = field.values.url + '/' + userInput + urlParams;

  const currentStyle = groupHidden ? {display:'none'}:{};

  useEffect(() => {
    setUserInput(displayValue);
    setUserInputKey(value);
  },[displayValue,value]);

  let oldValue = null, oldValueKey = null;

  // var selections = getData(dataFetchUrl);
  var selections = { };


  const elem = document.getElementById(field.identifier);

  /*
  if (typeof userInput != 'undefined' && userInput.length >= 3) {
    getData(dataFetchUrl).then(data=> {
      if (typeof data != 'undefined') {
        selections = data.data;
        setFilteredSelections(selections);
      }
    });
  } else {
    selections = null;
  }
  */

  // if ((selections != null ? Object.keys(selections).length>0:false) || (typeof _old != "undefined")) {
    // if (typeof _old != "undefined" && _old.hasOwnProperty(field.identifier) && (typeof(elem)!='undefined' && elem != null)) {
	if (typeof _old != "undefined" && _old.hasOwnProperty(field.identifier)) {
      oldValue = _old[field.identifier]; 
      oldValueKey = _old[field.identifier+'_key']; 
      delete _old[field.identifier];
      delete _old[field.identifier+'_key'];
	  setUserInput(oldValue);
	  setUserInputKey(oldValueKey);
    }
  // }

  var searchfields = field.values.search.split(',').map(function(item) {
    return item.trim();
  });

  const updateKeyValue = txt => {
    var newKeyValue = false;
    if (selections != null ? Object.keys(selections).length>0:false) {
      selections.forEach((item, index) => {
        if (item[field.values.display] === txt) {

          newKeyValue = item[field.values.key];
        }
      });
    }

    if (newKeyValue === false) {
      setUserInputKey('');
      if (field.values.trigger) {
        // onModify(field.values.trigger.target,'');
        onModify('');
      }
    } else {
      setUserInput(newKeyValue + ' - ' + userInput);
      setUserInputKey(newKeyValue);
      if (field.values.trigger) {
        // onModify(field.values.trigger.target,filteredSelections.filter(o => o[field.values.key] == newKeyValue)[0][field.values.trigger.value]);
        onModify(filteredSelections.filter(o => o[field.values.key] == newKeyValue)[0][field.values.trigger.value]);
      }
    }

  };

  const handleInputChange = e => {
    setUserInput(e.currentTarget.value);

	  if (selections != null ? Object.keys(selections).length>0:false) {
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
    } else {
      const filteredSelections = null;
    }
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
    if (field.values.trigger) {
      // onModify(field.values.trigger.target,filteredSelections.filter(o => o[field.values.key] == keyVal)[0][field.values.trigger.value]);
      onModify(filteredSelections.filter(o => o[field.values.key] == keyVal)[0][field.values.trigger.value]);
    }
  };

  const handleKeyUp = e => {
    if (userInput.length >= 3) {
      getData2(dataFetchUrl).then(data=> {
        if (typeof data != 'undefined') {
          selections = data.data;
          setFilteredSelections(selections);
        }
      });
    }
  };

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      setActiveSelection(0);
      setShowSelections(false);
      setUserInput(filteredSelections[activeSelection][field.values.key]+' - '+filteredSelections[activeSelection][field.values.display]);
      setUserInputKey(filteredSelections[activeSelection][field.values.key]);
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
            let classN;

            if (index === activeSelection) {
              classN = "selection-active";
            }

            return <li className={classN} key={index} onMouseDown={e=>handleClick(e,selection[field.values.key])}>{selection[field.values.key]} - {selection[field.values.display]}</li>;
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

  // <input type={field.type} className="form-control" onBlur={() => setShowSelections(false)} onChange={e => handleInputChange(e)} onKeyDown={e => handleKeyDown(e)} name={field.identifier} id={field.identifier} {...field.attributes} placeholder={field.placeholder===null ? '':field.placeholder} defaultValue={oldValue!=null ? oldValue:((typeof init_value[field.identifier] != 'undefined') ? init_value[field.identifier]:value)} value={oldValue!=null ? oldValue:userInput} />
  // <input type="hidden" id={field.identifier + "_key"} name={field.identifier + "_key"} defaultValue={oldValueKey!=null ? oldValueKey:((typeof init_value[field.identifier+'_key'] != 'undefined') ? init_value[field.identifier+'_key']:value)} value={oldValueKey!=null ? oldValueKey:userInputKey} />

  return (
<div className="form-group" id={field.identifier + "-group"} style={currentStyle}>
{field.view ? (
<>
  <label htmlFor={field.identifier} className={"col-md-" + field.view.label + " control-label"}>{field.label}</label>
  <div className={"col-md-" + field.view.data}>
    <input type={field.type} className="form-control" onBlur={() => setShowSelections(false)} onChange={e => handleInputChange(e)} onKeyUp={e => handleKeyUp(e)} onKeyDown={e => handleKeyDown(e)} name={field.identifier} id={field.identifier} {...field.attributes} placeholder={field.placeholder===null ? '':field.placeholder} value={userInput} />
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
	<input type={field.type} className="form-control" onBlur={() => setShowSelections(false)} onChange={e => handleInputChange(e)} onKeyUp={e => handleKeyUp(e)} onKeyDown={e => handleKeyDown(e)} name={field.identifier} id={field.identifier} {...field.attributes} placeholder={field.placeholder===null ? '':field.placeholder} value={userInput} />
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
