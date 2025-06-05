@use "../../../../toolkit/styles/functions" as fn;
@use "../../../../toolkit/styles/variables" as vars;
@use "../../../../toolkit/assets/fonts/icons" as icons;

.af-form {
  &-item {
    gap: var(--gap);
    display: flex;
    flex-direction: row;

    &_label--strong > label {
      font-weight: bold;
    }

    &--disabled {
      opacity: 0.6;
    }

    > label {
      line-height: 1;
      padding-top: 0.5em;
    }
  }

  &-text,
  &-textarea,
  &-textfile,
  &-select {
    .input {
      flex: 1;
    }

    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      position: relative;
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M86.799 36.75H13.5l36.654 35.636L86.799 36.75z"/></svg>');
      background-color: #fff;
      background-repeat: no-repeat;
      background-position: right 0.7em top 50%, 0 0;
      background-size: 1.5em;
      cursor: pointer;
      font-size: 1rem;
    }
    input,
    select,
    textarea {
      width: 100%;
      padding: fn.size(8) fn.size(10);
      border: 1px solid #cccccc;
      outline: none;

      &:focus {
        outline: 1px solid #2a2ca9;
      }
    }
  }

  &-view .input span {
    display: block;
    padding-top: 0.5em;
    line-height: 1;
  }

  &-checkbox {
    input {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;

      border: 1px solid #ccc;
      background: #fff;
      line-height: 0.9;
      vertical-align: middle;
      text-align: center;
      width: 1em;
      height: 1em;

      &:focus {
        outline: 1px solid #2a2ca9;
      }

      &:checked {
        background-color: vars.$primary-color;
        border-color: #3032c1;
        color: #fff;
      }

      &::before {
        font-size: 0.7em;
        color: inherit;
      }

      &:checked::before {
        @include icons.icon("ok");
      }
    }
  }

  &-checkbox,
  &-radio {
    flex-direction: row-reverse;
    justify-content: flex-end;
    cursor: pointer;

    &.af-form-item_label--left {
      flex-direction: row;
      justify-content: flex-start;
    }

    label,
    input {
      cursor: inherit;
    }

    label {
      display: block;
      padding-top: 0.1em;
    }

    input {
      vertical-align: middle;
      --size: 1em;
      width: var(--size);
      height: var(--size);
    }

    input + label {
      display: inline-block;
      margin-left: 0.4em;
    }

    .input {
      display: flex;
      flex-direction: row;
    }
  }

  /** disabled increment buttons on number input */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }

  &-item__small-label {
    position: relative;
    > label {
      position: absolute;
      font-size: 0.6em;
      top: 0.1em;
      left: 0.3em;
      color: #555555;
    }
  }

  &-item__validation-information {
    font-size: 0.8em;
    color: #7f7f7f;
  }

  &-item--required,
  .label-required {
    label {
      &::after {
        content: "*";
        color: #da0000;
        margin-left: 0.1em;
      }
    }
  }

  // validation error etc.

  $color-error: #da0000;

  &-item--invalid {
    input,
    textarea,
    select {
      border-color: vars.$color-danger-button;
      background-color: vars.$color-danger-background;
      color: vars.$color-danger-button;
    }

    select {
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23f02849"><path d="M86.799 36.75H13.5l36.654 35.636L86.799 36.75z"/></svg>');
    }
  }

  &-item__error-message {
    color: $color-error;
    font-size: 0.9em;
  }

  .input-visually-hidden {
    pointer-events: none;
    opacity: 0 !important;
    height: 0 !important;
    width: 0 !important;
    position: absolute;
    padding: 0 !important;
    border: none !important;
  }
}

.af-form-item--floating-checkbox {
  > label {
    width: 250px;
  }
  .input {
    position: relative;

    input {
      z-index: 2;
      position: absolute;
      left: 1em;
      top: 1em;
    }
  }

  &.af-item--align-label {
    > label {
      padding-top: 1em;
    }
  }
}
