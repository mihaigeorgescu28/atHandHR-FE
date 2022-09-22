import MainLayout from "../../components/Layout/MainLayout";
import { SABadge, SAButton, SACol, SARow } from "../../components/UI/Custom";

const Badges = () => {
  const scrollTo = () => {};
  return (
    <MainLayout>
      <SARow>
        <SACol xl={10} className="main-content ps-xl-4 pe-xl-5">
          <h1 className="page-title">Badges</h1>
          <p className="lead">
            Documentation and examples for badges, our small count and labeling component. Read the{" "}
            <a href="https://getbootstrap.com/docs/5.1/components/badge/" target="_blank">
              Official Bootstrap Documentation
            </a>{" "}
            for a full list of instructions and other options.
          </p>

          <hr />

          <h4 /*#default*/>Basic example</h4>
          <p className="mb-3">
            Badges scale to match the size of the immediate parent element by using relative font sizing and{" "}
            <code>em</code> units.
          </p>
          <div className="example">
            <h1 className="mb-2">
              Example heading <SABadge bg="primary">New</SABadge>
            </h1>
            <h2 className="mb-2">
              Example heading <SABadge bg="primary">New</SABadge>
            </h2>
            <h3 className="mb-2">
              Example heading <SABadge bg="primary">New</SABadge>
            </h3>
            <h4 className="mb-2">
              Example heading <SABadge bg="primary">New</SABadge>
            </h4>
            <h5 className="mb-2">
              Example heading <SABadge bg="primary">New</SABadge>
            </h5>
            <h6 className="mb-2">
              Example heading <SABadge bg="primary">New</SABadge>
            </h6>
          </div>

          <hr />

          <h4 id="buttons">Buttons</h4>
          <p className="mb-3">Badges can be used as part of links or buttons to provide a counter.</p>
          <div className="example">
            <SAButton variant="primary">
              Notifications{" "}
              <SABadge bg="light" text="dark">
                4
              </SABadge>
            </SAButton>
          </div>

          <hr />

          <h4 /*#positioned*/>Positioned</h4>
          <p className="mb-3">
            Use utilities to modify a <code>.badge</code> and position it in the corner of a link or button.
          </p>
          <div className="example">
            <SAButton variant="primary" className="position-relative">
              Inbox
              <SABadge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                99+
                <span className="visually-hidden">unread messages</span>
              </SABadge>
            </SAButton>
          </div>

          <p className="my-3">
            You can also replace the <code>.badge</code> class with a few more utilities without a count for a more
            generic indicator.
          </p>
          <div className="example">
            <SAButton variant="primary" className="position-relative">
              Profile
              <SABadge
                bg="danger"
                pill
                className="position-absolute top-0 start-100 translate-middle p-2 border border-light"
              >
                <span className="visually-hidden">New alerts</span>
              </SABadge>
            </SAButton>
          </div>

          <hr />

          <h4 /*#contextualVariations*/>Contextual variations</h4>
          <p className="mb-3">Use background utility classes to quickly change the appearance of a badge.</p>
          <div className="example">
            <SABadge bg="primary" className="me-1">
              Primary
            </SABadge>
            <SABadge bg="secondary" className="me-1">
              Secondary
            </SABadge>
            <SABadge bg="success" className="me-1">
              Success
            </SABadge>
            <SABadge bg="danger" className="me-1">
              Danger
            </SABadge>
            <SABadge bg="warning" className="me-1">
              Warning
            </SABadge>
            <SABadge bg="info" className="me-1">
              Info
            </SABadge>
            <SABadge bg="light" text="dark" className="me-1">
              Light
            </SABadge>
            <SABadge bg="dark" className="me-1">
              Dark
            </SABadge>
          </div>

          <hr />

          <h4 /*#pillBadges*/>Pill badges</h4>
          <p className="mb-3">
            Use the <code>.rounded-pill</code> utility class to make badges more rounded with a larger{" "}
            <code>border-radius</code>.
          </p>
          <div className="example">
            <SABadge bg="primary" pill className="me-1">
              Primary
            </SABadge>
            <SABadge bg="secondary" pill className="me-1">
              Secondary
            </SABadge>
            <SABadge bg="success" pill className="me-1">
              Success
            </SABadge>
            <SABadge bg="danger" pill className="me-1">
              Danger
            </SABadge>
            <SABadge bg="warning" pill className="me-1">
              Warning
            </SABadge>
            <SABadge bg="info" pill className="me-1">
              Info
            </SABadge>
            <SABadge bg="light" pill text="dark" className="me-1">
              Light
            </SABadge>
            <SABadge bg="dark" pill className="me-1">
              Dark
            </SABadge>
          </div>

          <hr />

          <h4 /*#linkBadges*/>Link badges</h4>
          <div className="example">
            <a href="" className="me-1">
              <SABadge bg="primary">Primary</SABadge>
            </a>
            <a href="" className="me-1">
              <SABadge bg="secondary">Secondary</SABadge>
            </a>
            <a href="" className="me-1">
              <SABadge bg="success">Success</SABadge>
            </a>
            <a href="" className="me-1">
              <SABadge bg="danger">Danger</SABadge>
            </a>
            <a href="" className="me-1">
              <SABadge bg="warning">Warning</SABadge>
            </a>
            <a href="" className="me-1">
              <SABadge bg="info">Info</SABadge>
            </a>
            <a href="" className="me-1">
              <SABadge bg="light" text="dark">
                Light
              </SABadge>
            </a>
            <a href="" className="me-1">
              <SABadge bg="dark">Dark</SABadge>
            </a>
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
                Contextual variations
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Pill badges
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Link badges
              </a>
            </li>
          </ul>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default Badges;
