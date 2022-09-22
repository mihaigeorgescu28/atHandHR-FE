import MainLayout from "../../components/Layout/MainLayout";
import { SAButton, SARow, SACol } from "../../components/UI/Custom";

const BUTTONS = [
  { variant: "primary", label: "Primary" },
  { variant: "secondary", label: "Secondary" },
  { variant: "success", label: "Success" },
  { variant: "danger", label: "Danger" },
  { variant: "warning", label: "Warning" },
  { variant: "info", label: "Info" },
  { variant: "light", label: "Light" },
  { variant: "dark", label: "Dark" },
  { variant: "link", label: "Link" },
];

const Buttons = () => {
  const scrollTo = () => {};
  return (
    <MainLayout>
      <SARow>
        <SACol xl={10} className="col-xl-10 main-content ps-xl-4 pe-xl-5">
          <h1 className="page-title">Buttons</h1>
          <p className="lead">
            Use Bootstrap’s custom button styles for actions in forms, dialogs, and more with support for multiple
            sizes, states, and more. Read the{" "}
            <a href="https://getbootstrap.com/docs/5.1/components/buttons/" target="_blank">
              Official Bootstrap Documentation
            </a>{" "}
            for a full list of instructions and other options.
          </p>

          <hr />

          <h4 /*#default*/>Basic Example</h4>
          <p className="mb-3">
            Bootstrap includes several predefined button styles, each serving its own semantic purpose, with a few
            extras thrown in for more control.
          </p>
          <div className="example">
            {BUTTONS.map(({ variant, label }) => (
              <SAButton key={variant} variant={variant} className="me-1">
                {label}
              </SAButton>
            ))}
          </div>

          <hr />

          <h4 /*#tags*/>Button tags</h4>
          <p className="mb-3">
            The <code>.btn</code> classes are designed to be used with the <code>&lt;button&gt;</code> element. However,
            you can also use these classes on <code>&lt;a&gt;</code> or <code>&lt;input&gt;</code> elements (though some
            browsers may apply a slightly different rendering).
          </p>
          <div className="example">
            <SAButton href="#" className="me-1">
              Link
            </SAButton>
            <SAButton type="submit" className="me-1">
              Button
            </SAButton>
            <SAButton as="input" type="button" value="Input" className="me-1" />
            <SAButton as="input" type="submit" value="Submit" className="me-1" />
            <SAButton as="input" type="reset" value="Reset" />
          </div>

          <hr />

          <h4 /*#outline*/>Outline buttons</h4>
          <p className="mb-3">
            In need of a button, but not the hefty background colors they bring? Replace the default modifier classes
            with the <code>.btn-outline-*</code> ones to remove all background images and colors on any button.
          </p>
          <div className="example">
            {BUTTONS.map(({ variant, label }) => (
              <SAButton key={variant} variant={`outline-${variant}`} className="me-1">
                {label}
              </SAButton>
            ))}
          </div>

          <hr />

          <h4 /*#sizes*/>Sizes</h4>
          <p className="mb-3">
            Fancy larger or smaller buttons? Add <code>.btn-lg</code> or <code>.btn-sm</code> for additional sizes.
          </p>
          <div className="example">
            <SAButton size="lg" className="me-1">
              Large button
            </SAButton>
            <SAButton className="me-1">Default button</SAButton>
            <SAButton size="sm" className="me-1">
              Small button
            </SAButton>
            <SAButton size="xs">Extra small</SAButton>
          </div>

          <p className="mb-3">Create block level buttons—those that span the full width of a parent.</p>
          <div className="example">
            <div className="d-grid gap-2">
              <SAButton variant="primary">Block level button</SAButton>
              <SAButton variant="secondary">Block level button</SAButton>
            </div>
          </div>

          <hr />

          <h4 /*#active*/>Active state</h4>
          <p className="mb-3">
            Buttons will appear pressed (with a darker background, darker border, and inset shadow) when active.{" "}
            <strong>
              There’s no need to add a class to <code>&lt;button&gt;</code>s as they use a pseudo-class
            </strong>
            . However, you can still force the same active appearance with <code>.active</code> (and include the{" "}
            <code>aria-pressed="true"</code> attribute) should you need to replicate the state programmatically.
          </p>
          <div className="example">
            <SAButton variant="primary" href="" active className="me-1">
              Primary link
            </SAButton>
            <SAButton variant="secondary" href="" active>
              Link
            </SAButton>
          </div>

          <hr />

          <h4 /*#disabled*/>Disabled state</h4>
          <p className="mb-3">
            Make buttons look inactive by adding the <code>disabled</code> boolean attribute to any{" "}
            <code>&lt;button&gt;</code> element.
          </p>
          <div className="example">
            <SAButton variant="primary" disabled className="me-1">
              Primary button
            </SAButton>
            <SAButton variant="secondary" disabled>
              Button
            </SAButton>
          </div>

          <p className="mb-3">
            Disabled buttons using the <code>&lt;a&gt;</code> element behave a bit different. <code>&lt;a&gt;</code>s
            don’t support the <code>disabled</code> attribute, so you must add the <code>.disabled</code> class to make
            it visually appear disabled.
          </p>
          <div className="example">
            <SAButton variant="primary" href="" disabled className="me-1">
              Primary link
            </SAButton>
            <SAButton variant="secondary" href="" disabled>
              Link
            </SAButton>
          </div>

          <hr />

          <h4 /*#withIcon*/>Icon buttons</h4>
          <p className="mb-3">
            Add class <code>.btn-icon</code> for buttons with only icons.
          </p>
          <div className="example">
            <SAButton variant="primary" hasIcon className="me-1">
              <i className="feather icon-check-square"></i>
            </SAButton>
            <SAButton variant="danger" hasIcon className="me-1">
              <i className="feather icon-box"></i>
            </SAButton>
          </div>

          <hr />

          <h4 /*#withIconText*/>Button with text and icon</h4>
          <p className="mb-3">
            Wrap icon and text inside <code>.btn-icon-text</code> and use <code>.btn-icon-prepend</code> or{" "}
            <code>.btn-icon-append</code> for icon tags.
          </p>
          <div className="example">
            <SAButton variant="primary" hasIconText className="me-1">
              <i className="feather icon-check-square btn-icon-prepend"></i>
              Button with Icon
            </SAButton>
            <SAButton variant="primary" hasIconText className="me-1">
              Button with Icon
              <i className="feather icon-box btn-icon-append"></i>
            </SAButton>
          </div>

          <hr />

          <h4 /*#socialIcon*/>Social icon buttons</h4>
          <div className="example">
            <SAButton hasIcon social="facebook" className="me-1">
              <i className="feather icon-facebook"></i>
            </SAButton>
            <SAButton hasIcon social="instagram" className="me-1">
              <i className="feather icon-instagram"></i>
            </SAButton>
            <SAButton hasIcon social="twitter" className="me-1">
              <i className="feather icon-twitter"></i>
            </SAButton>
            <SAButton hasIcon social="youtube" className="me-1">
              <i className="feather icon-youtube"></i>
            </SAButton>
            <SAButton hasIcon social="github" className="me-1">
              <i className="feather icon-github"></i>
            </SAButton>
            <SAButton hasIcon social="linkedin" className="me-1">
              <i className="feather icon-linkedin"></i>
            </SAButton>
            <SAButton hasIcon social="outline-twitter">
              <i className="feather icon-twitter"></i>
            </SAButton>
          </div>

          <hr />

          <h4 /*#socialIconText*/>Social buttons with icon and text</h4>
          <div className="example">
            <SAButton hasIconText social="facebook" className="me-1">
              <i className="feather icon-facebook"></i>
              Facebook
            </SAButton>
            <SAButton hasIconText social="instagram" className="me-1">
              <i className="feather icon-instagram"></i>
              Instagram
            </SAButton>
            <SAButton hasIconText social="twitter" className="me-1">
              <i className="feather icon-twitter"></i>
              Twitter
            </SAButton>
            <SAButton hasIconText social="youtube" className="me-1">
              <i className="feather icon-youtube"></i>
              Youtube
            </SAButton>
            <SAButton hasIconText social="github" className="me-1">
              <i className="feather icon-github"></i>
              Github
            </SAButton>
            <SAButton hasIconText social="linkedin" className="me-1">
              <i className="feather icon-linkedin"></i>
              LinkedIn
            </SAButton>
            <SAButton hasIconText social="outline-twitter">
              <i className="feather icon-twitter"></i>
              Twitter
            </SAButton>
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
                Button tags
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Outline buttons
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Button sizes
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Active state
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Disabled state
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Icon buttons
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                With icon and text
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Social icon
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Social icon and text
              </a>
            </li>
          </ul>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default Buttons;
