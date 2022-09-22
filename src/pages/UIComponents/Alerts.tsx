import { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { SAAlert, SACol, SARow } from "../../components/UI/Custom";

const ALERTS = [
  { variant: "primary", icon: "icon-alert-circle" },
  { variant: "secondary", icon: "icon-alert-triangle" },
  { variant: "success", icon: "icon-alert-octagon" },
  { variant: "danger", icon: "icon-moon" },
  { variant: "warning", icon: "icon-help-circle" },
  { variant: "info", icon: "icon-sun" },
  { variant: "light", icon: "icon-info" },
  { variant: "dark", icon: "icon-alert-circle" },
];
const Alerts = () => {
  const scrollTo = () => {};
  const [visibleAlerts, setVisibleAlerts] = useState<string[]>([]);
  return (
    <MainLayout>
      <SARow>
        <SACol xl={10} className="main-content ps-xl-4 pe-xl-5">
          <h1 className="page-title">Alerts</h1>
          <p className="lead">
            Provide contextual feedback messages for typical user actions with the handful of available and flexible
            alert messages. Read the{" "}
            <a href="https://ng-bootstrap.github.io/#/components/alert/examples" target="_blank">
              Official Ng-Bootstrap Documentation
            </a>{" "}
            for a full list of instructions and other options.
          </p>

          <hr />

          <h4 /*#default*/>Basic example</h4>
          <div className="example">
            {ALERTS.map(({ variant }) => (
              <SAAlert key={variant} variant={variant}>
                This is a {variant} alert—check it out!
              </SAAlert>
            ))}
          </div>

          <hr />

          <h4 /*#fill*/>Fill alert</h4>
          <div className="example"></div>

          <hr />

          <h4 /*#icon*/>With icon</h4>
          <div className="example">
            {ALERTS.map(({ variant, icon }) => (
              <SAAlert key={variant} variant={variant}>
                <i className={`feather ${icon}`}></i>
                This is a {variant} alert—check it out!
              </SAAlert>
            ))}
          </div>

          <hr />

          <h4 /*#alertLink*/>Alert Link</h4>
          <p className="mb-3">
            Use the <code>.alert-link</code> utility class to quickly provide matching colored links within any alert.
          </p>
          <div className="example">
            {ALERTS.map(({ variant }) => (
              <SAAlert key={variant} variant={variant}>
                This is a {variant} alert with <SAAlert.Link href="#">an example link</SAAlert.Link>. Give it a click if
                you like.
              </SAAlert>
            ))}
          </div>

          <hr />

          <h4 /*#additionalContent*/>Additional content</h4>
          <p className="mb-3">
            Alerts can also contain additional HTML elements like headings, paragraphs and dividers.
          </p>
          <div className="example">
            <SAAlert variant="success">
              <SAAlert.Heading>Well done!</SAAlert.Heading>
              <p>
                Aww yeah, you successfully read this important alert message. This example text is going to run a bit
                longer so that you can see how spacing within an alert works with this kind of content.
              </p>
              <hr />
              <p className="mb-0">
                Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
              </p>
            </SAAlert>
          </div>

          <hr />

          <h4 /*#dismissing*/>Dismissing</h4>
          <div className="example">
            {ALERTS.filter(({ variant }) => !visibleAlerts.includes(variant)).map(({ variant }) => (
              <SAAlert
                key={variant}
                variant={variant}
                onClose={() => setVisibleAlerts([...visibleAlerts, variant])}
                dismissible
              >
                <strong>Holy guacamole!</strong> You should check in on some of those fields below.
              </SAAlert>
            ))}
          </div>
        </SACol>
        <SACol xl={2} className="content-nav-wrapper">
          <ul className="nav content-nav d-flex flex-column">
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Basic example
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Fill alerts
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Icon alerts
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Alert link
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Additional content
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Dismissing
              </a>
            </li>
          </ul>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default Alerts;
