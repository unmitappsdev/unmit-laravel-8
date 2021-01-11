/**
 * DataRowForRequest2.js
 *
 * @file A component for displaying a record encapsulated by <td> tag
 *
 * @version 0.1.0 2020-05-28 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React from "react";

export default function DataRow({columnData,...data}) {
  const actionLink  = _fqdn + '/' + _basePath + "/edit/" + data.id;
  const viewLink  = _fqdn + '/' + _basePath + "/view/" + data.id;

	return (
    <tr>
    { Object.entries(columnData).map(([key,value],i) => (
      <td key={i}>{data[key]}</td>
    )) }
      <td>
          <a className="btn btn-default" role="button" href={(data['status']=='In Banner' || data['status']=='Disapproved - Incomplete Data') ? viewLink:actionLink}>{(data['status']=='In Banner' || data['status']=='Disapproved - Incomplete Data') ? 'View':'View/Edit'}</a>
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
