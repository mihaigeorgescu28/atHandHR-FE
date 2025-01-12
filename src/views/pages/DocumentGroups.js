import React, { useState, useEffect } from "react";
import { Card, CardImg, CardBody, CardTitle, Button, Row, Col } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { genericErrorButtonText } from '../components/SweetAlert';


function DocumentGroups() {
  const [documentGroups, setDocumentGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_APIURL;
  const clientID = localStorage.getItem("ClientID");
  const userID = localStorage.getItem('UserID');

  useEffect(() => {
    const fetchDocumentGroups = async () => {
      try {
        const response = await axios.post(`${apiUrl}/sitemap/GroupDocumentsDataStandard`, { ClientID: clientID,  UserID: userID});
        if (response.status === 200 && response.data.DocumentGroups) {
          setDocumentGroups(response.data.DocumentGroups);
        } else {
          console.error("Failed to fetch document groups or no document groups found");
        }
      } catch (error) {
        console.error("Error fetching document groups:", error);
      } finally {
        setLoading(false); // Stop the loading state
      }
    };

    fetchDocumentGroups();
  }, [apiUrl, clientID]);

  const handleViewClick = (id) => {
    navigate(`/admin/company-documents/${id}`, { state: { documentGroupId: id } });
  };

  if (loading) {
    return <div className="text-center">Loading...</div>; // Optional loading state
  }

  return (
    <div className="content">
      {documentGroups.length > 0 ? (
        <Row>
          {documentGroups.map((group) => (
              <Col md="4" sm="6" xs="12" key={group.value} className="mb-4 d-flex align-items-stretch">
              <Card className="w-100">
                <CardBody>
                  <CardTitle>{group.label}</CardTitle>
                  <Button type = "submit" size="sm" style={{backgroundColor: '#50BCDA', color: 'white'}} color="default" onClick={() => handleViewClick(group.value)}>
                    View Documents
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#555",
          }}
        >
          No documents to show
        </div>
      )}
    </div>
  );
}

export default DocumentGroups;
