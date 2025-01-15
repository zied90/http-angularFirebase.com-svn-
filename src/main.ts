import { FC, useEffect, useState } from "react";
import Form from "@/toolkit/Components/Form/Form";
import FormItem from "@/toolkit/Components/Form/FormItem";
import Button from "@/toolkit/Components/Form/Button";
import Loader from "@/toolkit/Components/Loader";
import Profiles from "@/Admin/profiles";
import { FormState, HabilitationForm, HabilitationProps } from "@/Admin/types/Habilitation.type";
import "../habilitation.scss";
import { extractAuthorities, extractNameParts, formatName } from "@/Admin/utils";
import { FORM_VALIDATION, INITIAL_FORM_STATE_HABILITATION } from "@/Admin/constants";

export const HabilitationWithForm: FC<HabilitationProps> = ({ className = "", onSave, loaded, initialData = {} }) => {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE_HABILITATION);
  useEffect(() => {
    const authorities = extractAuthorities(initialData.authorities);
    const { firstName, lastName } = extractNameParts(initialData.name);
    setFormState((prev) => ({
      ...prev,
      firstName: firstName || prev.firstName,
      lastName: lastName || prev.lastName,
      email: initialData.email || prev.email,
      userNumber: initialData.userNumber || prev.userNumber,
      authorities,
    }));
  }, [initialData]);
  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleProfileChange = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      authorities: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const submitData: HabilitationForm = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        name: formatName(formState.firstName, formState.lastName),
        email: formState.email,
        userNumber: formState.userNumber,
        authorities: [formState.authorities],
      };
      await onSave(submitData);
      setFormState(INITIAL_FORM_STATE_HABILITATION);
    } catch (err) {
      console.error("Erreur lors de la soumission:", err);
    }
  };
  return (
    <Loader loaded={loaded} loaderOver={true}>
      <Form onSubmit={handleSubmit} className={`af-form ${className}`.trim()}>
        <fieldset className="af-form-grid">
          <Profiles onChange={handleProfileChange} value={formState.authorities} />
          <FormItem
            type="text"
            label="Prénom"
            name="firstName"
            id="id-firstName"
            requiredMessage={FORM_VALIDATION.requiredMessages.firstName}
            required
            value={formState.firstName}
            onChange={handleChange}
          />
          <FormItem
            type="text"
            label="Nom"
            name="lastName"
            id="id-lastName"
            requiredMessage={FORM_VALIDATION.requiredMessages.lastName}
            required
            value={formState.lastName}
            onChange={handleChange}
          />
          <FormItem
            name="email"
            type="email"
            label="Adresse mail"
            required
            id="id-mail"
            maxLength={255}
            pattern={FORM_VALIDATION.emailPattern}
            patternMessage={FORM_VALIDATION.emailPatternMessage}
            requiredMessage={FORM_VALIDATION.requiredMessages.email}
            value={formState.email}
            onChange={handleChange}
          />
          <FormItem
            type="text"
            label="Matricule"
            name="userNumber"
            id="id-userNumber"
            requiredMessage={FORM_VALIDATION.requiredMessages.userNumber}
            required
            value={formState.userNumber}
            onChange={handleChange}
          />
        </fieldset>
        <div className="af-form-actions">
          <Button type="submit" classModifier="success" id="id-button-agence-save" data-testid="id-button-agence-save" disabled={!loaded}>
            Enregistrer
          </Button>
        </div>
      </Form>
    </Loader>
  );
};
 donne le test unitaire avec vitest et voci mes dependance {
  "name": "ellipsev2",
  "version": "2.1.3",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "cross-env VITE_LOCAL_ENV=true npm run start:base",
    "start:oidc-mocked": "npm-run-all --parallel oauth-mock-server react-with-calltomockedserver",
    "start": "cross-env  VITE_API_URL=\"http://localhost:8080/api\"  npm run start:base",
    "start:base": "npm-run-all --parallel watch:tsc vite",
    "build": "npm run postinstall && vite build && npm run build:post",
    "build:post": "node ./scripts/postbuild.js",
    "test": "vitest",
    "react-with-calltomockedserver": "cross-env VITE_OIDC_MOCK_ENABLED=true npm run start:base",
    "oauth-mock-server": "node scripts/oauth-mock-server.js",
    "coverage": "vitest run --coverage",
    "coverage-watch": "vitest watch --coverage",
    "icons": "fantasticon --config .fantasticonrc-toolkit.js && node ./scripts/icons/icons-postbuild.js",
    "watch:tsc": "tsc --watch --noEmit",
    "vite": "vite",
    "postinstall": "node ./scripts/postinstall.js"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "dependencies": {
    "@axa-fr/react-oidc": "^7.22.15",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/tracking": "^1.1.33",
    "@vitejs/plugin-react-swc": "^3.7.0",
    "@zhbhun/background-removal": "^1.0.8",
    "axios": "^1.7.2",
    "cropperjs": "^2.0.0-beta.3",
    "eslint-config-react-app": "^7.0.1",
    "fantasticon": "^3.0.0",
    "js-sha256": "^0.11.0",
    "msw": "^2.3.1",
    "navigator.locks": "^0.8.6",
    "oauth2-mock-server": "^7.2.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-flat-providers": "^2.2.0",
    "react-imask": "^7.6.1",
    "react-modal-promise": "^1.0.2",
    "react-router": "^6.24.1",
    "react-router-dom": "^6.24.1",
    "sass": "^1.77.7",
    "ts-debounce": "^4.0.0",
    "typescript": "^5.5.3",
    "vite-tsconfig-paths": "^4.3.2"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.6",
    "@testing-library/react": "^16.0.0",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.14.10",
    "cross-env": "^7.0.3",
    "jsdom": "^24.1.0",
    "npm-run-all": "^4.1.5",
    "vite": "^5.3.3",
    "vite-plugin-svgr": "^4.2.0",
    "vitest": "^2.0.2"
  },
  "msw": {
    "workerDirectory": "public"
  },
  "volta": {
    "node": "20.15.1"
  }
}
