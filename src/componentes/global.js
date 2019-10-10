var url = process.env.REACT_APP_API_URL;

const global = {
    CIDADES : url+"/cidades",
    ITEM : url+"/item",
    TRANSPORTADORAS : url+"/transportadoras",
    ENVIAREMAIL : url+"/htmlemail",
    LOGIN : url+"/login",
    VERIFICATOKEN: url+"/verificaToken",
    EMAILS: [
        {nome: "EDIVALDO",  email: "edivaldo.salvador@vitoriadistribuidorarp.com.br"},
        {nome: "IAGO",  email: "sergio.iago@vitoriadistribuidorarp.com.br"},
        {nome: "PAULO LEONARDO",  email: "paulo.leonardo@vitoriadistribuidorarp.com.br"},
        {nome: "PAULO MENDES",  email: "paulo.mendes@vitoriadistribuidorarp.com.br"},
        {nome: "RAFAEL",  email: "rafael.ribeiro@vitoriadistribuidorarp.com.br"},
        {nome: "RAFAEL - OUTLOOK",  email: "rafaelvinicius_10@hotmail.com"}

    ]
}

export default global;