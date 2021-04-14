import * as React from "react";
import { useSelector } from "react-redux";
import Blogs from "./Components/Blogs";
import Homepage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import { selectSignedIn } from "./features/userSlice";
import "./styling/app.css";

//new
import Toggle from "./Components/Toggler"
import  {useDarkMode} from "./Components/useDarkMode"
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./Components/Globalstyle";
import { lightTheme, darkTheme } from "./Components/Themes";

const App = () => {
  const isSignedIn = useSelector(selectSignedIn);
  //new
  const [theme, themeToggler,mountedComponent] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  
  if(!mountedComponent) return <div/>
  return (
    <ThemeProvider theme={themeMode}>
    <>
    <GlobalStyles/>
    <div className="app">
    <Navbar />
     <Toggle theme={theme} toggleTheme={themeToggler} />
      <Homepage />
      {isSignedIn && <Blogs />}
    </div>
    </>
    </ThemeProvider>
  );
};

export default App;
