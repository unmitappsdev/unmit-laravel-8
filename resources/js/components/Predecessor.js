/**
 * Predecessor.js
 *
 * @file Renderer for Predecessor
 *
 * @version 0.1.0 2020-06-12 MH
 * @author Michael Han <mhan1@unm.edu>
 *
 * @since 0.3.25
 */
import React,{ useState } from "react";
import { render } from "react-dom";
import PredecessorComponent from "./PredecessorComponent";

render(
  <PredecessorComponent />
  , document.getElementById("target_tag")
);
