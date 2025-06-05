    <div class="form-group">
        <label class="col-xs-2 control-label">@WebResources.TypeDemandLabel</label>
        <div class="col-xs-10">
            <select class="form-control" ng-options="option.id as option.libelle for option in contextes.typeDemandes" ng-model="contexte.typeDemandeId" ng-disabled="!editeContexteDemande">
                <option value="">@WebResources.Select</option>
            </select>
        </div>
    </div>
