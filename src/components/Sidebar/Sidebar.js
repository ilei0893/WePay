import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent, SidebarHeader } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import {FaHome, FaHouseUser, FaMoneyBillWave, FaChevronLeft, FaRegBuilding, FaInbox} from 'react-icons/fa';
import { Link } from "react-router-dom";

//css
import './Sidebar.css';

export default function Sidebar(props) {
  return (
    <div className='sidebar'>
      <ProSidebar
      collapsed={props.isCollapsed}
      toggled={false}
      breakPoint={'md'}>
          <SidebarHeader style={{padding: '20px'}}>
              WePay
          </SidebarHeader>
          <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<FaHome />}><Link to="/dashboard">Dashboard</Link></MenuItem>
          <MenuItem icon={<FaHouseUser />}><Link to="/employment">Employment</Link></MenuItem>
          <MenuItem icon={<FaRegBuilding />}><Link to="/Benefits">Benefits</Link></MenuItem>
          <MenuItem icon={<FaMoneyBillWave />}><Link to="/Payroll">Payroll</Link></MenuItem>
          <MenuItem icon={<FaChevronLeft />}><Link to="/">Log Out</Link></MenuItem>
          {/* IF WE NEED A SUBMENU */}
          {/* <SubMenu title="???">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu> */}
        </Menu>
        </SidebarContent>
        <SidebarFooter style={{ textAlign: 'center', padding: '20px' }}>
            <Link to="/settings" className="no-dec">Settings</Link>
      </SidebarFooter>
      </ProSidebar>
    </div>
  );
}
