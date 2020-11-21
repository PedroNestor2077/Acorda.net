class Repetidor{
    constructor(){
        setInterval(function(){
            for (var i = 0; i < func.length; i++) {               
                func[i]()
                
             }},1000)
    };
    adicionar_funcao(funcao){
        func.push(funcao)
        console.log("Adicionei a função:")
    };
    limpar_contagem(funcao){
        for (var i = 0; i < func.length; i++) {               
            if (String(func[i])==String(funcao)){
                func.splice(i)
                console.log("removi a função",funcao)
            };
         };
    };
};
class Formatador{
    formatatar_hora(h,m,s){
        /* PASSAR PARA POSIVIO */
        if(h<0){
            h=h*-1
        };
        if(m<0){
            m=m*-1
        };
        if(s<0){
            s=s*-1
        };
        /* -----------------  */
        /* FORMATAR COM 0 NO INICIO */
        h=String(h)
        m=String(m)
        s=String(s)
        if (h.length<2){
            h='0'+h
        };
        if (m.length<2){
            m='0'+m
        };
        if (s.length<2){
            s='0'+s
        };
        /*------------------ */
        /* CHECAR SE É UM VALOR VALIDO */
        if(h>24){
            h='--'
        };
        if(m>60){
            m='--'
        };
        if(s>60){
            s='--'
        };
        /*------------------ */
        var horario_formatado={
            hora: 0,
            minuto: 0,
            segundo:0,
            formatado:'00:00:00'
        };
        horario_formatado.hora=parseInt(h);
        horario_formatado.minuto=parseInt(m);
        horario_formatado.segundo=parseInt(s);
        horario_formatado.formatado=(h+':'+m+':'+s);
        return horario_formatado.formatado;
    };
};
class Relogio{
    horario(){
        let hora=new Date();
        horario.hora=(hora.getHours());
        horario.minuto=(hora.getMinutes());
        horario.segundo=(hora.getSeconds());
        let horas=String(horario.hora);
        let minutos=String(horario.minuto);
        let segundos=String(horario.segundo);
        horario.formatado=(formatador.formatatar_hora(horas,minutos,segundos))};
    constructor(){
        repetidor.adicionar_funcao(this.horario)
    };
    associar(iten){
        setInterval(function(){
            iten.innerText=horario.formatado
        },1000);
    };
};
class Controlador{
    constructor(){
        audio.src=select_sons.value
        audio.volume=(seletor_volume.value/100)
    };
    volume(){
        audio.volume=(seletor_volume.value/100)
    };
    diretorio(){
        audio.src=select_sons.value
        
    };
    tocar(){
        audio.play()
    };
    tocar_dispertador(){
        audio.loop=true
        audio.play()
        setTimeout(function(){
            audio.loop=false
        },300000)
    };
    parar(){
        audio.loop=false
        audio.src="sons/alarme1.mp3"
    };
};
class Dispertador{
    novo_alarme(){
        let m=String(input_minuto.value);
        let s=String(0);
        let h=String(input_hora.value);
        let r_m=parseInt(input_minuto.value);
        let r_s=parseInt(0);
        let r_h=parseInt(input_hora.value);
        if (r_h<=23 & r_m <=59  & r_s<=59){
            var alarme=formatador_dispertador.formatatar_hora(h,m,s)
            if (confirm("Comfirmar alarme: "+alarme+" H")){
                /*  info  */
                info_alarme.innerText=alarme
                hora_dispertou.innerText=alarme
                tempo_restante(r_h,r_m,r_s)
                /*  info  */
            };
        }
        else{
            window.alert("Valores inválidos!")
            input_hora.value=""
            input_minuto.value=""
            input_segundo.value=""
        };
    };
    dispertar(){
        animacao()
        console.log('DISPERTOU')
        let container_principal=window.document.getElementById("container_principal");
        trocar_classe(container_principal,'container_principal','container_principal_off');
        let janela_dispertar=window.document.getElementById("dispertar");
        trocar_classe(janela_dispertar,'dispertar_off','dispertar');
        controlador.tocar_dispertador()
        repetidor.limpar_contagem(tempo_restante.contagem_regressiva)
        
    };
    desligar_dispertador(){
        controlador.parar()
        let container_principal=window.document.getElementById("container_principal");
        trocar_classe(container_principal,'container_principal_off','container_principal');
        let janela_dispertar=window.document.getElementById("dispertar");
        trocar_classe(janela_dispertar,'dispertar','dispertar_off');
    };
};
function converter_minutos_em_horas(minutos){
    let hora=(minutos/60)
    hora=parseInt(hora)
    let minuto=(minutos-(hora*60))
    hora_restante.hora=hora
    hora_restante.minuto=minuto
};
function tempo_restante(h,m){
        /* verificar dia */
        if (h<=horario.hora){
            if (h==horario.hora){
                if (m<horario.minuto){
                    h=h+24  
                }
                else if (m==horario.minuto){
                    h=h+24
                }
            }
            else{
                h=h+24      
            }
        }
        /* ---------------------- */
        hora_em_minutos=(parseInt(horario.hora*60)+parseInt(horario.minuto))
        hora_final_em_minutos=((h*60)+(m))
        hora_restante_em_minutos=(hora_em_minutos-hora_final_em_minutos)
        if (hora_restante_em_minutos<0){
            hora_restante_em_minutos=(hora_restante_em_minutos*-1)
            console.log("entrei")
        };
        hora_restante.segundo=(60-horario.segundo)
        converter_minutos_em_horas(hora_restante_em_minutos)
        if (hora_restante.minuto>1){
            hora_restante.minuto=hora_restante.minuto-1
        }
        if (m==horario.minuto+1){
            hora_restante.minuto=0
        }
        progress_bar.max=(((hora_restante_em_minutos-1)*60)+hora_restante.segundo)
        progress_bar.value=progress_bar.max
        console.log(progress_bar.max,"-----",hora_restante_em_minutos)
           /* Contagem regressiva */
    function contagem_regressiva(){
        // DISPERTADOR
        if (hora_restante.minuto==0 & hora_restante.hora==0 & hora_restante.segundo==1){
            dispertador.dispertar()
            repetidor.limpar_contagem(contagem_regressiva)
            console.log('entrei')
        }
        if (hora_restante.segundo==00 & hora_restante.minuto!=0){
            hora_restante.segundo=60
            hora_restante.minuto=hora_restante.minuto-1
        }
        if (hora_restante.minuto==0 & hora_restante.hora>0){
            hora_restante.minuto=59
            hora_restante.hora=hora_restante.hora-1
        }
        hora_restante.segundo=hora_restante.segundo-1
        progress_bar.value=progress_bar.value-1
        let f_hora_restante=String(hora_restante.hora)
        let f_minuto_restante=String(hora_restante.minuto)
        let f_segundo_restante=String(hora_restante.segundo)
        hora_restante.formatado=(formatador_tempo_restante.formatatar_hora(f_hora_restante,f_minuto_restante,f_segundo_restante))
        info_tempo.innerText=hora_restante.formatado
    };
    repetidor.limpar_contagem(contagem_regressiva)
    repetidor.adicionar_funcao(contagem_regressiva)
};
function trocar_classe(iten,classe_antiga,classe_nova){
    iten.classList.remove(classe_antiga);
    iten.classList.add(classe_nova);
    return console.log('troquei da classe: '+classe_antiga+" para a classe: "+classe_nova)
};
function inserir_hora(){
    texto_botao=this.value;
    input_hora.value=texto_botao;
    input_minuto.value='00';
    input_segundo.value='00';
};
function animacao(){
    let a=0
    let surces=["../img/icone_volume.png","../img/icone_volume.png","../img/icone_volume.png","../img/icone_volume1.png","../img/icone_volume2.png","../img/icone_volume3.png"]
    setInterval(function(){
        if (a==6){
            a=0
        };
        icone_volume.src=surces[a]
        a+=1
    },130);
};
/*                   VARIAVEIS GLOBAIS        */
const horario={
    hora: "00",
    minuto: "00",
    segundo: "00",
    formatado: '00:00:00'
};
const hora_restante={
    hora:00,
    minuto:00,
    segundo:00,
    formatado:"00:00:00"
};
var func=[]
/*                   VARIAVEIS GLOBAIS        */
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
var bt_confirmar=window.document.getElementById('confirmar');
var relogio=window.document.getElementById('relogio');
var input_hora=window.document.getElementById('input_hora');
var input_minuto=window.document.getElementById('input_minuto');
var input_segundo=window.document.getElementById('input_segundo');
const audio=window.document.getElementById('audio');
const select_sons=window.document.getElementById('select_sons');
var info_alarme=window.document.getElementById('info_alarme');
var info_tempo=window.document.getElementById('info_tempo');
var bt_tocar_son=window.document.getElementById("bt_tocar_son");
var seletor_volume=window.document.getElementById("seletor_volume")
var bt_selecionar=window.document.getElementById("bt_selecionar_son")
var progress_bar=window.document.getElementById("progress-bar")
var icone_volume=window.document.getElementById("icone_volume")
var bt_desligar=window.document.getElementById("bt_desligar_alarme")
var hora_dispertou=window.document.getElementById("hora_dispertou")
/*                          REFERENCIA HTML       */
repetidor=new Repetidor()
rel=new Relogio()
rel.associar(relogio)
formatador=new Formatador()
formatador_dispertador=new Formatador()
formatador_tempo_restante=new Formatador()
controlador=new Controlador()
dispertador=new Dispertador()

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
bt_confirmar.addEventListener("mouseup",dispertador.novo_alarme);
bt_tocar_son.addEventListener("click",controlador.tocar);
seletor_volume.addEventListener("input",controlador.volume)
bt_selecionar.addEventListener("click",controlador.diretorio)
bt_desligar.addEventListener("click",dispertador.desligar_dispertador)
/*                    ASSOCIAR  EVENTOS       */
