import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { Menu, Select, Icon,TreeSelect } from "antd";
import { Link } from "react-router-dom";
import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import {
  commonGetCompanyRequest,
  setActiveCompany,
  updateEmployeeVerifyDetail,
  updateContractorVerifyDetail,
} from "appRedux/actions/Common";
import { useSelector } from "react-redux";
import { auth } from "firebase";
import { UserOutlined } from "@ant-design/icons";

const MenuItemGroup = Menu.ItemGroup;
const { Option, OptGroup } = Select;

const SidebarContent = (props) => {
  const [searchText, setSearchText] = useState("");
  const [locationsWithCompany, setLocationsWithCompany] = useState([])
  const {
    companies,
    activeCompany,
    activeLocation,
    // userTypes,
    currentProfile,
    auth,
    commonGetCompanyRequest,
    setActiveCompany,
    updateEmployeeVerifyDetail,
    updateContractorVerifyDetail,
  } = props;

  const getCompanies = useMemo(() => {
    if (companies && companies.length) {
      const resultData = companies.filter(
        (a) => a.name && a.name.toLowerCase().includes(searchText.toLowerCase())
      );
      // if (resultData.length == 0) {
      //   console.log("in", resultData)
      //   resultData = companies.filter(a =>
      //     a.locations.filter(b => b.name && b.name.toLowerCase().includes(searchText.toLowerCase()))
      //   );
      //   console.log("second in", resultData)
      // }
      return resultData;
    }
    return [];
  }, [searchText, companies]);

  useEffect(() => {
    const obj = {
      page: 1,
      active: true,
    };
    commonGetCompanyRequest(obj);
  }, []);

  useEffect(() => {
    auth &&
      auth.user &&
      auth.user.usercompanies &&
      auth.user.usercompanies.forEach((company) => {
        if (company.isDetailsConfirmed) {
          company.type === "contractor"
            ? updateContractorVerifyDetail(true)
            : updateEmployeeVerifyDetail(true);
        }
      });
  }, [auth]);

  useEffect(()=>{
    let companyArr = []
      getCompanies.map((c, i) => {
        const tempCompany = {
          title:c.name,
          value:c.cid,
          children:[],
          key:i
        }
        const tempChildren = []
        c.locations && c.locations[0] && c.locations.map((l, j) => {
          tempChildren.push({
            title:l.name,
            value:l.lid,
            key:l.lid
          })
        })
        tempCompany.children = tempChildren
        companyArr.push(tempCompany)
      })
      setLocationsWithCompany(companyArr)
  },[getCompanies])

  useEffect(()=>{
    console.log("company changed")
  },[activeCompany])

  let { navStyle, themeType, pathname } = useSelector(
    ({ settings }) => settings
  );

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];

  const onChangeCompany = (location) => {
    console.log("location",location," get companies",getCompanies,getCompanies.filter(f => f.cid === location))
    if (getCompanies.filter(f => f.cid === location)[0]) {
      const c = getCompanies.filter(f => f.cid === location)[0];
      setActiveCompany({
        company: location,
        cid: location,
        name: c.name,
        location: location,
        locations:  c.locations || []
      });
    } else {
      let selectedCompanyIndex
      getCompanies.map((val,ind)=>{
        val.locations.map((locVal,locInd)=>{
          if(locVal.lid === location){
            selectedCompanyIndex = ind
          }
        })
      })
      setActiveCompany({
        company: getCompanies[selectedCompanyIndex].cid,
        cid: getCompanies[selectedCompanyIndex].cid,
        name: getCompanies[selectedCompanyIndex].name,
        location: location,
        locations: getCompanies[selectedCompanyIndex].locations
      });
    }
    // const obj = {
    //   page: 1,
    //   active: true,
    // };
    // commonGetCompanyRequest(obj);
  };
  console.log("getcompanies memo", getCompanies);

  return (
    <>
      <SidebarLogo />

      {companies.length && activeCompany ? (
        <div className="company-select-menu">
          {/* <Select
            style={{ width: "100%" }}
            showSearch
            filterOption={false}
            value={activeLocation}
            onChange={onChangeCompany}
            onSearch={(e) => setSearchText(e)}
          >
            {getCompanies.length &&
              getCompanies.map((c, i) => {
                return (
                  <OptGroup label={c.name} key={i}>
                    {c.locations &&
                      c.locations[0] &&
                      c.locations.map((l, i) => {
                        return (
                          <Option value={l.lid} key={i}>
                            {l.name}
                          </Option>
                        );
                      })}
                    <Option value={c.cid} key={i}>
                      All Location
                    </Option>
                  </OptGroup>
                );
              })}
          </Select> */}
          <TreeSelect
            style={{ width: "100%" }}
            value={activeLocation}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={locationsWithCompany}
            placeholder="Please select"
            treeDefaultExpandAll
            onChange={onChangeCompany}
          />
        </div>
      ) : (
        ""
      )}
      <div className="gx-sidebar-content">
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "lite"}
            mode="inline"
          >
            <Menu.Item key="overview">
              <Link to="/overview">
                <i className="icon icon-widgets" />
                <span>
                  <IntlMessages id="sidebar.overview" />
                </span>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="reports">
              <Link to="/reports"><i className="icon icon-widgets"/>
                <span><IntlMessages id="sidebar.reports"/></span></Link>
            </Menu.Item>
            <Menu.Item key="schedule">
              <Link to="/schedule"><i className="icon icon-widgets"/>
                <span><IntlMessages id="sidebar.schedule"/></span></Link>
            </Menu.Item>*/}
            <Menu.Item key="expense" className="mb-10px">
              <Link to="/expense">
                <Icon type="wallet" />
                Expense
              </Link>
            </Menu.Item>
            {/* {
              (auth.authUser.user.usercompanies.map((val, index) => {
                return (val.permissions === "admin") ? */}
            {auth.authUser.user &&
            auth.authUser.user.usercompanies[0].permissions === "admin" ? (
              <Menu
                defaultOpenKeys={[defaultOpenKeys]}
                selectedKeys={[selectedKeys]}
                theme={themeType === THEME_TYPE_LITE ? "lite" : "lite"}
                mode="inline"
              >
                <Menu.Item key="people">
                  <Link to="/people">
                    <i className="icon icon-avatar -flex-column-reverse" />
                    <span>
                      <IntlMessages id="sidebar.people" />
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="settings">
                  <Link to="/settings">
                    <i className="icon icon-setting" />
                    <span>
                      <IntlMessages id="sidebar.settings" />
                    </span>
                  </Link>
                </Menu.Item>
                <MenuItemGroup
                  key="main"
                  className="gx-menu-group"
                  title={<IntlMessages id="sidebar.superadmin" />}
                >
                  <Menu.Item key="superadmin/companies">
                    <Link to="/superadmin/companies">
                      <i className="icon icon-company" />
                      <span>
                        <IntlMessages id="sidebar.companies" />
                      </span>
                    </Link>
                  </Menu.Item>
                </MenuItemGroup>
              </Menu>
            ) : (
              ""
            )}
            {/* : ''
              }))
            } */}

            {/* <Menu.Item key="payroll">
              <Link to="/payroll"><i className="icon icon-widgets"/>
                <span><IntlMessages id="sidebar.payroll"/></span></Link>
            </Menu.Item> */}
          </Menu>
        </CustomScrollbars>
        {currentProfile && (
          <div className={`gx-sidebar-usertype`}>
            <UserOutlined className={`usericon`} />
            <span className={`usertype`}>{currentProfile} Mode</span>
          </div>
        )}
        <div
          className={`gx-sidebar-notifications ${getNoHeaderClass(
            navStyle
          )} gx-sidebar-notification-border-top`}
        >
          <UserProfile />
          {/* <AppsNavigation/> */}
        </div>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};

const mapStateToProps = (state) => {
  return {
    companies: state.common.companies,
    activeCompany: state.common.activeCompany.company,
    activeLocation: state.common.activeCompany.location,
    // userTypes: state.common.activeCompany.types,
    auth: state.auth,
    currentProfile: state.auth.currentProfile,
  };
};

export default connect(mapStateToProps, {
  commonGetCompanyRequest,
  setActiveCompany,
  updateContractorVerifyDetail,
  updateEmployeeVerifyDetail,
})(SidebarContent);
