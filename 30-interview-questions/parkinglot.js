/*

Design a parking lot.

That's intentionally open. Before you write anything, I want to hear you scope it. 
Some things worth thinking out loud about: 
what kinds of vehicles, how spots are organized, 
how a car finds a spot, and how we handle entry/exit and payment.

A couple of ground rules so we use the time well:

Talk me through your thinking before you commit to code — I want to hear the why.
Ask me clarifying questions. I've deliberately underspecified this.
Pick whatever language you're most fluent in; just tell me which. - Javasript

Assumptions / Questions : 
1. I m assuming a single floor Parking lot
2. THe parking spots are numeric in nature ?? 
3. How do we allow parking to happen ? Does the car need to park serially or randomly
4. For simplicity i m considering all spots can accpt all types of vehicles


Model-
----------
VehicleType: ENUM {small, SUV}

Vehicle
- plateNum: string
- canFitIn(spot) { throw new Error('must implement'); }

class Car extends Vehicle {
  canFitIn(spot) { return true; }                          // fits anywhere
}

Spot
- num: integer
- isAvailable: boolean
- size: string (Compact or Large)

ParkingLot
- spots: Spot[]
- constructor(): init the spots array

- park(vehicle): SpotNUm 
// Cars arrive at an entrance 
// and should be assigned the nearest available suitable spot automatically 
// — the driver doesn't pick. 
// Assume they arrive one at a time.
// if no spot available --> -1

park(vehicle) {
    // scan the spots array
    for( const spot of this.spots) {
        if(spot.isAvailable && vehicle.canFitIn(spot)) {
            spot.isAvailable = false;
            return spot.num;
        }

    }
    return -1; // 
}




- evict(SpotId): void
- isFull() : boolean 
*/

class Vehicle {
  constructor(plate) { this.plate = plate; }
  canFitIn(spot) { throw new Error('must implement'); }
}
class Car extends Vehicle {
  canFitIn(spot) { return true; }                          // fits anywhere
  preferredSizes() {
    return [size.COMPACT, size.LARGE];
  }
}

const size = Object.freeze({
    'COMPACT': "COMPACT",
    "LARGE": "LARGE"
});

class Spot {
    constructor(num, size) {
        this.num = num;
        this.isAvailable = true;
        this.size = size
    }
}

class ParkingLot {

    constructor(spots) {
        this.spots = spots;
    }

    park(vehicle) {
        // scan the spots array
        for( const spot of this.spots) {
            if(spot.isAvailable && vehicle.canFitIn(spot)) {
                spot.isAvailable = false;
                return spot.num;
            }

        }
        return -1; // 
    }

    evict(spotNum) {
        // scan the spots array
        for( const spot of this.spots) {
            if(spot.num === spotNum) {
                spot.isAvailable = true;
                return true;
            }

        }
        return false; // spotNum is not available
    }
    /**
    park(vehicle) {
        for (const size of vehicle.preferredSizes()) {   // Car -> [COMPACT, LARGE], SUV -> [LARGE]
            const heap = this.available[size];
            if (!heap.isEmpty()) {
            const spot = heap.pop();
            spot.isAvailable = false;
            return new Ticket(vehicle, spot);   // richer than a bare number
            }
        }
        return null; // lot full for this vehicle
        } 
    
     */
}