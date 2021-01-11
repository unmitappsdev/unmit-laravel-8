/**
 * FormNumber.js
 *
 * @file Numeric field component
 *
 * @version 0.1.0 2019-10-17 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React from "react";
import FormText from "./FormText";

export default function FormNumber({field,value}) {
    return (
<FormText field={field} value={value} />);
}
