var nick;
var error;
let historico;

var nick;
var tamano;
var email;
var avatar;


function datosUsuario(nick, tamano, email, avatar){
    sessionStorage.setItem("nick", nick.value);
    sessionStorage.setItem("tamano", tamano.value);
    sessionStorage.setItem("email", email.value);
    sessionStorage.setItem("avatar", avatar.src);
}

function getUsersData(){
    nick = sessionStorage.getItem("nick");
    tamano = sessionStorage.getItem("tamano");
    email = sessionStorage.getItem("email");
    avatar = sessionStorage.getItem("avatar");
}

function checkUserData(){
    if(nick==null){
        return false;
    }
    return true;
}

function setError(){
    sessionStorage.setItem("error", "No se ha ingresado correctamente los datos del usuario");
}

function historialUsers(nick, email, tamano){
    if(localStorage.getItem("historico")!=null){
        historico= JSON.parse(localStorage.getItem("historico"));
    }else{
        historico = [];
    }
    
    let RegistroUsuario={
        user:nick.value,
        email:email.value,
        tamano:tamano.value,
        fecha:Date.now()
    };
    historico.push(RegistroUsuario);
    localStorage.setItem("historico", JSON.stringify(historico));
}