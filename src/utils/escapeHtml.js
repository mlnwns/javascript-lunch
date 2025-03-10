export const escapeHtml = (unsafeString) => {
  const tempDiv = document.createElement("div");
  tempDiv.textContent = unsafeString;
  return tempDiv.innerHTML;
};
