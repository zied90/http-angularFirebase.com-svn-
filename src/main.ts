   <Header data-testid="header">
        <Name title="Spoolnet" subtitle="Gestionnaire d'impresssion" img={logo} alt="" />
        <User name={user?.displayName || ""} classModifier="af-info-user__name">
          <button data-testid="userInfo" className="af-link" onClick={() => setDeleteModal(true)} title="Utilisateur">
            <i className="glyphicon glyphicon-user"></i>
          </button>
        </User>
      </Header>

      je veux que name a gauche et user adroite  comment fait scss


et jai vu que lorsque ke supprime   width: 1140px;  ca donne ce que je veux mais moi jutilise le header de @axa-fr 
@media (min-width: 768px) {
    .af-header__wrapper {
        width: 1140px;
        max-width: 100%;
    }
}


import { FC, useState } from "react";
import { Header, User, Name } from "@axa-fr/react-toolkit-layout-header";
import logo from "@axa-fr/react-toolkit-core/dist/assets/logo-axa.svg";
import CustomModal from "@/components/modals/customModal";
import userStore from "@/stores/userStore";
import configStore from "@/stores/configStore";
import "./header.scss";




const HeaderApp: FC = () => {
  const { user } = userStore();
  const { config } = configStore();

  const [deleteModal, setDeleteModal] = useState<boolean>(false);


  return (
    <>
      <Header data-testid="header">
        <Name title="Spoolnet" subtitle="Gestionnaire d'impresssion" img={logo} alt="" />
        <User name={user?.displayName || ""} classModifier="af-info-user__name">
          <button data-testid="userInfo" className="af-link" onClick={() => setDeleteModal(true)} title="Utilisateur">
            <i className="glyphicon glyphicon-user"></i>
          </button>
        </User>
      </Header>
      <CustomModal
        title="Message"
        isOpen={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onClose={() => setDeleteModal(false)}
        cancelTitle="OK"
      >
        <div className="list-container">
          <ul>
            <li>
              <strong>Server Name : </strong>
              {config?.serverName}
            </li>
            <li>
              <strong>Matricule : </strong>
              {user?.matricule}
            </li>
            <li>
              <strong>E-mail : </strong> {user?.email}
            </li>
            <li>
              <strong>Tpag : </strong>
              {user?.tpag}
            </li>
            <li>
              <strong>Axauidrdu : </strong>
              {user?.axaUIdRDU}
            </li>
            <li>
              <strong>Profil : </strong>
              <pre>
                <code>{JSON.stringify(user?.profile)} </code>
              </pre>
            </li>
            <li>
              <strong>Subrogation : </strong>
              {user?.subrogation}
            </li>
            <li>
              <strong>Subrogation pre-défini : </strong>
              {user?.subrogationPredefineList}
            </li>
            <li>
              <strong>Version : {import.meta.env.PACKAGE_VERSION}</strong>
            </li>
          </ul>
        </div>
      </CustomModal>
    </>
  );
};

export default HeaderApp;


.af-header__content {
  padding-bottom: 1rem;
}
.af-info-user {
  margin-bottom: 1rem;
  display: inline-flex;
}
.af-logo {
  margin-top: 0.2rem;
}

.af-header__name {
  order: unset;
}

