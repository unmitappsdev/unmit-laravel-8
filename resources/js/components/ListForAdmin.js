/**
 * ListForAdmin.js
 *
 * @file A listing view render file for DataGridForAdmin
 *
 * @version 0.1.0 2020-05-26 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React from 'react';
import { render } from "react-dom";
import DataGrid from "./DataGridForAdmin";

render(
  <DataGrid tableAttributes={_table_attributes} />
  , document.getElementById(_target_tag)
);
