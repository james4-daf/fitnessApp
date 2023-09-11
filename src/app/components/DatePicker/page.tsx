import React from 'react'
import moment from 'moment';

type Props = {}

const DatePicker = (props: Props) => {
    let yest = moment().subtract(1, 'd').format('L');
    let now = moment().format('L');
    let tom = moment().add(1, 'd').format('L');
    let cal = moment().calendar();
    return (
        <div>
            <p>{cal}</p>
            <p>{yest}</p>
            <p>{now}</p>
            <p>{tom}</p>
        </div>

    )
}

export default DatePicker