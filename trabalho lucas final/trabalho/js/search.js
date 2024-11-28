$(document).on('click', '#next-page', function() {
    $('#search-results').load('../pesquisa/camisetas2.html');
    window.scrollTo(0, 0);
});

$(document).on('click', '#prev-page', function() {
    $('#search-results').load('../pesquisa/camisetas.html');
    window.scrollTo(0, 0);
});

$(function() {
    let params = getQueryVariable('search');
    let found = true;
    let quantity;

    let elem;
    switch (replaceSpecialChars(params.toLowerCase()).trim()) {
        case 'camisetas':
            elem = 'camisetas.html';
            quantity = 160;
            break;
        case 'tenis':
            elem = 'tenis.html';
            quantity = 78;
            break;
        default:
            found = false;
            quantity = 0;
            break;
    }
    
    $('#search-label').text(`${found ? '' : 'SEM '}RESULTADOS PARA "${params.replace(/[+]/, " ")}"`);
    $('#results-number').text(`[${quantity}]`);
    if (found){
        $('#search-results').load('../pesquisa/' + elem);
    }
});

function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function replaceSpecialChars(str)
{
    str = str.replace(/[àáâãäå]/,"a");
    str = str.replace(/[èéêë]/,"e");
    str = str.replace(/[ìíîï]/,"i");
    str = str.replace(/[òóôö]/,"o");
    str = str.replace(/[ùúûü]/,"u");
    str = str.replace(/[ç]/,"ç");

    return str.replace(/[^a-z0-9]/gi,'');
}
