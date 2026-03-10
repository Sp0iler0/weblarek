import './scss/styles.scss';

import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';

import { ProductCatalog } from './components/models/ProductCatalog';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';
import { ShopApi } from './components/api/ShopApi';

import { GalleryView } from './components/views/GalleryView';
import { HeaderView } from './components/views/HeaderView';
import { BasketView } from './components/views/BasketView';
import { BasketItemView } from './components/views/BasketItemView';
import { CatalogCard } from './components/views/CatalogCard';
import { PreviewCard } from './components/views/PreviewCard';
import { Modal } from './components/views/Modal';
import { OrderDetailsForm } from './components/views/OrderDetailsForm';
import { BuyerContactsForm } from './components/views/BuyerContactsForm';
import { SuccessMessage } from './components/views/SuccessMessage';

import type { IProduct, IOrderRequest } from './types';
import { API_URL, CDN_URL } from './utils/constants';

const events = new EventEmitter();

// Модели
const catalog = new ProductCatalog(events);
const cart = new Cart(events);
const buyer = new Buyer(events);

// API
const baseApi = new Api(API_URL);
const shopApi = new ShopApi(baseApi);

// Контейнеры страницы
const galleryContainer = document.querySelector('.gallery') as HTMLElement;
const headerContainer = document.querySelector('.header') as HTMLElement;
const modalContainer = document.querySelector('#modal-container') as HTMLElement;

// Шаблоны
const catalogCardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const previewCardTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const basketItemTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

// View
const galleryView = new GalleryView(galleryContainer);
const modal = new Modal(modalContainer);

const headerView = new HeaderView(headerContainer, () => {
  openBasket();
});

function createCatalogCard(product: IProduct): HTMLElement {
  const cardElement = catalogCardTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;

  const card = new CatalogCard(
    cardElement,
    () => {
      catalog.setSelectedProduct(product);
    },
    () => {
      if (cart.hasItem(product.id)) {
        cart.removeItem(product);
      } else {
        cart.addItem(product);
      }
    }
  );

  card.setTitle(product.title);
  card.setCategory(product.category);
  card.setPrice(product.price);
  card.setCardImage(`${CDN_URL}/${product.image}`, product.title);

  return card.render();
}

function createPreviewCard(product: IProduct): HTMLElement {
  const previewElement = previewCardTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;

  const preview = new PreviewCard(previewElement);
  preview.setTitle(product.title);
  preview.setCategory(product.category);
  preview.setPrice(product.price);
  preview.setCardImage(`${CDN_URL}/${product.image}`, product.title);
  preview.setDescription(product.description);

  preview.onButtonClick(() => {
    if (cart.hasItem(product.id)) {
      cart.removeItem(product);
    } else {
      cart.addItem(product);
    }
  });

  return preview.render();
}

function createBasketItem(product: IProduct, index: number): HTMLElement {
  const itemElement = basketItemTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;

  const item = new BasketItemView(itemElement, () => {
    cart.removeItem(product);
  });

  item.setTitle(product.title);
  item.setPrice(product.price ?? 0);
  item.setIndex(index + 1);

  return item.render();
}

function openBasket(): void {
  const basketElement = basketTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;

  const basketView = new BasketView(basketElement, () => {
    openOrderForm();
  });

  const items = cart.getItems().map((product: IProduct, index: number) =>
    createBasketItem(product, index)
  );

  basketView.render(items, cart.getTotal());
  basketView.setSubmitDisabled(cart.getCount() === 0);

  modal.open(basketView.render(items, cart.getTotal()));
}

function openOrderForm(): void {
  const orderElement = orderTemplate.content.firstElementChild!.cloneNode(true) as HTMLFormElement;

  const orderForm = new OrderDetailsForm(
    orderElement,
    (data: { payment?: string; address?: string }) => {
      if (data.payment !== undefined) {
        buyer.setData({
          payment: data.payment === 'card' ? 'online' : 'offline',
        });
      }

      if (data.address !== undefined) {
        buyer.setData({ address: data.address });
      }

      const errors = buyer.validate();
      orderForm.setErrors(errors);
      orderForm.setDisabled(Boolean(errors.payment || errors.address));
    },
    () => {
      const errors = buyer.validate();
      orderForm.setErrors(errors);

      if (!errors.payment && !errors.address) {
        openContactsForm();
      }
    }
  );

  const buyerData = buyer.getData();
  orderForm.setPayment(buyerData.payment);
  orderForm.setAddress(buyerData.address);

  const orderErrors = buyer.validate();
  orderForm.setErrors(orderErrors);
  orderForm.setDisabled(Boolean(orderErrors.payment || orderErrors.address));

  modal.open(orderElement);
}

function openContactsForm(): void {
  const contactsElement = contactsTemplate.content.firstElementChild!.cloneNode(true) as HTMLFormElement;

  const contactsForm = new BuyerContactsForm(
    contactsElement,
    (data: { email?: string; phone?: string }) => {
      buyer.setData(data);

      const errors = buyer.validate();
      contactsForm.setErrors(errors);
      contactsForm.setDisabled(Boolean(errors.email || errors.phone));
    },
    async () => {
      const errors = buyer.validate();
      contactsForm.setErrors(errors);

      if (errors.email || errors.phone) {
        return;
      }

      const buyerData = buyer.getData();

      const order: IOrderRequest = {
        payment: buyerData.payment,
        email: buyerData.email,
        phone: buyerData.phone,
        address: buyerData.address,
        items: cart.getItems().map((item: IProduct) => item.id),
        total: cart.getTotal(),
      };

      try {
        const result = await shopApi.createOrder(order);
        openSuccess(result.total);
        cart.clear();
        buyer.clear();
      } catch (error) {
        console.error('Ошибка оформления заказа:', error);
      }
    }
  );

  const buyerData = buyer.getData();
  contactsForm.setEmail(buyerData.email);
  contactsForm.setPhone(buyerData.phone);

  const contactsErrors = buyer.validate();
  contactsForm.setErrors(contactsErrors);
  contactsForm.setDisabled(Boolean(contactsErrors.email || contactsErrors.phone));

  modal.open(contactsElement);
}

function openSuccess(total: number): void {
  const successElement = successTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;

  const successMessage = new SuccessMessage(successElement);
  successMessage.setTitle('Заказ оформлен');
  successMessage.setDescription(`Списано ${total} синапсов`);
  successMessage.onClose(() => {
    modal.close();
  });

  modal.open(successMessage.render());
}

// События моделей

events.on('catalog:changed', () => {
  const cards = catalog.getProducts().map((product) => createCatalogCard(product));
  galleryView.render(cards);
});

events.on('preview:changed', () => {
  const product = catalog.getSelectedProduct();
  if (!product) return;

  modal.open(createPreviewCard(product));
});

events.on('cart:changed', () => {
  headerView.setCounter(cart.getCount());
});

events.on('buyer:changed', () => {
  // Данные покупателя обновляются в модели.
  // Перерисовка форм выполняется при открытии соответствующих модальных окон.
});

// Загрузка каталога

shopApi
  .getProducts()
  .then((products) => {
    catalog.setProducts(products);
  })
  .catch((error) => {
    console.error('Ошибка загрузки каталога:', error);
  });