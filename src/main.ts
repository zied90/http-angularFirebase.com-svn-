Type '(motCle: string | null) => Promise<any> | undefined' is not assignable to type '(query: string) => Promise<{ successData: TemplateOption[]; }>'.
  Type 'Promise<any> | undefined' is not assignable to type 'Promise<{ successData: TemplateOption[]; }>'.
    Type 'undefined' is not assignable to type 'Promise<{ successData: TemplateOption[]; }>'.ts(2322)
index.tsx(9, 2): The expected type comes from property 'onSearch' which is declared here on type 'IntrinsicAttributes & AutocompleteProps<TemplateOption>'
(property) AutocompleteProps<TemplateOption>.onSearch: (query: string) => Promise<{
    successData: TemplateOption[];
}> onSearch={getTemplates}


  et oiur info voci export function getTemplates(motCle: string | null) {
  if (motCle) {
    return ApiHandler(`/templates?term=${motCle}`, {}, "GET");
  }
}
