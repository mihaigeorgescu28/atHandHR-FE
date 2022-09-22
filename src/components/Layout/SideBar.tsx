import React from "react";
import { MENUS } from "../../utils/constants";
import { MenuItem } from "../../utils/types";

const SideBar = () => {
  const toggleSidebar = () => {};
  const openSidebarFolded = () => {};
  const closeSidebarFolded = () => {};
  const toggleSettingsSidebar = () => {};
  const onSidebarThemeChange = () => {};

  const hasItems = (item: MenuItem) => {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  };

  return (
    <>
      <nav className="sidebar">
        <div className="sidebar-header">
          <a href="/" className="sidebar-brand nobleui-logo">
            Noble<span>UI</span>
          </a>

          <div className="sidebar-toggler not-active" /*sidebarToggler*/ onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div
          className="sidebar-body"
          onMouseEnter={openSidebarFolded}
          onMouseLeave={closeSidebarFolded}
          // perfectScrollbar
        >
          <ul className="sidebar-nav metismenu" id="sidebar-menu" /*sidebarMenu*/>
            {MENUS.map((item, index) =>
              item.isTitle ? (
                <li className="nav-item nav-category"> {item.label}</li>
              ) : (
                <li className="nav-item">
                  {hasItems(item) ? (
                    <>
                      <a className="nav-link" href="javascript:void(0);">
                        {item.icon && <i className="link-icon" attr-data-feather="item.icon" /*appFeatherIcon*/></i>}
                        <span className="link-title"> {item.label}</span>
                        <span className="link-arrow" data-feather="chevron-down" /*appFeatherIcon*/></span>
                      </a>
                      <ul className="sidebar-nav sub-menu nav-second-level" aria-expanded="false">
                        {item.subItems?.map((subitem, idx) => (
                          <li className={`nav-item ${hasItems(subitem) ? "side-nav-item" : ""}`}>
                            {hasItems(subitem) ? (
                              <>
                                <a className="nav-link side-nav-link-a-ref" href="javascript:void(0);">
                                  {subitem.icon && (
                                    <i className="link-icon" attr-data-feather="subitem.icon" /*appFeatherIcon*/></i>
                                  )}
                                  <span className="link-title"> {subitem.label}</span>
                                  <span className="link-arrow" data-feather="chevron-down" /*appFeatherIcon*/></span>
                                </a>
                                <ul className="sidebar-nav sub-menu nav-third-level" aria-expanded="false">
                                  {subitem.subItems?.map((subSubitem, idx1) => (
                                    <li className="nav-item">
                                      <a
                                        className="nav-link nav-link-ref"
                                        href="subSubitem.link"
                                        // routerLinkActive="['active']"
                                        attr-data-parent="subSubitem.parentId"
                                      >
                                        {subSubitem.icon && (
                                          <i
                                            className="link-icon"
                                            attr-data-feather="subSubitem.icon"
                                            /*appFeatherIcon*/
                                          ></i>
                                        )}
                                        {subSubitem.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ) : (
                              <a
                                className="nav-link nav-link-ref"
                                href="subitem.link"
                                attr-data-parent="subitem.parentId"
                              >
                                {subitem.icon && (
                                  <i className="link-icon" attr-data-feather="subitem.icon" /*appFeatherIcon*/></i>
                                )}
                                {subitem.label}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <a className="nav-link nav-link-ref" href="item.link" attr-data-parent="item.parentId">
                      {item.icon && <i className="link-icon" attr-data-feather="item.icon" /*appFeatherIcon*/></i>}
                      <span className="link-title"> {item.label}</span>
                      {item.badge && <span className={`badge bg-${item.badge.variant}`}> {item.badge.text}</span>}
                    </a>
                  )}
                </li>
              )
            )}
            <li className="nav-item nav-category">Docs</li>
            <li className="nav-item">
              <a href="https://www.nobleui.com/angular/documentation/docs.html" target="_blank" className="nav-link">
                <i className="link-icon" data-feather="hash" /*appFeatherIcon*/></i>
                <span className="link-title">Documentation</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="settings-sidebar">
        <div className="sidebar-body">
          <a href="" className="settings-sidebar-toggler" onClick={toggleSettingsSidebar}>
            <i className="icon feather icon-settings"></i>
          </a>
          <h6 className="text-muted mb-2">Sidebar:</h6>
          <div className="mb-3 pb-3 border-bottom">
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="sidebarThemeSettings"
                  onChange={onSidebarThemeChange}
                  id="sidebarLight"
                  value="sidebar-light"
                  checked
                />
                <i className="input-frame"></i>
                Light
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="sidebarThemeSettings"
                  onChange={onSidebarThemeChange}
                  id="sidebarDark"
                  value="sidebar-dark"
                />
                <i className="input-frame"></i>
                Dark
              </label>
            </div>
          </div>
          <div className="theme-wrapper">
            <h6 className="text-muted mb-2">Light Theme:</h6>
            <a className="theme-item active" href="https://www.nobleui.com/angular/template/demo1/">
              <img src="assets/images/screenshots/light.jpg" alt="light theme" />
            </a>
            <h6 className="text-muted mb-2">Dark Theme:</h6>
            <a className="theme-item" href="https://www.nobleui.com/angular/template/demo2/">
              <img src="assets/images/screenshots/dark.jpg" alt="dark theme" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
