import axios from "axios";
import type { CompressionSettings } from "../components/CompressionSettings";

const API_BASE_URL = "http://localhost:3000/api";

export const compressImage = async (
  file: File,
  settings: CompressionSettings
): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("quality", settings.quality.toString());
  formData.append("maxWidth", settings.maxWidth.toString());
  formData.append("maxHeight", settings.maxHeight.toString());

  const response = await axios.post(`${API_BASE_URL}/compress`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data.compressedImage;
};
