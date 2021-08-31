const express = require('express');
const app = express();

const date = new Date().getTime();
console.log('-------- date :: ' + date);
const OHIFJSON = {
  "studies": [
    {
      "StudyInstanceUID": "12345678910",
      "StudyDescription": "BRAIN SELLA",
      "series": [
        {
          "SeriesInstanceUID": "9876543210",
          "SeriesDescription": "series Description",
          "SeriesDate": date,
          "SeriesTime": "120318",
          "instances": [
            {
              "metadata": {
                "Columns": 512,
                "Rows": 512,
                "InstanceNumber": 0,
                "AcquisitionNumber": 100,
                "PhotometricInterpretation": "MONOCHROME2",
                "BitsAllocated": 16,
                "BitsStored": 16,
                "PixelRepresentation": 1,
                "SamplesPerPixel": 1,
                "PixelSpacing": [
                  0.390625,
                  0.390625
                ],
                "HighBit": 15,
                "ImageOrientationPatient": [
                  0,
                  1,
                  0,
                  0,
                  0,
                  -1
                ],
                "ImagePositionPatient": [
                  11.600000,
                  -92.500000,
                  98.099998
                ],
                "FrameOfReferenceUID": "1.2.3.4.5.6.7.8.9",
                "ImageType": [
                  "ORIGINAL",
                  "PRIMARY",
                  "OTHER"
                ],
                "Modality": "MR",
                "SOPInstanceUID": "147258369",
                "SeriesInstanceUID": "147963258",
                "StudyInstanceUID": "147852369"
              },
              "url": "dicomweb://s3.amazonaws.com/lury/MRStudy/1.2.840.113619.2.5.1762583153.215519.978957063.124.dcm"
            }
          ]
        }
      ]
    }
  ]
}

app.get('/view', (req, res, next) => {
  res.send(OHIFJSON);
});

app.get('/', (req, res) => {
  res.send('welcome to localhost node server at 6789 port')
});

app.listen('6789', () => {
  console.log('----------------- server started on port 6789')
});

