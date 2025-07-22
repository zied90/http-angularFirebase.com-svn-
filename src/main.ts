  if (!allDocsHaveSameClientNumber(docs)) {
      const result = await showModalNotSameNumber({ documents: docs });
      if (result === "close") {
        resolverCancel();
      }
      return;
    }


import CustomModal from "@/components/modals/customModal";
import { IDocument } from "@/types/documents";
import { create, InstanceProps } from "react-modal-promise";

export const showModalNotSameNumber = async ({ documents }: { documents: IDocument[] }) => {
  const modal: React.FC<InstanceProps<unknown>> = ({ isOpen, onResolve, onReject }) => {
    const close = () => {
      onResolve("close");
    };

    return (
      <CustomModal
        title={"Message"}
        isOpen={isOpen}
        onSubmit={close}
        onClose={close}
        submitTitle="OK"
        dataTestid="modal-not-same-numbers"
      >
        Vous avez sélectionné des documents qui n'ont pas les mêmes identifiants (Numéro de contrat). Voici la liste des
        identifiants :
        <pre>
          <code>
            <strong>
              {documents.map((document: IDocument, index: number) => (index ? ", " : "") + document.contractNumber)}
            </strong>
          </code>
        </pre>
      </CustomModal>
    );
  };
  const promiseModal = create(modal);
  return promiseModal({ isOpen: true });
};

export const allDocsHaveSameClientNumber = (docs: IDocument[]) => {
  const clientNumber = removeLeadingZeros(docs[0].clientNumber + "");
  return docs.every((doc) => removeLeadingZeros(doc.clientNumber + "") === clientNumber);
};


Règle d'autorisation d'envoi par mail :
 * Si on a des numéros de client différents => blocage
 * Si on a des numéros clients identiques => envoi autorisé
 * Si on a 1 numéro de client et d'autres documents sans numéro client => envoi autorisé avec le numéro client qu'on a
 * Si on a aucun numéro client => envoi autorisé (champ du destinataire vide)
