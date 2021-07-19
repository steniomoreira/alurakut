const TOKEN = '3698fba0b4083b85569d0be1afe642';    
import { SiteClient } from 'datocms-client';

export default async function recebedorDeResquests(request, response) {
    if (request.method === 'POST') {        
        const client = new SiteClient(TOKEN);
    
        const registroCriado =  await client.items.create({
            itemType: "977031",
            ...request.body
            //title: "Aloha Nalu",
            //imageUrl: "https://github.com/steniomoreira.png",
            //urlMedia:'',
            //creatorSlug:"steniomoreira"
        })
  
        response.json({
            dados: registroCriado
        });
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })

}