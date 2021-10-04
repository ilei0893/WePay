import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent, SidebarHeader } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import {FaHome, FaHouseUser, FaMoneyBillWave, FaChevronLeft} from 'react-icons/fa';

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
          <MenuItem icon={<FaHome />}>Dashboard</MenuItem>
          <MenuItem icon={<FaHouseUser />}>Employment</MenuItem>
          <MenuItem icon={<FaMoneyBillWave />}>Payroll</MenuItem>
          <MenuItem icon={<FaChevronLeft />}>Log out</MenuItem>
          {/* IF WE NEED A SUBMENU */}
          {/* <SubMenu title="???">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu> */}
        </Menu>
        </SidebarContent>
        <SidebarFooter style={{ textAlign: 'center', padding: '20px' }}>
            ?!?rjkdfgkhjfgdkjh
      </SidebarFooter>
      </ProSidebar>
    </div>
  );
}
