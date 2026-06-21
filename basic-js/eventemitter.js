/* class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if(this.events.has(event))
            this.events.get(event).push(listener);
        else
            this.events.set(event, [listener]);
    }

    off(event, listener) {
        if(this.events.has(event)) {
            const listeners = this.events.get(event);
            const newListeners = listeners.filter(l => l !== listener); // remove the lister for the event
            this.events.set(event, newListeners);
        }
            
        return false;
    }

    emit(event, ...args) {
        if(this.events.has(event)) {
            const listeners = this.events.get(event);
            listeners.forEach(l => l(...args))
        }
            
        return false;
    }
}*/
class EventEmmiter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if(this.events.has(event)) {
            this.events.get(event).push(listener);
        } else {
            this.events.set(event, [listener]);
        }
    }


    off(event, listener) {
        if(this.events.has(event)) {
            const listeners = this.events.get(event);
            const updatedListeners = listeners.filter(l => l !== listener);
            this.events.set(event, updatedListeners);
        }
    }

    emit(event, ...args) {
        if(this.events.has(event)) {
            const listeners = this.events.get(event);
            listeners.forEach(l => l(...args));
        }
    }
}

