angular
  .module('wdi-project-3')
  .factory('Group', Group);

Group.$inject = ['API', '$resource'];
function Group(API, $resource) {
  return $resource(`${API}/groups/:id`, { id: '@_id'}, {
    update: { method: 'PUT' },
    findGroupsWithEventId: { method: 'GET', url: `${API}/groups/find/:eventId`, isArray: true },
    addComment: { url: `${API}/groups/find/:eventId/comments`, method: 'POST' },
    removeComment: { url: `${API}/groups/find/:eventId/comments/:commentId`, method: 'DELETE' }
  });
}
