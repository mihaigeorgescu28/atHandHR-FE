import MainLayout from "../../components/Layout/MainLayout";
import { SACol, SAProgressBar, SARow } from "../../components/UI/Custom";

const Progresses = () => {
  const scrollTo = () => {};

  return (
    <MainLayout>
      <SARow>
        <SACol xs={10} className="main-content ps-xl-4 pe-xl-5">
          <h1 className="page-title">Progress</h1>
          <p className="lead">
            Documentation and examples for using Bootstrap custom progress bars featuring support for stacked bars,
            animated backgrounds, and text labels. Read the{" "}
            <a href="https://ng-bootstrap.github.io/#/components/progressbar/examples" target="_blank">
              Official Ng-Bootstrap Documentation
            </a>{" "}
            for a full list of instructions and other options.
          </p>
          <hr />
          <h4 /*#default*/>Basic example</h4>
          <div className="example">
            <SAProgressBar now={25} />
          </div>
          <hr />
          <h4 /*#labels*/>Labels</h4>
          <div className="example">
            <SAProgressBar now={25} label="25%" className="mb-3" />
            <SAProgressBar now={100} variant="success" label="100%" />
          </div>
          <hr />
          <h4 /*#height*/>Height</h4>
          <div className="example">
            <SAProgressBar now={25} className="mb-3" style={{ height: 5 }} />
            <SAProgressBar now={25} className="mb-3" style={{ height: 10 }} />
            <SAProgressBar now={25} style={{ height: 15 }} />
          </div>
          <hr />
          <h4 /*#backgrounds*/>Backgrounds</h4>
          <p className="mb-3">Use background utility classes to change the appearance of individual progress bars.</p>
          <div className="example">
            <SAProgressBar now={25} label="25%" className="mb-3" />
            <SAProgressBar now={40} variant="success" label="40%" className="mb-3" />
            <SAProgressBar now={55} variant="info" label="55%" className="mb-3" />
            <SAProgressBar now={75} variant="warning" label="75%" className="mb-3" />
            <SAProgressBar now={95} variant="danger" label="95%" />
          </div>
          <hr />
          <h4 /*#striped*/>Striped</h4>
          <div className="example">
            <SAProgressBar striped now={25} className="mb-3" />
            <SAProgressBar striped now={40} variant="success" className="mb-3" />
            <SAProgressBar striped now={55} variant="info" className="mb-3" />
            <SAProgressBar striped now={75} variant="warning" className="mb-3" />
            <SAProgressBar striped now={95} variant="danger" />
          </div>
          <hr />
          <h4 /*#animated*/>Animated stripes</h4>
          <div className="example">
            <SAProgressBar animated striped now={25} className="mb-3" />
            <SAProgressBar animated striped now={40} variant="success" className="mb-3" />
            <SAProgressBar animated striped now={55} variant="info" className="mb-3" />
            <SAProgressBar animated striped now={75} variant="warning" className="mb-3" />
            <SAProgressBar animated striped now={95} variant="danger" />
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
                Labels
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Height
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Backgrounds
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Striped
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Animated stripes
              </a>
            </li>
          </ul>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default Progresses;
