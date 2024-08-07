import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

// reactstrap components
import {
  Badge,
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap";

// Function to convert text with newlines to HTML with <br> tags
const convertNewlinesToBreaks = (text) => {
  return text.replace(/\n/g, "<br>");
};

// Function to create markup from HTML content
const createMarkup = (htmlContent) => {
  return { __html: htmlContent };
};

function NewsFeed() {
  const [latestNews, setLatestNews] = useState([]);
  const apiUrl = process.env.REACT_APP_APIURL;
  const clientId = localStorage.getItem('ClientID');

  useEffect(() => {
    // Function to fetch latest news
    const fetchLatestNews = async () => {
      try {
        const response = await axios.post(`${apiUrl}/user/viewLatestNews`, { clientId: clientId }); 
        if (response.data.success) {
          setLatestNews(response.data.news.map(newsItem => ({
            ...newsItem,
            Content: convertNewlinesToBreaks(newsItem.Content)
          })));
        } else {
          console.error('Failed to fetch latest news');
        }
      } catch (error) {
        console.error('Error fetching latest news:', error);
      }
    };

    fetchLatestNews(); // Call the function to fetch latest news when component mounts
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  return (
    <>
      <div className="content">
        <div className="header text-center">
          <h3 className="title">Latest News</h3>
        </div>
        <Row>
          <Col md="12">
            <Card className="card-timeline card-plain">
              <CardBody>
                <ul className="timeline">
                  {latestNews.map((newsItem, index) => (
                    <li key={index} className={index % 2 === 0 ? "" : "timeline-inverted"}>
                      <div className={`timeline-badge ${newsItem.Colour}`}>
                        <i className={`nc-icon ${newsItem.IconName}`} />
                      </div>
                      <div className="timeline-panel">
                        <div className="timeline-heading">
                          <Badge color={newsItem.Colour} pill style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                            {newsItem.Title}
                          </Badge>
                        </div>
                        <div className="timeline-body">
                          <p dangerouslySetInnerHTML={createMarkup(newsItem.Content)}></p>
                        </div>
                        <h6>
                          <i className="fa fa-clock-o" />
                          {newsItem.DaysSinceModified}
                        </h6>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default NewsFeed;
