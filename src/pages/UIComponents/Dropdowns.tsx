import MainLayout from "../../components/Layout/MainLayout";
import { SAButtonGroup, SACol, SADropdown, SADropdownButton, SARow, SASplitButton } from "../../components/UI/Custom";

const Dropdowns = () => {
  const scrollTo = () => {};

  return (
    <MainLayout>
      <SARow>
        <SACol xl={10} className="main-content ps-xl-4 pe-xl-5">
          <h1 className="page-title">Dropdowns</h1>
          <p className="lead">
            Toggle contextual overlays for displaying lists of links and more with the Bootstrap dropdown plugin. Read
            the{" "}
            <a href="https://ng-bootstrap.github.io/#/components/SAdropdown/examples" target="_blank">
              Official Ng-Bootstrap Documentation
            </a>{" "}
            for a full list of instructions and other options.
          </p>

          <hr />

          <h4 /*#default*/>Basic Example</h4>
          <div className="example">
            <SADropdown>
              <SADropdown.Toggle variant="secondary" id="dropdown-basic" className="btn btn-secondary">
                Dropdown button
              </SADropdown.Toggle>

              <SADropdown.Menu>
                <SADropdown.Item eventKey="1">Action - 1</SADropdown.Item>
                <SADropdown.Item eventKey="2">Another action</SADropdown.Item>
                <SADropdown.Item eventKey="3">Something else is here</SADropdown.Item>
              </SADropdown.Menu>
            </SADropdown>
          </div>

          <hr />

          <h4 /*#variations*/>Dropdown button variations</h4>
          <p className="mb-3">
            Add class <code>.btn-*</code> for solid colored buttons.
          </p>
          <div className="example">
            {["Primary", "Secondary", "Success", "Info", "Warning", "Danger"].map((variant) => (
              <SADropdownButton
                as={SAButtonGroup}
                key={variant}
                id={`dropdown-variants-${variant}`}
                variant={variant.toLowerCase()}
                title={variant}
                style={{ marginRight: 3 }}
              >
                <SADropdown.Item eventKey="1">Action - 1</SADropdown.Item>
                <SADropdown.Item eventKey="2">Another action</SADropdown.Item>
                <SADropdown.Item eventKey="3">Something else is here</SADropdown.Item>
              </SADropdownButton>
            ))}
          </div>

          <hr />

          <h4 /*#split*/>Split button</h4>
          <p className="mb-3">
            Similarly, create split button dropdowns with virtually the same markup as single button dropdowns, but with
            the addition of <code>.dropdown-toggle-split</code> for proper spacing around the dropdown caret.
          </p>
          <div className="example">
            {["Primary", "Secondary", "Success", "Info", "Warning", "Danger"].map((variant) => (
              <SASplitButton
                key={variant}
                id={`dropdown-split-variants-${variant}`}
                variant={variant.toLowerCase()}
                title={variant}
                style={{ marginRight: 3 }}
              >
                <SADropdown.Item eventKey="1">Action - 1</SADropdown.Item>
                <SADropdown.Item eventKey="2">Another action</SADropdown.Item>
                <SADropdown.Item eventKey="3">Something else is here</SADropdown.Item>
              </SASplitButton>
            ))}
          </div>

          <hr />

          <h4 /*#sizing*/>Sizing</h4>
          <p className="mb-3">
            Button dropdowns work with buttons of all sizes, including default and split dropdown buttons.
          </p>
          <div className="example">
            <div className="btn-toolbar">
              {[SADropdownButton, SASplitButton].map((DropdownType, idx) => (
                <DropdownType
                  as={SAButtonGroup}
                  key={idx}
                  id={`dropdown-button-drop-${idx}`}
                  size="lg"
                  title={`Large ${idx === 1 ? " split" : ""} button`}
                  variant="secondary"
                  style={{ marginRight: 3 }}
                >
                  <SADropdown.Item eventKey="1">Action - 1</SADropdown.Item>
                  <SADropdown.Item eventKey="2">Another action</SADropdown.Item>
                  <SADropdown.Item eventKey="3">Something else is here</SADropdown.Item>
                </DropdownType>
              ))}
            </div>
            <div className="btn-toolbar">
              {[SADropdownButton, SASplitButton].map((DropdownType, idx) => (
                <DropdownType
                  as={SAButtonGroup}
                  key={idx}
                  id={`dropdown-button-drop-${idx}`}
                  size="sm"
                  variant="secondary"
                  title={`Small ${idx === 1 ? " split" : ""} button`}
                  style={{ marginRight: 3 }}
                >
                  <SADropdown.Item eventKey="1">Action - 1</SADropdown.Item>
                  <SADropdown.Item eventKey="2">Another action</SADropdown.Item>
                  <SADropdown.Item eventKey="3">Something else is here</SADropdown.Item>
                </DropdownType>
              ))}
            </div>
          </div>

          <hr />

          <h4 /*#dropup*/>Dropup</h4>
          <p className="mb-3">
            Trigger dropdown menus above elements by adding <code>/*placement="top-end"*/</code> to the parent element.
          </p>
          <div className="example">
            <SADropdownButton
              as={SAButtonGroup}
              key={"up"}
              id={`dropdown-button-drop-up`}
              drop={"up"}
              variant="secondary"
              title={`Dropup`}
              style={{ marginRight: 3 }}
            >
              <SADropdown.Item eventKey="1">Action - 1</SADropdown.Item>
              <SADropdown.Item eventKey="2">Another action</SADropdown.Item>
              <SADropdown.Item eventKey="3">Something else is here</SADropdown.Item>
            </SADropdownButton>
            <div className="btn-group mb-1 mb-md-0">
              <SASplitButton
                as={SAButtonGroup}
                key={"up"}
                id={`dropdown-button-drop-up`}
                drop={"up"}
                variant="secondary"
                title={`Split dropup`}
              >
                <SADropdown.Item eventKey="1">Action - 1</SADropdown.Item>
                <SADropdown.Item eventKey="2">Another action</SADropdown.Item>
                <SADropdown.Item eventKey="3">Something else is here</SADropdown.Item>
              </SASplitButton>
            </div>
          </div>

          <hr />

          <h4 /*#dropright*/>Dropright</h4>
          <p className="mb-3">
            Trigger dropdown menus at the right of the elements by adding <code>/*placement="end-top"*/</code> to the
            parent element.
          </p>
          <div className="example">
            <SADropdownButton
              as={SAButtonGroup}
              key={"end"}
              id={`dropdown-button-drop-end`}
              drop={"end"}
              variant="secondary"
              title={`Dropright`}
              style={{ marginRight: 3 }}
            >
              <SADropdown.Item eventKey="1">Action - 1</SADropdown.Item>
              <SADropdown.Item eventKey="2">Another action</SADropdown.Item>
              <SADropdown.Item eventKey="3">Something else is here</SADropdown.Item>
            </SADropdownButton>
            <div className="btn-group mb-1 mb-md-0">
              <SASplitButton
                as={SAButtonGroup}
                key={"end"}
                id={`dropdown-button-drop-end`}
                drop={"end"}
                variant="secondary"
                title={`Split dropright`}
              >
                <SADropdown.Item eventKey="1">Action - 1</SADropdown.Item>
                <SADropdown.Item eventKey="2">Another action</SADropdown.Item>
                <SADropdown.Item eventKey="3">Something else is here</SADropdown.Item>
              </SASplitButton>
            </div>
          </div>

          <hr />

          <h4 /*#dropleft*/>Dropleft</h4>
          <p className="mb-3">
            Trigger dropdown menus at the right of the elements by adding <code>/*placement="start-top"*/</code> to the
            parent element.
          </p>
          <div className="example">
            <SADropdownButton
              as={SAButtonGroup}
              key={"start"}
              id={`dropdown-button-drop-start`}
              drop={"start"}
              variant="secondary"
              title={`Dropleft`}
              style={{ marginRight: 3 }}
            >
              <SADropdown.Item eventKey="1">Action - 1</SADropdown.Item>
              <SADropdown.Item eventKey="2">Another action</SADropdown.Item>
              <SADropdown.Item eventKey="3">Something else is here</SADropdown.Item>
            </SADropdownButton>
            <div className="btn-group mb-1 mb-md-0">
              <SASplitButton
                as={SAButtonGroup}
                key={"start"}
                id={`dropdown-button-drop-start`}
                drop={"start"}
                variant="secondary"
                title={`Split dropleft`}
              >
                <SADropdown.Item eventKey="1">Action - 1</SADropdown.Item>
                <SADropdown.Item eventKey="2">Another action</SADropdown.Item>
                <SADropdown.Item eventKey="3">Something else is here</SADropdown.Item>
              </SASplitButton>
            </div>
          </div>

          <hr />

          <h4 /*#activeItem*/>Active menu item</h4>
          <p className="mb-3">
            Add <code>.active</code> to items in the dropdown to <strong>style them as active</strong>.
          </p>
          <div className="example">
            <SADropdown>
              <SADropdown.Toggle variant="secondary" id="dropdown-basic" className="btn btn-secondary">
                Dropdown button
              </SADropdown.Toggle>

              <SADropdown.Menu>
                <SADropdown.Item eventKey="1">Action - 1</SADropdown.Item>
                <SADropdown.Item eventKey="2" active>
                  Another action
                </SADropdown.Item>
                <SADropdown.Item eventKey="3">Something else is here</SADropdown.Item>
              </SADropdown.Menu>
            </SADropdown>
          </div>

          <hr />

          <h4 /*#disabledItem*/>Disabled menu item</h4>
          <p className="mb-3">
            Add <code>.disabled</code> to items in the dropdown to <strong>style them as disabled</strong>.
          </p>
          <div className="example">
            <SADropdown>
              <SADropdown.Toggle variant="secondary" id="dropdown-basic" className="btn btn-secondary">
                Dropdown button
              </SADropdown.Toggle>

              <SADropdown.Menu>
                <SADropdown.Item eventKey="1">Action - 1</SADropdown.Item>
                <SADropdown.Item eventKey="2" diabled>
                  Another action
                </SADropdown.Item>
                <SADropdown.Item eventKey="3">Something else is here</SADropdown.Item>
              </SADropdown.Menu>
            </SADropdown>
          </div>

          <hr />

          <h4 /*#dropdownHeader*/>Dropdown header</h4>
          <p className="mb-3">Add a header to label sections of actions in any dropdown menu.</p>
          <div className="example">
            <SADropdown>
              <SADropdown.Toggle variant="secondary" id="dropdown-basic" className="btn btn-secondary">
                Dropdown button
              </SADropdown.Toggle>

              <SADropdown.Menu>
                <SADropdown.Header style={{ fontWeight: "bold" }}>Dropdown header</SADropdown.Header>
                <SADropdown.Item eventKey="1">Action - 1</SADropdown.Item>
                <SADropdown.Item eventKey="2">Another action</SADropdown.Item>
                <SADropdown.Item eventKey="3">Something else is here</SADropdown.Item>
              </SADropdown.Menu>
            </SADropdown>
          </div>

          <hr />

          <h4 /*#dropdownDividers*/>Dropdown dividers</h4>
          <p className="mb-3">Add a header to label sections of actions in any dropdown menu.</p>
          <div className="example">
            <SADropdown>
              <SADropdown.Toggle variant="secondary" id="dropdown-basic" className="btn btn-secondary">
                Dropdown button
              </SADropdown.Toggle>

              <SADropdown.Menu>
                <SADropdown.Item eventKey="1">Action - 1</SADropdown.Item>
                <SADropdown.Item eventKey="2">Another action</SADropdown.Item>
                <SADropdown.Item eventKey="3">Something else is here</SADropdown.Item>
                <SADropdown.Divider />
                <SADropdown.Item eventKey="4">Separated item</SADropdown.Item>
              </SADropdown.Menu>
            </SADropdown>
          </div>

          <hr />

          <h4 /*#dropdownText*/>Text in dropdown</h4>
          <p className="mb-3">
            Place any freeform text within a dropdown menu with text and use spacing utilities. Note that you’ll likely
            need additional sizing styles to constrain the menu width.
          </p>
          <div className="example">
            <SADropdown>
              <SADropdown.Toggle variant="secondary" id="dropdown-basic" className="btn btn-secondary">
                Dropdown button
              </SADropdown.Toggle>

              <SADropdown.Menu>
                <SADropdown.ItemText>
                  <p>Some example text that's free-flowing within the dropdown menu.</p>
                  <p className="mb-0">And this is more example text.</p>
                </SADropdown.ItemText>
              </SADropdown.Menu>
            </SADropdown>
          </div>

          <hr />

          <h4 /*#dropdownForm*/>Forms in dropdown</h4>
          <p className="mb-3">
            Put a form within a dropdown menu, or make it into a dropdown menu, and use margin or padding utilities to
            give it the negative space you require.
          </p>
          <div className="example">
            <SADropdown>
              <SADropdown.Toggle variant="secondary" id="dropdown-basic" className="btn btn-secondary">
                Dropdown button
              </SADropdown.Toggle>

              <SADropdown.Menu>
                <form /*ngbDropdownMenu*/ className="p-4" aria-labelledby="dropdownFormExample">
                  <div className="mb-3">
                    <label htmlFor="exampleDropdownFormEmail2" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleDropdownFormEmail2"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleDropdownFormPassword2" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleDropdownFormPassword2"
                      placeholder="Password"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Sign in
                  </button>
                </form>
              </SADropdown.Menu>
            </SADropdown>
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
                Dropdown variations
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Split button
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Sizing
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Dropup
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Dropright
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Dropleft
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Active menu item
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Disabled menu item
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Dropdown header
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Dropdown dividers
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Text in dropdown
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Form in dropdown
              </a>
            </li>
          </ul>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default Dropdowns;
