import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'


const RenderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
  <div>
        <DatePicker {...input} selected='2020-01-26' dateForm="YYYY-MM-DD" selected={input.value} />

  </div>
);

export default RenderDatePicker
