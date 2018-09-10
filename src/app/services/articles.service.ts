import { Article } from '../models/article-model';

export class ArticlesService {
    getArticles() {
        return this.articles;
    } // zwraca artykuly na glowna strone, co 10 na przyklad, te najnowsze
    getArtcile(index: number) {
        return this.articles[index - 1];
    }
    getArtcilesByCategory() {} // zwraca artykulu danej kategori co 10 na przyklad
    getComments() {} // zwraca komentarze do danego artykulu

    private articles: Article[] = [
        new Article(1, 'Ramen', 'https://www.youtube.com/embed/B8y3SSmz4sg', '10/01/2018', 201, 'Admin', 'Kitchen'),
        new Article(2, 'lol', 'https://www.youtube.com/embed/7kSPCWcs7cc', '10/01/2018', 201, 'chinkchiankchionk', 'Tools')
    ];
}
