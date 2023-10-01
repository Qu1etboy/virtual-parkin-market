import axios from "@/lib/axios";

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
