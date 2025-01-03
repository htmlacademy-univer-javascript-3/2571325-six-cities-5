import { City } from './city';
import { Location } from './location';
import { OfferHost } from './offer-host';

export type OfferInfo = {
	id: string;
	title: string;
	type: string;
	price: number;
	city: City;
	location: Location;
	isFavorite: boolean;
	isPremium: boolean;
	rating: number;
	description: string;
	bedrooms: number;
	goods: string[];
	host: OfferHost;
	images: string[];
	maxAdults: number;
};
