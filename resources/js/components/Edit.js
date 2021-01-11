/**
 * Edit.js
 *
 * @file An edit form render file for FormEdit
 *
 * @version 0.1.0 2019-10-18 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React from 'react';
import { render } from "react-dom";
import FormEdit from "./FormEdit";

render(
  <FormEdit formAttributes={_form_attributes} />
  , document.getElementById(_target_tag)
);
