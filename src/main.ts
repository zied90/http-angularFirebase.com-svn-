Required type:
Function
<? super fr. axa. pfel. srcclient. model. Property,
? extends U>
Provided:
<method reference>


reason: no instance(s) of type variable(s) exist so that Property conforms to Property  pour ca Property::getValue


  private static String extractPropertyValueByKey(
            SearchDocumentsMetadatasResponseDocumentsInner document) {
        if (document != null && document.getProperties() != null) {
            return document.getProperties().stream().filter(
                    property -> property.getKey().toUpperCase(Locale.FRENCH).trim()
                        .equals(Constants.ECM_REF_DOC.toUpperCase(Locale.FRENCH).trim())).findFirst()
                .map(Property::getValue).orElse(null);
        }
        return null;
    }
