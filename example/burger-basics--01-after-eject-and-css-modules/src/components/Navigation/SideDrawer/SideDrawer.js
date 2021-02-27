import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
// const SideDrawer = () => () don't use here
const SideDrawer = () => { //use real func để xử lý trước khi trả về JSX
  // ...
  return (
    <div className={classes.SideDrawer}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
}

export default SideDrawer;