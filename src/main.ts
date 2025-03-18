<div style="float: right; margin-right: 5px" ng-click="vm.callback($event);vm.changeGroup();">
  <label class="switch" for="togBtn">
    <input type="checkbox" ng-click="return;" ng-checked="vm.isChecked" disabled="disabled" id="togBtn"/>
    <div class="toggle round">
      <div class="off">Non</div>
      <div class="on" style="margin-left: 47px">Oui</div><!--END-->
    </div>
  </label>
</div>


.toggle {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.toggle.round, .toggle.round:before {
    border-radius: 20px;
}

input:checked+.toggle {
    background-color: #ccc;
}
