import MainLayout from "../../components/Layout/MainLayout";
import { SAButton, SACol, SAForm, SANav, SANavbar, SANavDropdown, SARow } from "../../components/UI/Custom";

const Navbars = () => {
  const scrollTo = () => {};
  return (
    <MainLayout>
      <SARow>
        <SACol xl={10} className="main-content ps-xl-4 pe-xl-5">
          <h1 className="page-title">Navbar</h1>
          <p className="lead">
            Read the{" "}
            <a href="https://getbootstrap.com/docs/5.1/components/navbar/" target="_blank">
              Official Bootstrap Documentation
            </a>{" "}
            for a full list of instructions and other options.
          </p>
          <hr />
          <h4 /*#default*/>Basic example</h4>
          <p className="mb-3">
            Here’s an example of all the sub-components included in a responsive light-themed navbar that automatically
            collapses at the <code>lg</code> (large) breakpoint.
          </p>
          <div className="example">
            <SANavbar bg="light" expand="lg">
              <SANavbar.Brand href="#home">Navbar</SANavbar.Brand>
              <SANavbar.Toggle aria-controls="basic-navbar-nav" />
              <SANavbar.Collapse id="basic-navbar-nav">
                <SANav className="me-auto">
                  <SANav.Link href="#home">Home</SANav.Link>
                  <SANav.Link href="#blog">Blog</SANav.Link>
                  <SANavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <SANavDropdown.Item href="#action/3.1">Action</SANavDropdown.Item>
                    <SANavDropdown.Item href="#action/3.2">Another action</SANavDropdown.Item>
                    <SANavDropdown.Divider />
                    <SANavDropdown.Item href="#action/3.3">Something else here</SANavDropdown.Item>
                  </SANavDropdown>
                  <SANav.Link href="#disabled" disabled>
                    Disabled
                  </SANav.Link>
                </SANav>
                <SAForm className="d-flex">
                  <SAForm.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                  <SAButton variant="outline-success">Search</SAButton>
                </SAForm>
              </SANavbar.Collapse>
            </SANavbar>
          </div>
          <hr />
          <h4 /*#brand*/>Brand</h4>
          <p className="mb-3">
            The <code>.navbar-brand</code> can be applied to most elements, but an anchor works best as some elements
            might require utility classes or custom styles.
          </p>
          <div className="example">
            <SANavbar bg="light">
              <SANavbar.Brand href="#home">Nav bar</SANavbar.Brand>
            </SANavbar>
            <br />
            <SANavbar bg="light">
              <SANavbar.Brand>Nav bar</SANavbar.Brand>
            </SANavbar>
          </div>
          <br />
          <p className="mb-3">
            Adding images to the <code>.navbar-brand</code> will likely always require custom styles or utilities to
            properly size. Here are some examples to demonstrate.
          </p>
          <div className="example">
            <SANavbar bg="light">
              <SANavbar.Brand href="#home">
                <img
                  src="/logo-placeholder.png"
                  width={30}
                  height={30}
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
              </SANavbar.Brand>
            </SANavbar>
          </div>
          <br />
          <div className="example">
            <SANavbar bg="light">
              <SANavbar.Brand href="#home">
                <img
                  src="/logo-placeholder.png"
                  width={30}
                  height={30}
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />{" "}
                Logo
              </SANavbar.Brand>
            </SANavbar>
          </div>
          <hr />
          <h4 /*#forms*/>Forms</h4>
          <p className="mb-3">Place various form controls and components within a navbar.</p>
          <div className="example">
            <SANavbar bg="light">
              <SAForm className="d-flex ms-auto">
                <SAForm.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                <SAButton variant="outline-success">Search</SAButton>
              </SAForm>
            </SANavbar>
          </div>
          <hr />
          <h4 /*#text*/>Text</h4>
          <p className="mb-3">
            Navbars may contain bits of text with the help of <code>.navbar-text</code>. This class adjusts vertical
            alignment and horizontal spacing for strings of text.
          </p>
          <div className="example">
            <SANavbar bg="light">
              <SANavbar.Text>Navbar text with an inline element</SANavbar.Text>
            </SANavbar>
          </div>
          <hr />
          <h4 /*#colorSchemes*/>Color schemes</h4>
          <p className="mb-3">
            Theming the navbar has never been easier thanks to the combination of theming classes and{" "}
            <code>background-color</code> utilities. Choose from <code>.navbar-light</code> for use with light
            background colors, or <code>.navbar-dark</code> for dark background colors. Then, customize with{" "}
            <code>.bg-*</code> utilities.
          </p>
          <div className="example">
            <SANavbar bg="dark" variant="dark">
              <SANavbar.Brand href="#home">Navbar</SANavbar.Brand>
              <SANav className="me-auto">
                <SANav.Link href="#home">Home</SANav.Link>
                <SANav.Link href="#features">Features</SANav.Link>
                <SANav.Link href="#pricing">Pricing</SANav.Link>
                <SANav.Link href="#about">About</SANav.Link>
              </SANav>
              <SAForm className="d-flex ms-auto">
                <SAForm.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                <SAButton variant="outline-success">Search</SAButton>
              </SAForm>
            </SANavbar>
            <br />

            <SANavbar bg="primary" variant="dark">
              <SANavbar.Brand href="#home">Navbar</SANavbar.Brand>
              <SANav className="me-auto">
                <SANav.Link href="#home">Home</SANav.Link>
                <SANav.Link href="#features">Features</SANav.Link>
                <SANav.Link href="#pricing">Pricing</SANav.Link>
                <SANav.Link href="#about">About</SANav.Link>
              </SANav>
              <SAForm className="d-flex ms-auto">
                <SAForm.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                <SAButton variant="outline-success">Search</SAButton>
              </SAForm>
            </SANavbar>
            <br />

            <SANavbar bg="danger" variant="dark">
              <SANavbar.Brand href="#home">Navbar</SANavbar.Brand>
              <SANav className="me-auto">
                <SANav.Link href="#home">Home</SANav.Link>
                <SANav.Link href="#features">Features</SANav.Link>
                <SANav.Link href="#pricing">Pricing</SANav.Link>
                <SANav.Link href="#about">About</SANav.Link>
              </SANav>
              <SAForm className="d-flex ms-auto">
                <SAForm.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                <SAButton variant="outline-success">Search</SAButton>
              </SAForm>
            </SANavbar>
          </div>
          <hr />
          <h4 /*#toggler*/>Toggler</h4>
          <p className="mb-3">Below the example of toggler</p>
          <div className="example">
            <SANavbar bg="light">
              <SANavbar.Brand href="#home">Navbar</SANavbar.Brand>
              <SANav className="me-auto">
                <SANav.Link href="#home">Home</SANav.Link>
                <SANav.Link href="#features">Features</SANav.Link>
                <SANav.Link href="#pricing">Pricing</SANav.Link>
                <SANav.Link href="#about">About</SANav.Link>
              </SANav>
              <SAForm className="d-flex ms-auto">
                <SAForm.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                <SAButton variant="outline-success">Search</SAButton>
              </SAForm>
            </SANavbar>
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
                Brand
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Forms
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Text
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Color schemes
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Toggler
              </a>
            </li>
          </ul>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default Navbars;
