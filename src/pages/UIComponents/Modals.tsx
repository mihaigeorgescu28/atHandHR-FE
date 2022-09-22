import { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { SAButton, SACol, SAModal, SARow } from "../../components/UI/Custom";

const Modals = () => {
  const scrollTo = () => {};
  const [isBasicModalOpen, setBasicModalOpen] = useState(false);
  const [isScrollableModalOpen, setScrollableModalOpen] = useState(false);
  const [isVerticalModalOpen, setVerticalModalOpen] = useState(false);
  const [isXlModalOpen, setXlModalOpen] = useState(false);
  const [isLgModalOpen, setLgModalOpen] = useState(false);
  const [isSmModalOpen, setSmModalOpen] = useState(false);

  return (
    <MainLayout>
      <SARow>
        <SACol xs={10} className="main-content ps-xl-4 pe-xl-5">
          <h1 className="page-title">Modal</h1>
          <p className="lead">
            Add dialogs to your site for lightboxes, user notifications, or completely custom content. Read the{" "}
            <a href="https://ng-bootstrap.github.io/#/components/modal/examples" target="_blank">
              Official Ng-Bootstrap Documentation
            </a>{" "}
            for a full list of instructions and other options.
          </p>

          <hr />

          <h4 /*#basic*/>Basic example</h4>
          <p className="mb-3">Toggle a working modal demo by clicking the button below.</p>
          <div className="example">
            <SAButton onClick={() => setBasicModalOpen(true)}>Launch demo modal</SAButton>
            <SAModal show={isBasicModalOpen} onHide={() => setBasicModalOpen(false)}>
              <SAModal.Header closeButton>
                <SAModal.Title>Modal title</SAModal.Title>
              </SAModal.Header>
              <SAModal.Body>Modal body</SAModal.Body>
              <SAModal.Footer>
                <SAButton variant="secondary" onClick={() => setBasicModalOpen(false)}>
                  Close
                </SAButton>
                <SAButton onClick={() => setBasicModalOpen(false)}>Save Changes</SAButton>
              </SAModal.Footer>
            </SAModal>
          </div>

          <hr />

          <h4 /*#scrolling*/>Scrolling long content</h4>
          <p className="mb-3">When modals become too long for the user’s viewport or device.</p>
          <div className="example">
            <SAButton onClick={() => setScrollableModalOpen(true)}>Launch demo modal</SAButton>
            <SAModal show={isScrollableModalOpen} onHide={() => setScrollableModalOpen(false)} scrollable>
              <SAModal.Header closeButton>
                <SAModal.Title>Modal title</SAModal.Title>
              </SAModal.Header>
              <SAModal.Body>
                <p>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                  eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </p>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
                  laoreet rutrum faucibus dolor auctor.
                </p>
                <p>
                  Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                </p>
                <p>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                  eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </p>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
                  laoreet rutrum faucibus dolor auctor.
                </p>
                <p>
                  Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                </p>
                <p>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                  eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </p>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
                  laoreet rutrum faucibus dolor auctor.
                </p>
                <p>
                  Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                </p>
                <p>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                  eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </p>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
                  laoreet rutrum faucibus dolor auctor.
                </p>
                <p>
                  Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                </p>
                <p>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                  eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </p>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
                  laoreet rutrum faucibus dolor auctor.
                </p>
                <p>
                  Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                </p>
                <p>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                  eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </p>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
                  laoreet rutrum faucibus dolor auctor.
                </p>
                <p>
                  Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                </p>
              </SAModal.Body>
              <SAModal.Footer>
                <SAButton variant="secondary" onClick={() => setScrollableModalOpen(false)}>
                  Close
                </SAButton>
                <SAButton onClick={() => setScrollableModalOpen(false)}>Save Changes</SAButton>
              </SAModal.Footer>
            </SAModal>
          </div>

          <hr />

          <h4 /*#vCenter*/>Vertically centered</h4>
          <div className="example">
            <SAButton onClick={() => setVerticalModalOpen(true)}>Launch demo modal</SAButton>
            <SAModal show={isVerticalModalOpen} onHide={() => setVerticalModalOpen(false)} centered>
              <SAModal.Header closeButton>
                <SAModal.Title>Modal title</SAModal.Title>
              </SAModal.Header>
              <SAModal.Body>Modal body</SAModal.Body>
              <SAModal.Footer>
                <SAButton variant="secondary" onClick={() => setVerticalModalOpen(false)}>
                  Close
                </SAButton>
                <SAButton onClick={() => setVerticalModalOpen(false)}>Save Changes</SAButton>
              </SAModal.Footer>
            </SAModal>
          </div>

          <hr />

          <h4 /*#sizing*/>Optional sizes</h4>
          <p className="mb-3">Extra large, large, small modals.</p>
          <div className="example">
            <SAButton onClick={() => setXlModalOpen(true)} className="me-1">
              Extra large modal
            </SAButton>
            <SAButton onClick={() => setLgModalOpen(true)} className="me-1">
              Large modal
            </SAButton>
            <SAButton onClick={() => setSmModalOpen(true)}>Small modal</SAButton>
            <SAModal show={isXlModalOpen} onHide={() => setXlModalOpen(false)} size="xl">
              <SAModal.Header closeButton>
                <SAModal.Title>Modal title</SAModal.Title>
              </SAModal.Header>
              <SAModal.Body>Modal body</SAModal.Body>
              <SAModal.Footer>
                <SAButton variant="secondary" onClick={() => setXlModalOpen(false)}>
                  Close
                </SAButton>
                <SAButton onClick={() => setXlModalOpen(false)}>Save Changes</SAButton>
              </SAModal.Footer>
            </SAModal>
            <SAModal show={isLgModalOpen} onHide={() => setLgModalOpen(false)} size="lg">
              <SAModal.Header closeButton>
                <SAModal.Title>Modal title</SAModal.Title>
              </SAModal.Header>
              <SAModal.Body>Modal body</SAModal.Body>
              <SAModal.Footer>
                <SAButton variant="secondary" onClick={() => setLgModalOpen(false)}>
                  Close
                </SAButton>
                <SAButton onClick={() => setLgModalOpen(false)}>Save Changes</SAButton>
              </SAModal.Footer>
            </SAModal>
            <SAModal show={isSmModalOpen} onHide={() => setSmModalOpen(false)} size="sm">
              <SAModal.Header closeButton>
                <SAModal.Title>Modal title</SAModal.Title>
              </SAModal.Header>
              <SAModal.Body>Modal body</SAModal.Body>
              <SAModal.Footer>
                <SAButton variant="secondary" onClick={() => setSmModalOpen(false)}>
                  Close
                </SAButton>
                <SAButton onClick={() => setSmModalOpen(false)}>Save Changes</SAButton>
              </SAModal.Footer>
            </SAModal>
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
                Scrolling long content
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Vertical centered
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Optional sizes
              </a>
            </li>
          </ul>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default Modals;
