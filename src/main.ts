import "./styles.scss";
interface PropsText {
  value: boolean;
  onChange: (event: any) => void;
}

const SwitchToggle = ({ onChange, value }: PropsText) => {
  return (
    <>
      <div className="sliderWrapper">
        <label htmlFor="switch-act">Afficher par dossier &nbsp;</label>
        <label className="switch">
          <input
            id="switch-act"
            data-testid="switch-act"
            type="checkbox"
            name="switch-act"
            onChange={onChange}
            defaultChecked={value}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </>
  );
};
export default SwitchToggle;
 je veux que ce toogle ilya oui  ou non  sur le le boton 
