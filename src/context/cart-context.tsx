'use client';

import { Product } from '@prisma/client';
import { createContext, useContext, useEffect, useState } from 'react';

interface ICartItems {
	product: Product;
	quantity: number;
}

interface IAddToCartRequest {
	product: Product;
	quantity?: number;
}

interface IRemoveRequest {
	productId: string;
}

interface ICartContextType {
	items: ICartItems[];
	clearCart: () => void;
	addToCart: (params: IAddToCartRequest) => void;
	removeFromCart: (params: IRemoveRequest) => void;
	decrementProductFromCart: (params: IRemoveRequest) => void;
}

export const CartContext = createContext({} as ICartContextType);

export function CartContextProvider({ children }: { children: React.ReactNode }) {
	const [cartItems, setCartItems] = useState<ICartItems[]>(() => {
		if (typeof window !== 'undefined') {
			const savedCart = localStorage.getItem('@wedding-cart');
			return savedCart ? JSON.parse(savedCart) : [];
		}
		return [];
	});

	function addToCart({ product, quantity }: IAddToCartRequest) {
		setCartItems((state) => {
			const productInCart = state.some((item) => item.product.id === product.id);

			if (productInCart) {
				return state.map((item) => {
					if (item.product.id === product.id) {
						return {
							...item,
							quantity: quantity ?? item.quantity + 1,
						};
					} else {
						return item;
					}
				});
			} else {
				return [...state, { product, quantity: quantity ?? 1 }];
			}
		});
	}

	function removeFromCart({ productId }: IRemoveRequest) {
		setCartItems((prev) => prev.filter((item) => !(item.product.id === productId)));
	}

	function decrementProductFromCart({ productId }: IRemoveRequest) {
		setCartItems((prev) => {
			return prev.map((item) => {
				if (item.product.id === productId) {
					return { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 };
				} else {
					return item;
				}
			});
		});
	}

	function clearCart() {
		setCartItems([]);
		sessionStorage.removeItem('@wedding-cart');
	}

	useEffect(() => {
		if (cartItems.length > 0 || localStorage.getItem('@wedding-cart') !== null) {
			localStorage.setItem('@wedding-cart', JSON.stringify(cartItems));
		}
	}, [cartItems]);

	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === '@wedding-cart') {
				const updatedCart = event.newValue ? JSON.parse(event.newValue) : [];
				setCartItems(updatedCart);
			}
		};

		window.addEventListener('storage', handleStorageChange);
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	return (
		<CartContext.Provider
			value={{
				items: cartItems,
				clearCart,
				addToCart,
				removeFromCart,
				decrementProductFromCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => useContext(CartContext);
