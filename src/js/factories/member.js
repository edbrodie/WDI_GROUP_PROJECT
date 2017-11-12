angular
  .module('wdi-project-3')
  .factory('Member', Member);

Member.$inject = [
  '$resource',
  'API'
];
function Member(
  $resource,
  API){
  return $resource(`${API}/members/:id`, { id: '@_id'}, {
    'update': { method: 'PUT' }
  });
}
