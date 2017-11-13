angular
  .module('wdi-project-3')
  .factory('Member', Member);

Member.$inject = ['API', '$resource'];
function Member(API, $resource) {
  return $resource(`${API}/members/:id`, { id: '@_id'}, {
    update: { method: 'PUT' }
  });
}
