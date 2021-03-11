import { useState, useContext } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FinancialContext } from '../../contexts/FinancialContext';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import styles from "../../styles/components/PdfModal.module.css";
import file from "../../uploads/invoices/Comprovante de Compras-1615401223573.pdf";
import "./styles.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfModal() {
  const { handleTogglePdfModal } = useContext(FinancialContext);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function prevPage() {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber(pageNumber - 1);
  }

  function nextPage() {
    if (pageNumber == numPages) {
      return;
    }
    setPageNumber(pageNumber + 1);
  }

  return (
    <div className={styles.overlay}>
      <Document
        className={styles.pdf}
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page className={styles.page} pageNumber={pageNumber} />
      </Document>
      <div className={styles.buttonsContainer}>
        <div className={styles.pagesControl}>
          <button onClick={prevPage}>
            <FiArrowLeft size={20} />
          </button>
          <span>
            {pageNumber} de {numPages}
          </span>
          <button onClick={nextPage}>
            <FiArrowRight size={20} />
          </button>
        </div>
        <button onClick={handleTogglePdfModal} className={styles.closePdf}>Fechar</button>
      </div>
    </div>
  );
}
