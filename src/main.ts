import FileUpload from "@/Admin/Components/FileUpload";
import { FC, useState } from "react";
import HabilitationsUsersList from "./HabilitationsUsersList";
import { User } from "@/Admin/types/User.type";
import { UserListConverter } from "@/Admin/adminUtils/UserListConverter";
import "./HabilitationsFromList.scss";
import { adminHabilitationListDeployRoute } from "@/Api/ApiRoutes";
import { useDelayApi } from "@/hooks/useApi";
import Loader from "@/toolkit/Components/Loader";

export type HabilitationsFromListProps = {
  className?: string;
};

const ALLOWED_FORMATS = [".xls", ".xlsx", ".csv", ".txt"];

export const HabilitationsFromList: FC<HabilitationsFromListProps> = ({ className = "" }) => {
  const [file, setFile] = useState<File | null>(null);
  const converter = new UserListConverter();
  const [users, setUsers] = useState<User[]>([]);
  const { loaded, call: habiliterList } = useDelayApi(adminHabilitationListDeployRoute);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      let file: File = e.target.files[0];
      setFile(file);
      if (ALLOWED_FORMATS.includes(file.name.substring(file.name.lastIndexOf(".")))) {
        const users = await converter.parseInput(file);
        setUsers(users);
      }
    }
  };

  const importFromClipboard = async () => {
    const clipboardData = await navigator.clipboard.readText();
    const users = await converter.parseInput(clipboardData);
    setUsers(users);
  };

  const uploadHabilitations = () => {
    const csv = converter.userListToCSV(users);
    console.log(csv, "ttttttttttt")
    habiliterList(csv);
  };

  return (
    <div className="HabilitationsFromList">
      <Loader loaded={loaded} />
      <div className="row">
        <div className="col">
          <FileUpload
            onChange={onChange}
            file={file}
            allowedFormats={ALLOWED_FORMATS}
            explicationText={
              <>
                Téléchargez un fichier Excel, CSV, ou Texte pour importer des utilisateurs. <br />
                Les fichiers CSV ou Texte, sont formatés avec des tabulations ou des virgules (,) ou (;) pour séparer les colonnes.
              </>
            }
          />
        </div>
        <div className="col flex-col">
          <button type="button" className="btn btn--primary" onClick={importFromClipboard}>
            <i className="icon icon-clipboard"></i> Importer depuis le Presse-Papier
          </button>
          <button type="button" className="btn btn--success mt-a" onClick={uploadHabilitations}>
            <i className="icon icon-arrow-up"></i> Envoyer les Habilitations
          </button>
        </div>
      </div>
      <div className="Habilitation--list mt-md">
        <HabilitationsUsersList users={users} />
      </div>
    </div>
  );
};


import { read, utils } from "xlsx";
import { User } from "../types/User.type";
import removeDiacritics from "./RemoveDiacritics";
const SPLIT_LINE_REGEXP = /[\r\n]+/;
export class UserListConverter {
  public async parseInput(input: string | Buffer | Uint8Array | File): Promise<User[]> {
    try {
      if (input instanceof File) {
        const parsed = await this.parseFile(input);
        return this.formatData(parsed);
      }
      if (this.isValidRawInput(input)) {
        const parsed = this.parseRawInput(input);
        return this.formatData(parsed);
      }

      throw new Error("Invalid input format");
    } catch (error) {
      throw new Error(`Failed to parse input: ${(error as any)?.message as string}`);
    }
  }

  private async parseFile(file: File): Promise<string[][]> {
    const extension = file.name.split(".").pop()?.toLowerCase();
    const mimeType = file.type.toLowerCase();

    if (!extension || !mimeType) {
      throw new Error("Invalid file format");
    }

    if (this.isTextFile(mimeType)) {
      const content = await this.readFileAsText(file);
      return this.parseRawInput(content);
    }

    if (this.isExcelFile(mimeType)) {
      const buffer = await this.readFileAsBuffer(file);
      return this.parseExcel(buffer);
    }

    throw new Error(`Unsupported file format: ${mimeType}`);
  }

  private isTextFile(mimeType: string): boolean {
    return ["text/csv", "text/plain"].includes(mimeType);
  }

  private isExcelFile(mimeType: string): boolean {
    return ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].includes(mimeType);
  }

  // private readFile(file: File, type: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = (e) => resolve(e.target?.result as string);
  //     reader.onerror = (e) => reject(e);
  //     if (type === "text") {
  //       reader.readAsText(file);
  //     } else {
  //       reader.readAsArrayBuffer(file);
  //     }
  //   });
  // }

  private isBuffer(input: any): input is Buffer | Uint8Array {
    return (typeof Buffer !== "undefined" && Buffer.isBuffer(input)) || input instanceof Uint8Array;
  }

  private parseRawInput(input: string | Buffer | Uint8Array): string[][] {
    // Si c'est un Buffer ou Uint8Array (fichier Excel)
    if (this.isBuffer(input)) {
      return this.parseExcel(input);
    }

    if (typeof input === "string") {
      // Check if input is CSV
      if (input.includes(",") || input.includes(";")) {
        return this.parseCSV(input);
      }
      // Check if input est tab-separated
      if (input.includes("\t")) {
        return this.parseTabular(input);
      }
    }
    throw new Error("Unsupported format");
  }

  private parseCSV(input: string): string[][] {
    const rows = input.split(SPLIT_LINE_REGEXP);
    return rows.map((row) => row.split(/[,;]/));
  }

  private parseTabular(input: string): string[][] {
    const rows = input.split(SPLIT_LINE_REGEXP);
    return rows.map((row) => row.trim().split(/\t/));
  }

  private parseExcel(input: Buffer | Uint8Array): string[][] {
    const workbook = read(input);
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    return utils.sheet_to_json(firstSheet, { header: 1 });
  }

  private cleanValue(value: string): string {
    if (value === undefined || value === null) {
      return "";
    }
    return value.replace(/"/g, "").trim();
  }

  private getHeadersAndRows(data: string[][]): { headers: string[]; rows: string[][] } {
    let [headers, ...rows] = data;

    // detect if headers is an headers row, if we have an email in the headers, we can assume that the headers are not correct
    if (/\w+@\w+.\w/.test(headers.join(" "))) {
      const newHeadersRow = headers.map(() => "");
      const actualHeaders = headers.map((h) => h);
      // first find the header with the email
      const emailHeaderIndex = actualHeaders.findIndex((header) => /\w+@\w+.\w/.test(header));
      if (emailHeaderIndex >= 0) {
        newHeadersRow[emailHeaderIndex] = "email";
        actualHeaders[emailHeaderIndex] = "";
      }
      // find the header with the id
      const idHeaderIndex = actualHeaders.findIndex((header) => /^\w\d{5,6}$/.test(header));
      if (idHeaderIndex > -1) {
        newHeadersRow[idHeaderIndex] = "id";
        actualHeaders[idHeaderIndex] = "";
      }
      // find the header with the type
      const typeHeaderIndex = actualHeaders.findIndex((header) => /admin|agt/i.test(header));
      if (typeHeaderIndex > -1) {
        newHeadersRow[typeHeaderIndex] = "type";
        actualHeaders[typeHeaderIndex] = "";
      }
      // find the header with the lastname
      const lastnameHeaderIndex = actualHeaders.findIndex((header) => /\w+/i.test(header));
      if (lastnameHeaderIndex > -1) {
        newHeadersRow[lastnameHeaderIndex] = "lastname";
        actualHeaders[lastnameHeaderIndex] = "";
      }
      // find the header with the firstname
      const firstnameHeaderIndex = actualHeaders.findIndex((header) => header !== "");
      if (firstnameHeaderIndex >= 0) {
        newHeadersRow[firstnameHeaderIndex] = "firstname";
        actualHeaders[firstnameHeaderIndex] = "";
      }

      return { headers: newHeadersRow, rows: data };
    } else {
      return { headers, rows };
    }
  }

  // Convert string array to formatted objects
  public formatData(data: string[][]): User[] {
    const { headers, rows } = this.getHeadersAndRows(data);

    return (
      rows
        .map((row) => {
          const user: User = {
            lastname: "",
            firstname: "",
            email: "",
            id: "",
          };

          headers.forEach((header, index) => {
            const value = row[index];
            const cleanedHeader = removeDiacritics(header.toLowerCase()).replace(/_/g, "").replace(/\s/g, "").replace(/"/g, "").trim();
            const cleanedValue = this.cleanValue(value);
            switch (cleanedHeader) {
              case "lastname":
              case "nom":
                user.lastname = cleanedValue;
                break;
              case "firstname":
              case "prenom":
                user.firstname = cleanedValue;
                break;
              case "adresseemail":
              case "e-mail":
              case "emailaddress":
              case "email":
              case "mail":
                user.email = cleanedValue.toLowerCase().replace("axafr", "axa.fr").replace("axa fr", "axa.fr");
                break;
              case "id":
              case "matricule":
              case "uaxawindowsid":
              case "userid":
                user.id = cleanedValue;
                break;
              case "type":
                user.type = cleanedValue;
            }
          });

          if (!user.firstname || !user.lastname) {
            if (user.firstname || user.lastname) {
              const [firstname, ...lastname] = (user.firstname || user.lastname).split(" ");
              user.firstname = firstname;
              user.lastname = lastname.join(" ");
            } else {
              const [firstname, lastname] = user.email.replace(".a.", ".").split("@")[0].split(".");
              user.firstname = firstname;
              user.lastname = lastname;
            }
          }

          return user;
        })
        .filter((user) => user.email !== "" && (user.lastname !== "" || user.firstname !== "" || user.id !== ""))
        // remove dupes
        .filter((user, index, self) => index === self.findIndex((t) => t.email === user.email))
    );
  }

  private isValidRawInput(input: unknown): input is string | Buffer | Uint8Array {
    return typeof input === "string" || input instanceof Buffer || input instanceof Uint8Array;
  }

  private async readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  private async readFileAsBuffer(file: File): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as unknown as Buffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  public userListToCSV = (users: User[]): string => {
    const headers = ["nom", "prénom", "email", "id", "type"];
    const rows = users.map((user) => [user.lastname, user.firstname, user.email, user.id, user.type]);
    return [headers, ...rows].map((row) => row.join(";")).join("\n");
  };
} 

export const adminHabilitationListDeployRoute: ApiRoute = {
  description: "Admin - Habiliter des profil depuis un csv",
  id: "adminHabilitationDeployRoute",
  path: "/user/deployList",
  cache: true,
  deleteCacheOn: [],
  reloadOn: [],
  ttl: 0,
  method: "POST",
  alertSuccess: { message: "Habilitation du profil avec succès" },
};
comment faire pour que  jenvoi un fichier csv  au backend car voci la photo dans le reseau

