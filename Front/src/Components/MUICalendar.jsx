import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function BasicDateCalendar() {
  return (
    <div className="bg-theme-light w-80 h-85 mx-auto rounded-3xl">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateCalendar />
        </LocalizationProvider>
    </div>
  );
}