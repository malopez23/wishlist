import type { Product } from "../types/Product";

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fone Bluetooth',
    price: 199.99,
    description: 'Fone sem fio com cancelamento de ruído',
    imageUrl: 'https://a-static.mlcdn.com.br/800x560/fone-de-ouvido-sem-fio-jbl-live-pro-2-bluetooth-cancelamento-de-ruido-resistente-a-agua-preto-28913800/kabum/356958/cbb53f5d4e85aaceece789d827a4e786.jpeg',
    link: 'https://www.magazineluiza.com.br/fone-de-ouvido-sem-fio-jbl-live-pro-2-bluetooth-cancelamento-de-ruido-resistente-a-agua-preto-28913800/p/ece9j7b4d4/ea/fobt/',
    category: 'Eletrônicos',
    priority: 'Alta',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Tênis Esportivo',
    price: 349.90,
    description: 'Confortável e ideal para corridas',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTToY1AilYKaiwCqRJjM07Yhzb2jJRkPO3Pw&s',
    link: 'https://www.netshoes.com.br/p/tenis-masculino-corrida-advanced-run-academia-professional-ultra-leve-preto-0D2-1344-006',
    category: 'Esportes',
    priority: 'Média',
    createdAt: new Date(),
  },
];
