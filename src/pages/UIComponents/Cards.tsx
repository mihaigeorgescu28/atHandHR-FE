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
  SACard,
  SAListGroup,
  SANav,
  SACardGroup,
} from "../../components/UI/Custom";

const VARIANTS = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"];

const Cards = () => {
  const scrollTo = () => {};
  const [checked, setChecked] = useState(true);
  const [radioValue, setRadioValue] = useState(1);

  return (
    <MainLayout>
      <SARow>
        <SACol xl={10} className="col-xl-10 main-content ps-xl-4 pe-xl-5">
          <h1 className="page-title">Cards</h1>
          <p className="lead">
            A flexible and extensible content container with multiple variants and options. Read the{" "}
            <a href="https://getbootstrap.com/docs/5.1/components/SAcard/" target="_blank">
              Official Bootstrap Documentation
            </a>{" "}
            for a full list of instructions and other options.
          </p>

          <hr />

          <h4 /*#default*/>Basic Example</h4>
          <p className="mb-3">
            Below is an example of a basic card with mixed content and a fixed width. Cards have no fixed width to
            start, so they’ll naturally fill the full width of its parent element. This is easily customized with our
            various{" "}
            <a className="text-primary" onClick={scrollTo}>
              sizing options
            </a>
            .
          </p>
          <div className="example">
            <SARow>
              <SACol md={6} xl={4}>
                <SACard>
                  <SACard.Img variant="top" src="/placeholder.jpg" />
                  <SACard.Body>
                    <SACard.Title>Card Title</SACard.Title>
                    <SACard.Text className="mb-3">
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </SACard.Text>
                    <SAButton>Go somewhere</SAButton>
                  </SACard.Body>
                </SACard>
              </SACol>
            </SARow>
          </div>

          <hr />

          <h4 /*#contents*/>Content types</h4>
          <p className="mb-3">
            Cards support a wide variety of content, including images, text, list groups, links, and more. Below are
            examples of what’s supported.
          </p>
          <h4 id="body">Body</h4>
          <p className="mb-3">
            The building block of a card is the <code>.card-body</code>. Use it whenever you need a padded section
            within a card.
          </p>
          <div className="example">
            <SARow>
              <SACol md={6} xl={4}>
                <SACard>
                  <SACard.Body>This is some text within a card body.</SACard.Body>
                </SACard>
              </SACol>
            </SARow>
          </div>

          <h4 id="title-text-link">Titles, text, and links</h4>
          <p className="mb-3">
            Subtitles are used by adding a <code>.card-subtitle</code> to a <code>&lt;h*&gt;</code> tag. If the{" "}
            <code>.card-title</code> and the <code>.card-subtitle</code> items are placed in a <code>.card-body</code>{" "}
            item, the card title and subtitle are aligned nicely.
          </p>
          <div className="example">
            <SARow>
              <SACol md={6} xl={4}>
                <SACard>
                  <SACard.Body>
                    <SACard.Title>Card Title</SACard.Title>
                    <SACard.Subtitle className="mb-2 text-muted">Card Subtitle</SACard.Subtitle>
                    <SACard.Text className="mb-3">
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </SACard.Text>
                    <SACard.Link href="#">Card Link</SACard.Link>
                    <SACard.Link href="#">Another Link</SACard.Link>
                  </SACard.Body>
                </SACard>
              </SACol>
            </SARow>
          </div>

          <h4 id="images">Images</h4>
          <p className="mb-3">
            <code>.card-img-top</code> places an image to the top of the card. With <code>.card-text</code>, text can be
            added to the card. Text within <code>.card-text</code> can also be styled with the standard HTML tags.
          </p>
          <div className="example">
            <SARow>
              <SACol md={6} xl={4} className="grid-margin grid-margin-md-0">
                <SACard>
                  <SACard.Img variant="top" src="/placeholder.jpg" />
                  <SACard.Body>
                    <SACard.Text>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </SACard.Text>
                  </SACard.Body>
                </SACard>
              </SACol>
              <SACol md={6} xl={4}>
                <SACard>
                  <SACard.Body>
                    <SACard.Text>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </SACard.Text>
                  </SACard.Body>
                  <SACard.Img variant="bottom" src="/placeholder.jpg" />
                </SACard>
              </SACol>
            </SARow>
          </div>

          <h4 id="list-groups">List groups</h4>
          <p className="mb-3">Create lists of content in a card with a flush list group.</p>
          <div className="example">
            <SARow>
              <SACol md={6} xl={4}>
                <SACard>
                  <SAListGroup variant="flush">
                    <SAListGroup.Item>Cras justo odio</SAListGroup.Item>
                    <SAListGroup.Item>Dapibus ac facilisis in</SAListGroup.Item>
                    <SAListGroup.Item>Vestibulum at eros</SAListGroup.Item>
                  </SAListGroup>
                </SACard>
              </SACol>
            </SARow>
          </div>
          <br />
          <div className="example">
            <SARow>
              <SACol md={6} xl={4}>
                <SACard>
                  <SACard.Header>Featured</SACard.Header>
                  <SAListGroup variant="flush">
                    <SAListGroup.Item>Cras justo odio</SAListGroup.Item>
                    <SAListGroup.Item>Dapibus ac facilisis in</SAListGroup.Item>
                    <SAListGroup.Item>Vestibulum at eros</SAListGroup.Item>
                  </SAListGroup>
                </SACard>
              </SACol>
            </SARow>
          </div>

          <hr />

          <h4 /*#headerFooter*/>Header & Footer</h4>
          <p className="mb-3">Add an optional header and/or footer within a card.</p>
          <div className="example">
            <SARow>
              <SACol md={6} xl={4}>
                <SACard>
                  <SACard.Header>Card header</SACard.Header>
                  <SACard.Body>
                    <SACard.Title>Special title treatment</SACard.Title>
                    <SACard.Text className="mb-3">
                      With supporting text below as a natural lead-in to additional content.
                    </SACard.Text>
                    <SAButton>Go somewhere</SAButton>
                  </SACard.Body>
                </SACard>
              </SACol>
              <SACol md={6} xl={4}>
                <SACard>
                  <SACard.Body>
                    <SACard.Title>Special title treatment</SACard.Title>
                    <SACard.Text className="mb-3">
                      With supporting text below as a natural lead-in to additional content.
                    </SACard.Text>
                    <SAButton>Go somewhere</SAButton>
                  </SACard.Body>
                  <SACard.Footer>Card footer</SACard.Footer>
                </SACard>
              </SACol>
            </SARow>
          </div>

          <hr />

          <h4 /*#sizing*/>Sizing</h4>
          <p className="mb-3">
            Cards assume no specific <code>width</code> to start, so they’ll be 100% wide unless otherwise stated. You
            can change this as needed with custom CSS, grid classes, grid Sass mixins, or utilities.
          </p>
          <div className="example">
            <SARow>
              <SACol md={4} xl={6}>
                <SACard>
                  <SACard.Body>
                    <SACard.Title>Special title treatment</SACard.Title>
                    <SACard.Text className="mb-3">
                      With supporting text below as a natural lead-in to additional content.
                    </SACard.Text>
                    <SAButton>Go somewhere</SAButton>
                  </SACard.Body>
                </SACard>
              </SACol>
              <SACol md={6} xl={4}>
                <SACard>
                  <SACard.Body>
                    <SACard.Title>Special title treatment</SACard.Title>
                    <SACard.Text className="mb-3">
                      With supporting text below as a natural lead-in to content.
                    </SACard.Text>
                    <SAButton>Go somewhere</SAButton>
                  </SACard.Body>
                </SACard>
              </SACol>
            </SARow>
          </div>

          <hr />

          <h4 /*#cardNavigation*/>Card navigation</h4>
          <p className="mb-3">Add some navigation to a card’s header (or block) with Bootstrap’s nav components.</p>
          <div className="example">
            <SACard className="text-center">
              <SACard.Header>
                <SANav variant="tabs" defaultActiveKey="#first">
                  <SANav.Item>
                    <SANav.Link href="#first">Active</SANav.Link>
                  </SANav.Item>
                  <SANav.Item>
                    <SANav.Link href="#link">Link</SANav.Link>
                  </SANav.Item>
                  <SANav.Item>
                    <SANav.Link href="#disabled" disabled>
                      Disabled
                    </SANav.Link>
                  </SANav.Item>
                </SANav>
              </SACard.Header>
              <SACard.Body>
                <SACard.Title>Special title treatment</SACard.Title>
                <SACard.Text className="mb-3">
                  With supporting text below as a natural lead-in to additional content.
                </SACard.Text>
                <SAButton variant="primary">Go somewhere</SAButton>
              </SACard.Body>
            </SACard>
          </div>

          <hr />

          <h4 /*#imageOverlay*/>Image overlay</h4>
          <p className="mb-3">
            Turn an image into a card background and overlay your card’s text. Depending on the image, you may or may
            not need additional styles or utilities.
          </p>
          <div className="example">
            <SARow>
              <SACol md={6}>
                <SACard text="light">
                  <SACard.Img src="/placeholder.jpg" alt="Card image" />
                  <SACard.ImgOverlay>
                    <SACard.Title>Card title</SACard.Title>
                    <SACard.Text>
                      This is a wider card with supporting text below as a natural lead-in to additional content. This
                      content is a little bit longer.
                    </SACard.Text>
                    <SACard.Text>Last updated 3 mins ago</SACard.Text>
                  </SACard.ImgOverlay>
                </SACard>
              </SACol>
            </SARow>
          </div>

          <hr />

          <h4 /*#bgColor*/>Background Color</h4>
          <p className="mb-3">
            Use{" "}
            <a href="https://getbootstrap.com/docs/5.1/utilities/colors/" target="_blank">
              text color
            </a>{" "}
            and{" "}
            <a href="https://getbootstrap.com/docs/5.1/utilities/background/" target="_blank">
              background utilities
            </a>{" "}
            to change the appearance of a card.
          </p>
          <div className="example">
            <SARow>
              {VARIANTS.map((variant, index) => (
                <SACol key={index} md={6} className="grid-margin">
                  <SACard bg={variant} text={variant === "light" ? "dark" : "white"}>
                    <SACard.Header>Header</SACard.Header>
                    <SACard.Body>
                      <SACard.Title>{variant} Card title</SACard.Title>
                      <SACard.Text>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                      </SACard.Text>
                    </SACard.Body>
                  </SACard>
                </SACol>
              ))}
            </SARow>
          </div>

          <hr />

          <h4 /*#cardGroup*/>Card groups</h4>
          <p className="mb-3">
            Use card groups to render cards as a single, attached element with equal width and height columns. Card
            groups use <code>display: flex;</code> to achieve their uniform sizing.
          </p>
          <div className="example">
            <SACardGroup>
              <SACard>
                <SACard.Img variant="top" src="/placeholder.jpg" />
                <SACard.Body>
                  <SACard.Title>Card title</SACard.Title>
                  <SACard.Text>
                    This is a wider card with supporting text below as a natural lead-in to additional content. This
                    content is a little bit longer.
                  </SACard.Text>
                  <SACard.Text>
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </SACard.Text>
                </SACard.Body>
              </SACard>
              <SACard>
                <SACard.Img variant="top" src="/placeholder.jpg" />
                <SACard.Body>
                  <SACard.Title>Card title</SACard.Title>
                  <SACard.Text>
                    This card has supporting text below as a natural lead-in to additional content.{" "}
                  </SACard.Text>
                  <SACard.Text>
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </SACard.Text>
                </SACard.Body>
              </SACard>
              <SACard>
                <SACard.Img variant="top" src="/placeholder.jpg" />
                <SACard.Body>
                  <SACard.Title>Card title</SACard.Title>
                  <SACard.Text>
                    This is a wider card with supporting text below as a natural lead-in to additional content. This
                    card has even longer content than the first to show that equal height action.
                  </SACard.Text>
                  <SACard.Text>
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </SACard.Text>
                </SACard.Body>
              </SACard>
            </SACardGroup>
          </div>

          <hr />

          <h4 /*#grid*/>Grid cards</h4>
          <p className="mb-3">
            Use the Bootstrap grid system and its{" "}
            <a href="https://getbootstrap.com/docs/5.1/layout/grid/#row-columns" target="_blank">
              <code>.row-cols</code> classes
            </a>
            to control how many grid columns (wrapped around your cards) you show per row. For example, here’s{" "}
            <code>.row-cols-1</code> laying out the cards on one column, and <code>.row-cols-md-2</code> splitting four
            cards to equal width across multiple rows, from the medium breakpoint up.
          </p>
          <div className="example">
            <SARow xs={1} md={2} className="g-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <SACol>
                  <SACard>
                    <SACard.Img variant="top" src="/placeholder.jpg" />
                    <SACard.Body>
                      <SACard.Title>Card title</SACard.Title>
                      <SACard.Text>
                        This is a longer card with supporting text below as a natural lead-in to additional content.
                        This content is a little bit longer.
                      </SACard.Text>
                    </SACard.Body>
                  </SACard>
                </SACol>
              ))}
            </SARow>
          </div>
        </SACol>
        <SACol xl={2} className="content-nav-wrapper">
          <ul className="nav content-nav d-flex flex-column">
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Basic Example
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Content types
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Header and footer
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Sizing
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Card navigation
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Image overlay
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Background color
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Card groups
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Grid cards
              </a>
            </li>
          </ul>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default Cards;
