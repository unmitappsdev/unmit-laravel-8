/**
 * Add.js
 *
 * @file An add form render file for FormAdd
 *
 * @version 0.1.0 2019-10-17 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React from 'react';
import { render } from "react-dom";
import FormAdd from "./FormAdd";

render(
  <FormAdd formAttributes={_form_attributes} />
  , document.getElementById(_target_tag)
);
