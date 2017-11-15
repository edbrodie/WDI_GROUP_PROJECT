angular
  .module('wdi-project-3')
  .config(Sce);

Sce.$inject = ['$sceProvider'];
function Sce($sceProvider) {
  $sceProvider.enabled(false);
}
