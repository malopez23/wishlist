export type Priority = 'Alta' | 'Média' | 'Baixa';
export type Category = 'Eletrônicos' | 'Roupas' | 'Decoração' | 'Esportes' | 'Livros' | 'Outros';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  link: string;
  category: Category;
  priority: Priority;
  createdAt: Date;
}