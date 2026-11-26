# Network Portfolio Dashboard

> Dashboard and reporting interface for a multi-exchange crypto portfolio: live prices, balances and order history. Express · Pug · Docker.

<p>
<img src="https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/Pug-A86454?style=flat-square&logo=pug&logoColor=white" alt="Pug" />
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonwebservices&logoColor=white" alt="AWS" />
</p>

A web dashboard for tracking a fund's positions across exchanges. It shows live coin prices (streamed through `crypto-socket`), balances per exchange, and paginated order and trade history.

## How it works

- `routes/` covers `coin`, `exchange` and `users` views, server-rendered with Pug.
- Live prices stream in over WebSockets, and balances and history are pulled from exchange APIs.
- Multi-stage Docker builds keep the image small, and it's deployed through AWS CI pipelines.

## Stack

Node.js, Express, Pug, Docker, AWS

## Running locally

```bash
npm install
npm start
```

## Credits

Built by me at Alkemi, 2018–2019 (277 of 301 commits), with contributions from Kevin Bath and Ben Cooper.

---
<sub>Part of <a href="https://github.com/warbuxx87">Ryan Breen's</a> work · <a href="https://www.linkedin.com/in/breen-ryan/">LinkedIn</a></sub>
