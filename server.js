const axios = require('axios');
const express = require('express');
const app = express();
const dicomParser = require('dicom-parser');
const { v4: uuidv4 } = require('uuid');



app.get('/view', async (req, res, next) => {
  try {
    const imageUrl = req.query.imageurl ? req.query.imageurl :
      'https://s3.amazonaws.com/lury/MRStudy/1.2.840.113619.2.5.1762583153.215519.978957063.124.dcm';
    const response = await getOhifRenderJson(imageUrl, next)
    res.send(response);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

async function getOhifRenderJson(dicomFileUrl, next) {
  const dicomFileMetaData = await getDicomFileMetadata(dicomFileUrl, next)
  return formJson(dicomFileMetaData, dicomFileUrl)
}

async function getDicomFileMetadata(dicomFileUrl, next) {
  const dicomFileUrlBufferData = await axios.get(dicomFileUrl, { responseType: 'arraybuffer' }); // getting arrbuffer data of dicom image from url;
  const diocmFileMetaData = dicomParser.parseDicom(dicomFileUrlBufferData.data); // parseDicom expects buffer[] data;
  return diocmFileMetaData;
}

function getArrayByString(value) {
  const rawString = String.raw`${value}`;
  const newArray = rawString.split('\\');
  return newArray;
}

function formJson(dataSet, dicomFileUrl) {
  const frameUid = uuidv4();
  const dicomUrl = dicomFileUrl.replace(/https?/, 'dicomweb'); // Replacing https protocol with dicomweb;
  const ImageType = getArrayByString(dataSet.string('x00080008')); // ImageType data-point in metadata;
  const PixelSpacing = getArrayByString(dataSet.string('x00280030')); // PixelSpacing data-point in metadata;
  const AcquisitionNumber = parseInt(dataSet.string('x00200012')) ? parseInt(dataSet.string('x00200012')) : 0;
  const ImageOrientationPatient = dataSet.string('x00200037') ? getArrayByString(dataSet.string('x00200037')) : [0, 1, 0, 0, 0, -1];
  const ImagePositionPatient = dataSet.string('x00200032') ? getArrayByString(dataSet.string('x00200032')) : [11.600000, -92.500000, 98.099998];
  const configJSON = {
    "studies": [
      {
        "StudyDate": dataSet.string('x00080020'),
        "StudyTime": dataSet.string('x00080030'),
        "StudyInstanceUID": dataSet.string('x0020000d'),
        "StudyDescription": dataSet.string('x00081030'),
        "series": [
          {
            "Modality": dataSet.string('x00080060'),
            "SeriesDate": dataSet.string('x00080021'),
            "SeriesTime": dataSet.string('x00080031'),
            "SeriesDescription": dataSet.string('x0008103e'),
            "SeriesInstanceUID": dataSet.string('x0020000e'),
            "SeriesNumber": parseInt(dataSet.string('x00200011')),
            "instances": [
              {
                "url": dicomUrl,
                "metadata": {
                  "ImageType": ImageType,
                  "PixelSpacing": PixelSpacing,
                  "FrameOfReferenceUID": frameUid,
                  "AcquisitionNumber": AcquisitionNumber,
                  "ImagePositionPatient": ImagePositionPatient,
                  "ImageOrientationPatient": ImageOrientationPatient,

                  "Rows": dataSet.uint16('x00280010'),
                  "Columns": dataSet.uint16('x00280011'),
                  "HighBit": dataSet.uint16('x00280102'),
                  "Modality": dataSet.string('x00080060'),
                  "BitsStored": dataSet.uint16('x00280101'),
                  "BitsAllocated": dataSet.uint16('x00280100'),
                  "SOPInstanceUID": dataSet.string('x00080018'),
                  "SamplesPerPixel": dataSet.uint16('x00280002'),
                  "StudyInstanceUID": dataSet.string('x0020000d'),
                  "SeriesInstanceUID": dataSet.string('x0020000e'),
                  "PixelRepresentation": dataSet.uint16('x00280103'),
                  "InstanceNumber": parseInt(dataSet.string('x00200013')),
                  "PhotometricInterpretation": dataSet.string('x00280004'),
                },
              }
            ]
          }
        ]
      }
    ]
  }
  return configJSON;
}

app.get('/', (req, res) => {
  res.send('welcome to localhost node server at 6789 port')
});

app.listen('6789', () => {
  console.log('----------------- server started on port 6789')
});

