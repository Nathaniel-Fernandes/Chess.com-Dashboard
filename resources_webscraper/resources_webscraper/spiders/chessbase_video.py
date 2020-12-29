import scrapy

class ChessbaseVideo(scrapy.Spider):
    name = "chessbase_videos"

    base_url = "https://shop.chessbase.com"
    start_urls = ["https://shop.chessbase.com/en/categories/opening-training"]
    delay = 1.5

    def parse(self, response):
        products = response.xpath("//div[@class='product-thumb']/a/@href").extract()
        print(products)
        for p in products:
            # print(product)
            url = response.urljoin(p)
            # print("urls: ", url)

            yield scrapy.Request(url, callback=self.parse_product)

        is_next_page = response.xpath('normalize-space(//div[@id="divPostsLoader"]/p)').re('no more products')


    def parse_product(self, response):
        yield {
            'name': response.xpath('normalize-space(//h1/text())').get(),
            'author': response.xpath('normalize-space(//div[@class="by-authors"]/a/text())').get(),
            'url': response.url,
            'previewURL': response.xpath("//div[@class='product-video']/iframe/@src").extract(),
            'price':response.xpath('string(normalize-space(//body))').re_first(r"(?<=\$)[0-9]+.[0-9]+(?=\s\(without VAT\))"),
            'timeHours': response.xpath('string(normalize-space(//body))').re_first(r"(?<=Video running time:\s)\d+(?=\shours)"),
            'timeMinutes': response.xpath('string(normalize-space(//body))').re_first(r"\d+(?=\smin)")
        }




# xpath selector - product: response.xpath("//div[contains(concat(' ', normalize-space(@class),' '),' product-small')]")
# xpath selector - product link: response.xpath("//div[@class='product-thumb']/a/@href") 


