import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Button, Row, Col } from "reactstrap";
import { genericErrorButtonText } from '../components/SweetAlert';
import axios from "axios";
import { useLocation } from "react-router-dom";

function MyDocuments() {
  const [loading, setLoading] = useState(true); // Default to true since data will load initially
  const [documents, setDocuments] = useState([]); // To store fetched documents
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const apiUrl = process.env.REACT_APP_APIURL; // Base API URL from environment variable
  const clientID = localStorage.getItem("ClientID");
  const userID = localStorage.getItem("UserID");

  const location = useLocation();
  const documentGroupId = location.state?.documentGroupId; 

  const hideAlert = () => {
    setShowErrorAlert(false);
  };

  const fetchDocumentsOnLoad = async () => {
    console.log("Fetching documents on page load...");
    try {
      axios.defaults.withCredentials = true;

      const response = await axios.post(`${apiUrl}/sitemap/CompanyDocumentsDataStandard`, {
        ClientID: clientID,
        DocumentGroupID : documentGroupId,
        UserID: userID
      });

      console.log("API Response:", response.data); // Debug log

      if (response.status === 200 && response.data.result) {
        setDocuments(response.data.result); // Store fetched documents
      } else {
        console.error("No documents found.");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false); // Stop loading after the API call completes
    }
  };

  useEffect(() => {
    fetchDocumentsOnLoad(); // Call the API as soon as the component mounts
  }, []);

  const handleViewClick = (fileName) => {
    if (!fileName) {
      console.error("Invalid file name.");
      setShowErrorAlert(true);
      return;
    }
    const fileUrl = `${apiUrl}/user_uploads/${clientID}/company_documents/${fileName}`;
    
    window.open(fileUrl, "_blank");
  };
  return (
    <div className="content">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <Row>
          {documents.length > 0 ? (
            documents.map((doc) => (
              <Col md="4" sm="6" xs="12" key={doc.CompanyDocumentID} className="mb-4 d-flex align-items-stretch">
        <Card className="w-100">
                  <CardBody>
                    <CardTitle>{doc.CompanyDocumentName}</CardTitle>
                    <Button
                      type = "submit"
                      color="default"
                      style={{backgroundColor: '#50BCDA', color: 'white'}}
                      size="sm"
                      onClick={() => handleViewClick(doc.FileName)} // Pass the file name to the handler
                    >
                      Open Document
                    </Button>
                  </CardBody>
                  </Card>
                   {showErrorAlert && genericErrorButtonText(hideAlert, hideAlert, "Invalid file detected. Please reach out to your administrator for assistance.")}
      </Col>
            ))
          ) : (
            <div  className="text-center" style={{ width: "100%" }}>
              No documents available.
            </div>
          )}
        </Row>
      )}
    </div>
  );
}

export default MyDocuments;
