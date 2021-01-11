/**
 * PredecessorComponent.js
 *
 * @file Component for Predecessor
 *
 * @version 0.1.0 2020-06-12 MH
 * @author Michael Han <mhan1@unm.edu>
 *
 * @since 0.3.25
 */
import React,{ useState } from "react";
import FormAutosuggest from "./FormAutosuggest";
import FormText from "./FormText";

export default function PredecessorComponent() {
	const [triggeredValue, setTriggeredValue] = useState('');

	var field = {
	  identifier: 'predecessor',
	  label: 'Predecessor',
	  type: 'autosuggest',
	  attributes: {
      required: 'required'
	  },
	  values: {
      url: field_url,
      key: "id",
      display: "title",
      search: "id,title,type_code",
      trigger: {
        target: "acct_type",
        value: "type_code"
      }
	  },
	  view: {
      label: 3,
      data: 9
	  }
	};

	var field2 = {
	  identifier: 'acct_type',
	  label: 'Account Type',
	  type: 'autofill-text',
	  attributes: {
      readOnly: true
	  },
	  view: {
		label: 3,
		data: 9
	  }
	};

	return(
		<>
	  <FormAutosuggest field={field} onModify={ v => setTriggeredValue(v) } />
	  <div className="row"><div className="col-md-12"><div className="spacer5"></div></div></div>
	  <FormText field={field2} value={triggeredValue} />
	  </>
	);
}

