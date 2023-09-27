var listElm = document.querySelector("#infinite-list")

//Agrego 20 items
var nextItem = 1
var loadMore = function () {
    for (var i = 0; i < 20; i++) {
        var item = document.createElement('li')
        item.innerText = 'item ' + nextItem++
        listElm.appendChild(item)
    }
}

//Detecta cuando el scroll finaliza
listElm.addEventListener('scroll', function () {
    if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        //Se cargan más elementos
        loadMore();
    }
})

//Se cargan algunos elementos desde el inicio 
loadMore();
