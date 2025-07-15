const decryptWithKey = (text: string, key: string): string => {
  let decryptedText = "";
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) - key.charCodeAt(i % key.length);
    decryptedText += String.fromCharCode(charCode);
  }
  return decryptedText;
};

const KEY = "Pl0L_uB@jNJ5%dByQv7Ho&UO{TBF_k[zhw1y#0)e@q?4i]Ty4ns;hEfe$3CnS{o";

uKmkvtTaaKunwryqioqvtsXorK2VnpLD7cmn
