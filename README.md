# OHIF VIEWER

Doc links :: https://docs.ohif.org/deployment/

**STEPS**
- Make sure that you are using updated version of OHIF viewer in the `ohif.html` file. Currently i'm using `"https://unpkg.com/@ohif/viewer@4.9.22/dist/index.umd.js"`. [Check here](https://www.npmjs.com/package/@ohif/viewer "Check here").
- To server ohif.html file locally, we are using [parcel](https://www.npmjs.com/package/parcel "parcel") npm package.
- Start OHIF viewer, run  `npm run ohif`. It will server `ohif.html` file locally in the port `8888`. local url :: `http://localhost:8888/`.
- To view local dicom files directly, naviage to `/local` and browser internal `DICOM` files.
- To view remote file hosted on publicy available url, pass the json in the structured way.
- To get  configured JSON locallly, run local node server `npm run start`.
- Browse `http://localhost:6789/view` to view sample configured JSON.
- Append local server json fetch url to the `url` param of ohif viewer. For example `http://localhost:8888/viewer?url=http://localhost:6789/view`.
- You can able to see the dicom file with the OHIF viewer support.
- To extend for any remotely hosted public dicom file, pass query param `imageUrl` at the end.
- For example `http://localhost:8888/viewer?url=http://localhost:6789/view?imageUrl=https://s3.amazonaws.com/lury/MRStudy/1.2.840.113619.2.5.1762583153.215519.978957063.124.dcm`.
- We are getting metadata from the dicom file and extracting the required data points and then forming the JSON. So, every public dicom file we can render in OHIF viewer.

