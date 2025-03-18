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



.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  &.search-form:focus {
    border-color: #00008f !important;
    box-shadow:
      inset 0 1px 1px #ccc0,
      0 0 0 0.01rem #00008f !important;
  }
  &.search-form:focus-visible {
    border-color: #00008f !important;
    box-shadow:
      inset 0 1px 1px #ccc0,
      0 0 0 0.01rem #00008f !important;
  }
  &.search-form:disabled {
    cursor: not-allowed;
    background-color: #e5e5e5 !important;
  }
}

.panel {
  background-color: hsl(0deg 0% 100%);
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 3px;
  box-shadow: 0 1px 1px hsla(0, 0%, 0%, 0.05);
  margin: 0.2rem 0;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem 1rem;
    background-color: var(--axa-wild-sand);
    cursor: pointer;
    [data-icon="true"] {
      transform: rotate(180deg);
      transition: transform 0.3s ease-in-out;
      color: #00008fc4;
    }
    [data-icon="false"] {
      transform: rotate(0deg);
      transition: transform 0.3s ease-in-out;
    }
    &-title {
      color: #00008fc4;
    }
  }

  &-contents {
    padding: 0 1rem;
    max-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: max-height 0.5s ease-in-out;
    &.isOpen {
      max-height: 100vh;
      animation: 1s delay-overflow;
    }
    &.panel-contents-open {
      overflow: auto;
    }
  }
}

.search-bar {
  padding: 14px 4px;
}

@keyframes delay-overflow {
  from {
    overflow: hidden;
  }
}

.af-form-date {
  margin: 1rem 0;
  .DateInput {
    label {
      white-space: nowrap;
    }
  }
}

.swtich-wrapper {
  display: flex;
}

.af-form__checkbox-toggle {
  label.af-form__label {
    padding: 0.6rem 1rem;
  }
  span.af-form__indicator {
    left: 1px;
    padding: 0.2rem;
  }
  :checked + .af-form__label .af-form__indicator {
    left: -3px;
  }
}

div.af-form__checkbox-toggle {
  margin: auto;
}
//custom css for datepicker
.react-datepicker__day--selected {
  background-color: #00008fc4 !important;
}
.react-datepicker__day--keyboard-selected {
  background-color: #00008fc4 !important;
}
.react-datepicker__current-month {
  color: #00008fc4 !important;
}
.react-datepicker__navigation-icon::before {
  border-color: #3032c1 !important;
  top: 14px !important;
}
.date-icon {
  top: 27px;
  right: 25px;
  margin: 0px -13px;
}
.date-label {
  display: contents;
}

//refresh Input
.refresh-btn {
  background-color: #3032c1;
  border: 2px #00008f;
}
.refresh-icon {
  color: white;
  font-size: 10px;
}

.filters-activeGroups-header button {
  color: inherit;
  background: none;
  border: none;
  i {
    vertical-align: middle;
  }
  span {
    margin-left: 0.3em;
    vertical-align: middle;
  }
}
