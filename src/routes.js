import Buttons from "views/components/Buttons.js";
import Calendar from "views/Calendar.js";
import Charts from "views/Charts.js";
import Dashboard from "views/Dashboard.js";
import ExtendedForms from "views/forms/ExtendedForms.js";
import ExtendedTables from "views/tables/ExtendedTables.js";
import FullScreenMap from "views/maps/FullScreenMap.js";
import GoogleMaps from "views/maps/GoogleMaps.js";
import GridSystem from "views/components/GridSystem.js";
import Icons from "views/components/Icons.js";
import LockScreen from "views/pages/LockScreen.js";
import Login from "views/pages/Login.js";
import VerifyEmail from "views/pages/VerifyEmail.js";
import ResetPassword from "views/pages/ResetPassword.js";
import TemporaryPassword from "views/pages/TemporaryPassword.js";
import Notifications from "views/components/Notifications.js";
import Panels from "views/components/Panels.js";
import ReactTables from "views/tables/ReactTables.js";
import Register from "views/pages/Register.js";
import RegularForms from "views/forms/RegularForms.js";
import RegularTables from "views/tables/RegularTables.js";
import Timeline from "views/pages/Timeline.js";
import Typography from "views/components/Typography.js";
import UserProfile from "views/pages/UserProfile.js";
import ValidationForms from "views/forms/ValidationForms.js";
import VectorMap from "views/maps/VectorMap.js";
import Widgets from "views/Widgets.js";
import NotFound from "views/pages/NotFound.js"
import NewsFeed from "views/pages/NewsFeed.js"
import NewsfeedTable from "views/tables/NewsfeedTable.js";
import PositionsTable from "views/tables/PositionsTable.js";
import LeaveTypesTable from "views/tables/LeaveTypesTable.js";
import ClientDefaultsForm from "views/forms/ClientDefaultsForm.js";
import SignInOut from "views/pages/SignInOut.js";
import SiteMap from "views/pages/SiteMap";
import MyDocuments from "views/pages/MyDocuments";
import PrivacyPolicy from "views/pages/PrivacyPolicy.js"
import EditUserForm from "views/forms/EditUserForm.js";
import InsertUserForm from "views/forms/InsertUserForm.js";
import TermsAndConditions from "views/pages/TermsAndConditions.js";
import LandingPage from "views/pages/LandingPage.js";
import AboutUs from "views/pages/AboutUs.js";

const routes = [
  {
    path: "/about-us",
    name: "About Us",
    icon: "nc-icon nc-badge",
    component: AboutUs.js,
    layout: "",
    sidebar: "false",
    views: [],
  },
  {
    path: "",
    name: "Landing Page",
    icon: "nc-icon nc-badge",
    component: LandingPage.js,
    layout: "",
    sidebar: "false",
    views: [],
  },
  {
    path: "/terms-and-conditions",
    name: "Terms & Conditions",
    icon: "nc-icon nc-badge",
    component: TermsAndConditions,
    layout: "",
    sidebar: "false",
    views: [],
  },
  {
    path: "/privacy-policy",
    name: "Privacy Policy",
    icon: "nc-icon nc-badge",
    component: PrivacyPolicy,
    layout: "",
    sidebar: "false",
    views: [],
  },
  {
    path: "/user-profile",
    name: "My Account",
    icon: "nc-icon nc-badge",
    component: UserProfile,
    layout: "/admin",
    sidebar: "True",
    roleId: "2"
  },
  {
  path: "/user-documents",
  name: "My Documents",
  icon: "nc-icon nc-paper",
  component: MyDocuments,
  layout: "/admin",
  sidebar: "False",
  roleId: "1"
  },
  {
    path: "/resetUserPassword:id",
    name: "Reset Password",
    mini: "RP",
    component: ResetPassword,
    layout: "/auth",
    sidebar: "False",
    roleId: "1"
  },
  {
    path: "/verifyUser:id",
    name: "Verify Email",
    mini: "VE",
    component: VerifyEmail,
    layout: "/auth",
    sidebar: "False",
    roleId: "2"
  },
  {
    path: "/temporaryPassword/:id",
    name: "Temporary Password",
    mini: "TP",
    component: TemporaryPassword,
    layout: "/auth",
    sidebar: "False",
    roleId: "2"
  },
  {
    path: "/register:id",
    name: "Register",
    mini: "R",
    component: Register,
    layout: "/auth",
    sidebar: "False",
    roleId: "1"
  },
  {
    path: "/dashboard/totalStaff/:id",
    name: "User Details",
    icon: "nc-icon nc-watch-time",
    component: EditUserForm,
    layout: "/admin",
    sidebar: "False",
    roleId: "1"
  },
  {
    path: "/dashboard/totalStaff/new",
    name: "User Details",
    icon: "nc-icon nc-watch-time",
    component: InsertUserForm,
    layout: "/admin",
    sidebar: "False",
    roleId: "1"
  },
  {
    path: "/time-management",
    name: "Time Management",
    icon: "nc-icon nc-watch-time",
    component: SignInOut,
    layout: "/admin",
    sidebar: "True",
    roleId: "2"
  },
  {
    path: "/submit-leave",
    name: "Submit Leave",
    icon: "nc-icon nc-calendar-60",
    component: Calendar,
    layout: "/admin",
    sidebar: "True",
    roleId: "2"
  },
  {
    path: "/newsfeed",
    name: "Newsfeed",
    icon: "nc-icon nc-bell-55",
    component: NewsFeed,
    layout: "/admin",
    sidebar: "True",
    roleId: "2"
  },
  {
    path: "/sitemap/newsfeed",
    name: "Site Map Newsfeed",
    icon: "nc-icon nc-bell-55",
    component: NewsfeedTable,
    layout: "/admin",
    sidebar: "False",
    roleId: "1"
  },
  {
    path: "/sitemap/positions",
    name: "Site Map Positions",
    icon: "nc-icon nc-bell-55",
    component: PositionsTable,
    layout: "/admin",
    sidebar: "False",
    roleId: "1"
  },
  {
    path: "/sitemap/leave-types",
    name: "Site Map Leave Types",
    icon: "nc-icon nc-bell-55",
    component: LeaveTypesTable,
    layout: "/admin",
    sidebar: "False",
    roleId: "1"
  },
  {
    path: "/sitemap/client-defaults",
    name: "Site Map Client Defaults",
    icon: "nc-icon nc-bell-55",
    component: ClientDefaultsForm,
    layout: "/admin",
    sidebar: "False",
    roleId: "1"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    sidebar: "True",
    roleId: "1"
  },
  {
  path: "/sitemap",
  name: "Site Map",
  icon: "nc-icon nc-settings-gear-65",
  component: SiteMap,
  layout: "/admin",
  sidebar: "True",
  roleId: "1"
  },
  {
    collapse: true,
    name: "Pages",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    sidebar: "False",
    views: [
      {
        path: "/timeline",
        name: "Timeline",
        mini: "T",
        component: Timeline,
        layout: "/admin",
        sidebar: "False"
      },
      {
        path: "/login",
        name: "Login",
        mini: "L",
        component: Login,
        layout: "/auth",
        sidebar: "False"
      },
      {
        path: "/lock-screen",
        name: "LockScreen",
        mini: "LS",
        component: LockScreen,
        layout: "/auth",
        sidebar: "False"
      },
      {
        path: "/not-found",
        name: "NotFound",
        mini: "NF",
        component: NotFound,
        layout: "/auth",
        sidebar: "False"
      }
    ]
  },
  {
    collapse: true,
    name: "Components",
    icon: "nc-icon nc-layout-11",
    state: "componentsCollapse",
    views: [
      {
        path: "/buttons",
        name: "Buttons",
        mini: "B",
        component: Buttons,
        layout: "/admin"
      },
      {
        path: "/grid-system",
        name: "Grid System",
        mini: "GS",
        component: GridSystem,
        layout: "/admin"
      },
      {
        path: "/panels",
        name: "Panels",
        mini: "P",
        component: Panels,
        layout: "/admin"
      },
      {
        path: "/notifications",
        name: "Notifications",
        mini: "N",
        component: Notifications,
        layout: "/admin"
      },
      {
        path: "/icons",
        name: "Icons",
        mini: "I",
        component: Icons,
        layout: "/admin"
      },
      {
        path: "/typography",
        name: "Typography",
        mini: "T",
        component: Typography,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Forms",
    icon: "nc-icon nc-ruler-pencil",
    state: "formsCollapse",
    views: [
      {
        path: "/regular-forms",
        name: "Regular Forms",
        mini: "RF",
        component: RegularForms,
        layout: "/admin"
      },
      {
        path: "/extended-forms",
        name: "Extended Forms",
        mini: "EF",
        component: ExtendedForms,
        layout: "/admin"
      },
      {
        path: "/validation-forms",
        name: "Validation Forms",
        mini: "VF",
        component: ValidationForms,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Tables",
    icon: "nc-icon nc-single-copy-04",
    state: "tablesCollapse",
    views: [
      {
        path: "/regular-tables",
        name: "Regular Tables",
        mini: "RT",
        component: RegularTables,
        layout: "/admin"
      },
      {
        path: "/extended-tables",
        name: "Extended Tables",
        mini: "ET",
        component: ExtendedTables,
        layout: "/admin"
      },
      {
        path: "/react-tables",
        name: "React Tables",
        mini: "RT",
        component: ReactTables,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    state: "mapsCollapse",
    sidebar: "False",
    views: [
      {
        path: "/google-maps",
        name: "Google Maps",
        mini: "GM",
        component: GoogleMaps,
        layout: "/admin",
        sidebar: "False"
      },
      {
        path: "/full-screen-map",
        name: "Full Screen Map",
        mini: "FSM",
        component: FullScreenMap,
        layout: "/admin"
      },
      {
        path: "/vector-map",
        name: "Vector Map",
        mini: "VM",
        component: VectorMap,
        layout: "/admin"
      }
    ]
  },
  {
    path: "/widgets",
    name: "Widgets",
    icon: "nc-icon nc-box",
    component: Widgets,
    layout: "/admin"
  },
  {
    path: "/charts",
    name: "Charts",
    icon: "nc-icon nc-chart-bar-32",
    component: Charts,
    layout: "/admin"
  }
];

export default routes;
