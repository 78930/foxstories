import mongoose from 'mongoose';
import MenuItem from './src/models/MenuItem.js';
import dotenv from 'dotenv';

dotenv.config();

const menuData = [
  // Chicken - 379
  { name: 'Schezwan Chicken', category: 'chicken', price: 379, description: 'Spicy schezwan style chicken', vegetarian: false, available: true },
  { name: 'Garlic Chicken', category: 'chicken', price: 379, description: 'Tender chicken with garlic', vegetarian: false, available: true },
  { name: 'Lemon Coriander Chicken', category: 'chicken', price: 379, description: 'Fresh lemon and coriander chicken', vegetarian: false, available: true },
  { name: 'Coriander Chicken', category: 'chicken', price: 379, description: 'Aromatic coriander chicken', vegetarian: false, available: true },
  { name: 'Black Mint Chicken', category: 'chicken', price: 379, description: 'Black mint spiced chicken', vegetarian: false, available: true },
  { name: '828 Chicken', category: 'chicken', price: 379, description: 'Special 828 chicken recipe', vegetarian: false, available: true },
  { name: 'Kung Pao Chicken', category: 'chicken', price: 379, description: 'Classic kung pao style chicken', vegetarian: false, available: true },
  { name: 'Chicken Majestic', category: 'chicken', price: 379, description: 'Premium chicken majestic', vegetarian: false, available: true },
  { name: 'Teragi Chicken', category: 'chicken', price: 379, description: 'Teragi style chicken', vegetarian: false, available: true },
  { name: 'Honey Sesame Chicken', category: 'chicken', price: 379, description: 'Sweet honey sesame chicken', vegetarian: false, available: true },
  { name: 'Chicken Salt & Pepper', category: 'chicken', price: 379, description: 'Crispy salt and pepper chicken', vegetarian: false, available: true },
  { name: 'Crispy Chicken', category: 'chicken', price: 399, description: 'Extra crispy fried chicken', vegetarian: false, available: true },
  { name: 'Mongolian Chicken', category: 'chicken', price: 379, description: 'Mongolian style chicken', vegetarian: false, available: true },
  { name: 'Chilli Chicken', category: 'chicken', price: 379, description: 'Spicy chilli chicken', vegetarian: false, available: true },
  { name: 'Oyster Chicken', category: 'chicken', price: 379, description: 'Oyster sauce chicken', vegetarian: false, available: true },
  { name: 'Hunan Chicken', category: 'chicken', price: 379, description: 'Hunan style chicken', vegetarian: false, available: true },
  { name: 'Korean Chicken', category: 'chicken', price: 379, description: 'Korean style chicken', vegetarian: false, available: true },
  { name: 'Hakka Chilli Chicken', category: 'chicken', price: 379, description: 'Hakka chilli chicken', vegetarian: false, available: true },
  { name: 'Dragon Chicken', category: 'chicken', price: 379, description: 'Dragon style chicken', vegetarian: false, available: true },
  { name: 'Chicken 555', category: 'chicken', price: 379, description: 'Special chicken 555', vegetarian: false, available: true },
  { name: 'Chicken Drumstick', category: 'chicken', price: 379, description: 'Marinated chicken drumstick', vegetarian: false, available: true },
  { name: 'Chicken Lollipop', category: 'chicken', price: 379, description: 'Chicken lollipop bites', vegetarian: false, available: true },

  // Chinese Platters
  { name: 'Chinese Platter', category: 'platters', price: 599, description: 'Assorted Chinese platter', vegetarian: false, available: true },
  { name: 'Chinese Combo', category: 'platters', price: 569, description: 'Chinese combo special', vegetarian: false, available: true },

  // Prawns - 399
  { name: 'Schezwan Prawn', category: 'seafood', price: 399, description: 'Spicy schezwan prawns', vegetarian: false, available: true },
  { name: 'Singapore Prawn', category: 'seafood', price: 399, description: 'Singapore style prawns', vegetarian: false, available: true },
  { name: 'Golden Fry Prawn', category: 'seafood', price: 399, description: 'Golden fried prawns', vegetarian: false, available: true },
  { name: 'Butter Garlic Prawn', category: 'seafood', price: 399, description: 'Butter and garlic prawns', vegetarian: false, available: true },
  { name: 'Korean Prawn', category: 'seafood', price: 399, description: 'Korean style prawns', vegetarian: false, available: true },

  // Fish
  { name: 'Schezwan Fish', category: 'seafood', price: 399, description: 'Spicy schezwan fish', vegetarian: false, available: true },
  { name: 'Apollo Fish', category: 'seafood', price: 399, description: 'Apollo style fish', vegetarian: false, available: true },
  { name: 'Singapore Fish', category: 'seafood', price: 399, description: 'Singapore style fish', vegetarian: false, available: true },
  { name: 'Fish Fry', category: 'seafood', price: 399, description: 'Crispy fish fry', vegetarian: false, available: true },
  { name: 'Garlic Fish', category: 'seafood', price: 399, description: 'Garlic flavored fish', vegetarian: false, available: true },
  { name: 'Korean Fish', category: 'seafood', price: 399, description: 'Korean style fish', vegetarian: false, available: true },
  { name: 'Black Mint Fish', category: 'seafood', price: 399, description: 'Black mint fish', vegetarian: false, available: true },
  { name: 'Red Chilli Fish', category: 'seafood', price: 399, description: 'Red chilli fish', vegetarian: false, available: true },
  { name: 'Chilli Lamp', category: 'seafood', price: 489, description: 'Spicy chilli lamp fish', vegetarian: false, available: true },

  // Vegetarian Starters - Paneer
  { name: 'Paneer Kurkure', category: 'veg_starter', price: 309, description: 'Crispy paneer kurkure', vegetarian: true, available: true },
  { name: 'Paneer 555', category: 'veg_starter', price: 309, description: 'Paneer 555 special', vegetarian: true, available: true },
  { name: 'Paneer Majestic', category: 'veg_starter', price: 309, description: 'Paneer majestic', vegetarian: true, available: true },
  { name: 'Paneer Sathe', category: 'veg_starter', price: 309, description: 'Paneer sathe', vegetarian: true, available: true },
  { name: 'Paneer Cutlet', category: 'veg_starter', price: 309, description: 'Crispy paneer cutlet', vegetarian: true, available: true },
  { name: 'Ginger Paneer', category: 'veg_starter', price: 309, description: 'Ginger flavored paneer', vegetarian: true, available: true },
  { name: 'Paneer Salt & Pepper', category: 'veg_starter', price: 309, description: 'Salt and pepper paneer', vegetarian: true, available: true },
  { name: 'Schezwan Paneer', category: 'veg_starter', price: 309, description: 'Spicy schezwan paneer', vegetarian: true, available: true },
  { name: 'Korean Paneer', category: 'veg_starter', price: 309, description: 'Korean style paneer', vegetarian: true, available: true },
  { name: 'Coriander Paneer', category: 'veg_starter', price: 309, description: 'Coriander paneer', vegetarian: true, available: true },

  // Baby Corn
  { name: 'Ginger Baby Corn', category: 'veg_starter', price: 309, description: 'Ginger baby corn', vegetarian: true, available: true },
  { name: 'Coriander Baby Corn', category: 'veg_starter', price: 309, description: 'Coriander baby corn', vegetarian: true, available: true },
  { name: 'Salt & Pepper Baby Corn', category: 'veg_starter', price: 309, description: 'Salt and pepper baby corn', vegetarian: true, available: true },
  { name: 'Schezwan Baby Corn', category: 'veg_starter', price: 309, description: 'Spicy schezwan baby corn', vegetarian: true, available: true },
  { name: 'Baby Corn 555', category: 'veg_starter', price: 309, description: 'Baby corn 555', vegetarian: true, available: true },

  // Mushroom
  { name: 'Ginger Mushroom', category: 'veg_starter', price: 309, description: 'Ginger mushroom', vegetarian: true, available: true },
  { name: 'Garlic Mushroom', category: 'veg_starter', price: 309, description: 'Garlic mushroom', vegetarian: true, available: true },
  { name: 'Mushroom Lollipop', category: 'veg_starter', price: 309, description: 'Mushroom lollipop', vegetarian: true, available: true },
  { name: 'Coriander Mushroom', category: 'veg_starter', price: 309, description: 'Coriander mushroom', vegetarian: true, available: true },
  { name: 'Korean Mushroom', category: 'veg_starter', price: 309, description: 'Korean mushroom', vegetarian: true, available: true },
  { name: 'Crispy Vegetable', category: 'veg_starter', price: 309, description: 'Crispy mixed vegetables', vegetarian: true, available: true },

  // Gobi
  { name: 'Coriander Gobi', category: 'veg_starter', price: 309, description: 'Coriander cauliflower', vegetarian: true, available: true },
  { name: 'Korean Gobi', category: 'veg_starter', price: 309, description: 'Korean cauliflower', vegetarian: true, available: true },
  { name: 'Ginger Gobi', category: 'veg_starter', price: 309, description: 'Ginger cauliflower', vegetarian: true, available: true },
  { name: 'Schezwan Gobi', category: 'veg_starter', price: 309, description: 'Spicy schezwan cauliflower', vegetarian: true, available: true },

  // Momos
  { name: 'Schezwan Momo Veg', category: 'momos', price: 269, description: 'Spicy vegetarian momos', vegetarian: true, available: true },
  { name: 'Schezwan Momo Non Veg', category: 'momos', price: 289, description: 'Spicy chicken momos', vegetarian: false, available: true },
  { name: 'Veg Momo', category: 'momos', price: 269, description: 'Vegetable momos', vegetarian: true, available: true },
  { name: 'Paneer Momo', category: 'momos', price: 269, description: 'Paneer momos', vegetarian: true, available: true },
  { name: 'Chicken Momo', category: 'momos', price: 289, description: 'Chicken momos', vegetarian: false, available: true },
  { name: 'Crispy Momo Veg', category: 'momos', price: 269, description: 'Crispy vegetable momos', vegetarian: true, available: true },
  { name: 'Crispy Momo Non Veg', category: 'momos', price: 289, description: 'Crispy chicken momos', vegetarian: false, available: true },
  { name: 'Pan Fry Momo Veg', category: 'momos', price: 269, description: 'Pan fried vegetable momos', vegetarian: true, available: true },
  { name: 'Pan Fry Momo Non Veg', category: 'momos', price: 289, description: 'Pan fried chicken momos', vegetarian: false, available: true },

  // Vegetable Fried Rice
  { name: 'Veg Fried Rice', category: 'fried_rice', price: 289, description: 'Mixed vegetable fried rice', vegetarian: true, available: true },
  { name: 'Born Garlic Fried Rice', category: 'fried_rice', price: 289, description: 'Garlic fried rice', vegetarian: true, available: true },
  { name: 'Ginger Fried Rice', category: 'fried_rice', price: 289, description: 'Ginger fried rice', vegetarian: true, available: true },
  { name: 'Chilli Garlic Fried Rice', category: 'fried_rice', price: 289, description: 'Chilli garlic fried rice', vegetarian: true, available: true },
  { name: 'Manchurian Fried Rice', category: 'fried_rice', price: 289, description: 'Manchurian style fried rice', vegetarian: true, available: true },
  { name: 'Veg Schezwan Fried Rice', category: 'fried_rice', price: 289, description: 'Spicy vegetable fried rice', vegetarian: true, available: true },
  { name: 'Gobi Fried Rice', category: 'fried_rice', price: 289, description: 'Cauliflower fried rice', vegetarian: true, available: true },
  { name: 'Paneer Fried Rice', category: 'fried_rice', price: 289, description: 'Paneer fried rice', vegetarian: true, available: true },
  { name: 'Kaju Fried Rice', category: 'fried_rice', price: 289, description: 'Cashew fried rice', vegetarian: true, available: true },
  { name: 'Mushroom Fried Rice', category: 'fried_rice', price: 289, description: 'Mushroom fried rice', vegetarian: true, available: true },
  { name: 'Corn Capsicum Fried Rice', category: 'fried_rice', price: 289, description: 'Corn and capsicum fried rice', vegetarian: true, available: true },
  { name: 'Jeera Rice', category: 'fried_rice', price: 289, description: 'Cumin flavored rice', vegetarian: true, available: true },
  { name: 'Mix Vegetable Fried Rice', category: 'fried_rice', price: 309, description: 'Premium mix vegetable fried rice', vegetarian: true, available: true },
  { name: 'Thai Basil Fried Rice', category: 'fried_rice', price: 319, description: 'Thai basil fried rice', vegetarian: true, available: true },
  { name: 'Thai Chilli Fried Rice', category: 'fried_rice', price: 319, description: 'Thai chilli fried rice', vegetarian: true, available: true },
  { name: 'Nasi Goreng Fried Rice', category: 'fried_rice', price: 339, description: 'Indonesian nasi goreng', vegetarian: true, available: true },

  // Vegetable Noodles
  { name: 'Veg Soft Noodles', category: 'noodles', price: 289, description: 'Soft vegetable noodles', vegetarian: true, available: true },
  { name: 'Chilli Garlic Noodles', category: 'noodles', price: 289, description: 'Chilli garlic noodles', vegetarian: true, available: true },
  { name: 'Brown Garlic Noodles', category: 'noodles', price: 289, description: 'Brown garlic noodles', vegetarian: true, available: true },
  { name: 'Schezwan Noodles', category: 'noodles', price: 289, description: 'Spicy schezwan noodles', vegetarian: true, available: true },
  { name: 'Hakka Noodles', category: 'noodles', price: 289, description: 'Hakka style noodles', vegetarian: true, available: true },
  { name: 'Singapuri Noodles', category: 'noodles', price: 289, description: 'Singapore style noodles', vegetarian: true, available: true },
  { name: 'Border Garlic Noodles', category: 'noodles', price: 289, description: 'Border garlic noodles', vegetarian: true, available: true },
  { name: 'Baby Corn Noodles', category: 'noodles', price: 289, description: 'Baby corn noodles', vegetarian: true, available: true },
  { name: 'Mushroom Noodles', category: 'noodles', price: 289, description: 'Mushroom noodles', vegetarian: true, available: true },
  { name: 'Black Mint Spicy Noodles', category: 'noodles', price: 289, description: 'Black mint spicy noodles', vegetarian: true, available: true },
  { name: 'Gobi Noodles', category: 'noodles', price: 289, description: 'Cauliflower noodles', vegetarian: true, available: true },
  { name: 'Yancha Noodles', category: 'noodles', price: 289, description: 'Yancha style noodles', vegetarian: true, available: true },

  // Chicken Fried Rice
  { name: 'Chicken Fried Rice', category: 'fried_rice', price: 329, description: 'Chicken fried rice', vegetarian: false, available: true },
  { name: 'Double Egg Chicken Fried Rice', category: 'fried_rice', price: 339, description: 'Double egg chicken fried rice', vegetarian: false, available: true },
  { name: 'Schezwan Chicken Fried Rice', category: 'fried_rice', price: 329, description: 'Spicy chicken fried rice', vegetarian: false, available: true },
  { name: 'Brown Garlic Chicken Fried Rice', category: 'fried_rice', price: 329, description: 'Brown garlic chicken fried rice', vegetarian: false, available: true },
  { name: 'Prawns Fried Rice', category: 'fried_rice', price: 339, description: 'Prawn fried rice', vegetarian: false, available: true },
  { name: 'Mix Chicken Fried Rice', category: 'fried_rice', price: 349, description: 'Mix chicken fried rice', vegetarian: false, available: true },
  { name: 'Singapore Chicken Fried Rice', category: 'fried_rice', price: 329, description: 'Singapore chicken fried rice', vegetarian: false, available: true },
  { name: 'Hong Kong Chicken Fried Rice', category: 'fried_rice', price: 329, description: 'Hong Kong chicken fried rice', vegetarian: false, available: true },
  { name: 'Kaju Chicken Fried Rice', category: 'fried_rice', price: 329, description: 'Cashew chicken fried rice', vegetarian: false, available: true },
  { name: 'Egg Fried Rice', category: 'fried_rice', price: 309, description: 'Egg fried rice', vegetarian: false, available: true },
  { name: 'Egg Schezwan Fried Rice', category: 'fried_rice', price: 309, description: 'Egg schezwan fried rice', vegetarian: false, available: true },

  // Chicken Noodles
  { name: 'Egg Schezwan Noodles', category: 'noodles', price: 309, description: 'Egg schezwan noodles', vegetarian: false, available: true },
  { name: 'Egg Noodles', category: 'noodles', price: 309, description: 'Egg noodles', vegetarian: false, available: true },
  { name: 'Double Egg Noodles', category: 'noodles', price: 319, description: 'Double egg noodles', vegetarian: false, available: true },
  { name: 'Schezwan Chicken Noodles', category: 'noodles', price: 309, description: 'Spicy chicken noodles', vegetarian: false, available: true },
  { name: 'Brown Garlic Chicken Noodles', category: 'noodles', price: 319, description: 'Brown garlic chicken noodles', vegetarian: false, available: true },
  { name: 'Singapuri Chicken Noodles', category: 'noodles', price: 309, description: 'Singapore chicken noodles', vegetarian: false, available: true },
  { name: 'Hong Kong Noodles', category: 'noodles', price: 309, description: 'Hong Kong style noodles', vegetarian: false, available: true },
  { name: 'Mushroom Chicken Noodles', category: 'noodles', price: 309, description: 'Mushroom chicken noodles', vegetarian: false, available: true },
  { name: 'Paneer Chicken Noodles', category: 'noodles', price: 329, description: 'Paneer chicken noodles', vegetarian: false, available: true },
  { name: 'Partha Noodles', category: 'noodles', price: 339, description: 'Partha style noodles', vegetarian: false, available: true },
  { name: 'Japanese Noodles', category: 'noodles', price: 329, description: 'Japanese style noodles', vegetarian: false, available: true },
  { name: 'Prawns Noodles', category: 'noodles', price: 339, description: 'Prawn noodles', vegetarian: false, available: true },
  { name: 'Double Egg Chicken Noodles', category: 'noodles', price: 339, description: 'Double egg chicken noodles', vegetarian: false, available: true },

  // Thai Curry
  { name: 'Veg Thai Red Curry', category: 'curry', price: 319, description: 'Vegetable Thai red curry', vegetarian: true, available: true },
  { name: 'Chicken Thai Red Curry', category: 'curry', price: 379, description: 'Chicken Thai red curry', vegetarian: false, available: true },
  { name: 'Veg Thai Green Curry', category: 'curry', price: 319, description: 'Vegetable Thai green curry', vegetarian: true, available: true },
  { name: 'Chicken Thai Green Curry', category: 'curry', price: 379, description: 'Chicken Thai green curry', vegetarian: false, available: true },
  { name: 'Veg Thai Yellow Curry', category: 'curry', price: 319, description: 'Vegetable Thai yellow curry', vegetarian: true, available: true },
  { name: 'Chicken Thai Yellow Curry', category: 'curry', price: 379, description: 'Chicken Thai yellow curry', vegetarian: false, available: true },

  // Chopsy/Sauce
  { name: 'Chinese Sauce', category: 'sauces', price: 249, description: 'Chinese style sauce', vegetarian: true, available: true },
  { name: 'Chinese Chopsy', category: 'sauces', price: 249, description: 'Chinese chopsy', vegetarian: true, available: true },
  { name: 'American Chopsy', category: 'sauces', price: 249, description: 'American chopsy', vegetarian: true, available: true },

  // Non Veg Soups
  { name: 'Hot and Sour Soup', category: 'soup', price: 219, description: 'Hot and sour soup', vegetarian: false, available: true },
  { name: 'Manchow Soup', category: 'soup', price: 219, description: 'Manchow soup', vegetarian: false, available: true },
  { name: 'Long Fom Soup', category: 'soup', price: 219, description: 'Long fom soup', vegetarian: false, available: true },
  { name: 'Lemon Coriander Soup', category: 'soup', price: 219, description: 'Lemon coriander soup', vegetarian: false, available: true },
  { name: 'Lemon Chicken Soup', category: 'soup', price: 219, description: 'Lemon chicken soup', vegetarian: false, available: true },
  { name: 'Hot Pepper Soup', category: 'soup', price: 219, description: 'Hot pepper soup', vegetarian: false, available: true },
  { name: 'Sweet Corn Soup', category: 'soup', price: 219, description: 'Sweet corn soup', vegetarian: false, available: true },
  { name: 'Man Bhawan Special Soup', category: 'soup', price: 219, description: 'Man bhawan special soup', vegetarian: false, available: true },
  { name: 'Tom Yum Soup', category: 'soup', price: 219, description: 'Thai tom yum soup', vegetarian: false, available: true },
  { name: 'Ginger Soup', category: 'soup', price: 219, description: 'Ginger soup', vegetarian: false, available: true },
  { name: 'Tom Kha Soup', category: 'soup', price: 229, description: 'Thai tom kha soup', vegetarian: false, available: true },
  { name: 'Creamy Broccoli Soup', category: 'soup', price: 229, description: 'Creamy broccoli soup', vegetarian: false, available: true },
  { name: 'Creamy Mushroom Soup', category: 'soup', price: 229, description: 'Creamy mushroom soup', vegetarian: false, available: true },

  // Veg Soups
  { name: 'Veg Manchow Soup', category: 'soup', price: 189, description: 'Vegetable manchow soup', vegetarian: true, available: true },
  { name: 'Veg Hot and Sour Soup', category: 'soup', price: 189, description: 'Veg hot and sour soup', vegetarian: true, available: true },
  { name: 'Veg Lemon Coriander Soup', category: 'soup', price: 189, description: 'Veg lemon coriander soup', vegetarian: true, available: true },
  { name: 'Veg Lemon Soup', category: 'soup', price: 189, description: 'Vegetable lemon soup', vegetarian: true, available: true },
  { name: 'Veg Sweet Corn Soup', category: 'soup', price: 189, description: 'Vegetable sweet corn soup', vegetarian: true, available: true },
  { name: 'Veg Hot Pepper Soup', category: 'soup', price: 189, description: 'Veg hot pepper soup', vegetarian: true, available: true },
  { name: 'Tomato Soup', category: 'soup', price: 189, description: 'Tomato soup', vegetarian: true, available: true },
  { name: 'Veg Creamy Broccoli Soup', category: 'soup', price: 209, description: 'Veg creamy broccoli soup', vegetarian: true, available: true },
  { name: 'Veg Creamy Mushroom Soup', category: 'soup', price: 209, description: 'Veg creamy mushroom soup', vegetarian: true, available: true },
  { name: 'Veg Tom Kha Soup', category: 'soup', price: 209, description: 'Vegetable tom kha soup', vegetarian: true, available: true },

  // Rolls & Cutlets
  { name: 'Veg Spring Roll', category: 'rolls', price: 249, description: 'Vegetable spring roll', vegetarian: true, available: true },
  { name: 'Chicken Spring Roll', category: 'rolls', price: 279, description: 'Chicken spring roll', vegetarian: false, available: true },
  { name: 'Dragon Veg Roll', category: 'rolls', price: 249, description: 'Dragon vegetable roll', vegetarian: true, available: true },
  { name: 'Dragon Chicken Roll', category: 'rolls', price: 279, description: 'Dragon chicken roll', vegetarian: false, available: true },
  { name: 'Baby Corn Roll', category: 'rolls', price: 249, description: 'Baby corn spring roll', vegetarian: true, available: true },
  { name: 'Paneer Roll', category: 'rolls', price: 249, description: 'Paneer spring roll', vegetarian: true, available: true },
  { name: 'Mix Roll', category: 'rolls', price: 249, description: 'Mix vegetable roll', vegetarian: true, available: true },
  { name: 'Spanish Corn Roll', category: 'rolls', price: 249, description: 'Spanish corn roll', vegetarian: true, available: true },
  { name: 'Spanish Paneer Roll', category: 'rolls', price: 249, description: 'Spanish paneer roll', vegetarian: true, available: true },
  { name: 'Egg Roll', category: 'rolls', price: 259, description: 'Egg spring roll', vegetarian: false, available: true },
  { name: 'Cheese Cutlet', category: 'rolls', price: 279, description: 'Cheese cutlet', vegetarian: true, available: true },
  { name: 'Vegetable Cutlet', category: 'rolls', price: 279, description: 'Vegetable cutlet', vegetarian: true, available: true },
  { name: 'Cheese Ball', category: 'rolls', price: 279, description: 'Cheese ball', vegetarian: true, available: true },
  { name: 'Crispy Cheese Corn Ball', category: 'rolls', price: 279, description: 'Crispy cheese corn ball', vegetarian: true, available: true },

  // Sizzlers
  { name: 'Yoko Sizzler', category: 'sizzlers', price: 689, description: 'Yoko sizzler special', vegetarian: false, available: true },
  { name: 'Veg Sizzler', category: 'sizzlers', price: 689, description: 'Vegetable sizzler', vegetarian: true, available: true },
  { name: 'Schezwan Sizzler', category: 'sizzlers', price: 689, description: 'Spicy schezwan sizzler', vegetarian: false, available: true },
  { name: 'Mix Vegetable Sizzler', category: 'sizzlers', price: 689, description: 'Mix vegetable sizzler', vegetarian: true, available: true },
  { name: 'Fox Stories Special Sizzler', category: 'sizzlers', price: 739, description: 'Our special signature sizzler', vegetarian: false, available: true },
  { name: 'Non Veg Schezwan Sizzler', category: 'sizzlers', price: 739, description: 'Non veg schezwan sizzler', vegetarian: false, available: true },
  { name: 'Korean Sizzler', category: 'sizzlers', price: 739, description: 'Korean style sizzler', vegetarian: false, available: true },
  { name: 'Non Veg Sizzler', category: 'sizzlers', price: 739, description: 'Non vegetarian sizzler', vegetarian: false, available: true },

  // Sushi
  { name: 'Veg Sushi', category: 'sushi', price: 489, description: 'Vegetable sushi roll', vegetarian: true, available: true },
  { name: 'Asparagus Sushi', category: 'sushi', price: 499, description: 'Asparagus sushi roll', vegetarian: true, available: true },
  { name: 'Avocado Sushi', category: 'sushi', price: 499, description: 'Avocado sushi roll', vegetarian: true, available: true },
  { name: 'Prawns Tempura Sushi', category: 'sushi', price: 599, description: 'Prawns tempura sushi roll', vegetarian: false, available: true },
  { name: 'Chicken Katsu Sushi Roll', category: 'sushi', price: 599, description: 'Chicken katsu sushi roll', vegetarian: false, available: true },
  { name: 'Salmon & Basil Sushi Roll', category: 'sushi', price: 609, description: 'Salmon and basil sushi roll', vegetarian: false, available: true },
  { name: 'Salmon Sushi', category: 'sushi', price: 609, description: 'Fresh salmon sushi roll', vegetarian: false, available: true },

  // Veg Platter
  { name: 'Chinese Platter Veg', category: 'platters', price: 529, description: 'Vegetarian Chinese platter', vegetarian: true, available: true },
  { name: 'Chinese Combo Veg', category: 'platters', price: 489, description: 'Vegetarian Chinese combo', vegetarian: true, available: true },
];

async function seedMenu() {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('❌ MONGODB_URI not set');
      process.exit(1);
    }

    await mongoose.connect(mongoURI);
    console.log('✓ Connected to MongoDB');

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('✓ Cleared existing menu items');

    // Insert new menu items
    const result = await MenuItem.insertMany(menuData);
    console.log(`✓ Successfully added ${result.length} menu items`);

    // Show summary
    const byCategory = await MenuItem.collection.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray();

    console.log('\n📊 Menu Summary by Category:');
    byCategory.forEach(cat => {
      console.log(`  ${cat._id}: ${cat.count} items`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding menu:', error.message);
    process.exit(1);
  }
}

seedMenu();
