import { useRef, useState, useContext, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Form } from '@unform/web';
import PdfInput from "../PdfInput";
import { FinancialContext } from "../../contexts/FinancialContext";
import { FiArrowLeft, FiArrowRight, FiX } from "react-icons/fi";
import styles from "../../styles/components/PdfModal.module.css";
import "./styles.css";
import Button from "../Button";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfModal() {
  const formRef = useRef(null);

  const {
    handleTogglePdfModal,
    pdfUrl,
    handleToggleDeletePurchaseModal,
    updatePurchase
  } = useContext(FinancialContext);
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

  useEffect(() => {
    console.log(pdfUrl);
    handleToggleDeletePurchaseModal();
  }, []);

  function handleSubmit(data, {reset}) {
    updatePurchase(data);

    reset();
  }

  return (
    <div className={styles.overlay}>
      {pdfUrl ? (
        <>
          <Document
            className={styles.pdf}
            file={`http://localhost:3333/pdf?pdf=${pdfUrl}`}
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
            <button onClick={handleTogglePdfModal} className={styles.closePdf}>
              Fechar
            </button>
          </div>
        </>
      ) : (
        <div className={styles.modal}>
          <FiX onClick={handleTogglePdfModal} size={20} />
          <h2>Você não carregou nenhum pdf para essa compra</h2>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <PdfInput
              name="invoice"
              placeholder="Clique aqui para adicionar um pdf"
            />

            <Button type="submit">
              Enviar Pdf
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}
