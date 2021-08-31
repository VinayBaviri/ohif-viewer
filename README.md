# OHIF VIEWER

Doc links :: https://docs.ohif.org/deployment/

**STEPS**
- Make sure that you are using updated version of OHIF viewer in the `ohif.html` file.
- To server ohif.html file locally, we are using [parcel](https://www.npmjs.com/package/parcel "parcel") npm package.
- Start OHIF viewer by `npm run ohif`. It will server `ohif.html` file locally in the port `8888`. local url :: `http://localhost:8888/`.
- To view local dicom files directly, naviage to `/local` and browser internal `.dcm` files.
- To view remote file hosted on publicy available url, pass the json in the structured way.
- To get sample configured JSON locallly, run local node server `npm run start`.
- Browse `http://localhost:6789/view` to view sample configured JSON.
- Append local server json fetch url to the `url` param of ohif viewer. For example `http://localhost:8888/viewer?url=http://localhost:6789/view`.
- You can able to see the dicom file with the OHIF viewer support.

