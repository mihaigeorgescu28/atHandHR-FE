import MainLayout from "../../components/Layout/MainLayout";
import { SACol, SANav, SANavDropdown, SARow, SATab } from "../../components/UI/Custom";

const Navs = () => {
  const scrollTo = () => {};
  return (
    <MainLayout>
      <SARow>
        <SACol xl={10} className="main-content ps-xl-4 pe-xl-5">
          <h1 className="page-title">Navs</h1>
          <p className="lead">
            Documentation and examples for how to use Bootstrap’s included navigation components. Read the{" "}
            <a href="https://ng-bootstrap.github.io/#/components/nav/examples" target="_blank">
              Official Ng-Bootstrap Documentation
            </a>{" "}
            for a full list of instructions and other options.
          </p>
          <hr />
          <h4 /*#default*/>Basic example</h4>
          <div className="example">
            <SATab.Container defaultActiveKey="1">
              <SANav variant="tabs">
                <SANav.Item>
                  <SANav.Link eventKey="1">One</SANav.Link>
                </SANav.Item>
                <SANav.Item>
                  <SANav.Link eventKey="2">Two</SANav.Link>
                </SANav.Item>
                <SANav.Item>
                  <SANav.Link eventKey="3">Three</SANav.Link>
                </SANav.Item>
              </SANav>
              <SATab.Content className="border border-top-0 p-3">
                <SATab.Pane eventKey="1">
                  <p>
                    Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua,
                    retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica.
                    Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry
                    richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american
                    apparel, butcher voluptate nisi qui.
                  </p>
                </SATab.Pane>
                <SATab.Pane eventKey="2">
                  <p>
                    Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko
                    farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip
                    jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna
                    delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan
                    fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry
                    richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus
                    tattooed echo park.
                  </p>
                </SATab.Pane>
                <SATab.Pane eventKey="3">
                  <p>
                    Sed commodo, leo at suscipit dictum, quam est porttitor sapien, eget sodales nibh elit id diam.
                    Nulla facilisi. Donec egestas ligula vitae odio interdum aliquet. Duis lectus turpis, luctus eget
                    tincidunt eu, congue et odio. Duis pharetra et nisl at faucibus. Quisque luctus pulvinar arcu, et
                    molestie lectus ultrices et. Sed diam urna, egestas ut ipsum vel, volutpat volutpat neque. Praesent
                    fringilla tortor arcu. Vivamus faucibus nisl enim, nec tristique ipsum euismod facilisis. Morbi ut
                    bibendum est, eu tincidunt odio. Orci varius natoque penatibus et magnis dis parturient montes,
                    nascetur ridiculus mus. Mauris aliquet odio ac lorem aliquet ultricies in eget neque. Phasellus nec
                    tortor vel tellus pulvinar feugiat.
                  </p>
                </SATab.Pane>
              </SATab.Content>
            </SATab.Container>
          </div>
          <hr />
          <h4 /*#HAlignment*/>Horizontal alignment</h4>
          <p className="mb-3">
            Change the horizontal alignment of your nav with flexbox utilities. By default, navs are left-aligned, but
            you can easily change them to center or right aligned.
          </p>
          <div className="example">
            <SATab.Container defaultActiveKey="1">
              <SANav variant="tabs" className="justify-content-center">
                <SANav.Item>
                  <SANav.Link eventKey="1">Home</SANav.Link>
                </SANav.Item>
                <SANav.Item>
                  <SANav.Link eventKey="2">Profile</SANav.Link>
                </SANav.Item>
                <SANav.Item>
                  <SANav.Link eventKey="3">Contact</SANav.Link>
                </SANav.Item>
                <SANav.Item>
                  <SANav.Link eventKey="4" disabled>
                    Disabled
                  </SANav.Link>
                </SANav.Item>
              </SANav>
              <SATab.Content className="border border-top-0 p-3">
                <SATab.Pane eventKey="1">
                  <p>
                    Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua,
                    retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica.
                  </p>
                </SATab.Pane>
                <SATab.Pane eventKey="2">
                  <p>
                    Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko
                    farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip
                    jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna
                    delectus mollit.
                  </p>
                </SATab.Pane>
                <SATab.Pane eventKey="3">
                  <p>
                    Sed commodo, leo at suscipit dictum, quam est porttitor sapien, eget sodales nibh elit id diam.
                    Nulla facilisi. Donec egestas ligula vitae odio interdum aliquet. Duis lectus turpis, luctus eget
                    tincidunt eu, congue et odio. Duis pharetra et nisl at faucibus.
                  </p>
                </SATab.Pane>
                <SATab.Pane eventKey="4">
                  <p>Sed commodo, leo at suscipit dictum, quam est porttitor sapien, eget sodales nibh elit id diam.</p>
                </SATab.Pane>
              </SATab.Content>
            </SATab.Container>
          </div>
          <br />
          <div className="example">
            <SATab.Container defaultActiveKey="1">
              <SANav variant="tabs" className="justify-content-end">
                <SANav.Item>
                  <SANav.Link eventKey="1">Home</SANav.Link>
                </SANav.Item>
                <SANav.Item>
                  <SANav.Link eventKey="2">Profile</SANav.Link>
                </SANav.Item>
                <SANav.Item>
                  <SANav.Link eventKey="3">Contact</SANav.Link>
                </SANav.Item>
                <SANav.Item>
                  <SANav.Link eventKey="4" disabled>
                    Disabled
                  </SANav.Link>
                </SANav.Item>
              </SANav>
              <SATab.Content className="border border-top-0 p-3">
                <SATab.Pane eventKey="1">
                  <p>
                    Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua,
                    retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica.
                  </p>
                </SATab.Pane>
                <SATab.Pane eventKey="2">
                  <p>
                    Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko
                    farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip
                    jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna
                    delectus mollit.
                  </p>
                </SATab.Pane>
                <SATab.Pane eventKey="3">
                  <p>
                    Sed commodo, leo at suscipit dictum, quam est porttitor sapien, eget sodales nibh elit id diam.
                    Nulla facilisi. Donec egestas ligula vitae odio interdum aliquet. Duis lectus turpis, luctus eget
                    tincidunt eu, congue et odio. Duis pharetra et nisl at faucibus.
                  </p>
                </SATab.Pane>
                <SATab.Pane eventKey="4">
                  <p>Sed commodo, leo at suscipit dictum, quam est porttitor sapien, eget sodales nibh elit id diam.</p>
                </SATab.Pane>
              </SATab.Content>
            </SATab.Container>
          </div>
          <hr />
          <h4 /*#VAlignment*/>Vertical alignment</h4>
          <div className="example">
            <SATab.Container defaultActiveKey="1">
              <SARow>
                <SACol md={3} className="pe-0">
                  <SANav variant="tabs" className="flex-column">
                    <SANav.Item>
                      <SANav.Link eventKey="1">Home</SANav.Link>
                    </SANav.Item>
                    <SANav.Item>
                      <SANav.Link eventKey="2">Profile</SANav.Link>
                    </SANav.Item>
                    <SANav.Item>
                      <SANav.Link eventKey="3">Contact</SANav.Link>
                    </SANav.Item>
                    <SANav.Item>
                      <SANav.Link eventKey="4" disabled>
                        Disabled
                      </SANav.Link>
                    </SANav.Item>
                  </SANav>
                </SACol>
                <SACol md={9} className="ps-0">
                  <SATab.Content className="border p-3 tab-content-vertical">
                    <SATab.Pane eventKey="1">
                      <p>
                        Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua,
                        retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica.
                      </p>
                    </SATab.Pane>
                    <SATab.Pane eventKey="2">
                      <p>
                        Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four
                        loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk
                        aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore
                        aesthetic magna delectus mollit.
                      </p>
                    </SATab.Pane>
                    <SATab.Pane eventKey="3">
                      <p>
                        Sed commodo, leo at suscipit dictum, quam est porttitor sapien, eget sodales nibh elit id diam.
                        Nulla facilisi. Donec egestas ligula vitae odio interdum aliquet. Duis lectus turpis, luctus
                        eget tincidunt eu, congue et odio. Duis pharetra et nisl at faucibus.
                      </p>
                    </SATab.Pane>
                    <SATab.Pane eventKey="4">
                      <p>
                        Sed commodo, leo at suscipit dictum, quam est porttitor sapien, eget sodales nibh elit id diam.
                      </p>
                    </SATab.Pane>
                  </SATab.Content>
                </SACol>
              </SARow>
            </SATab.Container>
          </div>
          <hr />
          <h4 /*#fillJustify*/>Fill and justify</h4>
          <div className="example">
            <SATab.Container defaultActiveKey="1">
              <SANav variant="tabs" fill>
                <SANav.Item>
                  <SANav.Link eventKey="1">Home</SANav.Link>
                </SANav.Item>
                <SANav.Item>
                  <SANav.Link eventKey="2">Profile</SANav.Link>
                </SANav.Item>
                <SANav.Item>
                  <SANav.Link eventKey="3">Contact</SANav.Link>
                </SANav.Item>
                <SANav.Item>
                  <SANav.Link eventKey="4" disabled>
                    Disabled
                  </SANav.Link>
                </SANav.Item>
              </SANav>
              <SATab.Content className="border border-top-0 p-3">
                <SATab.Pane eventKey="1">
                  <p>
                    Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua,
                    retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica.
                  </p>
                </SATab.Pane>
                <SATab.Pane eventKey="2">
                  <p>
                    Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko
                    farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip
                    jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna
                    delectus mollit.
                  </p>
                </SATab.Pane>
                <SATab.Pane eventKey="3">
                  <p>
                    Sed commodo, leo at suscipit dictum, quam est porttitor sapien, eget sodales nibh elit id diam.
                    Nulla facilisi. Donec egestas ligula vitae odio interdum aliquet. Duis lectus turpis, luctus eget
                    tincidunt eu, congue et odio. Duis pharetra et nisl at faucibus.
                  </p>
                </SATab.Pane>
                <SATab.Pane eventKey="4">
                  <p>Sed commodo, leo at suscipit dictum, quam est porttitor sapien, eget sodales nibh elit id diam.</p>
                </SATab.Pane>
              </SATab.Content>
            </SATab.Container>
          </div>
          <hr />
          <h4 /*#tabsDropdown*/>Tabs with dropdowns</h4>
          <div className="example">
            <SATab.Container defaultActiveKey="1">
              <SANav variant="tabs">
                <SANav.Item>
                  <SANav.Link eventKey="1">Home</SANav.Link>
                </SANav.Item>
                <SANav.Item>
                  <SANav.Link eventKey="2">Profile</SANav.Link>
                </SANav.Item>
                <SANavDropdown title="Dropdown">
                  <SANavDropdown.Item>Action</SANavDropdown.Item>
                  <SANavDropdown.Item>Another action</SANavDropdown.Item>
                  <SANavDropdown.Item>Something else here</SANavDropdown.Item>
                  <SANavDropdown.Divider />
                  <SANavDropdown.Item>Separated link</SANavDropdown.Item>
                </SANavDropdown>
                <SANav.Item>
                  <SANav.Link eventKey="4" disabled>
                    Disabled
                  </SANav.Link>
                </SANav.Item>
              </SANav>
              <SATab.Content className="border border-top-0 p-3">
                <SATab.Pane eventKey="1">
                  <p>
                    Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua,
                    retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica.
                  </p>
                </SATab.Pane>
                <SATab.Pane eventKey="2">
                  <p>
                    Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko
                    farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip
                    jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna
                    delectus mollit.
                  </p>
                </SATab.Pane>
                <SATab.Pane eventKey="4">
                  <p>Sed commodo, leo at suscipit dictum, quam est porttitor sapien, eget sodales nibh elit id diam.</p>
                </SATab.Pane>
              </SATab.Content>
            </SATab.Container>
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
                Horizontal alignment
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Vertical alignment
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Fill and justify
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Tabs with dropdowns
              </a>
            </li>{" "}
          </ul>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default Navs;
