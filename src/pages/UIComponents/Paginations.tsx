import { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import {
  SAButton,
  SACol,
  SAForm,
  SANav,
  SANavbar,
  SANavDropdown,
  SAPagination,
  SARow,
} from "../../components/UI/Custom";

const Paginations = () => {
  const scrollTo = () => {};
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <MainLayout>
      <SARow>
        <SACol xl={10} className="main-content ps-xl-4 pe-xl-5">
          <h1 className="page-title">Pagination</h1>
          <p className="lead">
            To indicate a series of related content exists across multiple pages. Read the{" "}
            <a href="https://ng-bootstrap.github.io/#/components/pagination/examples" target="_blank">
              Official Ng-Bootstrap Documentation
            </a>{" "}
            for a full list of instructions and other options.
          </p>

          <hr />

          <h4 /*#default*/>Basic example</h4>
          <p className="mb-3">
            Pagination is built with list HTML elements so screen readers can announce the number of available links.
          </p>
          <div className="example">
            <p className="mb-2">Default pagination:</p>
            <SAPagination>
              <SAPagination.Prev />
              {Array.from({ length: 7 }).map((_, index) => (
                <SAPagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                  {index + 1}
                </SAPagination.Item>
              ))}
              <SAPagination.Next />
            </SAPagination>
            <p className="mb-2">No direction links:</p>
            <SAPagination>
              {Array.from({ length: 7 }).map((_, index) => (
                <SAPagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                  {index + 1}
                </SAPagination.Item>
              ))}
            </SAPagination>

            <p className="mb-2">With boundary links:</p>
            <SAPagination>
              <SAPagination.First />
              <SAPagination.Prev />
              {Array.from({ length: 7 }).map((_, index) => (
                <SAPagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                  {index + 1}
                </SAPagination.Item>
              ))}
              <SAPagination.Next />
              <SAPagination.Last />
            </SAPagination>
            <hr />
            <p>Current page: {currentPage}</p>
          </div>

          <hr />

          <h4 /*#advanced*/>Advanced example</h4>
          <div className="example"></div>

          <hr />

          <h4 /*#customLinks*/>Custom links</h4>
          <div className="example">
            <SAPagination>
              <SAPagination.Prev>Prev</SAPagination.Prev>
              {["A", "B", "C", "D", "E", "F", "G"].map((label, index) => (
                <SAPagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                  {label}
                </SAPagination.Item>
              ))}
              <SAPagination.Next>Next</SAPagination.Next>
            </SAPagination>
          </div>

          <hr />

          <h4 /*#sizing*/>Sizing</h4>
          <div className="example">
            <SAPagination size="lg">
              <SAPagination.Prev />
              {Array.from({ length: 7 }).map((_, index) => (
                <SAPagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                  {index + 1}
                </SAPagination.Item>
              ))}
              <SAPagination.Next />
            </SAPagination>
            <SAPagination>
              <SAPagination.Prev />
              {Array.from({ length: 7 }).map((_, index) => (
                <SAPagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                  {index + 1}
                </SAPagination.Item>
              ))}
              <SAPagination.Next />
            </SAPagination>
            <SAPagination size="sm">
              <SAPagination.Prev />
              {Array.from({ length: 7 }).map((_, index) => (
                <SAPagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                  {index + 1}
                </SAPagination.Item>
              ))}
              <SAPagination.Next />
            </SAPagination>
          </div>

          <hr />

          <h4 /*#alignment*/>Alignment</h4>
          <p className="mb-3">Change the alignment of pagination components with flexbox utilities.</p>
          <div className="example">
            <SAPagination>
              <SAPagination.Prev />
              {Array.from({ length: 7 }).map((_, index) => (
                <SAPagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                  {index + 1}
                </SAPagination.Item>
              ))}
              <SAPagination.Next />
            </SAPagination>
            <SAPagination className="justify-content-center">
              <SAPagination.Prev />
              {Array.from({ length: 7 }).map((_, index) => (
                <SAPagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                  {index + 1}
                </SAPagination.Item>
              ))}
              <SAPagination.Next />
            </SAPagination>
            <SAPagination className="justify-content-end">
              <SAPagination.Prev />
              {Array.from({ length: 7 }).map((_, index) => (
                <SAPagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                  {index + 1}
                </SAPagination.Item>
              ))}
              <SAPagination.Next />
            </SAPagination>
          </div>

          <hr />

          <h4 /*#seperated*/>Sperated</h4>
          <p className="mb-3">
            Add calss <code>.pagination-separated</code>.
          </p>
          <div className="example pagination-separated">
            <SAPagination>
              <SAPagination.Prev />
              {Array.from({ length: 7 }).map((_, index) => (
                <SAPagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                  {index + 1}
                </SAPagination.Item>
              ))}
              <SAPagination.Next />
            </SAPagination>
          </div>

          <hr />

          <h4 /*#rounded*/>Rounded</h4>
          <p className="mb-3">
            Add calss <code>.pagination-rounded</code>.
          </p>
          <div className="example pagination-rounded">
            <SAPagination>
              <SAPagination.Prev />
              {Array.from({ length: 7 }).map((_, index) => (
                <SAPagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                  {index + 1}
                </SAPagination.Item>
              ))}
              <SAPagination.Next />
            </SAPagination>
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
                Advanced example
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Custom links
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Sizing
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Alignment
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Seperated
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Rounded
              </a>
            </li>
          </ul>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default Paginations;
