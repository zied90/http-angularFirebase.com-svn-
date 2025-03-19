 .switchWrapper{
  .toggle-label {
    margin-left: 10px;
    transition: opacity 0.3s ease;
   }
  label{
    margin-right: 10px;
  }
  .switch{
    width: 120px;
    height: 20px;
  }
  input:checked + .slider:before {
    transform: translateX(63px);
}
.slider.round:before {
  border-radius: 20%;
}
.slider:before {

  height: 30px;
  width: 60px;
  left: -2px;
  bottom: -5px;
  background-color: #004893;

}
input:checked + .slider {
  background-color: #d7d7d7;
}
.toggle-label{
  position: relative;
font-size: 12px;

left: 8px;

float: left;
}
.toggle-label.unchecked {
  color: white;
 }
 .onToggle{
  margin-left: 35px;
 }
 }

import "./styles.scss";
interface PropsText {
  value: boolean;
  onChange: (event: any) => void;
}
const SwitchToggle = ({ onChange, value }: PropsText) => {
  return (
    <>
      <div className=" switchWrapper">
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
            <span className={`toggle-label ${!value ? " onToggle checked" : " onToggle unchecked"}`}>Oui</span>
          </span>
        </label>
      </div>
    </>
  );
};
export default SwitchToggle;
