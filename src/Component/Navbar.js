import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DocumentUpload = () => {
  const [applications, setApplications] = useState(["Application_1"]);
  const [selectedApplication, setSelectedApplication] = useState("Application_1");
  const [applicationDocuments, setApplicationDocuments] = useState({
    Application_1: ["Document_1"],
  });
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(0);

  const handleAddApplication = () => {
    const newAppIndex = applications.length + 1;
    const newApplication = `Application_${newAppIndex}`;
    setApplications([...applications, newApplication]);
    setSelectedApplication(newApplication);

    setApplicationDocuments((prev) => ({
      ...prev,
      [newApplication]: [],
    }));
    setSelectedDocumentIndex(0);
  };

  const handleAddDocument = () => {
    setApplicationDocuments((prev) => {
      const updatedDocs = [
        ...(prev[selectedApplication] || []),
        `Document_${(prev[selectedApplication]?.length || 0) + 1}`,
      ];
      return {
        ...prev,
        [selectedApplication]: updatedDocs,
      };
    });
  };

  const handleDeleteApplication = (app) => {
    const updatedApplications = applications.filter((application) => application !== app);
    setApplications(updatedApplications);

    setApplicationDocuments((prev) => {
      const { [app]: _, ...rest } = prev;
      return rest;
    });

    if (app === selectedApplication && updatedApplications.length > 0) {
      setSelectedApplication(updatedApplications[0]);
      setSelectedDocumentIndex(0);
    } else if (updatedApplications.length === 0) {
      setSelectedApplication(null);
      setSelectedDocumentIndex(0);
    }
  };

  const handleDeleteDocument = (doc) => {
    setApplicationDocuments((prev) => {
      const updatedDocs = (prev[selectedApplication] || []).filter((document) => document !== doc);
      return {
        ...prev,
        [selectedApplication]: updatedDocs,
      };
    });

    if (applicationDocuments[selectedApplication]?.length === 1) {
      setSelectedDocumentIndex(0);
    }
  };

  const handleApplicationClick = (app) => {
    setSelectedApplication(app);
    setSelectedDocumentIndex(0);
  };

  const handleNext = () => {
    const docs = applicationDocuments[selectedApplication] || [];
    if (selectedDocumentIndex < docs.length - 1) {
      setSelectedDocumentIndex(selectedDocumentIndex + 1);
    } else {
      const currentAppIndex = applications.indexOf(selectedApplication);
      if (currentAppIndex < applications.length - 1) {
        const nextApp = applications[currentAppIndex + 1];
        setSelectedApplication(nextApp);
        setSelectedDocumentIndex(0);
      }
    }
  };

  const handleBack = () => {
    if (selectedDocumentIndex > 0) {
      setSelectedDocumentIndex(selectedDocumentIndex - 1);
    } else {
      const currentAppIndex = applications.indexOf(selectedApplication);
      if (currentAppIndex > 0) {
        const prevApp = applications[currentAppIndex - 1];
        setSelectedApplication(prevApp);
        const prevAppDocs = applicationDocuments[prevApp] || [];
        setSelectedDocumentIndex(prevAppDocs.length - 1);
      }
    }
  };

  const selectedDocuments = applicationDocuments[selectedApplication] || [];
  const selectedDocument =
    selectedDocuments.length > 0 ? selectedDocuments[selectedDocumentIndex] : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          {applications.map((app, index) => (
            <div key={index} style={{ display: "inline-flex", alignItems: "center", marginRight: "10px" }}>
              <button
                onClick={() => handleApplicationClick(app)}
                style={{
                  padding: "10px",
                  backgroundColor: selectedApplication === app ? "#d6d6d6" : "white",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                {app}
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: "red", marginLeft: "5px", cursor: "pointer" }}
                  onClick={() => handleDeleteApplication(app)}
                />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={handleAddApplication}
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Application
        </button>
      </div>

      <div style={{ display: "flex", flexGrow: 1 }}>
        <div style={{ width: "200px", marginRight: "20px" }}>
          {selectedDocuments.map((doc, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <button
                onClick={() => console.log(`Selected document: ${doc}`)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  width: "100%",
                  backgroundColor: selectedDocument === doc ? "#d6d6d6" : "white",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ flexGrow: 1 }}>{doc}</span>
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: "red", marginLeft: "10px", cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteDocument(doc);
                  }}
                />
              </button>
            </div>
          ))}
          <button
            onClick={handleAddDocument}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px",
              border: "none",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Add Document
          </button>
        </div>

        {selectedDocument && (
          <div style={{ flexGrow: 1, textAlign: "center", border: "1px solid #ccc", padding: "20px" }}>
            <p style={{ marginBottom: "20px" }}>
              Upload File for {selectedApplication} - {selectedDocument}
            </p>
            <input type="file" />
          </div>
        )}
      </div>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handleBack}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
          disabled={!selectedApplication || selectedDocuments.length === 0}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
          }}
          disabled={!selectedApplication || selectedDocuments.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;
