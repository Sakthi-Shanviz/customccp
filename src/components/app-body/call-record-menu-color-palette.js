import React from 'react';
import { createTheme } from '@material-ui/core/styles';

const startCallRecordMenuColortheme = createTheme({
  palette: {
    primary: {
      main: "#388E3c",
    },
  },
  spacing: 5
});
const stopCallRecordMenuColortheme = createTheme({
  palette: {
    primary: {
      main: "#E64A19",
    },
  },
  spacing: 5
});
const pauseCallRecordMenuColortheme = createTheme({
  palette: {
    primary: {
      main: "#FFEB3B",
    },
  },
  spacing: 5
});
const resumeCallRecordMenuColortheme = createTheme({
  palette: {
    primary: {
      main: "#B2FF59",
    }
  },
  spacing: 5
});

const callRecordMenuColortheme = {
  startCallRecordMenuColortheme,
  stopCallRecordMenuColortheme,
  pauseCallRecordMenuColortheme,
  resumeCallRecordMenuColortheme
}

export default callRecordMenuColortheme;