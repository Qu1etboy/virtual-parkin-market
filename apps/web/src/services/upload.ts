import axios from "@/lib/axios";
import mime from "mime-types";

export const FILE_URL = process.env.NEXT_PUBLIC_FILE_URL;

export const upload = async (name: string, file: File | File[]) => {
  const formData = new FormData();

  if (Array.isArray(file)) {
    file.forEach((f) => {
      formData.append(name, f);
    });
  } else {
    formData.append(name, file);
  }

  const url = Array.isArray(file)
    ? `${FILE_URL}/upload-multiple`
    : `${FILE_URL}/upload`;

  const { data: _file } = await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return _file;
};

export const getFileFromUrl = async (
  url: string,
  name: string,
  defaultType: string = "image/jpeg"
) => {
  console.log(url);
  const response = await fetch(url);
  console.log(
    response.headers.get("content-type"),
    response.headers.get("content-length")
  );
  const data = await response.blob();
  console.log(data);
  const type = mime.lookup(url) || defaultType;

  const blob = new Blob([data], { type });
  console.log(blob);
  return new File([blob], name, {
    type,
  });
};
