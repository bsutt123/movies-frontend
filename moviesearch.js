const MovieSearch = () => {
  // get critical elements and store them in variables
  const formInput = document.getElementById("q");
  const listOfResults = document.getElementById("results");

  // create a debounced search to use to listen to events
  const debouncedSearch = debounce(500, searchForEntries);

  // listen for changes on the input field
  formInput.addEventListener("input", debouncedSearch);

  // get more results when you get to the bottom of a page
  window.onscroll = function(ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      getMoreEntries();
    }
  };

  //*************IMPURE********************/i /
  // these function are impure, and are going to have side effects and make changes to the dom

  // searchForEntries is fired when a new input is updated. It will get the search results back and then
  // clear the old nodes out before attaching the new ones.
  function searchForEntries(e) {
    var currentSearch = e.target.value;
    if (currentSearch === "") {
      clearChildren(listOfResults);
    } else {
      fetch(`http://localhost:3001/search?query=${currentSearch}`)
        .then(function(res) {
          return res.json();
        })
        .then(function({ data }) {
          clearChildren(listOfResults);
          appendChildren(listOfResults, createChildNodes(data));
        })
        .catch(function(e) {
          console.error(e);
        });
    }
  }

  // getMoreEntries is fired upon reaching the bottom of the page with scrolling. It requests more
  // items to display and then appends then to the dom
  function getMoreEntries() {
    fetch("http://localhost:3001/update")
      .then(function(res) {
        return res.json();
      })
      .then(function({ data }) {
        appendChildren(listOfResults, createChildNodes(data));
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // clearChildren takes in a dom node and clears all the children of that node
  function clearChildren(node) {
    while (node.firstChild) {
      node.removeChild(node.lastChild);
    }
  }

  // appendChildren takes in a node and a list of nodes and appends all the children
  // to the parent node
  function appendChildren(node, list) {
    list.forEach(function append(childNode) {
      node.appendChild(childNode);
    });
  }
  //**************************PURE**************************//
  //Pure functions that don't induce side effects

  //  debounce :: fn -> Number -> fn
  // debounces goal is to take a function, and only execute it if its called again
  // within a certain timeframe specified by delay
  function debounce(delay, fn) {
    var inDebounce;
    return function(...args) {
      clearTimeout(inDebounce);
      inDebounce = setTimeout(function inDebounce() {
        fn(...args);
      }, delay);
    };
  }

  // renderList :: [String] -> DOM
  // renderList takes in an array of strings and then attaches the string to a new list
  function createChildNodes(array) {
    var results = array.map(function(name) {
      let newListItem = document.createElement("li");
      newListItem.className = "list-group-item";
      newListItem.innerText = name;
      return newListItem;
    });
    return results;
  }
};
