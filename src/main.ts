
 FAIL  src/Admin/ajoutModele/importModele/importModele.spec.tsx > ImporterModele Component > triggers onChange when file input changes
AssertionError: expected "spy" to be called with arguments: [ Anything, File{ …(1) } ]

Received:

  1st spy call:

  Array [
-   Anything,
-   File {},
+   SyntheticBaseEvent {
+     "_reactName": "onChange",
+     "_targetInst": null,
+     "bubbles": true,
+     "cancelable": false,
+     "currentTarget": null,
+     "defaultPrevented": false,
+     "eventPhase": 3,
+     "isDefaultPrevented": [Function functionThatReturnsFalse],
+     "isPropagationStopped": [Function functionThatReturnsFalse],
+     "isTrusted": false,
+     "nativeEvent": Event {
+       "isTrusted": false,
+     },
+     "target": <input
+       accept=".docx, .doc, .dotx, .dotm, .docm"
+       attr-label="Importer un fichier"
+       class="file-upload--input"
+       data-testid="file-input"
+       id="file-upload"
+       name="file"
+       type="file"
+     />,
+     "timeStamp": 1738155923626,
+     "type": "change",
+   },
+   Array [
+     Object {
+       "file": File {},
+       "fileError": null,
+       "fileIsValid": true,
+     },
+   ],
  ]


Number of calls: 1

 ❯ src/Admin/ajoutModele/importModele/importModele.spec.tsx:39:26
     37|     fireEvent.change(fileInput, { target: { files: [file] } });
     38|     expect(mockOnChange).toHaveBeenCalledTimes(1);
     39|     expect(mockOnChange).toHaveBeenCalledWith(expect.anything(), file);
       |                          ^
     40|   });
     41| });



import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ImporterModele from "./ImporterModele";
import { FileAnalysis } from "@/Admin/types/FileAnalysis.type";
describe("ImporterModele Component", () => {
  const mockOnChange = vi.fn();
  const mockOnDelete = vi.fn();
  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnDelete.mockClear();
  });
  it("renders the component correctly", () => {
    const file = new File(["file content"], "example.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const fileAnalysis: FileAnalysis = {
      file: file,
      fileError: null,
      fileIsValid: true,
    };
    render(<ImporterModele className="custom-class" onChange={mockOnChange} files={[fileAnalysis]} />);
    expect(screen.getByText(/Téléchargez un fichier word pour ajouter un modèle/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Importer un modèle/)).toBeInTheDocument();
  });
  it("triggers onChange when file input changes", () => {
    const file = new File(["file content"], "example.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const fileAnalysis: FileAnalysis = {
      file: file,
      fileError: null,
      fileIsValid: true,
    };
    render(<ImporterModele className="custom-class" onChange={mockOnChange} files={[fileAnalysis]} />);
    const fileInput = screen.getByLabelText(/Importer un modèle/);
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.anything(), file);
  });
});
import FileUpload from "@/Admin/Components/FileUpload";
import { FileAnalysis } from "@/Admin/types/FileAnalysis.type";
import { FC } from "react";

interface Props {
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, files: FileAnalysis[]) => void;
  files: FileAnalysis[];
}

const ImporterModele: FC<Props> = ({ className = "", onChange, files }) => {
  return (
    <FileUpload
      className={className}
      onChange={onChange}
      files={files}
      allowedFormats={[".docx", ".doc", ".dotx", ".dotm", ".docm"]}
      explicationText="Téléchargez un fichier word pour ajouter un modèle."
      importText="Importer un modèle"
    />
  );
};

export default ImporterModele;

export type FileAnalysis = {
  file: File;
  fileError: string | null;
  fileIsValid: boolean;
};


