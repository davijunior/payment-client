import React from 'react';
import { format } from 'date-fns';

function DateFormater(props){
    if( props.date ){
        const date = Date.parse(props.date);
        return format(date, props.format)
    }
    return null
}

export default DateFormater;