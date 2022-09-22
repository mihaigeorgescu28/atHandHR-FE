import MainLayout from "../../components/Layout/MainLayout";
import { SAAccordion, SACol, SARow } from "../../components/UI/Custom";

const Accordions = () => {
  const scrollTo = () => {};

  return (
    <MainLayout>
      <SARow>
        <SACol xl={10} className="main-content ps-xl-4 pe-xl-5">
          <h1 className="page-title">Accordion</h1>
          <p className="lead">
            Accordion is a collection of collapsible panels. Read the{" "}
            <a href="https://ng-bootstrap.github.io/#/components/accordion/examples" target="_blank">
              Official Ng-Bootstrap Documentation
            </a>{" "}
            for a full list of instructions and other options.
          </p>

          <hr />

          <h4 /*#default*/>Basic Example</h4>
          <p className="mb-3">Click the accordions below to expand/collapse the accordion content.</p>
          <div className="example">
            <SAAccordion defaultActiveKey="0">
              <SAAccordion.Item eventKey="0">
                <SAAccordion.Header>Simple</SAAccordion.Header>
                <SAAccordion.Body>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                  moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                  Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                  shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                  proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                  aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </SAAccordion.Body>
              </SAAccordion.Item>
              <SAAccordion.Item eventKey="1">
                <SAAccordion.Header>
                  <span>
                    &#9733; <b>Fancy</b> title &#9733;
                  </span>
                </SAAccordion.Header>
                <SAAccordion.Body>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                  moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                  Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                  shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                  proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                  aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </SAAccordion.Body>
              </SAAccordion.Item>
              <SAAccordion.Item eventKey="2">
                <SAAccordion.Button disabled>Disabled</SAAccordion.Button>
                <SAAccordion.Body>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                  moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                  Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                  shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                  proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                  aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </SAAccordion.Body>
              </SAAccordion.Item>
            </SAAccordion>
          </div>
        </SACol>
        <SACol xl={2} className="content-nav-wrapper">
          <ul className="nav content-nav d-flex flex-column">
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Basic example
              </a>
            </li>
          </ul>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default Accordions;
