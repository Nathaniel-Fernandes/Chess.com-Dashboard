import scrapy

class ChesscomArticles(scrapy.Spider):
    name = "chesscom_articles"
    start_urls = [
        "https://www.chess.com/articles/beginners",
        "https://www.chess.com/articles/strategy",
        "https://www.chess.com/articles/tactics",
        "https://www.chess.com/articles/opening-theory",
        "https://www.chess.com/articles/middlegame",
        "https://www.chess.com/articles/endgames",
        "https://www.chess.com/articles/amazing-games",
    ]

    def parse(self, response):
        # print(current_page)
        
        for article in response.xpath('//article'):
            yield {
                'author': article.xpath('normalize-space(.//a[@class="post-preview-meta-username"]/text())').get(),
                'authorURL': article.xpath('.//a[@class="post-preview-meta-username"]/@href').get(),
                'name': article.xpath('normalize-space(.//h2/a[@class="post-category-preview-title"]/text())').get(),
                'url': article.xpath('normalize-space(.//h2/a[@class="post-category-preview-title"]/@href)').get(),
                'previewExcerpt': article.xpath('.//p[@class="post-category-preview-excerpt"]/text()').get(),
                'type': 'Article',
                'producer':'Chess.com',
                'productImage': response.xpath('.//a/img[@class="post-category-preview-thumbnail"]/@src').get(),
                'date': response.xpath('.//span[@class="post-preview-meta-content"]/span/@title').get()
            }
        
        next_page = response.xpath('//a[@aria-label[normalize-space(.) = "Next Page"]]/@href').get()
        # print(next_page)
        if not next_page == None:
            yield response.follow(next_page)

        
        