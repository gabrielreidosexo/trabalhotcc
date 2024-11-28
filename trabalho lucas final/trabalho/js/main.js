$(function() {
    $('.nav-placeholder').load('../components/navbar.html', setUser);
    $('.footer-placeholder').load('../components/footer.html');
});

$('#login').on('click', function() {
    let email = $('#email').val();
    let password = $('#password').val();

    if (email === 'adm@gmail.com' && password === '1234') {
        localStorage.setItem('user', 'Administrador');
    } else if (email === 'gfigueredo937@gmail.com' && password ==='1234') {
        localStorage.setItem('user', 'Gabriel');
    } else {
        alert('Usuário ou senha incorretos. Tente novamente.')
    }
});

function setUser() {
    userName = localStorage.getItem('user');
    $('.navbar').find('#account-name').html(userName);
}
