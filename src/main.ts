

.main-title {
    background: #00008f;
}

/* Header styles */
.header {
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
    width: 100%;
}

.header-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
}

/* Logo section */
.logo-section {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-left: -1rem;
}

.logo {
    height: 60px;
    width: 60px;
    background-image: url("../img/logo-axa-new.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
.logo-footer {
    height: 22px;
    width: 22px;
    background-image: url("../img/logo-axa-new.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
 
}

.title-section h2 {
    font-size: 2.2rem;
    color: #000;
    margin: 0;
    font-weight: bold;
}

.title-section p {
    font-size: 1.2rem;
    color: #666;
    margin: 0;
}
.user-name {
    font-size: 1.7rem;
    color: #333;
    text-decoration: underline;
    color: #000072;
    font-weight: bold;
}
.af-header__subtitle {
    line-height: 1em;
    font-weight: 400;
    display: block;
    font-size: 1.375em;
}

  <header class="header">
      <div class="header-content">
          <div class="logo-section">
              <div class="logo"></div>
              <div class="title-section">
                  <h2>@WebResources.BOTitle</h2>
                  <div class="af-header__subtitle">Envoi de Demande au Siège</div>
              </div>
          </div>
          <div class="user-name">
              <span ng-bind='wacUser'></span>
          </div>
          </div>
     
  </header>

        <!-- Footer -->
    <footer>
        <div class="container-fluid">
            <div class="logo-section">
            <div class="logo-footer"></div>
                <span class="c-text">
             © AXA @DateTime.Now.Year - Tous droits réservés
               @AxaFrance.EDS.Web.Services.CommonService.GetCurrentVersion()
            </span>
            </div>
        </div>
    </footer> est ce quee on, peux avoir mieux qualité css et nommage class
