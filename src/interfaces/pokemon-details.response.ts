export interface PokemonDetailsResponse {
	id: number;
	name: string;
	height: number;
	weight: number;
	sprites: Sprites;
	types: TypeEntry[];
}

interface Sprites {
	front_default: string | null;
	other: OtherSprites;
}

interface OtherSprites {
	'official-artwork': OfficialArtwork;
}

interface OfficialArtwork {
	front_default: string | null;
}

interface TypeEntry {
	slot: number;
	type: PokemonType;
}

interface PokemonType {
	name: string;
	url: string;
}
