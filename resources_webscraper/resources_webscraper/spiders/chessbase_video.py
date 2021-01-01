import scrapy
import math

class ChessbaseVideo(scrapy.Spider):
    name = "chessbase_videos"

    base_url = "https://shop.chessbase.com"
    start_urls = ["https://shop.chessbase.com/en/categories/openingfritztrainer",
                 "https://shop.chessbase.com/en/categories/middlegame-fritztrainer",
                 "https://shop.chessbase.com/en/categories/endgame-fritztrainer"]

    def parse(self, response, current_page = 0):
        # print(current_page)
        products = response.xpath("//div[@class='product-thumb']/a/@href").extract()

        for p in products:
            url = response.urljoin(p)

            yield scrapy.Request(url, callback=self.parse_product)

        if (current_page == 0):
            total_prod = int(response.xpath('string(//body)').re_first(r'(?<=results of\s)\d+'))
            total_pages = math.ceil(total_prod / 12) # seems they have 12 products per page

            # print(total_prod)

            # until last page inclusive
            for page in range(1, total_pages + 1):
                new_url = response.url + '/' + str(page)
                request = scrapy.Request(new_url, cb_kwargs=dict(current_page=page))
                yield request


    def parse_product(self, response):
        yield {
            'name': response.xpath('normalize-space(//h1/text())').get(),
            'author': response.xpath('normalize-space(//div[@class="by-authors"]/a/text())').get(),
            'type': 'FritzTrainer',
            'url': response.url,
            'producer': 'ChessBase',
            'previewVideoURL': response.xpath("//div[@class='product-video']/iframe/@src").getall(),
            'price':response.xpath('string(normalize-space(//body))').re_first(r"(?<=\$)[0-9]+.[0-9]+(?=\s\(without VAT\))"),
            'timeHours': response.xpath('string(normalize-space(//body))').re_first(r"(?<=Video running time:\s)\d+(?=\shours)"),
            'timeMinutes': response.xpath('string(normalize-space(//body))').re_first(r"\d+(?=\smin)"),
            'productImage': response.urljoin(response.xpath('//div[@id="DivBrief"]/*/*/img/@src').get())
        }




# xpath selector - product: response.xpath("//div[contains(concat(' ', normalize-space(@class),' '),' product-small')]")
# xpath selector - product link: response.xpath("//div[@class='product-thumb']/a/@href") 


