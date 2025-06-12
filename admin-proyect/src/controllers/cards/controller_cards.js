import { CardsModel } from  '../../models/model_cards.js' ;

export const CardsController = {

    async getCards(){
        try{
            console.log('Controller: Solicitando tarjetas...');
            const cards = await CardsModelgetCards();
            console.log('Controller: Tarjetas recibidas:', cards);

            return {
                success: true,
                data: cards
            };
        } catch (error){
            console.error('Error en controlador de tarjetas:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}