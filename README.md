AVON CRAWLER BACKEND

v1.0

Requires NodeJS.

CLI COMMANDS

>git clone https://github.com/evg1n/avon-crawler-backend.git

>npm install

>node server.js (default port for localhost 8080)


Sends JSON response to

http://${HOST_URL}/${category}

Crawls product category (manually, it operates automatically on schedule)

http://${HOST_URL/${category}/refresh

Sends XLSX file as response

http://${HOST_URL/${category}/xls
