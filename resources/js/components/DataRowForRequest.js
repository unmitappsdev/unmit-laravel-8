/**
 * DataRowForRequest.js
 *
 * @file A component for displaying a record encapsulated by <td> tag
 *
 * @version 0.1.0 2020-05-14 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React from "react";

export default function DataRow({columnData,...data}) {
  const actionLink  = _fqdn + '/' + _basePath + "/history" + '/' + data.id;

	return (
    <tr>
    { Object.entries(columnData).map(([key,value],i) => (
      <td key={i}>{data[key]}</td>
    )) }
      <td>
          <a className="btn btn-default" role="button" href={actionLink}>View History</a>
      </td>
    </tr>
  );
/*
  return (
    <tr>
        { Object.entries(data).map(([key,datum],i) => {
			if (key in columnData) {
				return (
				<td key={i}><a href={"/fsm-approvals/activity-request/"+data.id}>{datum}</a></td>
				);
			}
		}) }
      <td>
          <a href={editformLink}><FaEdit color="green" /></a>&nbsp;
      </td>
    </tr>);
	*/
}
