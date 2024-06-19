import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/Register';
import Course from './pages/Course';



const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/courses/:id" component={Course} />
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}


export default App;

// import { ThemeProvider, createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//   },
// });

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <AuthProvider>
//         <Router>
//           <Switch>
//             <Route path="/login" component={Login} />
//             <Route path="/register" component={Register} />
//             <Route path="/dashboard" component={Dashboard} />
//             <Route path="/courses/:id" component={Course} />
//           </Switch>
//         </Router>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }
