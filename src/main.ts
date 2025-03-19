import "./styles.scss";
interface PropsText {
  value: boolean;
  onChange: (event: any) => void;
}
const SwitchToggle = ({ onChange, value }: PropsText) => {
  return (
    <div className="switchWrapper">
      <label htmlFor="switch-act">Afficher par dossier</label>
      <label className="switch">
        <input
          id="switch-act"
          data-testid="switch-act"
          type="checkbox"
          name="switch-act"
          onChange={onChange}
          checked={value}
        />
        <span className="slider round">
          <span className={`toggle-label ${value ? "checked" : "unchecked"}`}>Non</span>
          <span className={`toggle-label ${!value ? "onToggle unchecked" : "onToggle checked"}`}>Oui</span>
        </span>
      </label>
    </div>
  );
};
export default SwitchToggle;


$primary-color: #004893;    // Couleur principale
$slider-bg: #d7d7d7;        // Couleur de fond du slider
$slider-width: 120px;       // Largeur du slider
$slider-height: 20px;      // Hauteur du slider
$slider-radius: 20%;       // Rayon du bord du slider
$label-font-size: 12px;    // Taille de police pour les labels
.switchWrapper {
 // Style des labels à l'intérieur du switch
 .toggle-label {
   margin-left: 10px;
   transition: opacity 0.3s ease;
   font-size: $label-font-size;
   position: relative;
   left: 8px;
   float: left;
   // Etat non coché
&.unchecked {
     color: white;
   }
   &.checked {
    color: white;
  }
   // Position du label "Oui" lorsqu'il est activé
&.onToggle {
     margin-left: 35px;
   }
 }
 label {
   margin-right: 10px;
 }
 // Styles pour le switch
 .switch {
   width: $slider-width;
   height: $slider-height;
 }
 // Transformation du bouton du slider lorsqu'il est coché
 input:checked + .slider:before {
   transform: translateX(63px);
 }
 // Design du slider avec coins arrondis
 .slider.round:before {
   border-radius: $slider-radius;
 }
 // Le design du slider avant le changement d'état
 .slider:before {
   height: 30px;
   width: 60px;
   left: -2px;
   bottom: -5px;
   background-color: $primary-color;
 }
 // Changement de couleur du slider lorsqu'il est coché
 input:checked + .slider {
   background-color: $slider-bg;
 }
} le cloeur   color: white;cest dans les 2 cas  checken et unchecked   ca ce que je veux mais est suon peur faire une seul  color: white;puisque cest appliqyer pdans touls les cas auusu  je veux utliser la codtion  
  value  poutr oui et non et pas besoin de 2 <span>
import "./styles.scss";
interface PropsText {
  value: boolean;
  onChange: (event: any) => void;
}
const SwitchToggle = ({ onChange, value }: PropsText) => {
  return (
    <div className="switchWrapper">
      <label htmlFor="switch-act">Afficher par dossier</label>
      <label className="switch">
        <input
          id="switch-act"
          data-testid="switch-act"
          type="checkbox"
          name="switch-act"
          onChange={onChange}
          checked={value}
        />
        <span className="slider round">
          <span className={`toggle-label ${value ? "checked" : "unchecked"}`}>Non</span>
          <span className={`toggle-label ${!value ? "onToggle unchecked" : "onToggle checked"}`}>Oui</span>
        </span>
      </label>
    </div>
  );
};
export default SwitchToggle;
