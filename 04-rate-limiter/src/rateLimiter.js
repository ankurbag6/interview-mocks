// A simple rate limiter that allows a maximum number
// of requests within a sliding time window.

class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map(); // key → array of timestamps
  }

  isAllowed(clientId) {
    const now = Date.now();
    const timestamps = this.requests.get(clientId) || [];
    const recent = timestamps.filter(t => now - t < this.windowMs);
    
    if (recent.length >= this.maxRequests) {
      return false;
    }

    recent.push(now);
    this.requests.set(clientId, recent);
    return true;
  }


  /**
   * 
   * First task: add a remaining(clientId) method that returns how many more requests that client is allowed to make in the current window. If the client has never made a request, return the max.
   * 
   * remaining(clientId): 
   * --> no of requests allowed for alcient
   * this.request.get(ckientId) != null
   *  -- no.of Requests pending = maxRequests - no.ofrequests(recent.length : like line no 14) 
   *  -- return 
   *  -- 
   * ---> if the new client, return maxRequests
   *     : check this.request.get(ckientId) : null --> return maxRequests
   * 
   * 
   * 
   */
  /**
         * getthe client.requests
         * if null : return maxReqesuts
         * else
         *   : var -->noofPendingRequest, noOfRecentRequests
         *   : noofPendingRequest = max - noOfRecentRequests
         */

    remaining(clientId) {
        
        const now = Date.now();
        const timestamps = this.requests.get(clientId) || [];
        const recent = timestamps.filter(t => now - t < this.windowMs);
        return this.maxRequests - recent.length;
    }

    reset(clientId) {
        return (this.requests.delete(clientId)) ? 1 : 0
    }

    resetAll() {
        const noofclients = this.requests.size;
        this.requests.clear();
        return noofclients;
    }

    _getRecent(clientId){
        const now = Date.now();
        const timestamps = this.requests.get(clientId) || [];
        return recent = timestamps.filter(t => now - t < this.windowMs);
    }

    stats() {
        const now = Date.now();
        let totalClients = 0, activeClients = 0, totalRequests = 0;

        totalClients = this.requests.size;

        this.requests.forEach((requests) => {
            const recent = requests.filter(t => now - t < this.windowMs);
if (recent.length >= 1) activeClients++;
            if(recent.length >= 1) activeClients++;
            
            if (recent.length <= this.maxRequests) {
                totalRequests += recent.length;
            }
        });

        return {
            totalClients, activeClients, totalRequests
        }
    }

    prune() {
        const now = Date.now();
        // Declare result array
        const inactiveClientIds = [];
        // Iterate over the requests
        // Filter out the recent requests
        // Store the client id in result arr
        this.requests.forEach((requests, clientId) => {
            const recent = requests.filter(t => now - t < this.windowMs);
            if(recent.length == 0) inactiveClientIds.push(clientId);
        });

        // Delet all the inactiveClient
        for(let clientId of inactiveClientIds) {
            this.requests.delete(clientId);
        }

        return inactiveClientIds.length;
    }

}

module.exports = { RateLimiter };