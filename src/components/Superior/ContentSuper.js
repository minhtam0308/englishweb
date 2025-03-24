

import { Menu, MenuItem, SubMenu, SidebarHeader, ProSidebar } from 'react-pro-sidebar';
import { TiThMenuOutline } from "react-icons/ti";
import 'react-pro-sidebar/dist/scss/styles.scss';
import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';

const ContentSuper = () => {

    const [collapsed, setCollapsed] = useState(false);


    return (<>
        <div className="content-container">

            <div className='sideBar_container' >
                <ProSidebar
                    collapsed={collapsed}
                >
                    <SidebarHeader style={{ marginBottom: '24px', marginTop: '21px' }} />
                    <div style={{ flex: 1, marginBottom: '32px' }}>

                        <Menu >
                            <SubMenu title="User">
                                <MenuItem><NavLink
                                    to={'/superior/studentAccount'}
                                >Student accounts</NavLink></MenuItem>
                                <MenuItem><NavLink
                                    to={'/superior/teacherAccount'}
                                >Teacher accounts</NavLink></MenuItem>
                            </SubMenu>
                            <SubMenu title="Theme" >
                                <MenuItem> Dark</MenuItem>
                                <MenuItem> Light</MenuItem>
                            </SubMenu>

                        </Menu>


                    </div>
                </ProSidebar>
                <span onClick={() => {
                    setCollapsed(!collapsed)
                }}>
                    <TiThMenuOutline />
                </span>

                {/* <SidebarFooter /> */}
            </div>
            <Outlet />

        </div>

    </>)

}
export default ContentSuper;