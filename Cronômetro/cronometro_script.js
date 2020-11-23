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
class Cronometro{
    iniciar(){
        bt_confirmar.removeEventListener('click', cronometro.iniciar, false);
        bt_confirmar.addEventListener('click',cronometro.desligar_cronometro)
        trocar_classe(bt_confirmar,"bt_confirmar","bt_confirmar_PARAR")
        bt_confirmar.innerText="PARAR"
        crono=setInterval(function(){
            hora_restante.centesimo+=1
            if (hora_restante.centesimo==100){
                hora_restante.segundo+=1
                hora_restante.centesimo=0
            };
            if (hora_restante.segundo==59){
                hora_restante.minuto+=1
                hora_restante.segundo=0
            };
            if (hora_restante.minuto==60){
                hora_restante.hora+=1
                hora_restante.minuto=0
            };
            let f_hora_restante=String(hora_restante.hora)
            let f_minuto_restante=String(hora_restante.minuto)
            let f_segundo_restante=String(hora_restante.segundo)
            hora_restante.formatado=(formatador_tempo_restante.formatatar_hora(f_hora_restante,f_minuto_restante,f_segundo_restante))
            tempo.innerText=hora_restante.formatado
            centesimo.innerText=hora_restante.centesimo
        },10)
    }
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
    desligar_cronometro(){
        hora_restante.hora=0
        hora_restante.minuto=0
        hora_restante.segundo=0
        hora_restante.centesimo=0
        clearInterval(crono)
        bt_confirmar.removeEventListener('click', cronometro.desligar_cronometro, false);
        bt_confirmar.addEventListener('click',cronometro.iniciar)
        trocar_classe(bt_confirmar,"bt_confirmar_PARAR","bt_confirmar")
        bt_confirmar.innerText="INICIAR"

    };
};
function trocar_classe(iten,classe_antiga,classe_nova){
    iten.classList.remove(classe_antiga);
    iten.classList.add(classe_nova);
    return console.log('troquei da classe: '+classe_antiga+" para a classe: "+classe_nova)
};
/*  ------------------------------------------------------------- */
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
    centesimo:00,
    formatado:"00:00:00"
};
var func=[]
var crono
/*                   VARIAVEIS GLOBAIS        */
/*                   REFERENCIA HTML       */
var relogio=window.document.getElementById("relogio")
var bt_confirmar=document.getElementById("bt_confirmar")
var tempo=document.getElementById("tempo")
var centesimo=document.getElementById('centesimo')



/*                          REFERENCIA HTML       */
                    // // ESTÂNCIAS

                    // // ESTÂNCIAS

repetidor=new Repetidor()
rel=new Relogio()
rel.associar(relogio)
formatador=new Formatador()
formatador_tempo_restante=new Formatador()
cronometro=new Cronometro()

/*                    ASSOCIAR  EVENTOS       */
bt_confirmar.addEventListener('click',cronometro.iniciar)
/*                    ASSOCIAR  EVENTOS       */
