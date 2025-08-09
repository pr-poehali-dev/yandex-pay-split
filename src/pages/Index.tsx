import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const products = [
  {
    id: 1,
    name: 'Кожаная куртка премиум',
    price: 24900,
    originalPrice: 32900,
    image: '/img/8be5ee3e-f1d6-4c58-a6a0-ddf3a27d9ddd.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Черный', 'Коричневый'],
    category: 'Куртки',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: 'Шелковая блуза',
    price: 12900,
    originalPrice: 16900,
    image: '/img/bdcb1bf9-4514-403b-b0eb-dd426194ff80.jpg',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Белый', 'Кремовый', 'Пудровый'],
    category: 'Блузы',
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: 'Сумка из натуральной кожи',
    price: 18900,
    originalPrice: null,
    image: '/img/a6285742-8ed9-4021-8a4f-30d40aee5bae.jpg',
    sizes: ['One Size'],
    colors: ['Золотой', 'Черный', 'Коричневый'],
    category: 'Сумки',
    rating: 4.7,
    reviews: 67
  }
];

const paymentMethods = [
  {
    id: 'yandex-pay',
    name: 'Яндекс Пэй',
    description: 'Быстрая оплата в пару кликов',
    icon: 'CreditCard',
    type: 'instant'
  },
  {
    id: 'yandex-split-2',
    name: 'Сплит 2 месяца',
    description: '4 платежа без переплат',
    icon: 'Calendar',
    type: 'split'
  },
  {
    id: 'yandex-split-4',
    name: 'Сплит 4 месяца',
    description: 'Ежемесячные платежи с небольшой комиссией',
    icon: 'CalendarDays',
    type: 'split'
  },
  {
    id: 'yandex-split-6',
    name: 'Сплит 6 месяцев',
    description: 'Максимально комфортные платежи',
    icon: 'CalendarRange',
    type: 'split'
  }
];

export default function Index() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    size: '',
    color: ''
  });

  const filteredProducts = products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.size && !product.sizes.includes(filters.size)) return false;
    if (filters.color && !product.colors.includes(filters.color)) return false;
    return true;
  });

  const calculateSplitPayment = (price, months) => {
    if (months === 2) return Math.ceil(price / 4);
    const commission = months === 4 ? 0.05 : 0.08;
    return Math.ceil((price * (1 + commission)) / months);
  };

  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-playfair font-bold text-luxury-charcoal">
              PREMIUM STORE
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Heart" size={20} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="ShoppingBag" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <h2 className="text-5xl font-playfair font-bold text-luxury-charcoal mb-4">
            Элегантность в каждой детали
          </h2>
          <p className="text-lg text-muted-foreground font-source max-w-2xl mx-auto mb-8">
            Премиум коллекция одежды и аксессуаров для тех, кто ценит качество и стиль
          </p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-luxury-gold text-luxury-charcoal px-4 py-2">
              <Icon name="Diamond" size={16} className="mr-2" />
              Премиум качество
            </Badge>
            <Badge className="bg-luxury-gold text-luxury-charcoal px-4 py-2">
              <Icon name="Crown" size={16} className="mr-2" />
              Эксклюзивные модели
            </Badge>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-playfair font-semibold">Фильтры</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-source font-semibold mb-2 block">Категория</label>
                  <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Все категории" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Все категории</SelectItem>
                      <SelectItem value="Куртки">Куртки</SelectItem>
                      <SelectItem value="Блузы">Блузы</SelectItem>
                      <SelectItem value="Сумки">Сумки</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-source font-semibold mb-2 block">Размер</label>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                      <Button
                        key={size}
                        variant={filters.size === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilters({...filters, size: filters.size === size ? '' : size})}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-source font-semibold mb-2 block">Цвет</label>
                  <Select value={filters.color} onValueChange={(value) => setFilters({...filters, color: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Все цвета" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Все цвета</SelectItem>
                      <SelectItem value="Черный">Черный</SelectItem>
                      <SelectItem value="Белый">Белый</SelectItem>
                      <SelectItem value="Коричневый">Коричневый</SelectItem>
                      <SelectItem value="Золотой">Золотой</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-playfair font-semibold">
                Товары ({filteredProducts.length})
              </h3>
              <Select defaultValue="popular">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">По популярности</SelectItem>
                  <SelectItem value="price-low">По возрастанию цены</SelectItem>
                  <SelectItem value="price-high">По убыванию цены</SelectItem>
                  <SelectItem value="new">Новинки</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>
                      
                      <h4 className="font-playfair font-semibold text-lg mb-2">{product.name}</h4>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl font-bold text-luxury-charcoal">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice.toLocaleString('ru-RU')} ₽
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.sizes.slice(0, 3).map(size => (
                          <Badge key={size} variant="outline" className="text-xs">
                            {size}
                          </Badge>
                        ))}
                        {product.sizes.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{product.sizes.length - 3}
                          </Badge>
                        )}
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-charcoal font-source font-semibold"
                            onClick={() => setSelectedProduct(product)}
                          >
                            Выбрать и купить
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="font-playfair text-xl">
                              {selectedProduct?.name}
                            </DialogTitle>
                          </DialogHeader>
                          
                          {selectedProduct && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <img
                                  src={selectedProduct.image}
                                  alt={selectedProduct.name}
                                  className="w-full aspect-square object-cover rounded-lg"
                                />
                              </div>
                              
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-source font-semibold mb-2">Размер</h4>
                                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Выберите размер" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {selectedProduct.sizes.map(size => (
                                        <SelectItem key={size} value={size}>{size}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <h4 className="font-source font-semibold mb-2">Цвет</h4>
                                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Выберите цвет" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {selectedProduct.colors.map(color => (
                                        <SelectItem key={color} value={color}>{color}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <Separator />

                                <div>
                                  <h4 className="font-source font-semibold mb-3">Способы оплаты</h4>
                                  <div className="space-y-3">
                                    {paymentMethods.map(method => (
                                      <div key={method.id} className="flex items-start space-x-3">
                                        <Checkbox
                                          id={method.id}
                                          checked={selectedPayment === method.id}
                                          onCheckedChange={(checked) => {
                                            setSelectedPayment(checked ? method.id : '');
                                          }}
                                        />
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2">
                                            <Icon name={method.icon} size={16} className="text-luxury-gold" />
                                            <label htmlFor={method.id} className="font-source font-semibold cursor-pointer">
                                              {method.name}
                                            </label>
                                          </div>
                                          <p className="text-sm text-muted-foreground">
                                            {method.description}
                                          </p>
                                          {method.type === 'split' && (
                                            <p className="text-sm font-semibold text-luxury-gold">
                                              от {calculateSplitPayment(selectedProduct.price, method.id.includes('2') ? 2 : method.id.includes('4') ? 4 : 6).toLocaleString('ru-RU')} ₽/мес
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="pt-4">
                                  <div className="flex justify-between items-center mb-4">
                                    <span className="font-source">Итого:</span>
                                    <span className="text-2xl font-bold font-playfair">
                                      {selectedProduct.price.toLocaleString('ru-RU')} ₽
                                    </span>
                                  </div>
                                  <Button 
                                    className="w-full bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-charcoal font-source font-semibold"
                                    disabled={!selectedSize || !selectedColor || !selectedPayment}
                                  >
                                    Оформить заказ
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods Info */}
        <section className="mt-16 py-12 bg-white rounded-lg">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-playfair font-bold text-luxury-charcoal mb-4">
              Яндекс Пэй + Сплит: удобная оплата сразу или частями
            </h3>
            <p className="text-lg text-muted-foreground font-source max-w-3xl mx-auto">
              Мы подключили Яндекс Пэй для быстрой оплаты и Яндекс Сплит для оплаты частями
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center">
                  <Icon name="CreditCard" size={24} className="text-luxury-charcoal" />
                </div>
                <h4 className="text-xl font-playfair font-semibold">Яндекс Пэй</h4>
              </div>
              <p className="text-muted-foreground font-source mb-4">
                Яндекс Пэй надёжно хранит данные банковских карт. Добавьте их один раз, 
                чтобы не вводить вручную при каждой оплате. Понадобится всего пара кликов.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground font-source">
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  Быстрая оплата в 2 клика
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  Надежная защита данных
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  Без комиссий
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center">
                  <Icon name="Calendar" size={24} className="text-luxury-charcoal" />
                </div>
                <h4 className="text-xl font-playfair font-semibold">Яндекс Сплит</h4>
              </div>
              <p className="text-muted-foreground font-source mb-4">
                Сплит делит оплату на части — платежи можно вносить постепенно. 
                Покупку вы получите после первого платежа — то есть сразу.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-source font-semibold">2 месяца</span>
                  <span className="text-green-500 font-source">Без переплат</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-source font-semibold">4-6 месяцев</span>
                  <span className="text-muted-foreground font-source">Небольшая комиссия</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground font-source">
              Чтобы воспользоваться Яндекс Пэй или Сплитом, выберите их в способах оплаты при заказе
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-luxury-charcoal text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="font-playfair font-bold text-xl mb-4">PREMIUM STORE</h5>
              <p className="text-gray-300 font-source">
                Премиум коллекция одежды и аксессуаров для взыскательных клиентов
              </p>
            </div>
            <div>
              <h6 className="font-source font-semibold mb-4">Покупателям</h6>
              <ul className="space-y-2 text-gray-300 font-source">
                <li>Размерная сетка</li>
                <li>Доставка и возврат</li>
                <li>Способы оплаты</li>
                <li>Гарантия качества</li>
              </ul>
            </div>
            <div>
              <h6 className="font-source font-semibold mb-4">Контакты</h6>
              <ul className="space-y-2 text-gray-300 font-source">
                <li>8 800 123-45-67</li>
                <li>info@premiumstore.ru</li>
                <li>Москва, ул. Тверская, 1</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-600" />
          <div className="text-center text-gray-400 font-source">
            <p>&copy; 2024 Premium Store. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}