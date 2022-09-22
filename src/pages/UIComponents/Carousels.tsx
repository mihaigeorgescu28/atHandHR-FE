import MainLayout from "../../components/Layout/MainLayout";
import { SACarousel, SACol, SARow } from "../../components/UI/Custom";

const ITEMS = [
  {
    img: "/placeholder.jpg",
    label: "First slide label",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    img: "/placeholder.jpg",
    label: "Second slide label",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    img: "/placeholder.jpg",
    label: "Third slide label",
    description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
  },
];

const Carousels = () => {
  const scrollTo = () => {};

  return (
    <MainLayout>
      <SARow>
        <SACol xs={10} className="main-content ps-xl-4 pe-xl-5">
          <h1 className="page-title">Carousel</h1>
          <p className="lead">
            A slideshow component for cycling through elements—images or slides of text—like a carousel. Read the{" "}
            <a href="https://ng-bootstrap.github.io/#/components/carousel/examples" target="_blank">
              Official Ng-Bootstrap Documentation
            </a>{" "}
            for a full list of instructions and other options.
          </p>

          <hr />

          <h4 /*#slidesOnly*/>Slides only</h4>
          <p className="mb-3">
            Here’s a carousel with slides only. Note the presence of the <code>.d-block</code> and <code>.w-100</code>{" "}
            on carousel images to prevent browser default image alignment.
          </p>
          <div className="example">
            <SACarousel controls={false} indicators={false}>
              {ITEMS.map(({ img, label, description }) => (
                <SACarousel.Item key={label}>
                  <img src={img} alt={label} />
                </SACarousel.Item>
              ))}
            </SACarousel>
          </div>

          <hr />

          <h4 /*#withControls*/>With controls</h4>
          <p className="mb-3">Adding in the previous and next controls:</p>
          <div className="example">
            <SACarousel indicators={false}>
              {ITEMS.map(({ img, label, description }) => (
                <SACarousel.Item key={label}>
                  <img src={img} alt={label} />
                </SACarousel.Item>
              ))}
            </SACarousel>
          </div>

          <hr />

          <h4 /*#withIndicators*/>With indicators</h4>
          <p className="mb-3">You can also add the indicators to the carousel, alongside the controls, too.</p>
          <div className="example">
            <SACarousel>
              {ITEMS.map(({ img, label, description }) => (
                <SACarousel.Item key={label}>
                  <img src={img} alt={label} />
                </SACarousel.Item>
              ))}
            </SACarousel>
          </div>

          <hr />

          <h4 /*#withCaptions*/>With captions</h4>
          <p className="mb-3">
            Add captions to your slides easily with the <code>.carousel-caption</code> element within any{" "}
            <code>.carousel-item</code>. They can be easily hidden on smaller viewports, as shown below, with optional{" "}
            <a href="https://getbootstrap.com/docs/5.1/utilities/display/" target="_blank">
              display utilities
            </a>
            . We hide them initially with <code>.d-none</code> and bring them back on medium-sized devices with{" "}
            <code>.d-md-block</code>.
          </p>
          <div className="example">
            <SACarousel>
              {ITEMS.map(({ img, label, description }) => (
                <SACarousel.Item key={label}>
                  <img src={img} alt={label} />
                  <SACarousel.Caption>
                    <h3>{label}</h3>
                    <p>{description}</p>
                  </SACarousel.Caption>
                </SACarousel.Item>
              ))}
            </SACarousel>
          </div>

          <hr />

          <h4 /*#crossfade*/>Crossfade</h4>
          <p className="mb-3">
            Add <code>.carousel-fade</code> class to your <code>ngb-carousel</code> to animate slides with a fade
            transition instead of a slide.
          </p>
          <div className="example">
            <SACarousel fade>
              {ITEMS.map(({ img, label, description }) => (
                <SACarousel.Item key={label}>
                  <img src={img} alt={label} />
                </SACarousel.Item>
              ))}
            </SACarousel>
          </div>
        </SACol>
        <SACol xl={2} className="content-nav-wrapper">
          <ul className="nav content-nav d-flex flex-column">
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Slides only
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                With controls
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                With indicators
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                With captions
              </a>
            </li>
            <li className="nav-item">
              <a onClick={scrollTo} className="nav-link">
                Crossfade
              </a>
            </li>
          </ul>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default Carousels;
