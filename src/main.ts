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
        <label class="col-xs-2 control-label" for="region">@WebResources.Perimetre </label>
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
            <select class="form-control" ng-options="option.id as option.libelle for option in contextes.garanties" ng-model="contexte.garantieId" ng-disabled="!editeContexteDemande">
                <option value="">@WebResources.Select</option>
            </select>
        </div>
    </div>

    <div class="form-group">
        <label class="col-xs-2 control-label">@WebResources.TypeDemandLabel</label>
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
            <a class="btn btn-primary" type="submit" ng-click="reset()" ng-show="!editeContexteDemande">@WebResources.Edit</a>
            <button class="btn btn-primary" type="submit" ng-show="editeContexteDemande" ng-model="btnValider" ng-disabled="contexte.perimetreId == null || (contexte.garantieId == null && contextes.garanties.length >0) || contexte.typeDemandeId == null || (contexte.niveauId == 3 && contexte.idAbonne == null) || (contextes.metiers.length && contexte.metierId == null)||(contexte.metierId==2 && contexte.codeTypeTitulaire==null && contexte.numeroClientRc.length==0)">@WebResources.Valid</button><br />
        </div>
    </div>

</form>

<div ng-bind-html="tagXiti"></div>
