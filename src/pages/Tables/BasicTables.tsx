import MainLayout from "../../components/Layout/MainLayout";
import { SABreadcrumb, SACard, SACol, SAProgressBar, SARow, SATable } from "../../components/UI/Custom";

const BasicTables = () => {
  return (
    <MainLayout>
      <SABreadcrumb>
        <SABreadcrumb.Item href="#">Tables</SABreadcrumb.Item>
        <SABreadcrumb.Item active>Basic tables</SABreadcrumb.Item>
      </SABreadcrumb>

      <SARow>
        <SACol md={6} className="grid-margin stretch-card">
          <SACard>
            <SACard.Body>
              <SACard.Title>Basic Table</SACard.Title>
              <p className="text-muted mb-3">
                Add class <code>.table</code>
              </p>

              <SATable responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>LAST NAME</th>
                    <th>USERNAME</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>Larry</td>
                    <td>Jellybean</td>
                    <td>@lajelly</td>
                  </tr>
                  <tr>
                    <th>5</th>
                    <td>Larry</td>
                    <td>Kikat</td>
                    <td>@lakitkat</td>
                  </tr>
                </tbody>
              </SATable>
            </SACard.Body>
          </SACard>
        </SACol>
        <SACol md={6} className="grid-margin stretch-card">
          <SACard>
            <SACard.Body>
              <SACard.Title>Hoverable Table</SACard.Title>
              <p className="text-muted mb-3">
                Add class <code>.table-hover</code>
              </p>

              <SATable responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>LAST NAME</th>
                    <th>USERNAME</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>Larry</td>
                    <td>Jellybean</td>
                    <td>@lajelly</td>
                  </tr>
                  <tr>
                    <th>5</th>
                    <td>Larry</td>
                    <td>Kikat</td>
                    <td>@lakitkat</td>
                  </tr>
                </tbody>
              </SATable>
            </SACard.Body>
          </SACard>
        </SACol>
      </SARow>

      <SARow>
        <SACol md={12} className="grid-margin stretch-card">
          <SACard>
            <SACard.Body>
              <SACard.Title>Bordered table</SACard.Title>
              <p className="text-muted mb-3">
                Add class <code>.table-bordered</code>
              </p>

              <SATable responsive bordered className="pt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Progress</th>
                    <th>Salary</th>
                    <th>Start date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Cedric Kelly</td>
                    <td>
                      <SAProgressBar now={25} animated variant="success" striped />
                    </td>
                    <td>$206,850</td>
                    <td>June 21, 2010</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Haley Kennedy</td>
                    <td>
                      <SAProgressBar now={75} animated variant="danger" striped />
                    </td>
                    <td>$313,500</td>
                    <td>May 15, 2013</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Bradley Greer</td>
                    <td>
                      <SAProgressBar now={90} animated variant="warning" striped />
                    </td>
                    <td>$132,000</td>
                    <td>Apr 12, 2014</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Brenden Wagner</td>
                    <td>
                      <SAProgressBar now={50} animated variant="primary" striped />
                    </td>
                    <td>$206,850</td>
                    <td>June 21, 2010</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Bruno Nash</td>
                    <td>
                      <SAProgressBar now={35} animated variant="danger" striped />
                    </td>
                    <td>$163,500</td>
                    <td>January 01, 2016</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Sonya Frost</td>
                    <td>
                      <SAProgressBar now={65} animated variant="info" striped />
                    </td>
                    <td>$103,600</td>
                    <td>July 18, 2011</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>Zenaida Frank</td>
                    <td>
                      <SAProgressBar now={20} animated variant="warning" striped />
                    </td>
                    <td>$313,500</td>
                    <td>March 22, 2013</td>
                  </tr>
                </tbody>
              </SATable>
            </SACard.Body>
          </SACard>
        </SACol>
      </SARow>

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <SACard>
            <SACard.Body>
              <SACard.Title>Striped Table</SACard.Title>
              <p className="text-muted mb-3">
                Add class <code>.table-striped</code>
              </p>

              <SATable responsive striped>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Name</th>
                    <th>Progress</th>
                    <th>Salary</th>
                    <th>Start date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1">
                      <img src="http://via.placeholder.com/36x36" alt="image" />
                    </td>
                    <td>Cedric Kelly</td>
                    <td>
                      <SAProgressBar now={25} animated variant="success" striped />
                    </td>
                    <td>$206,850</td>
                    <td>June 21, 2010</td>
                  </tr>
                  <tr>
                    <td className="py-1">
                      <img src="http://via.placeholder.com/36x36" alt="image" />
                    </td>
                    <td>Haley Kennedy</td>
                    <td>
                      <SAProgressBar now={75} animated variant="danger" striped />
                    </td>
                    <td>$313,500</td>
                    <td>May 15, 2013</td>
                  </tr>
                  <tr>
                    <td className="py-1">
                      <img src="http://via.placeholder.com/36x36" alt="image" />
                    </td>
                    <td>Bradley Greer</td>
                    <td>
                      <SAProgressBar now={90} animated variant="warning" striped />
                    </td>
                    <td>$132,000</td>
                    <td>Apr 12, 2014</td>
                  </tr>
                  <tr>
                    <td className="py-1">
                      <img src="http://via.placeholder.com/36x36" alt="image" />
                    </td>
                    <td>Brenden Wagner</td>
                    <td>
                      <SAProgressBar now={50} animated variant="primary" striped />
                    </td>
                    <td>$206,850</td>
                    <td>June 21, 2010</td>
                  </tr>
                  <tr>
                    <td className="py-1">
                      <img src="http://via.placeholder.com/36x36" alt="image" />
                    </td>
                    <td>Bruno Nash</td>
                    <td>
                      <SAProgressBar now={35} animated variant="danger" striped />
                    </td>
                    <td>$163,500</td>
                    <td>January 01, 2016</td>
                  </tr>
                  <tr>
                    <td className="py-1">
                      <img src="http://via.placeholder.com/36x36" alt="image" />
                    </td>
                    <td>Sonya Frost</td>
                    <td>
                      <SAProgressBar now={65} animated variant="info" striped />
                    </td>
                    <td>$103,600</td>
                    <td>July 18, 2011</td>
                  </tr>
                  <tr>
                    <td className="py-1">
                      <img src="http://via.placeholder.com/36x36" alt="image" />
                    </td>
                    <td>Zenaida Frank</td>
                    <td>
                      <SAProgressBar now={20} animated variant="warning" striped />
                    </td>
                    <td>$313,500</td>
                    <td>March 22, 2013</td>
                  </tr>
                </tbody>
              </SATable>
            </SACard.Body>
          </SACard>
        </div>
      </div>

      <SARow>
        <SACol lg={12} className="grid-margin stretch-card">
          <SACard>
            <SACard.Body>
              <SACard.Title>Inverse table</SACard.Title>
              <p className="text-muted mb-3">
                Add class <code>.table-dark</code>
              </p>

              <SATable responsive variant="dark" className="pt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Start date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Cedric Kelly</td>
                    <td>$206,850</td>
                    <td>June 21, 2010</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Haley Kennedy</td>
                    <td>$313,500</td>
                    <td>May 15, 2013</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Bradley Greer</td>
                    <td>$132,000</td>
                    <td>Apr 12, 2014</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Brenden Wagner</td>
                    <td>$206,850</td>
                    <td>June 21, 2010</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Bruno Nash</td>
                    <td>$163,500</td>
                    <td>January 01, 2016</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Sonya Frost</td>
                    <td>$103,600</td>
                    <td>July 18, 2011</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>Zenaida Frank</td>
                    <td>$313,500</td>
                    <td>March 22, 2013</td>
                  </tr>
                </tbody>
              </SATable>
            </SACard.Body>
          </SACard>
        </SACol>
      </SARow>

      <SARow>
        <SACol lg={12} className="stretch-card">
          <SACard>
            <SACard.Body>
              <SACard.Title>Table with contextual classes</SACard.Title>
              <p className="text-muted mb-3">
                Add class <code>{`.table-{color}`}</code>
              </p>

              <SATable responsive bordered className="pt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Product</th>
                    <th>Salary</th>
                    <th>Start date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-info">
                    <td>1</td>
                    <td>Cedric Kelly</td>
                    <td>Photoshop</td>
                    <td>$206,850</td>
                    <td>June 21, 2010</td>
                  </tr>
                  <tr className="table-warning">
                    <td>2</td>
                    <td>Haley Kennedy</td>
                    <td>Flash</td>
                    <td>$313,500</td>
                    <td>May 15, 2013</td>
                  </tr>
                  <tr className="table-danger">
                    <td>3</td>
                    <td>Bradley Greer</td>
                    <td>Premeire</td>
                    <td>$132,000</td>
                    <td>Apr 12, 2014</td>
                  </tr>
                  <tr className="table-success">
                    <td>4</td>
                    <td>Brenden Wagner</td>
                    <td>After effects</td>
                    <td>$206,850</td>
                    <td>June 21, 2010</td>
                  </tr>
                  <tr className="table-primary">
                    <td>5</td>
                    <td>Bruno Nash</td>
                    <td>Illustrator</td>
                    <td>$163,500</td>
                    <td>January 01, 2016</td>
                  </tr>
                </tbody>
              </SATable>
            </SACard.Body>
          </SACard>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default BasicTables;
