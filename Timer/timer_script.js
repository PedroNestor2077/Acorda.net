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
class Timer{
    novo_timer(){
        let m=String(input_minuto.value);
        let s=String(input_segundo.value);
        let h=String(input_hora.value);
        let r_m=parseInt(input_minuto.value);
        let r_s=parseInt(input_segundo.value);
        let r_h=parseInt(input_hora.value);
        
        if (r_h<=23 & r_m <=59  & r_s<=59){
            var alarme=formatador_dispertador.formatatar_hora(h,m,s)
            if (confirm("Comfirmar alarme: "+alarme+" H")){
                hora_restante.hora=r_h
                hora_restante.minuto=r_m
                hora_restante.segundo=r_s+1
                /*  info  */
                repetidor.limpar_contagem(contagem_regressiva)
                repetidor.adicionar_funcao(contagem_regressiva)
                hora_dispertou.innerText=alarme
                tempo.innerText=alarme
                let segundos=(((r_h*60)+r_m)*60)+r_s
                progress_bar.max=segundos
                progress_bar.value=segundos
                console.log(segundos,m)
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

    repetidor.limpar_contagem(contagem_regressiva)
    repetidor.adicionar_funcao(contagem_regressiva)
};
function trocar_classe(iten,classe_antiga,classe_nova){
    iten.classList.remove(classe_antiga);
    iten.classList.add(classe_nova);
    return console.log('troquei da classe: '+classe_antiga+" para a classe: "+classe_nova)
};
function inserir_hora(){
    texto_botao=this.innerText;
    input_hora.value=0+texto_botao[0,1];
    input_minuto.value=0+texto_botao[2,4];
    input_segundo.value=texto_botao[5,6]+0;
    console.log(texto_botao[2,4])
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
function contagem_regressiva(){
    // DISPERTADOR
    if (hora_restante.minuto==0 & hora_restante.hora==0 & hora_restante.segundo==1){
        timer.dispertar()
        repetidor.limpar_contagem(contagem_regressiva)
        console.log('entrei')
    }
    if (hora_restante.segundo==0 & hora_restante.minuto>0){
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
    tempo.innerText=hora_restante.formatado
};
/*  ------------------------------------------------------------- */
function confirmar(){

}
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
var relogio=window.document.getElementById("relogio")
var bt_confirmar=document.getElementById("bt_confirmar")
var tempo=document.getElementById("tempo")
var audio=document.getElementById('audio')
var progress_bar=document.getElementById("restante")
var bt_desligar=document.getElementById("bt_desligar_alarme")
var bt_hora1=document.getElementsByClassName("bt_hora")[0]
var bt_hora2=document.getElementsByClassName("bt_hora")[1]
var bt_hora3=document.getElementsByClassName("bt_hora")[2]

/*                          REFERENCIA HTML       */
                    // // ESTÂNCIAS

                    // // ESTÂNCIAS

repetidor=new Repetidor()
rel=new Relogio()
rel.associar(relogio)
formatador=new Formatador()
formatador_dispertador=new Formatador()
formatador_tempo_restante=new Formatador()
controlador=new Controlador()
timer=new Timer()

/*                    ASSOCIAR  EVENTOS       */
bt_confirmar.addEventListener('click',timer.novo_timer)
bt_desligar.addEventListener('click',timer.desligar_dispertador)
bt_hora1.addEventListener("click",inserir_hora)
bt_hora2.addEventListener("click",inserir_hora)
bt_hora3.addEventListener("click",inserir_hora)
/*                    ASSOCIAR  EVENTOS       */
