import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export const handlePrint = (handleMenuClose) => {
    html2canvas(document.querySelector('.table-container')).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('table.pdf');
        handleMenuClose();
    });
};