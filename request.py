import requests
import time

url = 'http://127.0.0.1:3000'
num_requests = 1000

start_time = time.time()

for _ in range(num_requests):
    response = requests.get(url)
    if response.status_code != 200:
        print("Request failed")

end_time = time.time()
print(f"Total time for {num_requests} requests: {end_time - start_time} seconds")
