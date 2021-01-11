/**
 * DisplayText.js
 *
 * @file Text field display component
 *
 * @version 0.1.0 2019-10-18 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React from "react";

export default function DisplayText({field, value}) {
return (
<>
<dt>{field.label}</dt>
<dd>{value}</dd>
</>);
}
