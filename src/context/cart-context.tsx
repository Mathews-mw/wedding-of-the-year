'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface ICartItems {
	productId: string;
	quantity: number;
	price: number;
}

interface IAddToCartRequest {
	productId: string;
	price: number;
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
			const savedCart = localStorage.getItem('cart');
			return savedCart ? JSON.parse(savedCart) : [];
		}
		return [];
	});

	function addToCart({ productId, price, quantity }: IAddToCartRequest) {
		setCartItems((state) => {
			const productInCart = state.some((item) => item.productId === productId);

			if (productInCart) {
				return state.map((item) => {
					if (item.productId === productId) {
						return {
							...item,
							quantity: quantity ?? item.quantity + 1,
							price: item.price,
						};
					} else {
						return item;
					}
				});
			} else {
				return [...state, { productId, quantity: quantity ?? 1, price }];
			}
		});
	}

	function removeFromCart({ productId }: IRemoveRequest) {
		setCartItems((prev) => prev.filter((item) => !(item.productId === productId)));
	}

	function decrementProductFromCart({ productId }: IRemoveRequest) {
		setCartItems((prev) => {
			return prev.map((item) => {
				if (item.productId === productId) {
					return { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 };
				} else {
					return item;
				}
			});
		});
	}

	function clearCart() {
		setCartItems([]);
		sessionStorage.removeItem('cart');
	}

	useEffect(() => {
		if (cartItems.length > 0 || localStorage.getItem('cart') !== null) {
			localStorage.setItem('cart', JSON.stringify(cartItems));
		}
	}, [cartItems]);

	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === 'cart') {
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
