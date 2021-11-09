
    numero_da_questao = 0

    async function init(){

        // get content

        arquivo = window.location.href.split("?").pop()

        x = await fetch(arquivo+'.txt')
        x = await x.text()

        //text to array object
        obj = []
        n = 0
        for(item of x.split("\r\n\r\n\r\n")){
            pergunta = item.split("#")[0]
            resposta = item.split("#")[1]
            obj.push({
                per:pergunta, 
                res:resposta, 
                per_html:msg(pergunta),
                res_html:msg(resposta)
            })
        }

        listaesquerda(obj)
        light(0)
        // questao(obj,0)
        post(obj[0].per,0)
            
    }

    init()


//estrutura da div
function msg(msg,n){

if(n == 0)
    s = `<pre class="shadow max-w-3 bg-black-3 m-1 p-1 rounded opacity-0">${msg}</pre>`
else
    s = `<pre class="shadow max-w-3 bg-black-1 m-1 p-1 rounded self-end opacity-0">${msg}</pre>`

return stringtotag(s)
}

function post(str,n){
    chat.appendChild(msg(str,n))
    
    chat.lastChild.classList.add('opacity-0')
    
    setTimeout(()=>{
        chat.lastChild.classList.add('opacity-1')
        chat.lastChild.classList.remove('opacity-0')
    },100)
}

function hr(){chat.appendChild(stringtotag("<hr/>"))}


// string to dom
function stringtotag(str){
    div = document.createElement("div")
    div.innerHTML = str
    return div.children[0]
}


function stringtotag(str){
    div = document.createElement("div")
    div.innerHTML = str
    return div.children[0]
}


barra.onkeyup=function(e){
    if(e.key == "Enter" && this.value.length > 0){
        
        // questao(obj ,numero_da_questao)
        
        post(this.value,1)
        chat.lastChild.classList.remove('opacity-0')
        this.value = ""
        
        post(obj[numero_da_questao].res ,0)
        
        endScroll()

        setTimeout(()=>{
            hr()
            post(obj[++numero_da_questao].per ,0)
            light(numero_da_questao)
            endScroll()
        },1000)

        
    }
}

function questao(o,n){
    chat.appendChild(o[n].per_html)
    chat.lastChild.classList.add('opacity-1')
    light(n)
    chat.scrollTo(0,chat.scrollHeight)
}


function listaesquerda(o){
    nu = 0
    o.map(e=>{
        p = document.createElement('p')
        p.className = "cursor-pointer some text-gray"
        p.po = nu
        p.innerHTML = (nu++)+") "+e.per
        p.onclick=function(){
            numero_da_questao = this.po
            hr()
            questao(obj,this.po)
            endScroll()
        }
        lista_de_questoes.appendChild(p)
    })
}

function endScroll(){
    chat.scrollTo(0,chat.scrollHeight)
}

function light(n){
    for(i of lista_de_questoes.children)
        i.classList.remove('light')
    lista_de_questoes.children[n].classList.add('light')
}

bt_prev.onclick=()=>{
    lista_de_questoes.classList.toggle('flex-0')
    lista_de_questoes.classList.toggle('flex-2')
}