import { FC, useEffect, useRef } from "react";
import { debounce } from "ts-debounce";
import "./Form.scss";
import { FormFieldInitEvent } from "./FormChangeEvent";

interface Props {
  className?: string;
  children?: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onInvalid?: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLFormElement>) => void;
  onInit?: (event: FormFieldInitEvent) => void;
  onRef?: (ref: HTMLFormElement) => void;
  focusOnFirstInvalid?: boolean;
}

const Form: FC<Props> = ({
  className = "",
  children,
  onSubmit,
  onChange = () => {},
  onInit = () => {},
  onRef = () => {},
  onInvalid: onInvalidProp = () => {},
  focusOnFirstInvalid = true,
  ...rest
}) => {
  const ref = useRef<HTMLFormElement>(null);

  const onInvalid = (event: React.ChangeEvent<HTMLFormElement>) => {
    if (focusOnFirstInvalid) {
      focusOnFirstInvalidInput(event.currentTarget);
    }
    onInvalidProp(event);
  };

  const onFormFieldInitEvent = (event: FormFieldInitEvent) => {
    onInit(event);
  };

  /** add a customEventListener on form element */
  useEffect(() => {
    const form = ref.current;
    if (form) {
      form.addEventListener(FormFieldInitEvent.eventName, onFormFieldInitEvent as EventListener);
      onRef(form);
    }
    return () => {
      if (form) {
        form.removeEventListener(FormFieldInitEvent.eventName, onFormFieldInitEvent as EventListener);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className={`af-form ${className}`} {...{ onSubmit, onInvalid, onChange, ...rest }} ref={ref}>
      {children}
    </form>
  );
};

const focusOnFirstInvalidInput = debounce((form: HTMLFormElement) => {
  const firstInvalidInput = form.querySelector("input:invalid");
  if (firstInvalidInput) {
    (firstInvalidInput as HTMLInputElement).focus();
  }
}, 100);

export default Form;
mais regarde le compsent  personlisé  Form est ce que on peux gerer autrement la fomulaire de ma precedente demande 
