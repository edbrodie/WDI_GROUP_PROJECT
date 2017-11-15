angular
  .module('wdi-project-3')
  .factory('Group', Group);

Group.$inject = ['API', '$resource'];
function Group(API, $resource) {
  return $resource(`${API}/groups/:id`, { id: '@_id'}, {
    update: { method: 'PUT' },
    findTicketmasterEventsById: { url: `${API}/showEventData/:id`, method: 'GET' },
    findGroupsWithEventId: { method: 'GET', url: `${API}/groups/find/:eventId`, isArray: true },
    joinGroup: { method: 'PUT', url: `${API}/groups/:id/join` },
    addComment: { url: `${API}/groups/:id/comments`, method: 'POST' },
    removeComment: { url: `${API}/groups/:id/comments/:commentId`, method: 'DELETE' }
  });
}
