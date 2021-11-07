document.addEventListener("DOMContentLoaded", function() {
  // let search_input = document.getElementById('search').addEventListener('click', openSearch)

  // var openmodal = document.querySelectorAll('.modal-open')
  // for (var i = 0; i < openmodal.length; i++) {
  //   openmodal[i].addEventListener('click', function(event){
  //     event.preventDefault()
  //     toggleSearchModal()
  //   })
  // }
  let nav_search_input = document.getElementById('search');
  nav_search_input.addEventListener('click', function(event){
    event.preventDefault()
    toggleSearchModal()
  })

  const overlay = document.querySelector('.modal-overlay')
  overlay.addEventListener('click', toggleSearchModal)

  let closemodal = document.querySelector('.modal-close')
  // closemodal.addEventListener('click', toggleSearchModal)
  for (var i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener('click', toggleSearchModal)
  }

  let search_index = elasticlunr.Index.load(window.searchIndex);
  let elasticlunr_options = {
    bool: "AND",
    fields: {
      title: {boost: 2},
      body: {boost: 1},
    }
  };
   let search_term = "";
   let search_results = "";
   let search_input = document.getElementById('search-input');
  document.onkeydown = function(evt) {
    evt = evt || window.event
    let isEscape = false
    let isCmdK = false
    if ("key" in evt) {
      isEscape = (evt.key === "Escape" || evt.key === "Esc")
      isCmdK = (evt.key === "k" && evt.metaKey === true)
    } else {
      isCmdK = (evt.keyCode === 75 && evt.metaKey)
      isEscape = (evt.keyCode === 27)
    }
    if (isCmdK) { evt.preventDefault() }
    if ((isEscape && document.body.classList.contains('search-active')) || isCmdK) {
      toggleSearchModal();
    }
    // Trigger search
    if ([...document.body.classList].includes('search-active') && search_input.value.trim().length > 3) {
      console.log('search')
      search_term = search_input.value.trim();
      console.log(search_term)
      search_results = index.search(term, options);
      console.log(search_results)
      // if (results.length === 0) {
      //   $searchResults.style.display = "none";
      //   return;
      // }
    }
  };
});

function toggleSearchModal () {
  const modal = document.getElementById('search-modal')
  modal.classList.toggle('opacity-0')
  modal.classList.toggle('pointer-events-none')
  document.body.classList.toggle('search-active')
  if ([...document.body.classList].includes('search-active')) {
    // window.setTimeout(function() {
      document.getElementById('search-input').value = ""
      document.getElementById('search-input').focus()
    // }, 500);
  }
}

// function openSearch() {
//   console.log("open modal");
//   let search_modal = document.getElementById('search-modal');
//   search_modal.classList.remove('hidden');
//   console.log(search_modal);
// }

// function search() {
//   let index = elasticlunr.Index.load(window.searchIndex);
// }
