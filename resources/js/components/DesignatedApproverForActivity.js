/**
 * DesignatedApproverForActivity.js
 *
 * @file Renderer for DesignatedApproverForActivity
 *
 * @version 0.1.0 2020-05-27 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React from 'react';
import { render } from "react-dom";
import FormAutosuggest from "./FormAutosuggest";

var field = {
  identifier: 'da_netid',
  label: 'Designated Approver',
  desc: "If the FM is not available or delegated their approvals, please enter the name of the alternate approver",
  values: {
    url: field_url,
    key: "netid",
    display: "name",
    search: "netid,name"
  },
  view: {
    label: 3,
    data: 9
  }
};

render(
  <FormAutosuggest field={field} displayValue={dispVal} value={val} />
  , document.getElementById("target_tag")
);
