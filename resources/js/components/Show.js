/**
 * Show.js
 *
 * @file A show form render file for FormShow
 *
 * @version 0.1.0 2019-10-18 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React from 'react';
import { render } from "react-dom";
import DisplayRecord from "./DisplayRecord";

render(
  <DisplayRecord displayAttributes={_display_attributes} />
  , document.getElementById(_target_tag)
);
