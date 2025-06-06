  <div class="form-group radiocheck-custom" id="cg_{{element.dynHtmlId()}}">
      <label class="col-xs-2 control-label" for="{{element.dynHtmlId()}}">{{ element.libelle }}</label>
      <div class="col-xs-10" id='add_{{element.dynUniqueId()}}'>
          <div class="radio-inline" ng-repeat='opt in element.valuesList'>
              <input type="radio"
                     ng-disabled='!element.myState.enabled'
                     name="{{element.dynUniqueId()}}_{{opt.Identifiant}}"
                     id="{{element.dynUniqueId()}}_{{opt.Identifiant}}"
                     ng-model="element.getModel()[id]"
                     ng-value="opt" />
              <label for="{{element.dynUniqueId()}}_{{opt.Identifiant}}">{{ opt.Libelle }}</label>

          </div>
      </div>
  </div>
