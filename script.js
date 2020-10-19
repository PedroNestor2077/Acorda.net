function DISPERTAR (){
    console.log('DISPERTOU')
    let body=window.document.body;
    trocar_classe(body,'body','dispertou');
    audio.volume=son_volume
    audio.loop=true
    audio.play()
    setTimeout(function(){
        audio.loop=false
        console.log("parei o dispertador")
    },300000)
};
function selecionar_son(){
    son_selecionado=select_sons.value
    audio.src=son_selecionado
};
function tempo_restante(h,m,s){
        /* verificar dia */
        if (h<=horario.hora){
            console.log("cai")
            if (h==horario.hora){
                if (m<horario.minuto){
                    h=h+24
                        
                }
                else if (m==horario.minuto){
                    console.log("minuto igual")
                    if (s>horario.segundo){
                        h=h+24
                    }
                    else{
                        console.log("segundo menor")
                        h=h+24
                    }
                }
            }
            else{
                h=h+24
                
            }
        }
            hora_restante=(h)-(horario.hora)-1
            minuto_restante=(60+m)-(horario.minuto)-1
            segundo_restante=(60+s)-(60-horario.segundo)
            segundo_restante=segundo_restante-60
            console.log(segundo_restante)
            /* converter hora para posivio */
            if (hora_restante<0){
                hora_restante=hora_restante*-1
                console.log("hora negativa")
            }
            if (minuto_restante<0){
                minuto_restante=minuto_restante*-1
                console.log("minuto negativo")
            }
            if (segundo_restante<0){
                segundo_restante=segundo_restante*-1
                console.log("segundo negativo")
            }
            if (segundo_restante==60){
                segundo_restante=00
            }
    /* Contagem regressiva */
    let rel=setInterval(function(){
        if (segundo_restante==00){
            segundo_restante=60
            minuto_restante=minuto_restante-1
            console.log("menos minuto")
        }
        if (minuto_restante==0){
            minuto_restante=60
            hora_restante=hora_restante-1
            console.log("menos hora")
        }
        segundo_restante=segundo_restante-1
        console.log(hora_restante,":",minuto_restante,":",segundo_restante,"--")
        console.log(horario.hora,horario.minuto,horario.segundo)
        let f_hora_restante=String(hora_restante)
        let f_minuto_restante=String(minuto_restante)
        let f_segundo_restante=String(segundo_restante)
        info_tempo.innerText=formatatar_hora_cronometro(f_hora_restante,f_minuto_restante,f_segundo_restante)
    },1000)
};
function tocar_son(){
    audio.src=son_selecionado
    audio.volume=son_volume
    audio.loop=true
    audio.play()
    setTimeout(function(){
        audio.loop=false
        console.log("parei o dispertador")
    },600000)
    console.log("toquei o som:",son_selecionado)
};
function mudar_volume(){
    son_volume=(seletor_volume.value/100);
    audio.volume=son_volume;
};
function trocar_classe(iten,classe_antiga,classe_nova){
    iten.classList.remove(classe_antiga);
    iten.classList.add(classe_nova);
    return console.log('troquei da classe: '+classe_antiga+" para a classe: "+classe_nova)
};
function formatatar_hora_cronometro(h,m,s){
    /*Os valores devem ser 'string'*/
    if (h.length<2){
        h='0'+h
    };
    if (m.length<2){
        m='0'+m
    };
    if (s.length<2){
        s='0'+s
    };
    horario_cronometro_formatado=(h+':'+m+':'+s)
    return horario_cronometro_formatado
};
function formatatar_hora_alarme(hora_input,minuto_input,segundo_input){
    /*Os valores devem ser 'string'*/
    if (hora_input.length<2){
        hora_input='0'+hora_input;
    };
    if (minuto_input.length<2){
        minuto_input='0'+minuto_input
    };
    if (segundo_input.length<2){
        segundo_input='0'+segundo_input
    };
    horario_alarme.hora=hora_input;
    horario_alarme.minuto=minuto_input;
    horario_alarme.segundo=segundo_input;
    horario_alarme_formatado=(horario_alarme.hora
        +':'+horario_alarme.minuto+':'+horario_alarme.segundo
    )
    console.log('---DISPERTADOR---'+horario_alarme_formatado);
    return horario_alarme_formatado
};
function formatatar_hora(h,m,s){
    /*Os valores devem ser 'string'*/
    if (h.length<2){
        h='0'+h
    };
    if (m.length<2){
        m='0'+m
    };
    if (s.length<2){
        s='0'+s
    };
    horario.hora=h;
    horario.minuto=m;
    horario.segundo=s;
    horario_formatado=(horario.hora+':'+horario.minuto+':'+horario.segundo);
    return horario_formatado;
};
/*    ROLOGIO    */
setInterval(function(){let hora=new Date();
    let horas=String(hora.getHours());
    let minutos=String(hora.getMinutes());
    let segundos=String(hora.getSeconds());

    formatatar_hora(horas,minutos,segundos);
    relogio.innerText=horario_formatado;
},1000)
function inserir_hora(){
    texto_botao=this.innerText;
    var hora_inserir='';
    var x=texto_botao.length;
    var y=0;
    while (y<x){
        if (texto_botao[y]==':'){
            break;
        }
        else{
            hora_inserir=hora_inserir+texto_botao[y];
        };
        console.log(x);
        y=y+1;
    }
    input_hora.value=hora_inserir;
    input_minuto.value='00';
    input_segundo.value='00';
};
function definir_alarme(){
    var m=String(input_minuto.value);
    var s=String(input_segundo.value);
    var h=String(input_hora.value);
    let r_h=parseInt(input_hora.value);
    let r_m=parseInt(input_minuto.value);
    let r_s=parseInt(input_segundo.value);
    formatatar_hora_alarme(h,m,s);
    if (confirm("Comfirmar alarme: "+horario_alarme_formatado+" H")){
        /*  info  */
        info_alarme.innerText=horario_alarme_formatado
        tempo_restante(r_h,r_m,r_s)
        /*  info  */
        let checar_alarme=setInterval(function(){
            /*  --ALARME-DISPERTADOR--  */
            if (horario_formatado==horario_alarme_formatado){
                DISPERTAR()
                clearInterval(checar_alarme)
            }
        },500)
    };
};
/*                   REFERENCIA HTML       */
const bt1=window.document.getElementsByClassName('botao_hora')[0];
var bt2=window.document.getElementsByClassName('botao_hora')[1];
var bt3=window.document.getElementsByClassName('botao_hora')[2];
const bt4=window.document.getElementsByClassName('botao_hora')[3];
var bt5=window.document.getElementsByClassName('botao_hora')[4];
var bt6=window.document.getElementsByClassName('botao_hora')[5];
var bt7=window.document.getElementsByClassName('botao_hora')[6];
var bt8=window.document.getElementsByClassName('botao_hora')[7];
var bt9=window.document.getElementsByClassName('botao_hora')[8];
var bt_confirmar=window.document.getElementById('bt_confirmar');
var relogio=window.document.getElementById('hora');
var input_hora=window.document.getElementById('input1');
var input_minuto=window.document.getElementById('input2');
var input_segundo=window.document.getElementById('input3');
const audio=window.document.getElementById('audio');
const select_sons=window.document.getElementById('select_sons');
var info_alarme=window.document.getElementById('alarme');
var info_tempo=window.document.getElementById('tempo');
var bt_tocar_son=window.document.getElementById("bt_tocar_son");
var seletor_volume=window.document.getElementById("seletor_volume")
var bt_selecionar=window.document.getElementById("bt_selecionar_son")

/*                          REFERENCIA HTML       */

/*                    ASSOCIAR  EVENTOS       */
bt1.addEventListener("click",inserir_hora);
bt2.addEventListener("click",inserir_hora);
bt3.addEventListener("click",inserir_hora);
bt4.addEventListener("click",inserir_hora);
bt5.addEventListener("click",inserir_hora);
bt6.addEventListener("click",inserir_hora);
bt7.addEventListener("click",inserir_hora);
bt8.addEventListener("click",inserir_hora);
bt9.addEventListener("click",inserir_hora);
bt_confirmar.addEventListener("click",definir_alarme);
bt_tocar_son.addEventListener("click",tocar_son);
seletor_volume.addEventListener("input",mudar_volume)
bt_selecionar.addEventListener("click",selecionar_son)
/*                    ASSOCIAR  EVENTOS       */

/*                   VARIAVEIS GLOBAIS        */
const horario={
    hora: "00",
    minuto: "00",
    segundo: "00"
};
const horario_alarme={
    hora: "00",
    minuto: "00",
    segundo: "00"
};
var horario_formatado;
var horario_alarme_formatado;
var temp_restante_formatado;
var son_volume=(seletor_volume.value/100);
var son_selecionado=select_sons.value
/*                   VARIAVEIS GLOBAIS        */
