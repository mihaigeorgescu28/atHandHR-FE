import { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import {
  SAButton,
  SARow,
  SACol,
  SAButtonGroup,
  SAToggleButton,
  SAButtonToolbar,
  SAInputGroup,
  SAForm,
  SADropdownButton,
  SADropdown,
} from "../../components/UI/Custom";

const ButtonGroups = () => {
  const scrollTo = () => {};
  const [checked, setChecked] = useState(true);
  const [radioValue, setRadioValue] = useState(1);

  return (
    <MainLayout>
      <SARow>
        <SACol xl={10} className="col-xl-10 main-content ps-xl-4 pe-xl-5">
          <h1 className="page-title">Button group</h1>
          <p className="lead">
            Group a series of buttons together on a single line or stack them in a vertical column. Read the{" "}
            <a href="https://getbootstrap.com/docs/5.1/components/SAbutton-group/" target="_blank">
              Official Bootstrap Documentation
            </a>{" "}
            for a full list of instructions and other options.
          </p>

          <hr />

          <h4 /*#default*/>Basic example</h4>
          <p className="mb-3">
            Wrap a series of buttons with <code>.btn</code> in <code>.btn-group</code>.
          </p>
          <div className="example">
            <SAButtonGroup aria-label="Basic example">
              <SAButton>Left</SAButton>
              <SAButton>Middle</SAButton>
              <SAButton>Right</SAButton>
            </SAButtonGroup>
          </div>

          <hr />

          <h4 /*#checkboxRadio*/>Checkbox and radio button groups.</h4>
          <p className="mb-3">
            Combine button-like checkbox and radio{" "}
            <a href="https://getbootstrap.com/docs/5.1/forms/checks-radios/" target="_blank">
              toggle buttons
            </a>{" "}
            into a seamless looking button group.{" "}
            <a href="https://ng-bootstrap.github.io/#/components/SAbuttons/examples" target="_blank">
              more examples
            </a>
            .
          </p>
          <div className="example">
            <SAButtonGroup>
              <SAToggleButton
                id="check1"
                type="checkbox"
                value={1}
                variant="outline-primary"
                checked={checked}
                onChange={(e) => setChecked(e.currentTarget.checked)}
              >
                Left (pre-checked)
              </SAToggleButton>
              <SAToggleButton
                id="radio1"
                type="radio"
                value={1}
                variant="outline-primary"
                checked={radioValue === 1}
                onChange={() => setRadioValue(1)}
              >
                Middle
              </SAToggleButton>
              <SAToggleButton
                id="radio2"
                type="radio"
                value={2}
                variant="outline-primary"
                checked={radioValue === 2}
                onChange={() => setRadioValue(2)}
              >
                Right
              </SAToggleButton>
            </SAButtonGroup>
          </div>

          <hr />

          <h4 /*#toolbar*/>Button toolbar</h4>
          <p className="mb-3">
            Combine sets of button groups into button toolbars for more complex components. Use utility classes as
            needed to space out groups, buttons, and more.
          </p>
          <div className="example">
            <SAButtonToolbar aria-label="Toolbar with button groups">
              <SAButtonGroup className="me-2" aria-label="First group">
                <SAButton>1</SAButton> <SAButton>2</SAButton> <SAButton>3</SAButton> <SAButton>4</SAButton>
              </SAButtonGroup>
              <SAButtonGroup className="me-2" aria-label="Second group">
                <SAButton>5</SAButton> <SAButton>6</SAButton> <SAButton>7</SAButton>
              </SAButtonGroup>
              <SAButtonGroup aria-label="Third group">
                <SAButton>8</SAButton>
              </SAButtonGroup>
            </SAButtonToolbar>
          </div>

          <p className="mb-3">
            Feel free to mix input groups with button groups in your toolbars. Similar to the example above, you'll
            likely need some utilities though to space things properly.
          </p>
          <div className="example">
            <SAButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
              <SAButtonGroup className="me-2" aria-label="First group">
                <SAButton>1</SAButton> <SAButton>2</SAButton> <SAButton>3</SAButton> <SAButton>4</SAButton>
              </SAButtonGroup>
              <SAInputGroup>
                <SAInputGroup.Text id="btnGroupAddon">@</SAInputGroup.Text>
                <SAForm.Control
                  type="text"
                  placeholder="Input group example"
                  aria-label="Input group example"
                  aria-describedby="btnGroupAddon"
                />
              </SAInputGroup>
            </SAButtonToolbar>

            <SAButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
              <SAButtonGroup aria-label="First group">
                <SAButton>1</SAButton> <SAButton>2</SAButton> <SAButton>3</SAButton> <SAButton>4</SAButton>
              </SAButtonGroup>
              <SAInputGroup>
                <SAInputGroup.Text id="btnGroupAddon2">@</SAInputGroup.Text>
                <SAForm.Control
                  type="text"
                  placeholder="Input group example"
                  aria-label="Input group example"
                  aria-describedby="btnGroupAddon2"
                />
              </SAInputGroup>
            </SAButtonToolbar>
          </div>

          <hr />

          <h4 /*#sizing*/>Sizing</h4>
          <p className="mb-3">
            Instead of applying button sizing classes to every button in a group, just add <code>.btn-group-*</code> to
            each <code>.btn-group</code>, including each one when nesting multiple groups.
          </p>
          <div className="example">
            <SAButtonGroup size="lg" className="me-1">
              <SAButton>Left</SAButton>
              <SAButton>Middle</SAButton>
              <SAButton>Right</SAButton>
            </SAButtonGroup>
            <SAButtonGroup className="me-1">
              <SAButton>Left</SAButton>
              <SAButton>Middle</SAButton>
              <SAButton>Right</SAButton>
            </SAButtonGroup>
            <SAButtonGroup size="sm">
              <SAButton>Left</SAButton>
              <SAButton>Middle</SAButton>
              <SAButton>Right</SAButton>
            </SAButtonGroup>
          </div>

          <hr />

          <h4 /*#nesting*/>Nesting</h4>
          <p className="mb-3">
            Place a <code>.btn-group</code> within another <code>.btn-group</code> when you want dropdown menus mixed
            with a series of buttons.
          </p>
          <div className="example">
            <SAButtonGroup>
              <SAButton>1</SAButton>
              <SAButton>2</SAButton>

              <SADropdownButton as={SAButtonGroup} title="Dropdown" id="bg-nested-dropdown">
                <SADropdown.Item eventKey="1">Dropdown link</SADropdown.Item>
                <SADropdown.Item eventKey="2">Dropdown link</SADropdown.Item>
              </SADropdownButton>
            </SAButtonGroup>
          </div>

          <hr />

          <h4 /*#vertical*/>Vertical variation</h4>
          <p className="mb-3">
            Make a set of buttons appear vertically stacked rather than horizontally. Split button dropdowns are not
            supported here.
          </p>
          <div className="example">
            <SAButtonGroup vertical className="me-1">
              <SAButton>Button</SAButton>
              <SAButton>Button</SAButton>
              <SAButton>Button</SAButton>
              <SAButton>Button</SAButton>
              <SAButton>Button</SAButton>
              <SAButton>Button</SAButton>
              <SAButton>Button</SAButton>
            </SAButtonGroup>

            <SAButtonGroup vertical>
              <SAButton variant="secondary">Button</SAButton>
              <SAButton variant="secondary">Button</SAButton>

              <SADropdownButton as={SAButtonGroup} title="Dropdown" id="bg-vertical-dropdown-1" variant="secondary">
                <SADropdown.Item eventKey="1">Dropdown link</SADropdown.Item>
                <SADropdown.Item eventKey="2">Dropdown link</SADropdown.Item>
              </SADropdownButton>

              <SAButton variant="secondary">Button</SAButton>
              <SAButton variant="secondary">Button</SAButton>

              <SADropdownButton as={SAButtonGroup} title="Dropdown" id="bg-vertical-dropdown-2" variant="secondary">
                <SADropdown.Item eventKey="1">Dropdown link</SADropdown.Item>
                <SADropdown.Item eventKey="2">Dropdown link</SADropdown.Item>
              </SADropdownButton>

              <SADropdownButton as={SAButtonGroup} title="Dropdown" id="bg-vertical-dropdown-3" variant="secondary">
                <SADropdown.Item eventKey="1">Dropdown link</SADropdown.Item>
                <SADropdown.Item eventKey="2">Dropdown link</SADropdown.Item>
              </SADropdownButton>
            </SAButtonGroup>
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
                Checkbox and radio
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Button toolbar
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Sizing
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Nesting
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Vertical variations
              </a>
            </li>
          </ul>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default ButtonGroups;
