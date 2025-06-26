// this._domEvents = [
//             'click', 'dblclick', 'input', 'keydown', 'scroll',
//             'mouseover', 'mouseout', 'change', 'submit',
//             'keypress', 'keyup', 'blur', 'focus'
//         ];




// function Eventlistener(Element,event , callback){
//     if (Element == "document"){
//         document['on'+event] =  callback;
//     }else if (Element == "window" ){
//         window['on' + event] = callback;
//     }
//     //set this event as attribute in his element with a prefix "on" with value (callback)
//     Element.setAttribute(`on${event}` , callback);
// }

// createElement('Div' , {
//     onclick: ()=>{

//     }
//     autofocus: true,
// })

// @private
//     this._winOrDocEvents = ['resize', 'load', 'unload', 'beforeunload','hashchange', 'popstate', 'DOMContentLoaded'];


// core/event.js

// Global event registry
const EventRegistry = {};  // Key: "elementId_event", Value: [callbacks]

let idCounter = 0;

// Helper to get or assign a unique ID to any element
function getElementId(element) {
  if (!element.dataset.eventId) {
    element.dataset.eventId = `eid_${++idCounter}`;
  }
  return element.dataset.eventId;
}

// Main function to register an event
export function EventListener(target, eventType, callback) {
  let element = null;

  // Resolve the target element
  if (typeof target === "string") {
    if (target === "document") {
      element = document;
    } else if (target === "window") {
      element = window;
    } else {
      element = document.querySelector(target);
    }
  } else {
    element = target;
  }

  if (!element) {
    console.warn(`[EventListener] Target not found for: ${target}`);
    return;
  }

  // Assign or get element ID
  const elementId = getElementId(element);
  const registryKey = `${elementId}_${eventType}`;

  // If it's the first handler for this element+eventType, set the dispatcher
  if (!EventRegistry[registryKey]) {
    EventRegistry[registryKey] = [];

    // This is our single, internal dispatcher function
    element[`on${eventType}`] = function (event) {
      EventRegistry[registryKey].forEach(handler => {
        handler.call(element, event);
      });
    };
  }

  // Store the handler
  EventRegistry[registryKey].push(callback);
}
