const image = $('#image').attr('src');
const name = $('#name').text();
const sizeContainer = $('#size');
const priceText = $('#price').text();

$('.buy').on('click', function() {
    addToCart();
    window.location.href = "cart.html";
});

$('.add-to-cart').on('click', function() {
    addToCart();
    alert('Adicionado com sucesso!')
});

$('#add').on('click', function() {
    let currentAmmount = $('#ammount').val();
    let ammount = parseInt(currentAmmount) + 1;
    $('#ammount').val(ammount);
});

$('#sub').on('click', function() {
    let currentAmmount = $('#ammount').val();
    let ammount = parseInt(currentAmmount) - 1;
    if (ammount <= 0) {
        ammount = 1;
    }
    $('#ammount').val(ammount);
});

$('.size-button').on('click', function() {
    $('.size-button').removeClass('selected');
    $(this).addClass('selected');
});

function addToCart() {
    const ammount = $('#ammount').val();
    const size = sizeContainer.find('.selected').text();
    let price = priceText.replace(',', '.')
    let products = JSON.parse(localStorage.getItem("products") || "[]");
    console.log(products)
    let product = {
        "id": products.length,
        "name": name,
        "image": image,
        "size": size,
        "price": parseFloat(price.replace('R$', '') * ammount),
        "ammount": ammount
    }
    
    console.log(product.price)

    products.unshift(product);
    localStorage.setItem('products', JSON.stringify(products));
}

$('.ideal-size-button').on('click', function() {
    $('.modal-container').addClass('active');
    $('body').css('overflow', 'hidden');
});

$('.close-button').on('click', function() {
    $('.modal-container').removeClass('active');
    $('body').css('overflow', 'auto');
});

$('.dark-overlay').on('click', function() {
    $('.modal-container').removeClass('active');
    $('body').css('overflow', 'auto');
});

$('#calculate-ideal-size').on('click', function() {
    if (!$('#bar').val() || !$('#chest').val() || !$('#height').val() || !$('#arm').val()) {
        alert('Preencha todos os campos para poder calcular.');
        return;
    }

    let bar = Number($('#bar').val());
    let chest = Number($('#chest').val());
    let height = Number($('#height').val());
    let arm = Number($('#arm').val());

    let measures = [];
    measures.push(bar);
    measures.push(chest);
    measures.push(height);
    measures.push(arm);

    const calc = new CalculateIdealSizes(measures);
    const result = calc.calculate();

    let finalSize;
    let currentIndex = 0;

    for (let i = 0; i < result.length; i++) {
        if (result[currentIndex] <= result[i]) {
            currentIndex = i;
        }
    }

    switch (currentIndex) {
        case 0:
            finalSize = "P";
            break;
        case 1: 
            finalSize = "M";
            break;
        case 2:
            finalSize = "G";
            break;
        case 3:
            finalSize = "GG";
            break;
    }

    $('.size-button').removeClass('selected');
    $('#size').find(`#${finalSize.toLowerCase()}`).addClass('selected');

    $('.modal-content').html('').load('components/ideal-size.html', function() {
        $(this).find('h1').text(finalSize);
        $(this).find('#close-modal').on('click', function() {
            $('.modal-container').removeClass('active');
            $('body').css('overflow', 'auto');
        });
    });
});
