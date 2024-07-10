// import React, { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import Cropper from "react-easy-crop";
// import getCroppedImg from "../utils/cropImage";

// // Définir l'interface pour les props du composant
// interface MyDropzoneProps {
//   setPictures: (files: File[]) => void; // Fonction pour mettre à jour les fichiers
// }
// interface CroppedArea {
//   width: number;
//   height: number;
//   x: number;
//   y: number;
// }
// interface Point {
//   x: number;
//   y: number;
// }

// // Définir le composant fonctionnel avec les props typées
// const MyDropzone: React.FC<MyDropzoneProps> = ({ setPictures }) => {
//   const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]); // État pour les fichiers acceptés
//   const [preview, setPreview] = useState<string[]>([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [croppedAreas, setCroppedAreas] = useState<(CroppedArea | null)[]>([]);
//   const [croppedImages, setCroppedImages] = useState<string[]>([]);

//   // Fonction de gestion des fichiers déposés
//   const onDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       const picturesTab = acceptedFiles.map((file) =>
//         URL.createObjectURL(file)
//       );
//       setPreview(picturesTab); // Mettre à jour les prévisualisations
//       setPictures(acceptedFiles); // Mettre à jour les fichiers
//       setAcceptedFiles(acceptedFiles); // Mettre à jour l'état local des fichiers acceptés
//     },
//     [setPreview, setPictures]
//   );
//   // fonction pour rogner les images
//   const onCropComplete = useCallback(
//     (croppedArea: any, croppedAreaPixels: any) => {
//       setCroppedAreas((prevAreas) => {
//         const newAreas = [...prevAreas];
//         newAreas[currentImageIndex] = croppedAreaPixels;
//         return newAreas;
//       });
//     },
//     [currentImageIndex]
//   );

//   const handleCrop = async () => {
//     try {
//       const croppedImage = await getCroppedImg(
//         preview[currentImageIndex],
//         croppedAreas[currentImageIndex]
//       );
//       setCroppedImages((prevCroppedImages) => {
//         const newCroppedImages = [...prevCroppedImages];
//         newCroppedImages[currentImageIndex] = croppedImage;
//         return newCroppedImages;
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   return (
//     <div
//       {...getRootProps()}
//       style={{
//         border: "2px dashed #ccc",
//         padding: "20px",
//         textAlign: "center",
//       }}
//     >
//       <input {...getInputProps()} />
//       <p>Faire glisser les fichiers ici ou cliquer pour les ajouter</p>
//       {acceptedFiles.length > 0 && (
//         <div>
//           <h4>Fichiers:</h4>
//           <ul>
//             {preview.map((file, index) => (
//               // <Cropper
//               //   image={file}
//               //   crop={crop}
//               //   zoom={zoom}
//               //   aspect={4 / 3}
//               //   onCropChange={setCrop}
//               //   onCropComplete={onCropComplete}
//               //   onZoomChange={setZoom}
//               // />
//               <img
//                 key={index}
//                 src={file}
//                 alt={file}
//                 style={{
//                   width: "200",
//                   height: "250px",
//                   objectFit: "cover",
//                   borderBottom: "1px solid black",
//                 }}
//               />
//             ))}
//           </ul>
//           {croppedAreas && croppedAreas[currentImageIndex] !== null && (
//             <div>
//               <Cropper
//                 image={preview[currentImageIndex]}
//                 crop={{
//                   x: croppedAreas[currentImageIndex]?.x || 0,
//                   y: croppedAreas[currentImageIndex]?.y || 0,
//                 }}
//                 onCropChange={(crop: Point) => {
//                   const newCrops = [...croppedAreas];
//                   newCrops[currentImageIndex] = {
//                     ...newCrops[currentImageIndex],
//                     ...crop,
//                   } as CroppedArea;
//                   setCroppedAreas(newCrops);
//                 }}
//                 onCropComplete={onCropComplete}
//                 aspect={4 / 3} // Exemple de ratio 4:3
//               />{" "}
//               <button onClick={handleCrop}>Crop Image</button>
//             </div>
//           )}
//         </div>
//       )}
//       {croppedImages.length > 0 && (
//         <div>
//           <h2>Cropped Images</h2>
//           {croppedImages.map(
//             (src, index) =>
//               src && <img key={index} src={src} alt={`Cropped ${index}`} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyDropzone;
