:root {
    --color-primary: #00008f;
    --color-dark-blue: #000072;
    --color-black: #000;
    --color-gray: #666;
    --color-white: #fff;
    --box-shadow-default: 0 2px 4px rgba(0, 0, 0, 0.1);
    --logo-url: url("../img/logo-axa-new.svg");
}
/* ====== General Logo Style ====== */
.main-title {
    background-color: var(--color-primary); 
 
}
.logo {
    background: var(--logo-url) center/contain no-repeat;
    display: inline-block;
    flex-shrink: 0;
}

.logo--large {
    width: 60px;
    height: 60px;
}

.logo--small {
    width: 22px;
    height: 22px;
}
/* ====== Header ====== */
.header {
    background-color: var(--color-white);
    box-shadow: var(--box-shadow-default);
    padding: 1rem 0;
    width: 100%;
}

.header__content {
    max-width: auto;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.header__logo-section {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-left: -1rem;
}

.header__title-section {
    display: flex;
    flex-direction: column;
}

.header__title {
    font-size: 2.2rem;
    color: var(--color-black);
    font-weight: bold;
    margin: 0;
}

.header__subtitle {
    line-height: 1em;
    font-weight: 400;
    font-size: 1.375em;
    color: var(--color-black);
   
}

.header__user-name {
    font-size: 1.7rem;
    color: var(--color-dark-blue);
    text-decoration: underline;
    font-weight: bold;
    margin-top: 1rem;
}
/* ====== Footer ====== */
.footer {
    padding: 1rem;
    background-color: var(--color-white);
    border-top: 1px solid #eee;
   
}

.footer__content {
    display: flex;
    align-items: center;
    gap: 1rem;

}

.footer__text {
    font-size: 1.3rem;
    color: var(--color-dark-blue);
    font-weight: 600
}
/* ====== Responsive (mobile) ====== */
@media (max-width: 768px) {
    .header__content,
    .footer__content {
        flex-direction: column;
        align-items: flex-start;
    }

    .header__user-name {
        margin-top: 0.5rem;
    }

    .footer__text {
        font-size: 1rem;
    }
}
.btn {
    --color: inherit;
    --button-color: grey;
    --border-bottom-color: rgba(0, 0, 0, 0.35);
    --box-shadow: inset 0px -3px var(--border-bottom-color);
    color: var(--color);
    background-color: var(--button-color);
    font-weight: 500;
    min-width: 8rem;
    padding: 10px 13px;
    border: 0;
    box-shadow: var(--box-shadow);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    column-gap: 13px;
    outline: none;
    cursor: pointer;
    overflow: visible;
}

.btn--primary {
    --color: #fff;
    --button-color: var(--color-primary);
}

    .btn--primary:hover {
        --button-color: var(--color-primary);
    }

.btn--success {
    --color: #fff;
    --button-color: #28a745; /* vars.$color-success-button */
}

.btn--danger {
    --color: #fff;
    --button-color: #dc3545; /* vars.$color-danger-button */
}

.btn--base {
    --color: #000;
    --button-color: #e0e0e0; /* vars.$color-base-button */
}

.btn:hover {
    box-shadow: none;
}

.btn:focus {
    box-shadow: 0px 0px 5px 0px var(--button-color);
}

.btn:disabled,
.btn--disabled {
    --color: #6c757d; /* vars.$color-disabled-text */
    --button-color: #e9ecef; /* vars.$color-disabled-background */
    box-shadow: var(--box-shadow);
    cursor: not-allowed;
}

.row > .btn {
    flex-grow: 0;
    flex-shrink: 1;
}

.btn.icon-right {
    flex-direction: row-reverse;
}

.btn--reverse {
    color: var(--color-primary);
    background-color: #fff;
    border: 2px solid var(--color-primary);
    font-weight: 600;
    text-decoration: none;
    box-shadow: none;
}

    .btn--reverse:disabled,
    .btn--reverse.btn--disabled {
        opacity: 0.3;
    }

    .btn--reverse:hover {
        color: #fff;
        background-color: var(--color-primary);
    }

.btn--link {
    background: none;
    border: none;
    color: var(--color-primary);
    box-shadow: none;
    min-width: 0;
}

    .btn--link span {
        text-decoration: underline;
    }

    .btn--link:focus {
        box-shadow: none;
        outline: 1px dotted currentColor;
    }

.btn--link--danger {
    color: #dc3545; /* vars.$color-danger-button */
}

.btn--nopads {
    padding: 0;
    box-shadow: none;
}

.btn-header-panel {
    cursor: pointer;
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    font-size: 0.8em;
}

    .btn-header-panel::before {
        margin-right: 0.3em;
        vertical-align: bottom;
    }
/* ====== Radio ====== */
.radio-check-group {
    position: relative;
    padding-left: 30px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 16px;
    user-select: none;
    display: flex;
    align-items: center;
}
    /* Cache l'input radio d'origine */
    .radio-check-group input[type="radio"] {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }
    /* Label personnalisé */
    .radio-check-group label.radio {
        position: relative;
        cursor: pointer;
        padding-left: 0px;
        margin: 0;
        color: #000;
    }
        /* Cercle extérieur */
        .radio-check-group label.radio::before {
            content: "";
            position: absolute;
            left: -30px;
            top: 50%;
            transform: translateY(-50%);
            height: 20px;
            width: 20px;
            border: 2px solid #004b9b; /* Bleu AXA */
            border-radius: 50%;
            background-color: #fff;
            transition: none;
        }
    /* Cercle intérieur quand sélectionné */
    .radio-check-group input[type="radio"]:checked + label.radio::after {
        content: "";
        position: absolute;
        left: -27px;
        top: 50%;
        transform: translateY(-50%);
        height: 14px;
        width: 14px;
        border-radius: 50%;
        background-color: #004b9b;
    }
    /* Désactivé */
    .radio-check-group input[type="radio"]:disabled + label.radio {
        color: #ccc;
        cursor: not-allowed;
    }

        .radio-check-group input[type="radio"]:disabled + label.radio::before {
            border-color: #ccc;
        }

    .radio-check-group input[type="radio"]:checked:disabled + label.radio::after {
        background-color: #ccc;
    }
/* ====== select ====== */
.form-control {
    appearance: none; /* Retire le style natif */
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: #fff;
    border: 1px solid #004b9b;
    border-radius: 4px;
    padding: 6px 40px 6px 12px; /* espace pour la flèche à droite */
    font-size: 17px;
    color: #000;
    background-image: url('data:image/svg+xml;utf8,<svg fill="%23004b9b" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 2em;
    height: 38px;
    box-shadow: none;
    transition: none;
    cursor: pointer;
    min-width: 25%;
}
    /* Style quand le select est désactivé */
    .form-control:disabled {
        background-color: #f5f5f5;
        color: #999;
        cursor: not-allowed;
        background-image: none;
    }
    /* Focus style */
    .form-control:focus {
        outline: none;
        border-color: #003c80;
        box-shadow: 0 0 0 2px rgba(0, 75, 155, 0.2);
    }
/* ====== label====== */
axa-label {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #003366; /* Bleu foncé AXA */
    line-height: 1.4;
    display: inline-block;
    margin-bottom: 4px;
}

.required-star {
    color: #d0021b; /* Rouge AXA pour erreurs et indications */
    margin-left: 4px;
    font-weight: bold;
    font-size: 14px;
}

@using AxaFrance.EDS.Resources
@* @using System.Web.Optimization*@

<h2>@WebResources.ContextTitle </h2>
<small><em>@WebResources.MandatoryField</em></small>
<form class="form-horizontal" ng-submit="submitContext()">
    
    <div class="form-group" ng-if="contexte.niveauId == 3">
        <label class="col-xs-2 control-label">@WebResources.CustomerDatas</label>
        <div class="col-xs-10">
            <select class="form-control" name="donnees_clients" ng-style="{'width': '320px'}" ng-options="client.idAbonne as client.informationClient for client in contexteConseiller.portefeuille.clients" ng-model="contexte.idAbonne" ng-disabled="!editeContexteDemande"></select>
        </div>
    </div>
    <div class="form-group" ng-if="contexte.niveauId == 2">
        <label class="col-xs-2 control-label">@WebResources.ContratDatas</label>
        <div class="col-xs-10">
            <div class="label_uneditable" ng-bind="contexteConseiller.portefeuille.clients[0].contrats[0].informationContrat"></div>
        </div>
    </div>
    <div class="form-group" ng-if="contexte.niveauId == 2 && contexte.metierId == 3"> <!--Cas de la vie individuelle-->
        <label class="col-xs-2 control-label">@WebResources.CustomerDatas</label>
        <div class="col-xs-10">
            <div class="label_uneditable" ng-bind="contexteConseiller.portefeuille.clients[0].informationClientVieIndividuelle"></div>
        </div>
    </div>
    <div class="form-group" ng-if="contexte.niveauId == 1">
        <label class="col-xs-2 control-label">@WebResources.SinistreDatas</label>
        <div class="col-xs-10">
            <div class="label_uneditable" ng-bind="contexteConseiller.portefeuille.clients[0].contrats[0].sinistres[0].informationSinistre"></div>
        </div>
    </div>

    <div class="form-group">
        <label class="col-xs-2 control-label axa-label" for="region">@WebResources.Perimetre </label>
        <div class="col-xs-10">
            <div class="radio">
                <div class="radio-check-group" ng-repeat="perimetre in allPerimeters">
                    <input id="{{$id}}" type="radio" name="Perimeter" value="{{perimetre.id}}" data-ng-model="contexte.perimetreId" ng-disabled="disablePerimeter(perimetre) || !editeContexteDemande" />
                    <label for="{{$id}}" class="radio">{{ perimetre.libelle }}</label>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group" ng-show="contextes.metiers.length && contexte.metierId != 3">
        <label class="col-xs-2 control-label">@WebResources.MetierLabel</label>
        <div class="col-xs-10">
            <select class="form-control" ng-options="option.id as option.libelle for option in contextes.metiers" ng-model="contexte.metierId" ng-disabled="!editeContexteDemande || contexte.niveauId != 3 || initialContext.metierId">
                <option value="">@WebResources.Select</option>
            </select>
        </div>
    </div>

    <div class="form-group" ng-show="contextes.perimetres.length == 1 && contextes.garanties.length">
        <label class="col-xs-2 control-label">@WebResources.WarrantyUse</label>
        <div class="col-xs-10">
            <select class="form-control" ng-options="option.id as option.libelle for option in contextes.garanties" ng-model="contexte.garantieId">
                <option value="">@WebResources.Select</option>
            </select>
        </div>
    </div>


    <div class="form-group">
        <label class="col-xs-2 control-label axa-label">@WebResources.TypeDemandLabel</label>
        <div class="col-xs-10">
            <select class="form-control" ng-options="option.id as option.libelle for option in contextes.typeDemandes" ng-model="contexte.typeDemandeId" ng-disabled="!editeContexteDemande">
                <option value="">@WebResources.Select</option>
            </select>
        </div>
    </div>
   
    <div class="form-group" ng-show="contexte.metierId==2">
        <label class="col-xs-2 control-label">@WebResources.OrigineLabel</label>
        <div class="col-xs-10">
            {{contexte.fromApplication}}
        </div>
    </div>
    <div class="form-group" ng-show="false">
        <label class="col-xs-2 control-label">@WebResources.NumeroDemande</label>
        <div class="col-xs-10">
            {{contexte.numeroDemande}}
        </div>
    </div>
    <div class="form-group" ng-show="false">
        <label class="col-xs-2 control-label">@WebResources.NumeroInstance</label>
        <div class="col-xs-10">
            {{contexte.numeroInstance}}
        </div>
    </div>
    <div class="form-group" ng-show="false">
        <label class="col-xs-2 control-label">@WebResources.NumeroInstanceRenseigne</label>
        <div class="col-xs-10">
            {{contexte.numeroInstanceRenseigne}}
        </div>
    </div>
    <div class="form-group" ng-show="contexte.metierId==2 && contexte.numeroClientRc.length==0">
        <label class="col-xs-2 control-label">@WebResources.TypeTitulaireLabel</label>
        <div class="col-xs-10">
            <select class="form-control" ng-options="option.code as option.libelle for option in contextes.typeTitulaires" ng-model="contexte.codeTypeTitulaire" ng-disabled="!editeContexteDemande">
                <option value="">@WebResources.Select</option>
            </select>
        </div>
    </div>

    <div class="form-group">
        <div class="col-xs-10 col-xs-push-2">
            <a class="btn btn--primary" type="submit" ng-click="reset()" ng-show="!editeContexteDemande">@WebResources.Edit</a>
            <button class="btn btn--primary" type="submit" ng-show="editeContexteDemande" ng-model="btnValider" ng-disabled="contexte.perimetreId == null || (contexte.garantieId == null && contextes.garanties.length >0) || contexte.typeDemandeId == null || (contexte.niveauId == 3 && contexte.idAbonne == null) || (contextes.metiers.length && contexte.metierId == null)||(contexte.metierId==2 && contexte.codeTypeTitulaire==null && contexte.numeroClientRc.length==0)">@WebResources.Valid</button><br />
        </div>
    </div>

</form>

<div ng-bind-html="tagXiti"></div>
 pour le bton edit ou ajout je veux  soit au milieu select 
