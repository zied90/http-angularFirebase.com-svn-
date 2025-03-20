   <Header data-testid="header">
        <Name title="Spoolnet" subtitle="Gestionnaire d'impresssion" img={logo} alt="" />
        <User name={user?.displayName || ""} classModifier="af-info-user__name">
          <button data-testid="userInfo" className="af-link" onClick={() => setDeleteModal(true)} title="Utilisateur">
            <i className="glyphicon glyphicon-user"></i>
          </button>
        </User>
      </Header>

      je veux que name a gauche et user adroite  comment fait scss
