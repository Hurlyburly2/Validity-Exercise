import React from 'react';

const Record = (props) => {

  return (
    <div className={props.oddOrEven}>
      <ul>
        <li className="cell id">{props.record.id}</li>
        <li className="cell first_name">{props.record.first_name}</li>
        <li className="cell last_name">{props.record.last_name}</li>
        <li className="cell company">{props.record.company}</li>
        <li className="cell email">{props.record.email}</li>
        <li className="cell address1">{props.record.address1}</li>
        <li className="cell address2">{props.record.address2}</li>
        <li className="cell zip">{props.record.zip}</li>
        <li className="cell city">{props.record.city}</li>
        <li className="cell state_long">{props.record.state_long}</li>
        <li className="cell state">{props.record.state}</li>
        <li className="cell phone">{props.record.phone}</li>
      </ul>
    </div>
  )
}

export default Record;