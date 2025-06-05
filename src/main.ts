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
