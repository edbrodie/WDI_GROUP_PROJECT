angular
  .module('wdi-project-3')
  .factory('Event', Event);

Event.$inject = ['API', '$resource'];

function Event(API, $resource) {
  return $resource(`${API}/events/:id`, { id: '@_id'}, {
    update: { method: 'PUT' },
    getTicketmasterEvents: { url: `${API}/getEventData`, method: 'GET', isArray: true },
    findTicketmasterEventsById: { url: `${API}/showEventData/:id`, method: 'GET' },
    addComment: { url: `${API}/members/:id/comments`, method: 'POST' },
    removeComment: { url: `${API}/members/:id/comments/:commentId`, method: 'DELETE' }
  });

}
