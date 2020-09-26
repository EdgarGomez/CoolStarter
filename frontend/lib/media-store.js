import {
  StrapiMediaStore,
  StrapiProvider,
  StrapiClient,
} from "react-tinacms-strapi";
import { Media, MediaStore, MediaUploadOptions } from "@tinacms/media";
//import { STRAPI_JWT, STRAPI_URL } from "./tina-strapi-client";

import Cookies from "js-cookie";
import axios from "axios";

export class SMediaStore extends StrapiMediaStore {
  accept = "*";

  async persist(files) {
    const uploaded = [];

    for (const { file } of files) {
      const upload = await uploadFile(file);
      console.log("upload", upload);
      uploaded.push({
        directory: "/uploads",
        filename: upload.data[0].hash + upload.data[0].ext,
      });
    }

    return uploaded;
  }
}

export async function uploadFile(file) {
  console.log("file", file);
  //const authToken = Cookies.get(STRAPI_JWT);
  const formData = new FormData();
  formData.append("files", file);
  const uploadResponse = await axios.post(
    process.env.STRAPI_URL + "/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        //Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return uploadResponse;
}
