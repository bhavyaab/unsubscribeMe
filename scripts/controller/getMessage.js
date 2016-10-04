/*5*/
var message = [];
/**
 * Get Message with given ID.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} messageId ID of Message to get.
 * @param  {Function} callback Function to call when the request is complete.
 */
function getMessage(userId, messageId) { //eslint-disable-line
  var request = gapi.client.gmail.users.messages.get({
    'userId': 'me',
    'id': messageId
  });
  request.execute(function(resp) {
    message.push(resp);
    generateInfo(resp);
  });
}

function noSubscribeHeader(currMessage) {
  var raw = currMessage.payload.parts[1].body.data.split(/[-_]/);
  var newString = raw.reduce(function(acc, next) {
    return acc + (atob(next));
  }, '');
  var unsubscribePosition = newString.search('unsubscribe');
  var linkString = newString.slice((unsubscribePosition - 550), unsubscribePosition);
  var allHrefs = linkString.split('href="');
  var link;
  if (allHrefs.length === 1) {
    linkString = newString.slice(unsubscribePosition, (unsubscribePosition + 20));
    allHrefs = linkString.split('href="');
    link = allHrefs[1].split('"')[0];
  } else {
    link = allHrefs[allHrefs.length - 1].split('"')[0];
  }
  return link;
}
