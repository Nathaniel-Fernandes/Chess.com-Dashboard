import scrapy

class GambitPublishing(scrapy.Spider):
    name = "gambit_publications"
    start_urls = ["http://www.gambitbooks.com/CompleteBooks.html"]

    def parse(self, response):

        for p in response.xpath('//table/tr[position()>1]'):
            url_selector = p.xpath('.//td[1]/a/@href')
            url_name = url_selector.re_first(r'(?<=\/).*(?=\.)')

            yield {
                'author': p.xpath('.//td[2]/text()').get(),
                'price': p.xpath('string(normalize-space(.//td[4]/text()))').re_first(r"(?<=\$)\d+.\d+"),
                'name': p.xpath('.//td[1]/a/text()').get(),
                'producer': "Gambit Publications",

                'url': response.urljoin(url_selector.get()),
                'productImage':response.urljoin('/bigimg/%s_Big.jpg' % url_name),
                'previewPDFURL':response.urljoin('/pdfs/%s.pdf' % url_name)
            }
