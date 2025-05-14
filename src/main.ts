 Acienne version Console pfel :Aspose 

 Dans ce menue ilya 2 sous menu 
 La liste des maquestte asposse  afficher  ou il sonnt afficher  des template sous dossier parents  
 On peut chercher une maquette   et on peut telecharger un ou plusieyr template selectionnné 
Aussi on peut telcghrger 1 ou plusieurs template sélectionner 

Le 2e sous menu il ya upload  bmaquette 
On dois ajouter  le nom de projet Aspose : qui affciher une lise   cette liste cest a recuperer depuis api service bancked et le 2 eme chahe cest la maquette  Aspose qui es cossiste a uploader le document  et cliqyer  sur le buttonb envoyer   
 Aussi ilya   dans le heaader de ce formulaire Pour récupérer le MODOP "ASPOSE Outil Upload" cliquez sur ce lien  village.axa-fr.intraxa


Travaille  a faire  cote backend : .service qui retitue  la liste des template  
Nom du template  ,  type de fichier  le  children est faura le remplir s iya sous  dossier 

export type TemplateItem = {
  name: string;
  type: 'file' | 'folder';
  children?: TemplateItem[];
 };
.Un service  qui accepte les ids des  document sélectionner et retourne les templates 
Un service pour la recherche  dun template 
Cote backend un service  qui enregistre template  et auttsi le nom projet aspose 



 Cote front a faire 
Preparation  des interface  
Consomation des dervice  bqui restitue les template 
Preparation des web service qui permet dfappler la recherche et le  servvice qui peremet de télécharger  un ou plusieurs  templaates  et  qui berspet d upload template  et un pour cosommer  la liste des projet aspose

