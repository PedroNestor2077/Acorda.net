var horario='';
var horario_alarme='';
var novo_alarme='';
var volume=1;
var relogio=window.document.getElementById('hora');
var input_hora=window.document.getElementById('input1');
var input_minuto=window.document.getElementById('input2');
var input_segundo=window.document.getElementById('input3');
const audio=window.document.getElementById('a1');
const select=window.document.getElementById('select_sons')
/* BOTOES-HORA   */
var bt1=window.document.getElementsByClassName('botao_hora')[0];
var bt2=window.document.getElementsByClassName('botao_hora')[1];
var bt3=window.document.getElementsByClassName('botao_hora')[2];
var bt4=window.document.getElementsByClassName('botao_hora')[3];
var bt5=window.document.getElementsByClassName('botao_hora')[4];
var bt6=window.document.getElementsByClassName('botao_hora')[5];
var bt7=window.document.getElementsByClassName('botao_hora')[6];
var bt8=window.document.getElementsByClassName('botao_hora')[7];
var bt9=window.document.getElementsByClassName('botao_hora')[8];
bt1.addEventListener("click",inserir_hora);
bt2.addEventListener("click",inserir_hora);
bt3.addEventListener("click",inserir_hora);
bt4.addEventListener("click",inserir_hora);
bt5.addEventListener("click",inserir_hora);
bt6.addEventListener("click",inserir_hora);
bt7.addEventListener("click",inserir_hora);
bt8.addEventListener("click",inserir_hora);
bt9.addEventListener("click",inserir_hora);
var bt_confirmar=window.document.getElementById('bt_confirmar');
bt_confirmar.addEventListener("click",definir_alarme);
function formatatar_hora_alarme(h,m,s){
    /*Os valores devem ser 'string'*/
    if (h.length<2){
        h='0'+h;
    }
    if (m.length<2){
        m='0'+m
    }
    if (s.length<2){
        s='0'+s
    }
    horario_alarme=h+':'+m+':'+s;
    return horario_alarme
}
function formatatar_hora(h,m,s){
    /*Os valores devem ser 'string'*/
    if (h.length<2){
        h='0'+h;
    }
    if (m.length<2){
        m='0'+m
    }
    if (s.length<2){
        s='0'+s
    }
    horario=h+':'+m+':'+s;

    return horario
}
/*    ROLOGIO    */
setInterval(function(){let hora=new Date();
    let horas=String(hora.getHours());
    let minutos=String(hora.getMinutes());
    let segundos=String(hora.getSeconds());
    formatatar_hora(horas,minutos,segundos)
    relogio.innerText=horario
},1000)
/*    INSERIR BOTOES-HORA    */
function inserir_hora(){
    audio.src=select.value
    audio.play()
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
}
/*  DEFINIR ALARME   */
function definir_alarme(){
    let m=String(input_minuto.value)
    let s=String(input_segundo.value)
    let h=String(input_hora.value)
    formatatar_hora_alarme(h,m,s)
    var checar_alarme=setInterval(function(){
        console.log(horario_alarme)
        /*  --ALARME-DISPERTADOR--  */
        if (horario==horario_alarme){
            console.log('DISPERTOU')
            
            window.document.body.style.backgroundColor='red'
            clearInterval(checar_alarme)
        }
    },500)
}