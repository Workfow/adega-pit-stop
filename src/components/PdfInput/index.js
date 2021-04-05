import { ChangeEvent, useRef, useEffect, useCallback, useState } from "react";
import { useField } from "@unform/core";

import styles from "../../styles/components/PdfInput.module.css";

export default function PdfInput({ name, placeholder, ...rest }) {
  const inputRef = useRef();

  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [updatedFile, setUpdatedFile] = useState("");

  const handlePreview = useCallback((e) => {
    const file = e.target.files?.[0];

    const validTypes = ['pdf', 'PDF'];

    const valid = validTypes.filter((e) => {
      if (file?.name.includes(e)) {
        return e;
      }
    });

    if (!file?.name.includes(valid[0])) {
      setUpdatedFile("");
      alert("Por favor insira a imagem no formato, .png ou .jpg");
      return;
    }
    setUpdatedFile(file.name);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "files[0]",
      clearValue(ref) {
        ref.value = "";
      },
    });
  }, [fieldName, registerField]);
  return (
    <>
      <div className={styles.inputBox}>
        <input id={name} type="file" ref={inputRef} onChange={handlePreview} accept="application/pdf" {...rest} />
        <label htmlFor={name}>{updatedFile ? updatedFile : placeholder}</label>
      </div>
    </>
  );
}
