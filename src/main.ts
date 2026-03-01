import './scss/styles.scss';

import { ProductCatalog } from './components/models/ProductCatalog';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';
import { ShopApi } from './components/api/ShopApi';
import { Api } from './components/base/Api';

// --- Создаём модели ---
const catalog = new ProductCatalog();
const cart = new Cart();
const buyer = new Buyer();

// --- Подключаем API ---
const baseApi = new Api(import.meta.env.VITE_API_ORIGIN);
const shopApi = new ShopApi(baseApi);

console.log('Старт приложения');
console.log('API origin:', import.meta.env.VITE_API_ORIGIN);

// --- Получаем каталог с сервера ---
(async () => {
  try {
    console.log('Запрос каталога...');

    const products = await shopApi.getProducts();

    console.log('Каталог получен с сервера. Количество товаров:', products.length);

    catalog.setProducts(products);
    console.log('Каталог сохранён в модель:', catalog.getProducts());

    const first = catalog.getProducts()[0];

    if (first) {
      console.log('Первый товар:', first);
      console.log('Поиск по id:', catalog.getProductById(first.id));

      catalog.setSelectedProduct(first);
      console.log('Выбранный товар:', catalog.getSelectedProduct());

      cart.addItem(first);
      console.log('Корзина после добавления:', cart.getItems());
      console.log('Total:', cart.getTotal());
    }

  } catch (error) {
    console.error('Ошибка загрузки каталога:', error);
  }
})();

// --- Проверка модели Buyer ---
console.log('Buyer validate (пусто):', buyer.validate());

buyer.setData({
  payment: 'online',
  email: 'test@test.ru',
  phone: '+79990000000',
  address: 'Berlin',
});

console.log('Buyer data:', buyer.getData());
console.log('Buyer validate (заполнено):', buyer.validate());

buyer.clear();
console.log('Buyer после очистки:', buyer.getData(), buyer.validate());