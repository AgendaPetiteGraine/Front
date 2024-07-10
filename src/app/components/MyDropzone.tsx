import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

// Définir l'interface pour les props du composant
interface MyDropzoneProps {
  setPictures: (files: File[]) => void; // Fonction pour mettre à jour les fichiers
}

// Définir le composant fonctionnel avec les props typées
const MyDropzone: React.FC<MyDropzoneProps> = ({ setPictures }) => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]); // État pour les fichiers acceptés
  const [preview, setPreview] = useState<string[]>([]);

  // Fonction de gestion des fichiers déposés
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const picturesTab = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreview(picturesTab); // Mettre à jour les prévisualisations
      setPictures(acceptedFiles); // Mettre à jour les fichiers
      setAcceptedFiles(acceptedFiles); // Mettre à jour l'état local des fichiers acceptés
    },
    [setPreview, setPictures]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input {...getInputProps()} />
      <p>Faire glisser les fichiers ici ou cliquer pour les ajouter</p>
      {acceptedFiles.length > 0 && (
        <div>
          <h4>Fichiers:</h4>
          <ul>
            {preview.map((file, index) => (
              <img
                key={index}
                src={file}
                alt={file}
                style={{
                  width: "250px",
                  height: "200px",
                  objectFit: "cover",
                  borderBottom: "1px solid black",
                }}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyDropzone;
