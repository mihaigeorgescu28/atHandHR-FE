import MainLayout from "../../components/Layout/MainLayout";
import { SABadge, SACarousel, SACol, SAForm, SAListGroup, SARow } from "../../components/UI/Custom";

const ITEMS = [
  "Cras justo odio",
  "Dapibus ac facilisis in",
  "Morbi leo risus",
  "Porta ac consectetur ac",
  "Vestibulum at eros",
];

const ListGroups = () => {
  const scrollTo = () => {};

  return (
    <MainLayout>
      <SARow>
        <SACol xs={10} className="main-content ps-xl-4 pe-xl-5">
          <h1 className="page-title">List Group</h1>
          <p className="lead">
            List groups are a flexible and powerful component for displaying a series of content. Read the{" "}
            <a href="https://getbootstrap.com/docs/5.1/components/list-group/" target="_blank">
              Official Bootstrap Documentation
            </a>{" "}
            for a full list of instructions and other options.
          </p>

          <hr />

          <h4 /*#default*/>Basic example</h4>
          <p className="mb-3">
            The most basic list group is an unordered list with list items and the proper classes. Build upon it with
            the options that follow, or with your own CSS as needed.
          </p>
          <div className="example">
            <SARow>
              <SACol md={6}>
                <SAListGroup>
                  {ITEMS.map((item, index) => (
                    <SAListGroup.Item key={index}>{item}</SAListGroup.Item>
                  ))}
                </SAListGroup>
              </SACol>
            </SARow>
          </div>

          <hr />

          <h4 /*#activeItems*/>Active items</h4>
          <p className="mb-3">
            Add <code>.active</code> to a <code>.list-group-item</code> to indicate the current active selection.
          </p>
          <div className="example">
            <SARow>
              <SACol md={6}>
                <SAListGroup as="ul">
                  {ITEMS.map((item, index) => (
                    <SAListGroup.Item as="li" key={index} active={index === 0}>
                      {item}
                    </SAListGroup.Item>
                  ))}
                </SAListGroup>
              </SACol>
            </SARow>
          </div>

          <hr />

          <h4 /*#disabledItems*/>Disabled items</h4>
          <p className="mb-3">
            Add <code>.disabled</code> to a <code>.list-group-item</code> to make it <em>appear</em> disabled. Note that
            some elements with <code>.disabled</code> will also require custom JavaScript to fully disable their click
            events (e.g., links).
          </p>
          <div className="example">
            <SARow>
              <SACol md={6}>
                <SAListGroup as="ul">
                  {ITEMS.map((item, index) => (
                    <SAListGroup.Item as="li" key={index} disabled={index === 0}>
                      {item}
                    </SAListGroup.Item>
                  ))}
                </SAListGroup>
              </SACol>
            </SARow>
          </div>

          <hr />

          <h4 /*#linksButtons*/>Links and buttons</h4>
          <p className="mb-3">
            Use <code>&lt;a&gt;</code>s or <code>&lt;button&gt;</code>s to create <em>actionable</em> list group items
            with hover, disabled, and active states by adding <code>.list-group-item-action</code>.
          </p>
          <div className="example">
            <SARow>
              <SACol md={6}>
                <SAListGroup defaultActiveKey="#link0">
                  {ITEMS.map((item, index) => (
                    <SAListGroup.Item action key={index} href={`#link${index}`} disabled={index === 4}>
                      {item}
                    </SAListGroup.Item>
                  ))}
                </SAListGroup>
              </SACol>
            </SARow>
          </div>

          <hr />

          <h4 /*#flush*/>Flush</h4>
          <p className="mb-3">
            Add <code>.list-group-flush</code> to remove some borders and rounded corners to render list group items
            edge-to-edge in a parent container (e.g., cards).
          </p>
          <div className="example">
            <SARow>
              <SACol md={6}>
                <SAListGroup variant="flush">
                  {ITEMS.map((item, index) => (
                    <SAListGroup.Item key={index}>{item}</SAListGroup.Item>
                  ))}
                </SAListGroup>
              </SACol>
            </SARow>
          </div>

          <hr />

          <h4 /*#withBadges*/>With Badges</h4>
          <p className="mb-3">
            Add badges to any list group item to show unread counts, activity, and more with the help of some{" "}
            <a href="https://getbootstrap.com/docs/5.1/utilities/flex/" target="_blank">
              utilities
            </a>
            .
          </p>
          <div className="example">
            <SAListGroup as="ul">
              <SAListGroup.Item as="li" className="d-flex justify-content-between align-items-center">
                A list item
                <SABadge pill>14</SABadge>
              </SAListGroup.Item>
              <SAListGroup.Item as="li" className="d-flex justify-content-between align-items-center">
                A second list item
                <SABadge pill>2</SABadge>
              </SAListGroup.Item>
              <SAListGroup.Item as="li" className="d-flex justify-content-between align-items-center">
                A third list item
                <SABadge pill>1</SABadge>
              </SAListGroup.Item>
            </SAListGroup>
          </div>

          <hr />

          <h4 /*#checkboxesRadios*/>Checkboxes and radios</h4>
          <p className="mb-3">
            Place Bootstrap’s checkboxes and radios within list group items and customize as needed.
          </p>
          <div className="example">
            <SAListGroup>
              <SAListGroup.Item>
                <SAForm.Check type="checkbox" label="First checkbox" id="checkbox1" />
              </SAListGroup.Item>
              <SAListGroup.Item>
                <SAForm.Check type="checkbox" label="Second checkbox" id="checkbox2" />
              </SAListGroup.Item>
              <SAListGroup.Item>
                <SAForm.Check type="checkbox" label="Third checkbox" id="checkbox3" />
              </SAListGroup.Item>
              <SAListGroup.Item>
                <SAForm.Check type="checkbox" label="Fourth checkbox" id="checkbox4" />
              </SAListGroup.Item>
              <SAListGroup.Item>
                <SAForm.Check type="checkbox" label="Fifth checkbox" id="checkbox5" />
              </SAListGroup.Item>
            </SAListGroup>
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
                Active items
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Disabled items
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Linkd and buttons
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Flush
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                With badges
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Checkboxes radios
              </a>
            </li>
          </ul>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default ListGroups;
