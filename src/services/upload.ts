import axios from "@/lib/axios";

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
    ? "http://localhost:4000/upload-multiple"
    : "http://localhost:4000/upload";

  const { data: _file } = await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return _file;
};
