/**
 * List.js
 *
 * @file A listing view render file for DataGrid
 *
 * @version 0.1.0 2019-10-17 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React from 'react';
import { render } from "react-dom";
import DataGrid from "./DataGrid";

render(
  <DataGrid tableAttributes={_table_attributes} />
  , document.getElementById(_target_tag)
);
