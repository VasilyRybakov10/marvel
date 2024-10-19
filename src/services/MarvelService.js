class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=e4268d902bef21a5d55c067ff692f06b';
    _baseOffset = 210;

    getResource = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        } else {
            return await result.json();
        }
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res =  await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(item => this._tranformCharacter(item));
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
        return this._tranformCharacter(res.data.results[0]);
    }

    getAllCharactersComics = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}/comics?limit=10&${this._apiKey}`);
        return this._transformComics(res);
    }

    _tranformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comicList: char.comics.items
        }
    }

    _transformComics = (comics) => {
        return {
            comics: comics.data.results
        }
    }
}

export default MarvelService;