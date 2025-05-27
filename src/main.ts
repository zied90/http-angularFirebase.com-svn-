 private getHeadersAndRows(data: string[][]): { headers: string[]; rows: string[][] } {
    let [headers, ...rows] = data;
    console.log(headers, "headersheaders");
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
      console.log(
        actualHeaders.findIndex((header) => /admin|agt/i.test(header)),
        "dddddddddd"
      );
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


