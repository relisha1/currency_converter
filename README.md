# Currency Converter Web App

This is a simple, responsive web application that allows users to convert currencies in real time using exchange rates from RapidAPI. It is built with HTML, CSS, and JavaScript, and deployed on two web servers behind a load balancer for reliability and scalability.

---

## 🎯 Purpose

This project was created to fulfill an assignment focused on building a meaningful, practical application using external APIs. It demonstrates:

- Effective use of a third-party API
- Clean, intuitive UI with meaningful data interaction
- Real deployment on distributed servers with a load balancer
- Proper documentation and code organization

---

## 📁 Folder Structure

```
currency-converter/
├── index.html     # Main interface
├── style.css      # Custom styles
└── script.js      # API interaction & logic
```

---


## 🧠 Features

- Currency conversion between major global currencies
- Static dropdown menus for currency selection
- Fully responsive design (mobile/tablet/desktop)
- Error handling for invalid input and API issues

---

## 🚀 Deployment Instructions

You are provided with 3 servers:

| Server        | IP              | Purpose        |
|---------------|------------------|----------------|
| Web01         | `52.87.158.91`   | Main frontend  |
| Web02         | `3.82.213.156`   | Backup frontend|
| Load Balancer | `3.82.157.180`   | Distributes traffic |

---

### 🔁 Upload Files to Servers

From your Git Bash or terminal:

```bash
scp index.html style.css script.js ubuntu@<SERVER_IP>:/tmp/
ssh ubuntu@<SERVER_IP>
sudo mv /tmp/*.html /tmp/*.css /tmp/*.js /var/www/html/
```

Repeat on both Web01 and Web02.

---

### ⚙️ Load Balancer Setup

1. SSH into the load balancer:
   ```bash
   ssh ubuntu@3.82.157.180
   ```

2. Install NGINX if not already:
   ```bash
   sudo apt update && sudo apt install nginx -y
   ```

3. Edit NGINX config:
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

4. Replace content with:
   ```nginx
   upstream currency_backend {
       server 52.87.158.91;
       server 3.82.213.156;
   }

   server {
       listen 80;

       location / {
           proxy_pass http://currency_backend;
       }
   }
   ```

5. Restart NGINX:
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

## ⚠️ Error Handling

- Prevents invalid input (empty or non-numeric amount)
- Catches API errors and displays a friendly message
- Console logs API response and any issues for debugging

---

## 🧪 Testing

- The load balancer distributes traffic to both Web01 and Web02
- The app loads correctly on all devices and screen sizes
- Conversions between multiple currencies return expected values
- Switching “from” and “to” currencies works without refreshing the page

---

## 🧩 Challenges & Solutions

| Challenge | Solution |
|----------|----------|
| Some APIs returned only EUR as base | Switched to RapidAPI's flexible API |
| Load balancer not distributing traffic | Used NGINX `upstream` block properly |
| Dropdown empty on first try | Replaced with static major currency list |
| API headers weren't working | Debugged with `curl` before integrating into JS |

---

✅ Demo Video

https://drive.google.com/file/d/1zm5L3MpWIZRwHv_yn9FNxoCZgvaqHMH0/view?usp=drive_link

## 🙏 Credits

- 💹 API by [https://billing.currencyfreaks.com)
- 🔀 NGINX Load Balancer [Docs](https://nginx.org/en/docs/)
- 🖥️ Hosting & server setup via Ubuntu web stack



