@use "sass:math";
@use "../../../../toolkit/styles/functions.scss" as fn;
@use "../../../../toolkit/styles/variables.scss" as vars;

.btn {
  --color: inherit;
  --button-color: grey;
  --border-bottom-color: rgba(0, 0, 0, 0.35);
  --box-shadow: inset 0px -3px var(--border-bottom-color);
  $padding-top: 10;
  $padding-bottom: 3;
  $padding-horizontal: 13;
  color: var(--color);
  background-color: var(--button-color);
  font-weight: 500;
  min-width: 8rem;
  // bandeau plus foncé en bas du bouton
  // pas besoin de redéclarer des couleurs et tout le reste.
  padding: fn.size($padding-top) fn.size($padding-horizontal);
  border: 0;
  box-shadow: var(--box-shadow);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  column-gap: fn.size($padding-horizontal); //size(math.div($padding-horizontal, 2));
  outline: none;
  cursor: pointer;
  overflow: visible;

  &--primary {
    --color: #fff;
    --button-color: #{vars.$primary-blue};

    &:hover {
      --button-color: #{vars.$primary-blue};
    }
  }

  &--success {
    --color: #fff;
    --button-color: #{vars.$color-success-button};
  }

  &--danger {
    --color: #fff;
    --button-color: #{vars.$color-danger-button};
  }
  &--base {
    --color: #000;
    --button-color: #{vars.$color-base-button};
  }

  &:hover {
    box-shadow: none;
  }

  &:focus {
    box-shadow: 0px 0px 5px 0px var(--button-color);
  }

  &:disabled,
  &--disabled {
    --color: #{vars.$color-disabled-text};
    --button-color: #{vars.$color-disabled-background};
    box-shadow: var(--box-shadow);
    cursor: not-allowed;
  }

  .row > & {
    flex-grow: 0;
    flex-shrink: 1;
  }

  &.icon-right {
    flex-direction: row-reverse;
  }

  // button reverse
  &--reverse {
    color: vars.$primary-blue;
    background-color: #fff;
    border: 2px solid vars.$primary-blue;
    font-weight: 600;
    text-decoration: none;
    box-shadow: none;

    &:disabled,
    &--disabled {
      opacity: 0.3;
    }

    &:hover {
      color: #fff;
      background-color: vars.$primary-blue;
    }
  }

  &--link {
    background: none;
    border: none;
    color: vars.$primary-blue;
    box-shadow: none;
    min-width: 0;
    color: vars.$primary-blue;
    span {
      text-decoration: underline;
    }

    &:focus {
      box-shadow: none;
      outline: 1px dotted currentColor;
    }

    &--danger {
      color: vars.$color-danger-button;
    }
  }
  &--nopads {
    padding: 0;
    box-shadow: none;
  }

  &-header-panel {
    cursor: pointer;
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    font-size: 0.8em;

    &::before {
      margin-right: 0.3em;
      vertical-align: bottom;
    }
  }
}
comment faire ca en css 
