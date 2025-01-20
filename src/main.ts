

    

RET_COLLECTIVE ,PREV_COLLECTIVE ,REN_INDIVIDUELLES ,AXA_PART ,AGT, ADMIN


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
                user.type = cleanedValue.toUpperCase();
            }
          }); je veux            user.type = cleanedValue.toUpperCase();  si  il nest pas dans  RET_COLLECTIVE ,PREV_COLLECTIVE ,REN_INDIVIDUELLES ,AXA_PART ,AGT, ADMIN  dans une de tous ca tu met par defaut AGT
