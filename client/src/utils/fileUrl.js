const getFileUrl = (fileUrl) => {
  if (!fileUrl) {
    return "";
  }

  if (fileUrl.startsWith("http")) {
    return fileUrl;
  }

  return `${import.meta.env.VITE_API_URL}${fileUrl}`;
};

export default getFileUrl;