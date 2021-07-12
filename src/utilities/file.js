/**
 * 
 * @param {string} fileName Name of the downloaded file
 * @param {string} content Content
 * @param {string} mimeType Mime type, default: text/plain
 */
export const downloadAsFile = (fileName, content, mimeType='text/plain') => {
    const blob = new Blob([content], {type: mimeType});
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = fileName;
    anchor.href = url;
    anchor.click();
}