var sessions = [];

const sessionManager = {
  indexOf: function(sessionId) {
    for(var i in sessions) {
        if(sessions[i].sessionId == sessionId)
            return i;
    }
    
    return null;
  },
  
  add: function(sessionData) {
    sessions.push(sessionData);
  },
  
  remove: function(sessionId) {
    var index = this.indexOf(sessionId);
    if(index != null) {
        sessions.splice(index, 1);
    } else {
        return null;
    }
  },
};

module.exports = sessionManager;