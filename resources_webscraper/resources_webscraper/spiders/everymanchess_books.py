import scrapy

class EverymanBooks(scrapy.Spider):
    name = "everyman_books"
    start_urls = [
        # "https://everymanchess.com/collections/openings-books",
        "https://everymanchess.com/collections/training"
    ]

    def parse(self, response, current_page = 1):
        print(current_page)
        
        for p in response.xpath('//div[@id="Collection"]/ul[contains(concat(" ", normalize-space(@class), " "), " grid ")]/li/div/a/@href').getall():
            url = response.urljoin(p)
            request = scrapy.Request(url, callback=self.parse_product)
            yield request
        
        if current_page == 1:
            total_pages = int(response.xpath('string(normalize-space(//li[@class="pagination__text"]))').re_first(r'(?<=of )\d+'))

            for i in range(2, total_pages + 1):
                new_url = response.url + "?page=" + str(i)
                yield scrapy.Request(new_url, cb_kwargs=dict(current_page=i))

    def parse_product(self, response):
        eBookAvailable = response.xpath('string(normalize-space(//span[contains(concat(" ",@class," "), " price-item ")]/text()))').get() == 'eBook:'
        yield {
            'author':response.xpath('normalize-space(//p[@class="authors-list"]/a/span/text())').get(),
            'previewPDFURL': response.xpath('//a[text()[normalize-space(.) = "pdf extract"]]/@href').get() or response.xpath('//span[text()[normalize-space(.) = "pdf extract"]]/parent::a/@href').get(),
            'price': response.xpath('string(normalize-space(//body))').re_first(r"(?<=\$)[0-9]+.[0-9]+"),
            'url': response.url,
            'name':response.xpath('normalize-space(//h1[@class="product-single__title"])').get(),
            'type': "eBook" if eBookAvailable else "Book",
            'producer':'Everyman Chess',
            'productImage': response.xpath('//div[contains(concat(" ", @class, " "), " product-single__photo ")]/@data-zoom').get()
        }

# get href
# response.xpath('//a[text()[normalize-space(.) = "pdf extract"]]/@href')
        