import type { PokemonDetailsResponse } from '../interfaces/pokemon-details.response';
import type { PokemonListResponse, Result } from '../interfaces/pokemon-list.response';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const OVERSIZE_HEIGHT = 20;
const OVERSIZE_WEIGHT = 1000;

export interface PokemonWithOversize extends Result {
	isOversize: boolean;
}

export async function getPokemonList(limit?: number): Promise<PokemonListResponse> {
	const params = new URLSearchParams();

	if (typeof limit === 'number') {
		params.set('limit', String(limit));
	}

	const query = params.toString();
	const url = `${POKEAPI_BASE_URL}/pokemon${query ? `?${query}` : ''}`;
	const resp = await fetch(url);

	if (!resp.ok) {
		throw new Error('Could not load pokemon list');
	}

	return (await resp.json()) as PokemonListResponse;
}

export async function getPokemonByName(name: string): Promise<PokemonDetailsResponse> {
	const resp = await fetch(`${POKEAPI_BASE_URL}/pokemon/${encodeURIComponent(name)}`);

	if (!resp.ok) {
		throw new Error(`Could not load pokemon "${name}"`);
	}

	return (await resp.json()) as PokemonDetailsResponse;
}

export async function getPokemonById(id: number | string): Promise<PokemonDetailsResponse> {
	const resp = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`);

	if (!resp.ok) {
		throw new Error(`Could not load pokemon with id "${id}"`);
	}

	return (await resp.json()) as PokemonDetailsResponse;
}

export async function getPokemonsWithOversize(limit = 151): Promise<PokemonWithOversize[]> {
	const data = await getPokemonList(limit);

	return Promise.all(
		data.results.map(async (pokemon) => {
			try {
				const detailResp = await fetch(pokemon.url);

				if (!detailResp.ok) {
					return { ...pokemon, isOversize: false };
				}

				const details: PokemonDetailsResponse = await detailResp.json();
				const isOversize =
					details.height >= OVERSIZE_HEIGHT || details.weight >= OVERSIZE_WEIGHT;

				return { ...pokemon, isOversize };
			} catch {
				return { ...pokemon, isOversize: false };
			}
		})
	);
}
