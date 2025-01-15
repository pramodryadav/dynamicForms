
import pdfIcon from "../assets/images/pdf.png";
import excelIcon from "../assets/images/excel.png";
import wordIcon from "../assets/images/word.png";
import pptIcon from "../assets/images/ppt.png";
import txtIcon from "../assets/images/txt.png";
import imgIcon from "../assets/images/img.png";
import mp3Icon from "../assets/images/mp3.png";
import mp4Icon from "../assets/images/mp4.png";

/**
 * Utility function to return an icon based on the MIME type.
 * @param {string} mimeType - The MIME type of the file.
 * @returns {JSX.Element} - The corresponding icon component.
 */
const getFileIcon = (mimeType) => {
    if (mimeType.startsWith('image/')) {
        return <img className="fileIcon" src={imgIcon} alt="image" />;
    } else if (mimeType === 'application/pdf') {
        return <img className="fileIcon" src={pdfIcon} alt="pdf" />;
    } else if (mimeType.startsWith('audio/')) {
        return <img className="fileIcon" src={mp3Icon} alt="mp3" />;
    } else if (mimeType.startsWith('video/')) {
        return <img className="fileIcon" src={mp4Icon} alt="mp3" />;
    } else if (
        mimeType === 'application/vnd.ms-excel' ||
        mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        mimeType === 'text/csv'
    ) {
        return <img className="fileIcon" src={excelIcon} alt="excel" />; // Excel or CSV icon
    } else if (
        mimeType === 'application/msword' ||
        mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
        return <img className="fileIcon" src={wordIcon} alt="word" />;; // Word document icon
    } else if (
        mimeType === 'application/vnd.ms-powerpoint' ||
        mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ) {
        return <img className="fileIcon" src={pptIcon} alt="ppt" />; // PowerPoint icon
    } else if (mimeType.startsWith('text/')) {
        return <img className="fileIcon" src={txtIcon} alt="text" />;// Plain text or similar
    } else {
        // Default for unsupported or unknown MIME types
        return <img className="fileIcon" src={imgIcon} alt="image" />;
    }
};

export default getFileIcon;
