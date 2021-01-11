/**
 * DataRow.js
 *
 * @file A component for displaying a record encapsulated by <td> tag
 *
 * @version 0.1.0 2019-10-17 MH
 * @author Michael Han <mhan1@unm.edu>
 */
import React from "react";
import { FaEdit, FaTrash} from "react-icons/fa";

          // <a href={deleteformLink}><FaTrash /></a>
export default function DataRow({columnData,...data}) {
    // TODO parent-child page URL formation needs to be revisited
  const deleteformLink = _fqdn + '/' + _basePath + '/' + data.id + "/deleteform";
  const editformLink = _fqdn + '/' + _basePath + '/' + data.id + "/editform";

	return (
    <tr>
    { Object.entries(columnData).map(([key,value],i) => (
      <td key={i}>{data[key]}</td>
    )) }
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
