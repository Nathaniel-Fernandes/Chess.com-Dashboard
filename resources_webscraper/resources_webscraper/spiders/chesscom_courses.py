import scrapy

class ChesscomCourses(scrapy.Spider):
    name = "chesscom_courses"
    start_urls = ["https://www.chess.com/lessons/openings"]

    def parse(self, response, page = 1):

        for p in response.xpath('//a[contains(concat(" ", @class, " "), " course-component ")]'):
            yield {
                "url": p.xpath(".//@href").get()
            }
        
        if page == 1:
            total_pages = int(response.xpath('//div[@id="pagination-bottom"]/@data-total-pages').get())
            
            for i in range(2, total_pages + 1):
                # print('i = ', i, end="")
                new_url = response.url + '?page=%d' % i
                yield scrapy.Request(new_url, cb_kwargs=dict(page=i))