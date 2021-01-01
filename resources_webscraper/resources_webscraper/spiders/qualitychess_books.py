import scrapy

class QualityChessBooks(scrapy.Spider):
    name = "quality_chess_books"
    start_urls = ["https://www.qualitychess.co.uk/published-books.php"]

    def parse(self, response):
        for p in response.xpath('//table/tr/td/a/@href').getall():
            url = response.urljoin(p)
            yield scrapy.Request(url, callback=self.parse_product)
    
    def parse_product(self, response):
        h1_xpath = response.xpath('string(normalize-space(//h1/text()))')
        preview = response.xpath('//div[@id="pdf2"]/a/@href').get()
        yield {
            'author': h1_xpath.re_first(r"(?<=by\s).*(?=\sand\s)") or h1_xpath.re_first(r"(?<=by\s).*"),
            'previewPDFURL': response.urljoin(preview) if preview else None,
            'price': response.xpath('string(normalize-space(//body))').re_first(r"(?<=[$€£])\d{1,5}.\d{1,2}"),
            'url': response.url,
            'name': h1_xpath.re_first(r".+(?=\sby)") or h1_xpath.get(),
            'producer': 'Quality Chess',
            'productImage': response.xpath('//img[contains(concat(" ", @id, " "), " productimg ")]/@src').get()
        }
