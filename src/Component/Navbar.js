import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DocumentUpload = () => {
  const [applications, setApplications] = useState(["Application_1"]);


  const [selectapp, setselectapp] = useState();


  const [selectappdoc, setselectappdoc] = useState({
    Application_1: [],
  });
  const [selectdoc, setselectdoc] = useState(0);

  const addfunction = () => {
    const newAppIndex = applications.length + 1;

    const newApplication = `Application_${newAppIndex}`;

    setApplications([...applications, newApplication]);

    setselectapp(newApplication);

    setselectappdoc((prev) => ({
      ...prev,
      [newApplication]: [],
    }));
    setselectdoc(0);
  };

  const adddoc = () => {

    setselectappdoc((prev) => {

      const updatedDocs = [

        ...(prev[selectapp] || []),

        `Document_${(prev[selectapp]?.length || 0) + 1}`,

      ];
      return {
        ...prev,

        [selectapp]: updatedDocs,

      };
    });
  };

  const deletebutton = (app) => {
    const updatedApplications = applications.filter((application) => application !== app);

    setApplications(updatedApplications);

    setselectappdoc((prev) => {
      const { [app]: _, ...rest } = prev;
      return rest;
    });

    if (app === selectapp && updatedApplications.length > 0) {

      setselectapp(updatedApplications[0]);

      setselectdoc(0);

    } else if (updatedApplications.length === 0) {

      setselectapp(null);

      setselectdoc(0);
    }
  };

  const deldoc = (doc) => {
    setselectappdoc((prev) => {
      const updatedDocs = (prev[selectapp] || []).filter((document) => document !== doc);
      return {
        ...prev,
        [selectapp]: updatedDocs,
      };
    });

    if (selectappdoc[selectapp]?.length === 1) {
      setselectdoc(0);
    }
  };

  const handle1 = (app) => {
    setselectapp(app);
    setselectdoc(0);
  };

  const next = () => {
    const docs = selectappdoc[selectapp] || [];

    if (selectdoc < docs.length - 1) {

      setselectdoc(selectdoc + 1);
    } else {
      const temp1 = applications.indexOf(selectapp);

      if (temp1 < applications.length - 1) {

        const nextApp = applications[temp1 + 1];

        setselectapp(nextApp);

        setselectdoc(0);
      }
    }
  };

  const back = () => {
    if (selectdoc > 0) {
      setselectdoc(selectdoc - 1); 
    } else {
      const currentAppIndex = applications.indexOf(selectapp);
      if (currentAppIndex > 0) {
        const previousApp = applications[currentAppIndex - 1]; 
        setselectapp(previousApp);
  
        const previousAppDocs = selectappdoc[previousApp] || [];
        setselectdoc(previousAppDocs.length > 0 ? previousAppDocs.length - 1 : 0); 
      }
    }
  };
  

  const selectedDocuments = selectappdoc[selectapp] || [];



  const selectedDocument =
    selectedDocuments.length > 0 ? selectedDocuments[selectdoc] : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          {applications.map((app, index) => (
            <div key={index} style={{ display: "inline-flex", alignItems: "center", marginRight: "10px" }}>
              <button
                onClick={() => handle1(app)}
                style={{
                  padding: "10px",
                  backgroundColor: selectapp === app ? "#d6d6d6" : "white",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                {app}
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: "red", marginLeft: "5px", cursor: "pointer" }}
                  onClick={() => deletebutton(app)}
                />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addfunction}
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

                    deldoc(doc);
                  }}
                />
              </button>
            </div>
          ))}
          <button
            onClick={adddoc}
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
              Upload File for {selectapp} - {selectedDocument}
            </p>
            <input type="file" />
          </div>
        )}
      </div>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={back}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
          disabled={!selectapp || selectedDocuments.length === 0}
        >
          Back
        </button>
        <button
          onClick={next}
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
          }}
          disabled={!selectapp || selectedDocuments.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;
