var oReq = new XMLHttpRequest();

oReq.addEventListener("progress", updateProgress);
oReq.addEventListener("load", transferComplete);
oReq.addEventListener("error", transferFailed);
oReq.addEventListener("abort", transferCanceled);

function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total;
  } else {
    // Unable to compute progress information since the total size is unknown
  }
  document.getElementById('main').getElementsByTagName('p').item(0).innerHTML='Loading...';
}

function transferComplete(evt) {
  console.log("The transfer is complete.");
  // console.log(this.responseText,'COMPLETE \n');
  change();
}

function transferFailed(evt) {
  console.log("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
  console.log("The transfer has been canceled by the user.");
}

function change(){
  document.getElementById('main').getElementsByTagName('p').item(0).innerHTML='Complete';
}

function callback(){
  console.log('Callback called.');
}

oReq.open("GET", "https://jsonplaceholder.typicode.com/photos");


// IE11+
function observer(){
  //watch a node for changes
  var target = document.getElementById('main').getElementsByTagName('p').item(0);
  console.log('my target',target);

  // create an observer instance
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      console.log(mutation.type, mutation.target, mutation.attributeName, mutation.attributeNamespace);

      // check for str 'load'
      let str=mutation.target.innerHTML.toLowerCase().match('load');

      if(!str){
        // call callback() here
        callback();
      }

      // or check for img src 'load' or any number of gif names
      // ...

    });
  });

  // configuration of the observer:
  var config = { attributes: true, childList: true, characterData: true };

  // pass in the target node, as well as the observer options
  observer.observe(target, config);

  // later, you can stop observing
  //observer.disconnect();

}

// attach observer to any event
window.onload=observer;